import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, type ReactNode } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { ToastProvider } from './components/ui/Toast';
import { Layout } from './components/layout/Layout';
import { PageSkeleton } from './components/ui/Skeleton';
import { useAuth } from './context/AuthContext';

// ─── Lazy-loaded pages ───────────────────────────────────────────────────────
const LandingPage         = lazy(() => import('./pages/LandingPage'));
const LoginPage           = lazy(() => import('./pages/LoginPage'));
const SignUpPage          = lazy(() => import('./pages/SignUpPage'));
const ForgotPasswordPage  = lazy(() => import('./pages/ForgotPasswordPage'));
const HackathonsPage      = lazy(() => import('./pages/HackathonsPage'));
const HackathonDetailPage = lazy(() => import('./pages/HackathonDetailPage'));
const ApplyPage           = lazy(() => import('./pages/ApplyPage'));
const EventsPage          = lazy(() => import('./pages/EventsPage'));
const EventDetailPage     = lazy(() => import('./pages/EventDetailPage'));
const SponsorsPage        = lazy(() => import('./pages/SponsorsPage'));
const DashboardPage       = lazy(() => import('./pages/DashboardPage'));
const ProfilePage         = lazy(() => import('./pages/ProfilePage'));
const EditProfilePage     = lazy(() => import('./pages/EditProfilePage'));
const MyApplicationsPage  = lazy(() => import('./pages/MyApplicationsPage'));
const MyTeamsPage         = lazy(() => import('./pages/MyTeamsPage'));
const SavedHackathonsPage = lazy(() => import('./pages/SavedHackathonsPage'));
const CreateTeamPage      = lazy(() => import('./pages/CreateTeamPage'));
const JoinTeamPage        = lazy(() => import('./pages/JoinTeamPage'));
const AboutPage           = lazy(() => import('./pages/AboutPage'));
const ContactPage         = lazy(() => import('./pages/ContactPage'));
const FAQPage             = lazy(() => import('./pages/FAQPage'));
const TermsPage           = lazy(() => import('./pages/TermsPage'));
const PrivacyPage         = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage         = lazy(() => import('./pages/CookiesPage'));
const NotFoundPage        = lazy(() => import('./pages/NotFoundPage'));

// ─── Route Guards ────────────────────────────────────────────────────────────
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// ─── Routes ──────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<Layout />}>
          {/* ── Public ─────────────────────────────────── */}
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
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/404" element={<NotFoundPage />} />

          {/* ── Auth (redirect if logged in) ───────────── */}
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><SignUpPage /></AuthRoute>} />
          <Route path="/forgot-password" element={<AuthRoute><ForgotPasswordPage /></AuthRoute>} />

          {/* ── Apply (allow without login, handled in page) */}
          <Route path="/hackathons/:slug/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />

          {/* ── Protected ───────────────────────────────── */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
          <Route path="/my/applications" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
          <Route path="/my/teams" element={<ProtectedRoute><MyTeamsPage /></ProtectedRoute>} />
          <Route path="/my/saved" element={<ProtectedRoute><SavedHackathonsPage /></ProtectedRoute>} />
          <Route path="/teams/create" element={<ProtectedRoute><CreateTeamPage /></ProtectedRoute>} />
          <Route path="/teams/join" element={<ProtectedRoute><JoinTeamPage /></ProtectedRoute>} />

          {/* ── Catch-all ───────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <NotificationsProvider>
            <AppRoutes />
          </NotificationsProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
