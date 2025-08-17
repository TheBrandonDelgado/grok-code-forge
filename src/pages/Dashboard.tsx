import React, { useState } from 'react';
import { LogOut, User, History, Settings, Code, Zap, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { mockGrokService, mockReviews } from '../services/mockData';
import UploadForm from '../components/UploadForm';
import ReviewDisplay from '../components/ReviewDisplay';
import type { UploadFormData, GrokAnalysisResponse, CodeReview } from '../types';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [analysis, setAnalysis] = useState<GrokAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [recentReviews] = useState<CodeReview[]>(mockReviews);

  const handleSubmit = async (formData: UploadFormData) => {
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      let analysisResult: GrokAnalysisResponse;

      if (formData.image) {
        // Analyze image
        analysisResult = await mockGrokService.analyzeImage(formData.image);
      } else {
        // Analyze text code
        analysisResult = await mockGrokService.analyzeCode(formData.code, formData.language);
      }

      setAnalysis(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze code');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-pattern relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-card)] backdrop-blur-xl border-b border-[var(--border-primary)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center group">
                  <div className="relative">
                    <div className="h-8 w-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center shadow-sm">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h1 className="ml-3 text-xl font-semibold text-[var(--text-primary)]">
                    GrokCodeForge
                  </h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-all duration-200 text-sm font-medium">
                <History className="h-4 w-4 mr-2 inline" />
                History
              </button>
              <button className="px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-all duration-200 text-sm font-medium">
                <Settings className="h-4 w-4 mr-2 inline" />
                Settings
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm font-medium">{user?.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-error)] hover:bg-[var(--bg-overlay)] transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--bg-overlay)] border border-[var(--border-secondary)] mb-6">
            <Sparkles className="h-4 w-4 text-[var(--accent-primary)] mr-2" />
            <span className="text-sm text-[var(--text-secondary)] font-medium">Powered by Grok-4 AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            AI-Powered Code Review
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Upload your code or screenshot and get instant AI analysis for bugs, optimizations, and explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Upload Form */}
          <div className="space-y-6">
            <UploadForm onSubmit={handleSubmit} loading={loading} />
            
            {/* Features */}
            <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center">
                <Sparkles className="h-5 w-5 text-[var(--accent-primary)] mr-3" />
                Advanced Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-[var(--bg-overlay)] hover:bg-[var(--bg-overlay-hover)] transition-all duration-200">
                  <div className="p-1.5 rounded-md bg-[var(--accent-primary)]/10 mr-3">
                    <Zap className="h-4 w-4 text-[var(--accent-primary)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm">Advanced AI analysis with Grok-4</span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-[var(--bg-overlay)] hover:bg-[var(--bg-overlay-hover)] transition-all duration-200">
                  <div className="p-1.5 rounded-md bg-[var(--accent-secondary)]/10 mr-3">
                    <Code className="h-4 w-4 text-[var(--accent-secondary)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm">Support for 25+ programming languages</span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-[var(--bg-overlay)] hover:bg-[var(--bg-overlay-hover)] transition-all duration-200">
                  <div className="p-1.5 rounded-md bg-[var(--accent-success)]/10 mr-3">
                    <Shield className="h-4 w-4 text-[var(--accent-success)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm">Secure authentication with Supabase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Review Display */}
          <div>
            <ReviewDisplay 
              analysis={analysis} 
              loading={loading} 
              error={error} 
            />
          </div>
        </div>

        {/* Recent Reviews Section */}
        {recentReviews.length > 0 && (
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Recent Reviews</h3>
              <p className="text-[var(--text-secondary)]">Your latest AI-powered code analysis sessions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="group bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all duration-200 hover-lift card-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[var(--text-tertiary)] font-medium">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    {review.language && (
                      <span className="text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-2.5 py-1 rounded-full border border-[var(--accent-primary)]/20">
                        {review.language}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--text-primary)] text-sm mb-3 line-clamp-3 leading-relaxed">
                    {review.code_snippet.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <div className="status-dot error"></div>
                        {review.analysis.bugs.length} bugs
                      </span>
                      <span className="flex items-center">
                        <div className="status-dot warning"></div>
                        {review.analysis.optimizations.length} optimizations
                      </span>
                    </div>
                    <span className="flex items-center">
                      <div className="status-dot info"></div>
                      {review.analysis.explanations.length} explanations
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
