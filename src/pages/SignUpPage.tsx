import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { isValidEmail, isValidPhone } from '../utils';

function PasswordStrength({ password }: { password: string }) {
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const textColors = ['', 'text-red-400', 'text-yellow-400', 'text-blue-400', 'text-green-400'];
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1,2,3,4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : 'bg-white/10'}`} />
        ))}
      </div>
      <p className={`text-xs ${textColors[strength]}`}>{labels[strength]}</p>
    </div>
  );
}

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, signInWithGoogle } = useAuth();
  const { error: toastError, success } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!email) e.email = 'Email is required';
    else if (!isValidEmail(email)) e.email = 'Enter a valid email';
    if (!mobile) e.mobile = 'Mobile number is required';
    else if (!isValidPhone(mobile)) e.mobile = 'Enter a valid 10-digit mobile number';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) e.terms = 'You must agree to the Terms & Privacy Policy';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await signup({ fullName, email, password, confirmPassword, mobile });
      success('Account created!', 'Welcome to NEXZEN.');
      navigate('/dashboard');
    } catch (err: any) {
      toastError('Sign up failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      success('Welcome to NEXZEN!');
      navigate('/dashboard');
    } catch {
      toastError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexzen-bg flex relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg"
        >
          <div className="glass-strong rounded-2xl border border-white/10 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-nexzen-text">Create your account</h2>
              <p className="text-nexzen-muted text-sm mt-1">Join 1M+ students on India's #1 hackathon platform.</p>
            </div>

            <button onClick={handleGoogle} disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-nexzen-text mb-6 disabled:opacity-50">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8" /></div>
              <div className="relative flex justify-center"><span className="bg-nexzen-surface px-3 text-xs text-nexzen-subtle">or sign up with email</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Full Name <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aryan Kapoor" autoComplete="name"
                    className={`input-base pl-10 ${errors.fullName ? 'border-red-500/50' : ''}`} />
                </div>
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Email <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" autoComplete="email"
                    className={`input-base pl-10 ${errors.email ? 'border-red-500/50' : ''}`} />
                </div>
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Mobile <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210" autoComplete="tel"
                    className={`input-base pl-10 ${errors.mobile ? 'border-red-500/50' : ''}`} />
                </div>
                {errors.mobile && <p className="text-xs text-red-400 mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Password <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
                    className={`input-base pl-10 pr-10 ${errors.password ? 'border-red-500/50' : ''}`} />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-nexzen-subtle hover:text-nexzen-muted">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={password} />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Confirm Password <span className="text-nexzen-accent">*</span></label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                  <input type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password"
                    className={`input-base pl-10 ${errors.confirmPassword ? 'border-red-500/50' : ''}`} />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-nexzen-accent flex-shrink-0" />
                  <span className="text-xs text-nexzen-muted">
                    I agree to NEXZEN's{' '}
                    <Link to="/terms" className="text-nexzen-accent hover:underline">Terms of Service</Link>{' '}and{' '}
                    <Link to="/privacy" className="text-nexzen-accent hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-red-400 mt-1">{errors.terms}</p>}
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} iconRight={!loading ? <ArrowRight size={16} /> : undefined}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-nexzen-muted mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-nexzen-accent hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
