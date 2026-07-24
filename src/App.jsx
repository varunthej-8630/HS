import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Projects from './components/Projects';
import Stats from './components/Stats';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HowWeWork from './components/HowWeWork';
import PaymentPage from './pages/Payment';
import PrivacyPolicy from './pages/Privacy';
import TermsOfService from './pages/Terms';

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999999, background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ fontSize: 'clamp(4.5rem, 12vw, 9rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.04em', color: 'var(--tx)', lineHeight: 1 }}
          >
            H<span style={{ color: '#fbbf24' }}>𝕆𝕄</span>IES
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginTop: '0.2rem' }}>
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3.2rem)', fontWeight: 500, letterSpacing: '0.45em', color: 'var(--c)', textTransform: 'uppercase' }}
          >
            STUDIO
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <Marquee />
    <Services />
    <Stats />
    <HowWeWork />
    <Contact />
  </>
);

const ProjectsPage = () => (
  <div style={{ paddingTop: '80px' }}>
    <Helmet><title>Projects Portfolio | Best IT Services India | Homies Studio</title></Helmet>
    <Projects />
    <Contact />
  </div>
);

const ServicesPage = () => (
  <div style={{ paddingTop: '80px' }}>
    <Helmet><title>Services | AI & Web Development | Homies Studio</title></Helmet>
    <Services />
    <WhyUs />
    <HowWeWork />
    <Contact />
  </div>
);

const ContactPage = () => (
  <div style={{ paddingTop: '80px' }}>
    <Helmet><title>Contact Us | Best IT Services India | Homies Studio</title></Helmet>
    <Contact />
  </div>
);

function App() {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollWidth(height > 0 ? (scrollY / height) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="spb" style={{ width: `${scrollWidth}%` }}></div>

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
