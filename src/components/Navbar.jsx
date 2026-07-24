import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Folder, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/projects', label: 'Projects', icon: Folder },
    { path: '/contact', label: 'Contact', icon: MessageSquare }
  ];

  return (
    <>
      {/* DESKTOP TOP NAVBAR */}
      <motion.nav 
        className="desktop-top-nav"
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{
          position: 'fixed', 
          top: '1.5rem', 
          left: '50%', 
          width: '92%',
          maxWidth: '1200px',
          zIndex: 1000,
          padding: '0.8rem 1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          backdropFilter: 'blur(30px)', 
          WebkitBackdropFilter: 'blur(30px)',
          background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(15, 15, 15, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '100px',
          boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.2)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img src="/src/assets/icon.png" alt="Homies Studio Logo" style={{ height: '32px', borderRadius: '8px' }} onError={(e) => e.target.style.display='none'} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>
              H<span style={{ color: '#fbbf24' }}>𝕆𝕄</span>IES
            </div>
            <div style={{ fontSize: '0.45rem', fontWeight: 700, letterSpacing: '0.45em', color: '#fff', marginTop: '0.2rem', marginRight: '-0.45em', fontFamily: "'DM Sans', sans-serif" }}>
              STUDIO
            </div>
          </div>
        </Link>
        
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center', margin: 0 }} className="desktop-menu">
          <li><Link to="/services" style={{ color: 'var(--tx)', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'color 0.25s', fontWeight: 600 }} className="hover-target">Services</Link></li>
          <li><Link to="/projects" style={{ color: 'var(--tx)', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'color 0.25s', fontWeight: 600 }} className="hover-target">Projects</Link></li>
          <li><Link to="/services#why" style={{ color: 'var(--tx)', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'color 0.25s', fontWeight: 600 }} className="hover-target">Why Us</Link></li>
          <li><Link to="/contact" className="hover-target" style={{
            background: 'linear-gradient(135deg, var(--p), #fff)',
            WebkitTextFillColor: '#000', color: '#000',
            padding: '0.6rem 1.6rem', borderRadius: '100px', fontWeight: 700,
            boxShadow: '0 0 20px var(--pg)', textDecoration: 'none', fontSize: '0.82rem',
            textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>Get a Quote</Link></li>
        </ul>
      </motion.nav>

      {/* MOBILE BOTTOM NAV PILL */}
      <motion.div
        className="mobile-bottom-nav"
        initial={{ y: 100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          zIndex: 1000,
          background: 'rgba(10, 10, 15, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '100px',
          padding: '0.5rem 0.8rem',
          gap: '0.5rem',
          alignItems: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '100px',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                  boxShadow: isActive ? 'inset 0 2px 10px rgba(255,255,255,0.05)' : 'none',
                  transition: 'all 0.3s ease',
                  minWidth: '64px'
                }}
              >
                <item.icon size={20} color={isActive ? '#fbbf24' : '#64748b'} strokeWidth={isActive ? 2.5 : 2} style={{ marginBottom: '4px', transition: 'color 0.3s ease' }} />
                <span style={{ 
                  fontSize: '0.6rem', 
                  fontWeight: isActive ? 700 : 500, 
                  color: isActive ? '#fff' : '#64748b',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s ease'
                }}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </>
  );
};

export default Navbar;
