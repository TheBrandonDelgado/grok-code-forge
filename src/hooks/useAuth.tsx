import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';
import { supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider rendering, loading:', loading, 'user:', user);

  useEffect(() => {
    console.log('AuthProvider useEffect running');
    
    // Get initial user
    const getInitialUser = async () => {
      try {
        console.log('Getting initial user...');
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        console.log('Current user result:', currentUser);
        
        if (currentUser && currentUser.id) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            created_at: currentUser.created_at || '',
          });
        }
      } catch (error) {
        console.error('Error getting initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log('Auth state change:', event, session);
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  console.log('AuthProvider value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
