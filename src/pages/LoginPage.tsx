import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, CheckCircle, Users, Trophy, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { isValidEmail } from '../utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, signInWithGoogle } = useAuth();
  const { error: toastError, success } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Email is required';
    else if (!isValidEmail(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await login({ email, password, remember });
      success('Welcome back!', 'You have been logged in successfully.');
      navigate('/dashboard');
    } catch (err: any) {
      toastError('Login failed', err.message);
      if (err.field) setErrors({ [err.field]: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      success('Welcome!', 'Signed in with Google.');
      navigate('/dashboard');
    } catch {
      toastError('Google sign-in failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexzen-bg flex relative overflow-hidden">
      {/* Bg orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-center px-12 flex-1 relative z-10">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center shadow-glow">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-2xl font-black gradient-text">NEXZEN</span>
        </Link>
        <h1 className="text-4xl font-extrabold text-nexzen-text mb-4">Welcome back, innovator.</h1>
        <p className="text-nexzen-muted text-lg mb-10">Log in to access your dashboard, track applications, and discover new hackathons.</p>
        <div className="space-y-4">
          {[
            { icon: Trophy, text: '500+ Hackathons to discover' },
            { icon: Users, text: 'Find or create your team instantly' },
            { icon: Star, text: 'Showcase your wins and projects' },
            { icon: CheckCircle, text: 'Track all your applications in one place' },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-nexzen-accent/15 border border-nexzen-accent/30 flex items-center justify-center flex-shrink-0">
                <f.icon size={15} className="text-nexzen-accent" />
              </div>
              <span className="text-nexzen-muted text-sm">{f.text}</span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-nexzen-subtle">Hint: Use <code className="bg-white/10 px-1 py-0.5 rounded">demo@nexzen.in</code> / <code className="bg-white/10 px-1 py-0.5 rounded">password123</code></p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="glass-strong rounded-2xl border border-white/10 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-nexzen-text">Welcome back</h2>
              <p className="text-nexzen-muted text-sm mt-1">Sign in to your account to continue.</p>
            </div>

            {/* Google button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-nexzen-text mb-6 disabled:opacity-50"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8" /></div>
              <div className="relative flex justify-center"><span className="bg-nexzen-surface px-3 text-xs text-nexzen-subtle">or continue with email</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Email <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" autoComplete="email"
                    className={`input-base pl-10 ${errors.email ? 'border-red-500/50' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Password <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input
                    type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password" autoComplete="current-password"
                    className={`input-base pl-10 pr-10 ${errors.password ? 'border-red-500/50' : ''}`}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-nexzen-subtle hover:text-nexzen-muted">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded accent-nexzen-accent" />
                  <span className="text-nexzen-muted">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-nexzen-accent hover:underline text-xs">Forgot password?</Link>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} iconRight={!loading ? <ArrowRight size={16} /> : undefined}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-center text-sm text-nexzen-muted mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-nexzen-accent hover:underline font-medium">Create one free</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
