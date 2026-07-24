import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    num: "01",
    title: "DISCUSS & QUOTE",
    icon: "💬",
    desc: "Tell us your project. We give you a custom quote within 24 hours. No fixed pricing — every project is unique."
  },
  {
    num: "02",
    title: "50% ADVANCE, START BUILD",
    icon: "🔨",
    desc: "Pay 50% advance to lock in your slot. We begin immediately. Full ownership of code transfers on final payment."
  },
  {
    num: "03",
    title: "DELIVER & SUPPORT",
    icon: "🚀",
    desc: "Receive source code, report, demo video, and PPT. Includes 2 free revision rounds and 7 days of free bug-fix support."
  }
];

const HowWeWork = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="how-it-works" className="rv" style={{ padding: '8rem 5vw', background: 'var(--bg)' }} ref={ref}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--p)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>
          Complete Transparency
          <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--c)' }}>
          How We Work.
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {steps.map((step, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="hover-target"
            style={{
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>{step.num}</div>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{step.icon}</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--tx)' }}>{step.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--mt2)', lineHeight: 1.6 }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}
      >
        <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--mt2)' }}>2 Free Revisions Included</span>
        <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--mt2)' }}>7-Day Free Bug Support</span>
        <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--mt2)' }}>Code Ownership After Full Payment</span>
        <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--mt2)' }}>Non-Refundable Advance After Work Starts</span>
      </motion.div>
    </section>
  );
};

export default HowWeWork;
