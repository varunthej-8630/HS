import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [docExpanded, setDocExpanded] = useState(false);
  const [clientExpanded, setClientExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const docFeatures = [
    { title: "IEEE STANDARD REPORT", stat: "60+ Pages", desc: "40–60 pages including Abstract, Literature Survey, Methodology, Results, and References.", icon: "📄" },
    { title: "PROFESSIONAL PPT", stat: "35 Slides", desc: "25–35 high-end slides including Problem Statement, System Design, and Results Analysis.", icon: "🖥️" },
    { title: "PLAGIARISM REPORT", stat: "<15% Similarity", desc: "Guaranteed <15% similarity. Clean, original research for top marks.", icon: "✅" },
    { title: "VIVA GUIDE", stat: "Quick Prep", desc: "10 most critical questions + answers to help you ace your defense.", icon: "🎓" },
    { title: "CONFERENCE ABSTRACT", stat: "FREE", desc: "250-word conference-ready abstract. Free with all projects.", icon: "⭐", free: true }
  ];

  const clientFeatures = [
    { title: "CUSTOM SCOPE & DELIVERABLES", stat: "100% Tailored", desc: "Every project starts with a defined scope — tasks, deliverables, timelines, and exclusions — all documented in writing before work begins.", icon: "📋" },
    { title: "NDA & CONFIDENTIALITY", stat: "2-Year Protection", desc: "Full Non-Disclosure Agreement included. Your business data, ideas, and trade secrets are legally protected for 2 years post-contract.", icon: "🔒" },
    { title: "FULL IP OWNERSHIP", stat: "On Full Payment", desc: "All code, designs, and assets become 100% your property upon final payment. Work-for-hire model with irrevocable assignment of rights.", icon: "⚖️" },
    { title: "WORLDWIDE CLIENTS", stat: "India · USA · UK · UAE · SG", desc: "Contracts adapted for India, USA, UK/Europe, Singapore, and UAE jurisdictions. Payments via Wire Transfer, Wise, PayPal, Crypto, or UPI.", icon: "🌍", highlight: true },
    { title: "MILESTONE-BASED DELIVERY", stat: "Structured Payments", desc: "Payments split across milestones — deposit, progress payments, final on approval. 5 business days review window per milestone.", icon: "🏁" },
    { title: "CHANGE ORDERS & SUPPORT", stat: "Zero Surprises", desc: "All scope changes are documented in written Change Orders. No surprise costs. Post-delivery support available at agreed hourly rates.", icon: "🛡️" }
  ];

  return (
    <section id="services" className="rv" style={{ padding: '8rem 5vw', background: 'radial-gradient(ellipse at 20% 50%, rgba(251, 191, 36, 0.05) 0%, transparent 55%)' }} ref={ref}>

      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={cardVariants}>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--p)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>Our Services
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--c)' }}>
          Two Wings,<br /><span className="gr-text">One Powerhouse</span>
        </h2>
        <p style={{ color: 'var(--mt2)', maxWidth: '520px', lineHeight: 1.75, fontSize: '0.92rem' }}>
          Whether you're a student racing towards submission day or a business ready to scale — we cover everything under one roof.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.8rem', marginTop: '4rem', alignItems: 'start' }}>
        {/* Card 1 */}
        <motion.div className="glass hover-target" initial="hidden" animate={inView ? "visible" : "hidden"} variants={cardVariants} style={{
          borderRadius: '28px', padding: '2.8rem', position: 'relative', overflow: 'hidden', transition: 'all 0.4s'
        }} onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(251,191,36,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor='' }}>
          <div style={{ position: 'absolute', top: '1.8rem', right: '2.2rem', fontFamily: "'Syncopate', sans-serif", fontSize: '5rem', fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>01</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div className="clay" style={{ width: '62px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem', background: 'linear-gradient(145deg, rgba(251, 191, 36, 0.4), rgba(251, 191, 36, 0.1))' }}>🎓</div>
            <div style={{ background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.4)', borderRadius: '100px', padding: '0.4rem 0.8rem', fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600, letterSpacing: '0.02em', zIndex: 2 }}>A+ Documentation · 90% of marks come from it</div>
          </div>
          
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--c)' }}>STUDENT PROJECTS</h3>
          <p style={{ color: 'var(--mt2)', lineHeight: 1.75, marginBottom: '1.8rem', fontSize: '0.9rem' }}>From concept to final submission — complete, documented, and presentation-ready projects across all engineering domains. Guided support every step of the way.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Final Year', 'Mini Projects', 'All Domains', 'AI / ML', 'IoT', 'Web Dev', 'Documentation'].map(t => <span key={t} style={{ padding: '0.28rem 0.85rem', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.72rem', color: 'var(--mt2)' }}>{t}</span>)}
          </div>

          <button onClick={() => setDocExpanded(!docExpanded)} style={{ background: 'none', border: 'none', color: 'var(--p)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="hover-target">
            {docExpanded ? "Hide Documentation Details" : "View What's Included →"}
          </button>

          <AnimatePresence>
            {docExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} style={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.2rem', color: 'var(--tx)' }}>Documentation Package</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {docFeatures.map((f, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: f.free ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, background: f.free ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.1)', color: f.free ? '#fbbf24' : 'var(--mt2)', padding: '0.2rem 0.5rem', borderRadius: '100px', letterSpacing: '0.05em' }}>{f.stat}</span>
                        </div>
                        <h5 style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--c)' }}>{f.title}</h5>
                        <p style={{ fontSize: '0.75rem', color: 'var(--mt)', lineHeight: 1.5 }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="hover-target" style={{ width: '100%', marginTop: '1.5rem', background: 'var(--p)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.3s' }}>
                    Start Your Documentation →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Card 2 */}
        <motion.div className="glass hover-target sc2" initial="hidden" animate={inView ? "visible" : "hidden"} variants={cardVariants} style={{
          borderRadius: '28px', padding: '2.8rem', position: 'relative', overflow: 'hidden', transition: 'all 0.4s'
        }} onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(6, 182, 212, 0.4)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor='' }}>
          <div style={{ position: 'absolute', top: '1.8rem', right: '2.2rem', fontFamily: "'Syncopate', sans-serif", fontSize: '5rem', fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>02</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div className="clay" style={{ width: '62px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem', background: 'linear-gradient(145deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.1))' }}>💼</div>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '100px', padding: '0.4rem 0.8rem', fontSize: '0.7rem', color: 'var(--c)', fontWeight: 600, letterSpacing: '0.02em', zIndex: 2 }}>Full IP Ownership · NDA Protected · Worldwide</div>
          </div>
          
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--c)' }}>WEBSITE DEVELOPMENT & B2B AI</h3>
          <p style={{ color: 'var(--mt2)', lineHeight: 1.75, marginBottom: '1.8rem', fontSize: '0.9rem' }}>High-performance websites designed to rank on top of Google, AI automation agents, and digital solutions for businesses worldwide.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Web Development', 'AI Agents', 'Automation', 'E-Commerce', 'SaaS', 'India & Abroad', 'Custom Quote'].map(t => <span key={t} style={{ padding: '0.28rem 0.85rem', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.72rem', color: 'var(--mt2)' }}>{t}</span>)}
          </div>

          <button onClick={() => setClientExpanded(!clientExpanded)} style={{ background: 'none', border: 'none', color: 'var(--c)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="hover-target">
            {clientExpanded ? "Hide Client Solution Details" : "View What's Included →"}
          </button>

          <AnimatePresence>
            {clientExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} style={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.2rem', color: 'var(--tx)' }}>B2B Features</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {clientFeatures.map((f, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: f.highlight ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, background: f.highlight ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.1)', color: f.highlight ? 'var(--c)' : 'var(--mt2)', padding: '0.2rem 0.5rem', borderRadius: '100px', letterSpacing: '0.05em' }}>{f.stat}</span>
                        </div>
                        <h5 style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--tx)' }}>{f.title}</h5>
                        <p style={{ fontSize: '0.75rem', color: 'var(--mt)', lineHeight: 1.5 }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    <span style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--c)', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 600 }}>14-Day Breach Remedy Window</span>
                    <span style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--c)', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 600 }}>30-Day Termination Notice</span>
                    <span style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--c)', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 600 }}>GDPR Compliant for EU Clients</span>
                    <span style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--c)', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 600 }}>Source Code Escrow Available</span>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mt)', marginBottom: '0.8rem' }}>Accepted Payments</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {['UPI', 'Wire Transfer', 'Wise', 'PayPal', 'Crypto'].map(pay => (
                        <span key={pay} style={{ fontSize: '0.75rem', fontFamily: 'monospace', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--mt2)' }}>
                          {pay}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="hover-target" style={{ width: '100%', background: 'linear-gradient(145deg, #0891b2, #06b6d4)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'box-shadow 0.3s', boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>
                    Start a Client Project →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
