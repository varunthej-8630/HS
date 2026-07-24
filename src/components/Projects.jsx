import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

const projects = [
  { num: '01', icon: '🤖', cat: 'Student Project · AI/ML', name: 'AI STUDY ASSISTANT', desc: 'An intelligent study companion powered by LLMs that summarizes notes, generates quizzes, and answers academic queries instantly.', chips: ['💬 LLM Powered', '📚 Quiz Generator', '🧠 Note Summarizer', '🎓 IEEE Standard'], color: '#a855f7' },
  { num: '02', icon: '✋', cat: 'Student Project · Vision', name: 'HAND GESTURE CONTROLLER', desc: 'Navigate your computer system using high-precision real-time hand gesture recognition powered by computer vision.', chips: ['👁️ Computer Vision', '📷 Real-time CV', '🖥️ System Control', '🎓 Complete Docs'], color: '#10b981' },
  { num: '03', icon: '🛒', cat: 'Website Development', name: 'B2B E-COMMERCE PLATFORM', desc: 'A full-stack, highly scalable e-commerce website with razorpay integration, dynamic cart, and SEO-optimized product pages.', chips: ['🌐 Next.js & React', '💳 Razorpay', '📈 SEO Optimized', '🚀 High Performance'], color: '#ef4444' },
  { num: '04', icon: '🌐', cat: 'Website Development', name: 'PREMIUM PORTFOLIO UI', desc: 'Next-gen portfolio with smooth WebGL transitions, glassmorphism, and high-end animations designed for elite creators.', chips: ['🎨 WebGL transitions', '✨ Glassmorphism', '📱 Fully Responsive', '🥇 Ranks on Top'], color: '#3b82f6' },
  { num: '05', icon: '⚡', cat: 'Automation / AI', name: 'INSTAGRAM AUTOMATION TOOL', desc: 'Boost your social presence with autonomous engagement, smart scheduling, and AI-driven hashtag analytics.', chips: ['📅 Smart Scheduler', '🤖 Auto Engagement', '#️⃣ Hashtag AI', '📊 Analytics'], color: '#ec4899' },
  { num: '06', icon: '📝', cat: 'Student Project · Gen AI', name: 'RESUME BUILDER AI', desc: 'Generate ATS-optimized resumes in seconds using AI that analyzes your career path and suggests high-impact keywords.', chips: ['🎯 ATS Optimized', '🤖 AI-Powered', '🎓 IEEE Format', '⚡ In Seconds'], color: '#06b6d4' }
];

const ProjectCard = ({ p }) => {
  const [ex, setEx] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) setEx(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={cardRef} className="hover-target" data-cursor="project" style={{
      position: 'relative', width: '85vw', maxWidth: '360px', height: '460px', flexShrink: 0, borderRadius: '28px', scrollSnapAlign: 'start',
      perspective: '1000px'
    }} onClick={() => setEx(!ex)}>
      
      {p.chips.map((chip, i) => {
        const positions = [
          { x: -140, y: -100, r: -5 },
          { x: 140, y: -90, r: 5 },
          { x: -130, y: 100, r: 6 },
          { x: 130, y: 110, r: -4 }
        ];
        return (
          <motion.div key={i} animate={ex ? { opacity: 1, x: positions[i].x, y: positions[i].y, rotate: positions[i].r, scale: 1 } : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              position: 'absolute', top: '50%', left: '50%', marginLeft: '-60px', marginTop: '-15px',
              background: 'rgba(5, 5, 5, 0.88)', border: `1px solid ${p.color}55`, color: p.color,
              backdropFilter: 'blur(14px)', borderRadius: '14px', padding: '0.45rem 1rem', fontSize: '0.72rem', whiteSpace: 'nowrap', zIndex: 10, pointerEvents: 'none'
            }}>
            {chip}
          </motion.div>
        );
      })}

      <motion.div animate={ex ? { scale: 0.93, borderColor: `${p.color}99`, boxShadow: `0 0 20px ${p.color}33, 0 40px 80px rgba(0,0,0,0.8)` } : { scale: 1, borderColor: 'rgba(255,255,255,0.08)', boxShadow: 'none' }}
        style={{
          width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.038)', borderRadius: '28px', padding: '2.2rem', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)'
        }}>
        <div style={{ position: 'absolute', top: '1.2rem', right: '1.8rem', fontFamily: "'Syncopate', sans-serif", fontSize: '5.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1, zIndex: 1 }}>{p.num}</div>
        <motion.span animate={ex ? { scale: 1.35, rotate: -10 } : { scale: 1, rotate: 0 }} style={{ fontSize: '3.2rem', marginBottom: '0.8rem', position: 'relative', zIndex: 2, display: 'block', transformOrigin: 'bottom left' }}>{p.icon}</motion.span>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.color, marginBottom: '0.4rem', position: 'relative', zIndex: 2 }}>{p.cat}</div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '0.8rem', position: 'relative', zIndex: 2, color: 'var(--c)' }}>{p.name.split('<br>').map((l, i) => <React.Fragment key={i}>{l}<br/></React.Fragment>)}</h3>
        <motion.p animate={ex ? { opacity: 1, height: 'auto', marginTop: '0.5rem' } : { opacity: 0, height: 0, marginTop: 0 }} style={{ fontSize: '0.82rem', color: 'var(--mt2)', lineHeight: 1.65, position: 'relative', zIndex: 2 }}>{p.desc}</motion.p>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollRef = useRef(null);
  
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => { isDownRef.current = false; };
  const handleMouseUp = () => { isDownRef.current = false; };
  const handleMouseMove = (e) => {
    if (!isDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section id="projects" className="rv" style={{ padding: '8rem 0 0' }} ref={ref}>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8 }} style={{ padding: '0 5vw' }}>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--p)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>Our Work
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--c)' }}>
          Projects That<br /><span className="gr-text">Defy Limits</span>
        </h2>
        <p style={{ color: 'var(--mt)', fontSize: '0.8rem', marginTop: '0.8rem', letterSpacing: '0.05em' }}>
          ← Drag to scroll &bull; Click any card to reveal details
        </p>
      </motion.div>

      <div ref={scrollRef} data-cursor="drag" style={{ overflowX: 'auto', overflowY: 'visible', scrollbarWidth: 'none', cursor: 'none', padding: '3rem 5vw 3rem', scrollSnapType: 'x mandatory' }}
        onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
        <div style={{ display: 'flex', gap: '2rem', width: 'max-content' }}>
          {projects.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ margin: '0 5vw 4rem', padding: '3.5rem 2rem', background: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.2)', borderRadius: '24px', textAlign: 'center', boxShadow: '0 0 40px rgba(124, 58, 237, 0.1)', backdropFilter: 'blur(10px)' }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--tx)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Don't see your domain? We build anything.</h3>
        <p style={{ color: 'var(--mt2)', marginBottom: '2rem', fontSize: '0.95rem' }}>All domains covered — just tell us your idea.</p>
        <a href="https://wa.me/917416636417" target="_blank" rel="noreferrer" className="hover-target" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.2rem', background: 'var(--p)', color: '#fff', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}>
          Discuss Your Project →
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
