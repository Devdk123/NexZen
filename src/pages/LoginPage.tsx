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
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-black gradient-text">NEXZEN</span>
          </div>

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
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4 flex-shrink-0">
                <div className="bg-blue-500 rounded-sm" />
                <div className="bg-red-500 rounded-sm" />
                <div className="bg-yellow-500 rounded-sm" />
                <div className="bg-green-500 rounded-sm" />
              </div>
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
