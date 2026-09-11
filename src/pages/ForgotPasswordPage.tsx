import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Zap, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { authService } from '../services/auth';
import { isValidEmail } from '../utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!isValidEmail(email)) { setError('Enter a valid email'); return; }
    setError('');
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexzen-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-black gradient-text">NEXZEN</span>
          </Link>
        </div>

        <div className="glass-strong rounded-2xl border border-white/10 p-8">
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-nexzen-text mb-2">Check your inbox!</h2>
              <p className="text-nexzen-muted text-sm mb-6">
                We've sent a password reset link to <strong className="text-nexzen-text">{email}</strong>. Check your spam folder too.
              </p>
              <Link to="/login">
                <Button variant="secondary" fullWidth icon={<ArrowLeft size={16} />}>Back to Login</Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-nexzen-text">Reset Password</h2>
                <p className="text-nexzen-muted text-sm mt-1">Enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`input-base pl-10 ${error ? 'border-red-500/50' : ''}`} />
                  </div>
                  {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              <div className="mt-5 text-center">
                <Link to="/login" className="text-sm text-nexzen-muted hover:text-nexzen-accent flex items-center justify-center gap-1 transition-colors">
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
