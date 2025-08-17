import type { GrokAnalysisResponse, CodeReview, User } from '../types';

// Mock user data
export const mockUser: User = {
  id: 'mock-user-123',
  email: 'developer@example.com',
  created_at: '2024-01-15T10:00:00Z',
  github_username: 'mockdev',
};

// Mock analysis data
export const mockAnalysis: GrokAnalysisResponse = {
  bugs: [
    {
      id: 'bug-1',
      line_number: 15,
      severity: 'high' as const,
      description: 'Potential null reference exception when accessing user data',
      suggestion: 'Add null check before accessing user properties: if (user && user.name) { ... }',
    },
    {
      id: 'bug-2',
      line_number: 42,
      severity: 'medium' as const,
      description: 'Missing error handling in async function',
      suggestion: 'Wrap the async operation in try-catch block and handle potential errors gracefully',
    },
    {
      id: 'bug-3',
      line_number: 78,
      severity: 'low' as const,
      description: 'Unused variable declared but never used',
      suggestion: 'Remove the unused variable or use it in the logic',
    },
  ],
  optimizations: [
    {
      id: 'opt-1',
      line_number: 23,
      type: 'performance' as const,
      description: 'Inefficient array iteration using forEach',
      suggestion: 'Consider using for...of loop or Array.map() for better performance',
      impact: 'medium' as const,
    },
    {
      id: 'opt-2',
      line_number: 56,
      type: 'readability' as const,
      description: 'Complex nested ternary operators reduce code readability',
      suggestion: 'Extract the logic into a separate function with descriptive name',
      impact: 'high' as const,
    },
    {
      id: 'opt-3',
      line_number: 89,
      type: 'security' as const,
      description: 'Direct DOM manipulation without sanitization',
      suggestion: 'Use React refs or state management instead of direct DOM access',
      impact: 'high' as const,
    },
    {
      id: 'opt-4',
      line_number: 112,
      type: 'best_practice' as const,
      description: 'Missing PropTypes or TypeScript interfaces for component props',
      suggestion: 'Add proper type definitions to improve code maintainability',
      impact: 'low' as const,
    },
  ],
  explanations: [
    {
      id: 'exp-1',
      section: 'Authentication Flow',
      content: 'This component implements a JWT-based authentication system with automatic token refresh. The useAuth hook manages the authentication state and provides methods for login, logout, and user session management.',
    },
    {
      id: 'exp-2',
      section: 'Data Fetching Pattern',
      content: 'The component uses React Query for efficient data fetching with automatic caching, background updates, and error handling. This pattern ensures optimal performance and user experience.',
    },
    {
      id: 'exp-3',
      section: 'State Management',
      content: 'Local component state is managed with useState hooks, while global application state uses React Context API. This approach provides a good balance between simplicity and scalability.',
    },
  ],
  summary: 'Overall, this is well-structured React code with good separation of concerns. The main areas for improvement are error handling, performance optimization, and type safety. The authentication implementation is solid, but could benefit from additional security measures.',
};

// Mock code reviews
export const mockReviews: CodeReview[] = [
  {
    id: 'review-1',
    user_id: mockUser.id,
    code_snippet: `function calculateUserScore(user) {
  if (!user) return 0;
  
  let score = 0;
  user.activities.forEach(activity => {
    if (activity.type === 'post') score += 10;
    if (activity.type === 'comment') score += 5;
    if (activity.type === 'like') score += 1;
  });
  
  return score;
}`,
    language: 'javascript',
    image_url: undefined,
    analysis: mockAnalysis,
    created_at: '2024-01-15T14:30:00Z',
    updated_at: '2024-01-15T14:30:00Z',
  },
  {
    id: 'review-2',
    user_id: mockUser.id,
    code_snippet: `const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);
  
  if (loading) return <Spinner />;
  if (!user) return <NotFound />;
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
};`,
    language: 'jsx',
    image_url: undefined,
    analysis: {
      ...mockAnalysis,
      bugs: mockAnalysis.bugs.slice(0, 2),
      optimizations: mockAnalysis.optimizations.slice(0, 3),
      explanations: mockAnalysis.explanations.slice(0, 2),
    },
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-14T09:15:00Z',
  },
  {
    id: 'review-3',
    user_id: mockUser.id,
    code_snippet: `async function processPayment(orderId, paymentMethod) {
  try {
    const order = await getOrder(orderId);
    const payment = await createPayment(order.amount, paymentMethod);
    
    if (payment.status === 'success') {
      await updateOrderStatus(orderId, 'paid');
      return { success: true, paymentId: payment.id };
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return { success: false, error: error.message };
  }
}`,
    language: 'javascript',
    image_url: undefined,
    analysis: {
      ...mockAnalysis,
      bugs: mockAnalysis.bugs.slice(1, 3),
      optimizations: mockAnalysis.optimizations.slice(1, 4),
      explanations: mockAnalysis.explanations.slice(1, 3),
    },
    created_at: '2024-01-13T16:45:00Z',
    updated_at: '2024-01-13T16:45:00Z',
  },
];

// Mock service functions
export const mockAuthService = {
  async signUp(email: string, _password: string) {
    console.log('Mock signup:', email);
    return { data: { user: mockUser }, error: null };
  },

  async signIn(email: string, _password: string) {
    console.log('Mock signin:', email);
    return { data: { user: mockUser }, error: null };
  },

  async signInWithGitHub() {
    console.log('Mock GitHub signin');
    return { data: { user: mockUser }, error: null };
  },

  async signOut() {
    console.log('Mock signout');
    return { error: null };
  },

  async getCurrentUser() {
    return { user: mockUser, error: null };
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    // Simulate immediate authentication
    setTimeout(() => callback('SIGNED_IN', { user: mockUser }), 100);
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
};

export const mockGrokService = {
  async analyzeCode(_code: string, language?: string): Promise<GrokAnalysisResponse> {
    console.log('Mock code analysis:', language);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockAnalysis;
  },

  async analyzeImage(imageFile: File): Promise<GrokAnalysisResponse> {
    console.log('Mock image analysis:', imageFile.name);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    return mockAnalysis;
  },
};

export const mockReviewService = {
  async createReview(review: Omit<CodeReview, 'id' | 'created_at' | 'updated_at'>) {
    console.log('Mock create review');
    return { data: { ...review, id: 'new-review', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, error: null };
  },

  async getUserReviews(_userId: string) {
    return { data: mockReviews, error: null };
  },

  async getReview(id: string) {
    const review = mockReviews.find(r => r.id === id);
    return { data: review, error: review ? null : new Error('Review not found') };
  },

  async deleteReview(id: string) {
    console.log('Mock delete review:', id);
    return { error: null };
  },
};
