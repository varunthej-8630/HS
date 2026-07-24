import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Hero = () => {
  const goto = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '8rem 5vw 6rem',
      background: 'radial-gradient(ellipse 80% 60% at 70% 10%, rgba(251, 191, 36, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 55%)'
    }}>
      <Helmet>
        <title>Top AI Agency & Website Development Company India | Homies Studio</title>
        <meta name="description" content="Homies Studio is an elite AI Agency & Web Development company in Ongole and Hyderabad, specializing in student projects, React websites, and ML development." />
        <meta name="keywords" content="agency, ai agency, student projects, website development, homies studio, ongole webagency, hyd webagency, hyderabad web agency, top AI agency India, expert website development, ML development, React web agency" />
        <meta property="og:title" content="Top AI Agency & Website Development Company India | Homies Studio" />
        <meta property="og:description" content="Homies Studio is India's best AI agency providing expert website development, custom student projects, ML development, and top-tier data science services." />
        <meta property="og:image" content="/assets/hero.png" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
      }}></div>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div animate={{ translateY: [-40, 40, -40], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '600px', height: '600px', background: 'var(--p)', opacity: 0.1, filter: 'blur(90px)', top: '-200px', right: '-150px', borderRadius: '50%' }} />
        <motion.div animate={{ translateY: [-30, 30, -30], scale: [1, 1.03, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', width: '450px', height: '450px', background: 'var(--c)', opacity: 0.05, filter: 'blur(90px)', bottom: '-150px', left: '-100px', borderRadius: '50%' }} />
      </div>

      <div style={{ textAlign: 'center', maxWidth: '920px', position: 'relative', zIndex: 2 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.25)', padding: '0.4rem 1.3rem', borderRadius: '100px', fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--p)', marginBottom: '2.2rem', backdropFilter: 'blur(10px)' }}>
          <div style={{ width: '7px', height: '7px', background: 'var(--p)', borderRadius: '50%' }}></div>
          Now Accepting Projects — India & Worldwide
        </motion.div>

        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.03em', marginBottom: '1.8rem', color: 'var(--c)' }}>
          <div style={{ overflow: 'hidden' }}><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'block' }}>WE BUILD</motion.span></div>
          <div style={{ overflow: 'hidden' }}><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'block' }} className="gr-text">BEYOND</motion.span></div>
          <div style={{ overflow: 'hidden' }}><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'block' }}>GRAVITY</motion.span></div>
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }}
          style={{ color: 'var(--mt2)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '3rem' }}>
          Student final year projects &middot; Client websites &middot; AI Agents<br />
          All domains. Custom pricing. Zero compromise.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="hover-target" onClick={() => goto('#contact')} style={{
            padding: '0.85rem 2.4rem', background: 'linear-gradient(145deg, #f59e0b, #d97706)', color: '#000', border: 'none', borderRadius: '18px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 600, cursor: 'none', letterSpacing: '0.02em', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, boxShadow 0.2s',
            boxShadow: '0 6px 28px rgba(251, 191, 36, 0.45)'
          }}>🎓 Student Project</button>
          
          <button className="hover-target glass" onClick={() => goto('#contact')} style={{
            padding: '0.85rem 2.4rem', color: 'var(--tx)', borderRadius: '18px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500, cursor: 'none', transition: 'all 0.25s'
          }}>💼 Hire for Client Work</button>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
