import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const StatBox = ({ num, text, delay }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(num);
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, num]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.6, delay }}
      className="glass hover-target" style={{ borderRadius: '22px', padding: '2.4rem 1.5rem', textAlign: 'center', transition: 'all 0.4s' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor='var(--p)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='' }}>
      <span className="gr-text" style={{ fontSize: '3.2rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{count}+</span>
      <div style={{ fontSize: '0.78rem', color: 'var(--mt)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{text}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section id="stats" style={{ padding: '6rem 5vw', background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.05) 0%, transparent 60%)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <StatBox num="50" text="Projects Delivered" delay={0} />
        <StatBox num="30" text="Happy Students" delay={0.1} />
        <StatBox num="10" text="Client Projects" delay={0.2} />
        <StatBox num="5" text="Countries Served" delay={0.3} />
      </div>
    </section>
  );
};

export default Stats;
