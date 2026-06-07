/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Graceful submission gateway Helper
export async function submitLead(name: string, email: string, company: string, message: string) {
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, company, message }]);
    
    if (error) throw error;
    return { success: true, destination: "supabase", data };
  } else {
    // If Supabase credentials are not supplied, save to localStorage
    const key = "pandx_leads";
    const submissions = JSON.parse(localStorage.getItem(key) || "[]");
    const newSubmission = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      name,
      email,
      company,
      message,
      created_at: new Date().toISOString()
    };
    submissions.push(newSubmission);
    localStorage.setItem(key, JSON.stringify(submissions));
    
    // Simulate real network delay for high-fidelity interactive experience
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, destination: "local_storage", data: newSubmission };
  }
}
