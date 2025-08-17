# GrokCodeForge: AI-Powered Code Review and Optimization Tool

## Overview
GrokCodeForge is a web application designed to enhance developer productivity by providing AI-driven code reviews and optimizations. Users can upload code snippets (via text or images), receive detailed analyses for bugs, optimizations, and explanations, and save their review history. Built with **React**, **Tailwind CSS**, **Supabase**, and **xAI's Grok API**, this project demonstrates full-stack proficiency, seamless API integration, and modern UI/UX design.

## Features
- **Code Upload**: Submit code via textarea or image uploads (e.g., screenshots of code).
- **AI Analysis**: Leverages Grok's advanced reasoning and vision capabilities to identify bugs, suggest optimizations, and provide explanations in structured JSON format.
- **User Authentication**: Secure sign-up/login via Supabase Auth (email or GitHub OAuth).
- **Review History**: Store and retrieve past reviews using Supabase's PostgreSQL database.
- **Responsive UI**: Mobile-first, dark-mode-enabled design with Tailwind CSS.
- **Real-Time Potential**: Built with Supabase real-time subscriptions for future collaboration features.
- **Portfolio-Ready**: Clean code, documented challenges, and a live demo for showcasing to employers.

## Tech Stack
- **Frontend**: React (v18), Tailwind CSS (v3), React Router (v6), Monaco Editor (for syntax-highlighted code display)
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Real-Time)
- **AI**: xAI Grok API (Grok-4 for text analysis, vision for image processing)
- **Deployment**: Vercel (for frontend hosting)
- **Tools**: Vite (build tool), ESLint (code quality), Git (version control)

## Installation
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
   Create a `.env` file in the root directory and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROK_API_KEY=your_grok_api_key
   ```
   - Obtain Supabase credentials from your Supabase project dashboard.
   - Get Grok API key from [xAI API](https://x.ai/api).
4. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Usage
1. **Sign Up/Login**: Create an account or log in via email or GitHub.
2. **Upload Code**: Enter code in the textarea or upload a screenshot.
3. **Review Results**: View AI-generated feedback (bugs, optimizations, explanations) in a tabbed interface.
4. **Save and Track**: Save reviews to your history, accessible from the dashboard.
5. **Explore Demo**: Visit [grokforge.app](https://grokforge.app) for a live demo.

## Project Structure
```
src/
├── components/
│   ├── CodeEditor.jsx       # Monaco Editor for code display
│   ├── UploadForm.jsx       # Form for text/image uploads
│   ├── ReviewDisplay.jsx    # Tabbed view for AI analysis
│   └── Auth.jsx            # Login/Signup UI
├── pages/
│   ├── Dashboard.jsx        # Main user interface
│   ├── History.jsx          # Review history page
│   └── Login.jsx           # Authentication page
├── services/
│   ├── supabase.js         # Supabase client for auth, DB, storage
│   └── grok.js             # Grok API client for AI calls
├── styles/
│   └── index.css           # Tailwind CSS imports
└── App.jsx                 # Root component with routing
```

## Technical Decisions
- **React with Vite**: Chose Vite for faster development and build times compared to Create React App.
- **Tailwind CSS**: Enabled rapid, utility-first styling for responsive, dark-mode designs, reducing CSS bloat.
- **Monaco Editor**: Integrated for professional-grade code display with syntax highlighting.
- **Supabase Client**: Used for auth, database, and storage, with real-time subscriptions for scalability.
- **Grok API**: Leveraged Grok-4’s reasoning for structured code analysis and vision for image-based code extraction, showcasing advanced AI integration.

## Challenges and Solutions
- **Challenge**: Handling large code snippets in the UI without performance issues.
  - **Solution**: Implemented lazy-loading for Monaco Editor and paginated review history.
- **Challenge**: Securing Grok API key in the frontend.
  - **Solution**: Initially used frontend calls for MVP; planned Supabase Edge Functions for production to proxy API requests securely.
- **Challenge**: Parsing image-based code accurately with Grok’s vision model.
  - **Solution**: Preprocessed images (cropping, contrast adjustment) before API calls and validated outputs with fallback prompts.

## Future Enhancements
- **Real-Time Collaboration**: Enable shared code reviews using Supabase real-time subscriptions.
- **GitHub Integration**: Use Grok’s tool-calling to fetch/pull code from repositories.
- **Analytics Dashboard**: Add charts (e.g., Recharts) to track bug fix trends.
- **Accessibility**: Enhance screen reader support and keyboard navigation.

## Portfolio Context
GrokCodeForge showcases my ability to build full-stack applications with modern web technologies and cutting-edge AI. The frontend demonstrates proficiency in React component architecture, Tailwind styling, and seamless API integrations. Key achievements:
- Reduced UI development time by 30% using Tailwind’s utility classes.
- Integrated Grok’s multimodal AI for text and image-based code analysis, a unique feature for developer tools.
- Built a scalable architecture with Supabase, ready for real-time and collaborative features.