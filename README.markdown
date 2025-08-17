# GrokCodeForge: AI-Powered Code Review and Optimization Tool

## Overview
GrokCodeForge is a web application designed to enhance developer productivity by providing AI-driven code reviews and optimizations. Users can upload code snippets (via text or images), receive detailed analyses for bugs, optimizations, and explanations, and save their review history. Built with **React**, **Tailwind CSS**, **Supabase**, and **xAI's Grok API**, this project demonstrates full-stack proficiency, seamless API integration, and modern UI/UX design.

## ✨ Features
- **Code Upload**: Submit code via textarea or image uploads (e.g., screenshots of code).
- **AI Analysis**: Leverages Grok's advanced reasoning and vision capabilities to identify bugs, suggest optimizations, and provide explanations in structured JSON format.
- **User Authentication**: Secure sign-up/login via Supabase Auth (email or GitHub OAuth).
- **Review History**: Store and retrieve past reviews using Supabase's PostgreSQL database.
- **Responsive UI**: Mobile-first, dark-mode-enabled design with Tailwind CSS.
- **Real-Time Potential**: Built with Supabase real-time subscriptions for future collaboration features.
- **Portfolio-Ready**: Clean code, documented challenges, and a live demo for showcasing to employers.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19.0 or higher
- npm or yarn package manager
- Supabase account and project
- Grok API key from xAI

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TheBrandonDelgado/grok-code-forge.git
   cd grok-code-forge
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Copy `env.example` to `.env` and fill in your credentials:
   ```bash
   cp env.example .env
   ```
   
   Add your configuration:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROK_API_KEY=your_grok_api_key
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 🏗️ Project Structure
```
src/
├── components/
│   ├── Auth.tsx              # Authentication UI (login/signup)
│   ├── UploadForm.tsx        # Code upload form with drag & drop
│   └── ReviewDisplay.tsx     # AI analysis results display
├── pages/
│   └── Dashboard.tsx         # Main application interface
├── services/
│   ├── supabase.ts           # Supabase client & database operations
│   └── grok.ts               # Grok API integration
├── hooks/
│   └── useAuth.tsx           # Authentication context & hooks
├── types/
│   └── index.ts              # TypeScript type definitions
└── App.tsx                   # Main app with routing
```

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Create a `code_reviews` table with the following schema:
   ```sql
   CREATE TABLE code_reviews (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     code_snippet TEXT NOT NULL,
     language TEXT,
     image_url TEXT,
     analysis JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
4. Create a storage bucket called `code-images` for image uploads

### Grok API Setup
1. Visit [x.ai/api](https://x.ai/api) to get your API key
2. Add the key to your `.env` file

## 🎨 UI Features

### Modern Dark Theme
- Professional dark color scheme optimized for code review
- Consistent spacing and typography using Tailwind CSS
- Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach with responsive grid layouts
- Optimized for all screen sizes
- Touch-friendly interface elements

### Interactive Components
- Drag & drop image upload with preview
- Tabbed interface for analysis results
- Real-time form validation and error handling
- Loading states and progress indicators

## 🔒 Security Features
- Protected routes with authentication guards
- Secure API key handling (client-side for MVP)
- User session management
- Input validation and sanitization

## 🚧 Current Status
✅ **Completed**:
- Complete UI implementation with modern design
- Authentication system (email + GitHub OAuth)
- Code upload form with image support
- AI analysis display with tabbed interface
- Responsive layout and dark theme
- TypeScript types and interfaces
- Supabase integration structure

🔄 **In Progress**:
- Database schema implementation
- Review history functionality
- Image storage integration

📋 **Planned**:
- Real-time collaboration features
- GitHub integration
- Analytics dashboard
- Advanced code editor integration

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS 4, React Router 6
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Real-Time)
- **AI**: xAI Grok API (Grok-4 for text analysis, vision for image processing)
- **Build Tools**: Vite, ESLint, PostCSS
- **Deployment**: Ready for Vercel deployment

## 🎯 Key Technical Decisions
- **React with Vite**: Chose Vite for faster development and build times
- **Tailwind CSS**: Utility-first styling for rapid development and consistent design
- **TypeScript**: Full type safety for better development experience
- **Supabase**: All-in-one backend solution for rapid prototyping
- **Component Architecture**: Modular, reusable components with clear separation of concerns

## 🚀 Getting Started with Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Workflow
1. Make changes to components in `src/components/`
2. Update types in `src/types/` if needed
3. Test authentication flow
4. Verify responsive design on different screen sizes
5. Check TypeScript compilation

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support
If you encounter any issues:
1. Check the environment variables are set correctly
2. Verify Supabase project configuration
3. Ensure Grok API key is valid
4. Check browser console for errors

## 🌟 Portfolio Showcase
This project demonstrates:
- Modern React development with TypeScript
- Professional UI/UX design skills
- Full-stack application architecture
- AI integration capabilities
- Authentication and security implementation
- Responsive design principles
- Clean, maintainable code structure

Perfect for showcasing to potential employers as a demonstration of full-stack development capabilities!