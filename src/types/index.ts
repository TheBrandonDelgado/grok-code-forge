export interface User {
  id: string;
  email: string;
  created_at: string;
  github_username?: string;
}

export interface CodeReview {
  id: string;
  user_id: string;
  code_snippet: string;
  language?: string;
  image_url?: string;
  analysis: {
    bugs: Bug[];
    optimizations: Optimization[];
    explanations: Explanation[];
  };
  created_at: string;
  updated_at: string;
}

export interface Bug {
  id: string;
  line_number?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion: string;
}

export interface Optimization {
  id: string;
  line_number?: number;
  type: 'performance' | 'readability' | 'security' | 'best_practice';
  description: string;
  suggestion: string;
  impact: 'low' | 'medium' | 'high';
}

export interface Explanation {
  id: string;
  section: string;
  content: string;
}

export interface GrokAnalysisResponse {
  bugs: Bug[];
  optimizations: Optimization[];
  explanations: Explanation[];
  summary: string;
}

export interface UploadFormData {
  code: string;
  language?: string;
  image?: File;
}

export type AuthMode = 'login' | 'signup';
