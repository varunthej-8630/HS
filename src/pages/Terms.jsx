import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '120px', paddingBottom: '4rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif" }}>
      <Helmet>
        <title>Terms of Service | Homies Studio</title>
        <meta name="description" content="Terms of Service for Homies Studio." />
      </Helmet>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5vw' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', color: 'var(--c)' }}>Terms of Service</h1>
          <div style={{ color: 'var(--mt)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Effective Date: May 2026</p>
            
            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
            <p style={{ marginBottom: '1.5rem' }}>By accessing and using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. Services Provided</h2>
            <p style={{ marginBottom: '1.5rem' }}>Homies Studio provides web development, mobile app development, AI/ML model creation, and data science services as outlined in custom project quotes.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Payments and Deposits</h2>
            <p style={{ marginBottom: '1.5rem' }}>Projects may require a non-refundable upfront deposit (e.g., 50%) before work begins. The remaining balance is due upon project completion or at agreed milestones. No refunds are provided once work has commenced.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Intellectual Property</h2>
            <p style={{ marginBottom: '1.5rem' }}>Upon final payment, the client owns the rights to the completed project deliverables. Homies Studio retains the right to display the completed work in our portfolio unless a Non-Disclosure Agreement (NDA) is signed.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>5. Limitation of Liability</h2>
            <p style={{ marginBottom: '1.5rem' }}>Homies Studio shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.</p>

            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>6. Contact Us</h2>
            <p style={{ marginBottom: '1.5rem' }}>For any questions regarding these terms, contact us at ihomiesstudio@gmail.com.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
