import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const reasons = [
  {
    id: '01',
    badge: 'FLEXIBILITY',
    title: 'All Domains Covered',
    desc: 'Web, AI/ML, IoT, Blockchain, Data Science, Mobile — whatever your domain, we engineer it specifically for your exact requirements.',
    features: ['Hardware & IoT Integration', 'Web & Mobile Platforms', 'AI/ML & Automation Models'],
    actionText: 'Explore Domains',
    moreInfo: 'From IoT hardware integrations to full-stack Next.js web applications to Python-based Machine Learning models, our technical stack is virtually unlimited. If it can be coded, we can build it. We maintain dedicated specialists for Blockchain (Solidity/Web3), Mobile (React Native), and advanced Data Science pipelines.'
  },
  {
    id: '02',
    badge: 'PRICING',
    title: 'Outcome-Driven Pricing',
    desc: 'No fixed templates. Every project is unique and scoped accordingly. Affordable for students, heavily scalable for corporate clients.',
    features: ['Fixed Scope & Clear Deliverables', 'Student-Friendly Quotations', 'Enterprise Scaling Options'],
    actionText: 'Get Custom Quote',
    moreInfo: 'We don\'t believe in hidden fees. Once we analyze your requirements, you receive a flat-rate quotation that covers end-to-end development, testing, and deployment. Student projects benefit from specifically subsidized pricing tiers without compromising on architectural quality.'
  },
  {
    id: '03',
    badge: 'REACH',
    title: 'India & Worldwide',
    desc: 'Based in India, serving globally. We integrate into your time zones seamlessly to provide continuous communication.',
    features: ['Remote-First Execution', '24/7 Asynchronous Updates', 'Global Quality Standards'],
    actionText: 'See Capabilities',
    moreInfo: 'Distance is not a bottleneck. We currently serve universities and independent clients across North America, Europe, and Asia. We utilize robust asynchronous communication channels to ensure rapid updates and milestone deliveries regardless of your local timezone.'
  },
  {
    id: '04',
    badge: 'SPEED',
    title: 'Rapid Deployment',
    desc: 'Submission dates, product demos, or full client launches — we map the bottlenecks and launch solutions in weeks.',
    features: ['Aggressive Deadlines Met', 'Iterative Milestone Drops', 'Zero Deployment Excuses'],
    actionText: 'View Timelines',
    moreInfo: 'We operate on a sprint-based methodology. Standard university projects are typically delivered within 7 to 14 days. Complex enterprise Minimum Viable Products (MVPs) are launched in 4 to 6 weeks. Every deadline is hard-coded into our contract before development begins.'
  },
  {
    id: '05',
    badge: 'QUALITY',
    title: 'Full Documentation',
    desc: 'Every student project ships with complete architectural reports, PPTs, and setup guides. 100% submission-ready.',
    features: ['Comprehensive Code Comments', 'Architectural System Reports', 'Presentation Support (PPTs)'],
    actionText: 'View Samples',
    moreInfo: 'Delivering code isn\'t enough. We provide exhaustive README files, flowcharts, ER diagrams, and system architecture documents formatted to university standards. We ensure you understand your project deeply before your final presentation or tech-review.'
  },
  {
    id: '06',
    badge: 'TOP RANKINGS',
    title: 'SEO & Visibility',
    desc: 'We don\'t just build beautiful websites; we engineer them to dominate Google search results and bring you organic traffic.',
    features: ['Technical SEO Architecture', 'Lightning Fast Core Web Vitals', 'High-Converting Landing Pages'],
    actionText: 'Boost My Ranking',
    moreInfo: 'What makes us come out on top? Clean code, semantic HTML, and zero-bloat Next.js architectures. We guarantee 90+ Lighthouse performance scores, which directly translates to higher Google search rankings and better user retention.'
  }
];

const OutperoCard = ({ r, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass hover-target group"
      style={{
        borderRadius: '16px',
        padding: '2.4rem 2rem',
        background: 'rgba(255, 255, 255, 0.015)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.2)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--mt2)', letterSpacing: '0.1em' }}>REASON {r.id}</span>
        <span style={{ padding: '0.2rem 0.6rem', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '100px', fontSize: '0.65rem', color: 'var(--p)', letterSpacing: '0.05em' }}>{r.badge}</span>
      </div>

      <h3 style={{ fontSize: '1.6rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--c)' }}>{r.title}</h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--mt2)', lineHeight: 1.6, marginBottom: '2.5rem' }}>{r.desc}</p>

      <div style={{ marginTop: 'auto' }}>
        <h4 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--mt)', textTransform: 'uppercase', marginBottom: '1rem' }}>Key Advantages</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {r.features.map((feat, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--tx)' }}>
              <CheckCircle2 size={16} color="var(--p)" strokeWidth={2.5} />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setExpanded(!expanded)} className="hover-target" style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--mt2)', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--tx)'} onMouseLeave={e => e.currentTarget.style.color = expanded ? 'var(--tx)' : 'var(--mt2)'}>
          {expanded ? "Close Details" : r.actionText} <ArrowRight size={16} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} style={{ overflow: 'hidden' }}>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--tx)' }}>Extended Details</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--mt)', lineHeight: 1.6 }}>{r.moreInfo}</p>
                {r.id === '02' && (
                  <button onClick={() => { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} style={{ marginTop: '1rem', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.4)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Jump to Quote Form <ArrowRight size={14} />
                  </button>
                )}
                {r.id === '06' && (
                  <a href="https://wa.me/917416636417" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '1rem', background: 'var(--p)', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', alignItems: 'center', gap: '0.5rem' }}>
                    Message on WhatsApp <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

const WhyUs = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="why" style={{ padding: '8rem 5vw', background: 'var(--bg)' }} ref={ref}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--p)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>
          Why Choose Us
          <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--c)' }}>
          Six distinct assurances.<br />Each guarantees your outcome.
        </h2>
        <p style={{ color: 'var(--mt2)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
          We don't build tech for the sake of it. If a project doesn't solve your exact problem, we won't recommend pursuing it.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {reasons.map((r, i) => (
          <OutperoCard key={r.id} r={r} index={i} />
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
