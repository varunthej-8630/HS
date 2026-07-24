import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '120px', paddingBottom: '4rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif" }}>
      <Helmet>
        <title>Privacy Policy | Homies Studio</title>
        <meta name="description" content="Privacy Policy for Homies Studio. Learn how we handle and protect your data." />
      </Helmet>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5vw' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', color: 'var(--c)' }}>Privacy Policy</h1>
          <div style={{ color: 'var(--mt)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Effective Date: May 2026</p>
            
            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
            <p style={{ marginBottom: '1.5rem' }}>We collect information you provide directly to us, such as when you request a quote, fill out a contact form, or communicate with us. This may include your name, email address, phone number, and project details.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
            <p style={{ marginBottom: '1.5rem' }}>We use the information we collect to provide, maintain, and improve our services, to process transactions and send related information including invoices and project updates, and to respond to your comments, questions, and requests.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Sharing of Information</h2>
            <p style={{ marginBottom: '1.5rem' }}>We do not share your personal information with third parties except as necessary to provide our services (e.g., payment processors like Razorpay), comply with the law, or protect our rights.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Data Security</h2>
            <p style={{ marginBottom: '1.5rem' }}>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>5. Contact Us</h2>
            <p style={{ marginBottom: '1.5rem' }}>If you have any questions about this Privacy Policy, please contact us at ihomiesstudio@gmail.com.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
