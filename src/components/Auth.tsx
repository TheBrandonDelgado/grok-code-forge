import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Code, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { AuthMode } from '../types';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = mode === 'login' 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] bg-pattern py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* App Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
            Grok Code Forge
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            AI-Powered Code Generation & Review
          </p>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-6">
            <div className="h-16 w-16 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center shadow-sm mx-auto">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">
            {mode === 'login' ? 'Welcome Back' : 'Join Us'}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-2">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors duration-200 underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-primary)] shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
                  <div className="p-1.5 rounded-md bg-[var(--accent-primary)]/10 mr-2">
                    <Mail className="h-4 w-4 text-[var(--accent-primary)]" />
                  </div>
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
                  <div className="p-1.5 rounded-md bg-[var(--accent-secondary)]/10 mr-2">
                    <Lock className="h-4 w-4 text-[var(--accent-secondary)]" />
                  </div>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-[var(--accent-error)]/5 border border-[var(--accent-error)]/20 rounded-lg p-3">
                <div className="flex items-center text-[var(--accent-error)]">
                  <div className="p-1 rounded-md bg-[var(--accent-error)]/10 mr-2">
                    <Shield className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <div className="spinner-modern mr-2"></div>
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {mode === 'login' ? 'Sign in' : 'Sign up'}
                  </>
                )}
              </button>

            </div>
          </form>
        </div>

        {/* Features */}
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--bg-overlay)] border border-[var(--border-secondary)]">
            <Shield className="h-3 w-3 text-[var(--accent-success)] mr-2" />
            <span className="text-xs text-[var(--text-secondary)]">Secure authentication with Supabase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
