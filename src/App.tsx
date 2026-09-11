import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, type ReactNode } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { ToastProvider } from './components/ui/Toast';
import { Layout } from './components/layout/Layout';
import { PageSkeleton } from './components/ui/Skeleton';
import { useAuth } from './context/AuthContext';
import { getSupabaseSetupHint } from './lib/supabase';

const createPage = (title: string) => () => {
  const setupHint = getSupabaseSetupHint();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass rounded-3xl border border-white/10 p-6 md:p-10 shadow-card-hover">
        <p className="text-xs uppercase tracking-[0.24em] text-nexzen-accent">Nexzen</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-nexzen-muted sm:text-base">
          This page is ready for real product features. Connect your Supabase project using the environment variables to enable backend-powered data and auth.
        </p>
        {setupHint && (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            {setupHint}
          </div>
        )}
      </div>
    </div>
  );
};

const LandingPage = createPage('Welcome to Nexzen');
const HackathonsPage = createPage('Hackathons');
const HackathonDetailPage = createPage('Hackathon Details');
const EventsPage = createPage('Events');
const EventDetailPage = createPage('Event Details');
const LoginPage = createPage('Login');
const SignUpPage = createPage('Sign Up');
const ForgotPasswordPage = createPage('Reset Password');
const ProfilePage = createPage('Profile');
const EditProfilePage = createPage('Edit Profile');
const ApplyPage = createPage('Apply to Hackathon');
const CreateTeamPage = createPage('Create Team');
const JoinTeamPage = createPage('Join Team');
const MyApplicationsPage = createPage('My Applications');
const MyTeamsPage = createPage('My Teams');
const SavedHackathonsPage = createPage('Saved Hackathons');
const DashboardPage = createPage('Dashboard');
const SponsorsPage = createPage('Sponsors');
const AboutPage = createPage('About');
const ContactPage = createPage('Contact');
const FAQPage = createPage('FAQ');
const TermsPage = createPage('Terms');
const PrivacyPage = createPage('Privacy');
const NotFoundPage = createPage('Page Not Found');

// ─── Protected Route ──────────────────────────────────────
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// ─── Auth Route (redirect if already logged in) ───────────
function AuthRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
          <Route path="/hackathons/:slug" element={<HackathonDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/teams/join" element={<JoinTeamPage />} />

          {/* Auth pages */}
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><SignUpPage /></AuthRoute>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
          <Route path="/hackathons/:slug/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
          <Route path="/teams/create" element={<ProtectedRoute><CreateTeamPage /></ProtectedRoute>} />
          <Route path="/my/applications" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
          <Route path="/my/teams" element={<ProtectedRoute><MyTeamsPage /></ProtectedRoute>} />
          <Route path="/my/saved" element={<SavedHackathonsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
