import React, { useState } from 'react';
import { Bug as BugIcon, Zap, BookOpen, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';
import type { GrokAnalysisResponse } from '../types';

interface ReviewDisplayProps {
  analysis: GrokAnalysisResponse | null;
  loading?: boolean;
  error?: string;
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ analysis, loading = false, error }) => {
  const [activeTab, setActiveTab] = useState<'bugs' | 'optimizations' | 'explanations'>('bugs');

  if (loading) {
    return (
      <div className="bg-[var(--bg-card)] rounded-xl p-8 border border-[var(--border-primary)] shadow-sm">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="spinner-modern mb-4"></div>
          <span className="text-[var(--text-primary)] text-lg font-medium">Analyzing your code...</span>
          <p className="text-[var(--text-secondary)] mt-2">Our AI is examining every line for insights</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[var(--accent-error)]/5 border border-[var(--accent-error)]/20 rounded-xl p-6 shadow-sm">
        <div className="flex items-center text-[var(--accent-error)] mb-3">
          <div className="p-1.5 rounded-md bg-[var(--accent-error)]/10 mr-3">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold">Analysis Error</h3>
        </div>
        <p className="text-[var(--text-secondary)]">{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-[var(--bg-card)] rounded-xl p-8 border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all duration-200">
        <div className="text-center text-[var(--text-secondary)]">
          <div className="mb-4">
            <BookOpen className="mx-auto h-16 w-16 text-[var(--accent-primary)]" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Ready for Analysis</h3>
          <p className="text-sm">Submit your code to get started with AI-powered analysis</p>
          <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--bg-overlay)] border border-[var(--border-secondary)]">
            <Sparkles className="h-3 w-3 text-[var(--accent-primary)] mr-2" />
            <span className="text-xs text-[var(--text-secondary)]">Powered by Grok-4 AI</span>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-[var(--accent-error)] bg-[var(--accent-error)]/10 border-[var(--accent-error)]/20';
      case 'high': return 'text-[var(--accent-warning)] bg-[var(--accent-warning)]/10 border-[var(--accent-warning)]/20';
      case 'medium': return 'text-[var(--accent-warning)] bg-[var(--accent-warning)]/10 border-[var(--accent-warning)]/20';
      case 'low': return 'text-[var(--accent-success)] bg-[var(--accent-success)]/10 border-[var(--accent-success)]/20';
      default: return 'text-[var(--text-tertiary)] bg-[var(--bg-overlay)] border-[var(--border-secondary)]';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-[var(--accent-success)] bg-[var(--accent-success)]/10 border-[var(--accent-success)]/20';
      case 'medium': return 'text-[var(--accent-warning)] bg-[var(--accent-warning)]/10 border-[var(--accent-warning)]/20';
      case 'low': return 'text-[var(--text-tertiary)] bg-[var(--bg-overlay)] border-[var(--border-secondary)]';
      default: return 'text-[var(--text-tertiary)] bg-[var(--bg-overlay)] border-[var(--border-secondary)]';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'text-[var(--accent-success)] bg-[var(--accent-success)]/10 border-[var(--accent-success)]/20';
      case 'readability': return 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/20';
      case 'security': return 'text-[var(--accent-error)] bg-[var(--accent-error)]/10 border-[var(--accent-error)]/20';
      case 'best_practice': return 'text-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 border-[var(--accent-secondary)]/20';
      default: return 'text-[var(--text-tertiary)] bg-[var(--bg-overlay)] border-[var(--border-secondary)]';
    }
  };

  const tabs = [
    {
      id: 'bugs' as const,
      label: 'Bugs & Issues',
      icon: BugIcon,
      count: analysis.bugs.length,
      color: 'text-[var(--accent-error)]',
      bgColor: 'bg-[var(--accent-error)]/10',
    },
    {
      id: 'optimizations' as const,
      label: 'Optimizations',
      icon: Zap,
      count: analysis.optimizations.length,
      color: 'text-[var(--accent-warning)]',
      bgColor: 'bg-[var(--accent-warning)]/10',
    },
    {
      id: 'explanations' as const,
      label: 'Explanations',
      icon: BookOpen,
      count: analysis.explanations.length,
      color: 'text-[var(--accent-primary)]',
      bgColor: 'bg-[var(--accent-primary)]/10',
    },
  ];

  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] shadow-sm overflow-hidden">
      {/* Summary */}
      {analysis.summary && (
        <div className="p-6 border-b border-[var(--border-secondary)] bg-[var(--bg-overlay)]">
          <div className="flex items-start">
            <div className="p-1.5 rounded-md bg-[var(--accent-primary)]/10 mr-3 flex-shrink-0">
              <Info className="h-5 w-5 text-[var(--accent-primary)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Analysis Summary</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{analysis.summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-[var(--border-secondary)] bg-[var(--bg-overlay)]">
        <nav className="flex space-x-1 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${tab.bgColor} ${tab.color} border border-[var(--border-accent)] shadow-sm`
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay-hover)]'
                }`}
              >
                <Icon className={`h-4 w-4 mr-2 ${activeTab === tab.id ? tab.color : 'text-[var(--text-tertiary)]'}`} />
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                    activeTab === tab.id 
                      ? 'bg-[var(--bg-overlay)] text-[var(--text-primary)]' 
                      : 'bg-[var(--bg-overlay)] text-[var(--text-secondary)]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'bugs' && (
          <div className="space-y-4">
            {analysis.bugs.length === 0 ? (
              <div className="text-center text-[var(--text-secondary)] py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-[var(--accent-success)] mb-3" />
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No Bugs Found!</h4>
                <p className="text-sm">Your code looks clean and well-written.</p>
              </div>
            ) : (
              analysis.bugs.map((bug, index) => (
                <div 
                  key={bug.id} 
                  className="bg-[var(--bg-overlay)] rounded-lg p-4 border border-[var(--border-secondary)] hover:border-[var(--accent-error)]/30 transition-all duration-200 card-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3 gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(bug.severity)}`}>
                          {bug.severity.charAt(0).toUpperCase() + bug.severity.slice(1)}
                        </span>
                        {bug.line_number && (
                          <span className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-overlay)] px-2 py-1 rounded border border-[var(--border-secondary)]">
                            Line {bug.line_number}
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--text-primary)] font-medium mb-3 leading-relaxed">{bug.description}</p>
                      <div className="bg-[var(--accent-error)]/5 border border-[var(--accent-error)]/20 rounded-lg p-3">
                        <p className="text-sm text-[var(--text-secondary)]">
                          <span className="font-semibold text-[var(--text-primary)]">Suggestion:</span> {bug.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'optimizations' && (
          <div className="space-y-4">
            {analysis.optimizations.length === 0 ? (
              <div className="text-center text-[var(--text-secondary)] py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-[var(--accent-success)] mb-3" />
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No Optimizations Needed!</h4>
                <p className="text-sm">Your code is already well-optimized.</p>
              </div>
            ) : (
              analysis.optimizations.map((opt, index) => (
                <div 
                  key={opt.id} 
                  className="bg-[var(--bg-overlay)] rounded-lg p-4 border border-[var(--border-secondary)] hover:border-[var(--accent-warning)]/30 transition-all duration-200 card-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(opt.type)}`}>
                          {opt.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(opt.impact)}`}>
                          {opt.impact.charAt(0).toUpperCase() + opt.impact.slice(1)} Impact
                        </span>
                        {opt.line_number && (
                          <span className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-overlay)] px-2 py-1 rounded border border-[var(--border-secondary)]">
                            Line {opt.line_number}
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--text-primary)] font-medium mb-3 leading-relaxed">{opt.description}</p>
                      <div className="bg-[var(--accent-warning)]/5 border border-[var(--accent-warning)]/20 rounded-lg p-3">
                        <p className="text-sm text-[var(--text-secondary)]">
                          <span className="font-semibold text-[var(--text-primary)]">Suggestion:</span> {opt.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'explanations' && (
          <div className="space-y-4">
            {analysis.explanations.length === 0 ? (
              <div className="text-center text-[var(--text-secondary)] py-8">
                <BookOpen className="mx-auto h-12 w-12 text-[var(--accent-primary)] mb-3" />
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No Explanations Available</h4>
                <p className="text-sm">This code is self-explanatory or doesn't require additional context.</p>
              </div>
            ) : (
              analysis.explanations.map((explanation, index) => (
                <div 
                  key={explanation.id} 
                  className="bg-[var(--bg-overlay)] rounded-lg p-4 border border-[var(--border-secondary)] hover:border-[var(--accent-primary)]/30 transition-all duration-200 card-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="text-[var(--text-primary)] font-semibold mb-3 flex items-center">
                    <div className="p-1.5 rounded-md bg-[var(--accent-primary)]/10 mr-2">
                      <BookOpen className="h-4 w-4 text-[var(--accent-primary)]" />
                    </div>
                    {explanation.section}
                  </h4>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{explanation.content}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDisplay;
