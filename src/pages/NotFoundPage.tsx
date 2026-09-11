import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-center relative z-10 max-w-lg">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center shadow-glow">
            <Zap size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black gradient-text">NEXZEN</span>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-8xl font-black gradient-text mb-4 leading-none">404</motion.p>
        <h1 className="text-2xl font-bold text-nexzen-text mb-3">Page not found</h1>
        <p className="text-nexzen-muted mb-8">
          Looks like this page got lost in the hackathon frenzy. Let's get you back on track.
        </p>

        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" icon={<Home size={16} />}>Go Home</Button>
          </Link>
          <Button variant="secondary" size="lg" icon={<ArrowLeft size={16} />} onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
