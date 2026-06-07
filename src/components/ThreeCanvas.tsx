import * as React from "react";
import * as THREE from "three";
import { audioEngine } from "../utils/audio";

interface ThreeCanvasProps {
  shapeMode?: "sphere" | "torus" | "wave";
}

export default function ThreeCanvas({ shapeMode = "sphere" }: ThreeCanvasProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let width = containerRef.current.clientWidth || 300;
    let height = containerRef.current.clientHeight || 300;

    // 1. Initialize Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lights Layout
    const ambientLight = new THREE.AmbientLight(0x0e1c1b, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 10, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight2.position.set(-5, -10, -5);
    scene.add(dirLight2);

    const pointLight1 = new THREE.PointLight(0x14b8a6, 2.0, 20);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff7f50, 1.5, 20);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // 3. Create the Main Geometry based on shapeMode
    let sphereGeo: THREE.BufferGeometry;
    let isWireframe = false;
    
    if (shapeMode === "torus") {
      sphereGeo = new THREE.TorusKnotGeometry(0.65, 0.22, 120, 16);
    } else if (shapeMode === "wave") {
      // Modern topology plane grid
      sphereGeo = new THREE.PlaneGeometry(2.3, 2.3, 40, 40);
      isWireframe = true;
    } else {
      sphereGeo = new THREE.SphereGeometry(1.1, 64, 64);
    }
    
    // Shader with 3D noise/waves vector displacement & liquid Matcap shading
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#14b8a6") },
      },
      wireframe: isWireframe,
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          
          vec3 pos = position;
          // Fluid organic molten metal distortion using sine/cos combination waves
          float d = sin(pos.x * 2.5 + uTime * 1.5) * 
                    cos(pos.y * 2.5 + uTime * 1.3) * 
                    sin(pos.z * 2.5 + uTime * 1.7) * 0.16;
          
          // Custom landscape wave displacement for plane wave
          if (abs(normal.z) > 0.9) {
            d = sin(pos.x * 3.5 + uTime * 2.0) * cos(pos.y * 3.5 + uTime * 1.8) * 0.18;
          }
          
          pos += normal * d;
          vPosition = pos;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
          
          // Rim/fresnel glow effect
          float rim = 1.0 - max(dot(normal, viewDir), 0.0);
          rim = pow(rim, 3.5);
          
          // Highly reflective specular highlights
          vec3 lightDir1 = normalize(vec3(1.0, 1.0, 1.0));
          vec3 lightDir2 = normalize(vec3(-1.0, -1.0, -1.0));
          
          float spec1 = pow(max(dot(reflect(-lightDir1, normal), viewDir), 0.0), 24.0);
          float spec2 = pow(max(dot(reflect(-lightDir2, normal), viewDir), 0.0), 16.0);
          
          // Core styling: emerald-teal base blending into subtle chrome or coral highlight
          vec3 coralHighlight = vec3(1.0, 0.498, 0.314); // #ff7f50
          vec3 color = mix(uColor, coralHighlight, rim * 0.5);
          color += vec3(1.0, 1.0, 1.0) * (spec1 * 0.8 + spec2 * 0.4);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
    });

    const coreSphere = new THREE.Mesh(sphereGeo, shaderMaterial);
    
    // Group to hold our entire interactive group structure (enabling mouse movement rotations)
    const activeGroup = new THREE.Group();
    activeGroup.add(coreSphere);
    scene.add(activeGroup);

    // 4. Create Orbiting Rings
    const ring1Geo = new THREE.RingGeometry(1.7, 1.71, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    activeGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(2.0, 2.01, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xff7f50,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = -Math.PI / 3;
    ring2.rotation.x = Math.PI / 4;
    activeGroup.add(ring2);

    // Ornamented nodes on the rings
    const node1Geo = new THREE.SphereGeometry(0.07, 16, 16);
    const node1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const node1 = new THREE.Mesh(node1Geo, node1Mat);
    node1.position.set(1.7, 0, 0);
    const ring1Container = new THREE.Group();
    ring1Container.add(node1);
    ring1Container.rotation.x = Math.PI / 4;
    activeGroup.add(ring1Container);

    const node2Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const node2Mat = new THREE.MeshBasicMaterial({ color: 0xff7f50 });
    const node2 = new THREE.Mesh(node2Geo, node2Mat);
    node2.position.set(0, 2.0, 0);
    const ring2Container = new THREE.Group();
    ring2Container.add(node2);
    ring2Container.rotation.y = -Math.PI / 3;
    ring2Container.rotation.x = Math.PI / 4;
    activeGroup.add(ring2Container);

    // 5. Ambient Particles/Sparkles
    const particleCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color("#14b8a6");
    const color2 = new THREE.Color("#ffffff");

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const pColor = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(pGeo, pMat);
    activeGroup.add(particles);

    // 6. Interactive Mouse Movements Tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let lastAudioTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const rx = event.clientX - rect.left;
      const ry = event.clientY - rect.top;
      
      mouseX = (rx / rect.width) - 0.5;
      mouseY = (ry / rect.height) - 0.5;

      // Realtime sound haptic: trigger subtle dynamic tone when sliding or hovering quickly
      const now = performance.now();
      if (now - lastAudioTime > 200) { // Throttled to prevent overlapping audio clutter and sounding chaotic
        const speed = Math.abs(mouseX) + Math.abs(mouseY);
        if (speed > 0.05) {
          // Map coordinates to elegant frequencies of a pentatonic scale
          const notes = [220, 247.5, 275, 330, 385, 440, 495, 550, 660, 770];
          const xIndex = Math.min(Math.max(Math.floor((mouseX + 0.5) * notes.length), 0), notes.length - 1);
          audioEngine.playPitchNode(notes[xIndex]);
          lastAudioTime = now;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Responsive Resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width || 300;
        height = entry.contentRect.height || 300;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(containerRef.current);

    // 8. Animation Cycle
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Distort Sphere shader
      shaderMaterial.uniforms.uTime.value = elapsed;

      // Orbit rotations
      coreSphere.rotation.y = elapsed * 0.15;
      coreSphere.rotation.z = elapsed * 0.08;

      ring1Container.rotation.z = elapsed * 0.3;
      ring2Container.rotation.z = -elapsed * 0.25;

      // Subtle float animation
      coreSphere.position.y = Math.sin(elapsed * 1.5) * 0.1;

      // Particles rotation
      particles.rotation.y = elapsed * 0.02;

      // Smooth Lerping of mouse positions for drift orientation
      targetX = THREE.MathUtils.lerp(targetX, mouseX * 0.8, 0.05);
      targetY = THREE.MathUtils.lerp(targetY, mouseY * 0.8, 0.05);

      activeGroup.rotation.y = targetX;
      activeGroup.rotation.x = -targetY;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Unmount Release
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      cancelAnimationFrame(animationFrameId);
      
      sphereGeo.dispose();
      shaderMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      node1Geo.dispose();
      node1Mat.dispose();
      node2Geo.dispose();
      node2Mat.dispose();
      pGeo.dispose();
      pMat.dispose();

      renderer.dispose();
    };
  }, [shapeMode]);

  React.useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[300px] bg-zinc-950/20 border border-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute w-40 h-40 bg-teal-500/20 rounded-full blur-[100px]" />
        <div className="text-center p-8 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 mx-auto mb-3 animate-pulse" />
          <span className="font-mono text-xs text-white/60 tracking-wider">CREATIVE FIELD PREVENTED BY CLIENT SUPPORT</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] relative flex justify-center items-center">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
