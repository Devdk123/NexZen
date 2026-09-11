# Nexzen

Nexzen is a responsive hackathon and event discovery platform for student builders.

## Features
- Responsive landing page for desktop, tablet, and mobile
- Hackathon and event discovery UI
- Team, profile, and application flows
- Supabase-ready backend integration
- Framer Motion animations and polished glassmorphism styling

## Quick start

1. Install dependencies:
   npm install
2. Copy environment variables:
   cp .env.example .env
3. Add your Supabase values:
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
4. Run locally:
   npm run dev

## Production build

npm run build

## Supabase setup

Create a Supabase project and add the following tables as needed:
- profiles
- hackathons
- events
- applications
- teams

Then add this environment file with your project credentials.
