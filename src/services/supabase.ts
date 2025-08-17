import { createClient } from '@supabase/supabase-js';
import type { CodeReview } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const authService = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database functions
export const reviewService = {
  async createReview(review: Omit<CodeReview, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('code_reviews')
      .insert([review])
      .select()
      .single();
    return { data, error };
  },

  async getUserReviews(userId: string) {
    const { data, error } = await supabase
      .from('code_reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getReview(id: string) {
    const { data, error } = await supabase
      .from('code_reviews')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async deleteReview(id: string) {
    const { error } = await supabase
      .from('code_reviews')
      .delete()
      .eq('id', id);
    return { error };
  },
};

// Storage functions
export const storageService = {
  async uploadImage(file: File, userId: string) {
    const fileName = `${userId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('code-images')
      .upload(fileName, file);
    
    if (error) return { data: null, error };
    
    const { data: urlData } = supabase.storage
      .from('code-images')
      .getPublicUrl(fileName);
    
    return { data: urlData.publicUrl, error: null };
  },

  async deleteImage(fileName: string) {
    const { error } = await supabase.storage
      .from('code-images')
      .remove([fileName]);
    return { error };
  },
};
