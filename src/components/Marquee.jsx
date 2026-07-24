import React from 'react';
import { motion } from 'framer-motion';

const items = ["FINAL YEAR PROJECTS", "AI AGENTS", "WEB DEVELOPMENT", "MACHINE LEARNING", "IoT SYSTEMS", "MINI PROJECTS", "CUSTOM PRICING", "INDIA & ABROAD", "AUTOMATION", "BLOCKCHAIN", "DATA SCIENCE", "MOBILE APPS"];

const Marquee = () => {
  return (
    <div style={{ padding: '1.2rem 0', background: 'linear-gradient(90deg, #f59e0b, #d97706, #333, #0a0a0a)', overflow: 'hidden', position: 'relative' }}>
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="hover-target" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {item} <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
