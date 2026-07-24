import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '2.5rem 5vw', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'rgba(5, 5, 5, 0.6)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>
          H<span style={{ color: '#fbbf24' }}>𝕆𝕄</span>IES
        </div>
        <div style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.45em', color: '#fff', marginTop: '0.2rem', marginRight: '-0.45em', fontFamily: "'DM Sans', sans-serif" }}>
          STUDIO
        </div>
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--mt)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>&copy; {new Date().getFullYear()} Homies Studio &mdash; Built to defy limits.</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <a href="/privacy" style={{ color: 'var(--mt)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--c)'} onMouseLeave={e => e.currentTarget.style.color=''}>Privacy Policy</a>
        <a href="/terms" style={{ color: 'var(--mt)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--c)'} onMouseLeave={e => e.currentTarget.style.color=''}>Terms of Service</a>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="#" className="hover-target" style={{ color: 'var(--mt)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--c)'} onMouseLeave={e => e.currentTarget.style.color=''}>Instagram</a>
        <a href="#" className="hover-target" style={{ color: 'var(--mt)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--c)'} onMouseLeave={e => e.currentTarget.style.color=''}>LinkedIn</a>
        <a href="https://wa.me/917416636417" target="_blank" rel="noreferrer" className="hover-target" style={{ color: 'var(--mt)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--c)'} onMouseLeave={e => e.currentTarget.style.color=''}>WhatsApp</a>
      </div>
    </footer>
  );
};

export default Footer;
