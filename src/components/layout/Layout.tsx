import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const noFooterRoutes = ['/login', '/signup', '/forgot-password'];
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-nexzen-bg text-nexzen-text">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1 pt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer />}
    </div>
  );
}
