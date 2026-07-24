import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formType, setFormType] = useState('student'); // 'student' or 'client'
  
  const [formData, setFormData] = useState({
    name: '', college: '', company: '', phone: '', email: '',
    projectTitle: '', type: '', details: '',
    overview: '', deliverables: '', budget: '', deadline: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidE164 = (phone) => typeof phone === 'string' && /^\+[1-9]\d{1,14}$/.test(phone.trim());

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!isValidE164(formData.phone)) {
      alert('Please enter a valid phone number in E.164 format (e.g., +917416636417).');
      return;
    }
    setStatus('sending');
    
    let msg = '';
    if (formType === 'student') {
      msg = `🎓 *NEW STUDENT PROJECT INQUIRY*\n\n*Name:* ${formData.name}\n*College:* ${formData.college}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Project Title:* ${formData.projectTitle}\n*Project Type:* ${formData.type}\n*Deliverables:* ${formData.details}\n*Deadline:* ${formData.deadline}`;
    } else {
      msg = `💼 *NEW CLIENT B2B INQUIRY*\n\n*Name:* ${formData.name}\n*Company:* ${formData.company}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Project Overview:* ${formData.overview}\n*Deliverables:* ${formData.deliverables}\n*Budget:* ${formData.budget}\n*Deadline:* ${formData.deadline}`;
    }

    const waUrl = `https://wa.me/917416636417?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    setTimeout(() => setStatus('sent'), 1500);
    setTimeout(() => { 
      setStatus('idle'); 
      setFormData({ name: '', college: '', company: '', phone: '', email: '', projectTitle: '', type: '', details: '', overview: '', deliverables: '', budget: '', deadline: '' });
    }, 5000);
  };

  const getBtnText = () => {
    if (status === 'sending') return 'Opening WhatsApp...';
    if (status === 'sent') return '✓ Request Prepared!';
    return formType === 'student' ? '🚀 Send Student Request' : '🚀 Send Client Request';
  };

  return (
    <section id="contact" className="rv" style={{ padding: '8rem 5vw', background: 'radial-gradient(ellipse at 20% 80%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)' }} ref={ref}>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} transition={{ duration: 0.8 }} style={{ flex: '1 1 350px' }}>
          
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--p)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--p)' }}></div>Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--c)', marginBottom: '2.5rem' }}>
            Start Your<br /><span className="gr-text">Project Today</span>
          </h2>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--tx)' }}>Tell us what you need.<br />We'll make it real.</h3>
          <p style={{ color: 'var(--mt2)', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '0.92rem' }}>Whether you're a student with a final year deadline or a business ready to automate — we're ready. Reach out and get a custom quote within 24 hours.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="mailto:ihomiesstudio@gmail.com" className="hover-target" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--mt2)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => {e.currentTarget.style.color='var(--c)'; e.currentTarget.children[0].style.borderColor='var(--p)'}} onMouseLeave={e => {e.currentTarget.style.color=''; e.currentTarget.children[0].style.borderColor=''}}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.038)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>✉️</div>
              ihomiesstudio@gmail.com
            </a>
            <a href="https://wa.me/917416636417" target="_blank" rel="noreferrer" className="hover-target" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--mt2)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => {e.currentTarget.style.color='var(--c)'; e.currentTarget.children[0].style.borderColor='var(--p)'}} onMouseLeave={e => {e.currentTarget.style.color=''; e.currentTarget.children[0].style.borderColor=''}}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.038)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>💬</div>
              WhatsApp / +91 7416636417
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--mt2)', fontSize: '0.88rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.038)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🌍</div>
              India & Worldwide &middot; Remote First
            </div>
          </div>
        </motion.div>

        <motion.div className="glass" initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: '1 1 450px', borderRadius: '28px', padding: '2.8rem', overflow: 'hidden' }}>
          
          <a href="https://wa.me/917416636417?text=Hi%20Homies%20Studio!%20I%20want%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="hover-target" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '16px', padding: '1.2rem', textDecoration: 'none', marginBottom: '2rem', transition: 'all 0.3s' }}>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>⚡ Order Directly on WhatsApp</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--mt)' }}>Fastest response — usually within 1 hour</span>
          </a>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '16px' }}>
            <button onClick={(e) => { e.preventDefault(); setFormType('student'); }} className="hover-target" style={{
              flex: 1, padding: '0.85rem', background: formType === 'student' ? 'linear-gradient(145deg, #f59e0b, #d97706)' : 'transparent',
              color: formType === 'student' ? '#000' : 'var(--mt2)', border: 'none', borderRadius: '12px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
              boxShadow: formType === 'student' ? '0 4px 15px rgba(251, 191, 36, 0.3)' : 'none'
            }}>🎓 Student Project</button>
            <button onClick={(e) => { e.preventDefault(); setFormType('client'); }} className="hover-target" style={{
              flex: 1, padding: '0.85rem', background: formType === 'client' ? 'linear-gradient(145deg, #0891b2, #06b6d4)' : 'transparent',
              color: formType === 'client' ? '#fff' : 'var(--mt2)', border: 'none', borderRadius: '12px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
              boxShadow: formType === 'client' ? '0 4px 15px rgba(6, 182, 212, 0.3)' : 'none'
            }}>💼 Hire for Client Work</button>
          </div>

          <form onSubmit={sendWhatsApp}>
            <AnimatePresence mode="wait">
              {formType === 'student' ? (
                <motion.div key="student" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Full Name</label>
                      <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>College Name</label>
                      <input name="college" value={formData.college} onChange={handleChange} required placeholder="University / College" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Phone / WA</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Email</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="email@ext.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1.4rem' }}>
                    <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Project Title</label>
                    <input name="projectTitle" value={formData.projectTitle} onChange={handleChange} required placeholder="Name of your project" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Project Type</label>
                      <select name="type" value={formData.type} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }}>
                        <option value="" style={{ background: '#0d0d22' }}>Select Type</option>
                        <option style={{ background: '#0d0d22' }}>Web / App Dev</option>
                        <option style={{ background: '#0d0d22' }}>AI / ML</option>
                        <option style={{ background: '#0d0d22' }}>Robotics / IoT</option>
                        <option style={{ background: '#0d0d22' }}>ECE / Hardware</option>
                        <option style={{ background: '#0d0d22' }}>Content Writing</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Deadline</label>
                      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none', colorScheme: 'dark' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.4rem' }}>
                    <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Deliverables & Details</label>
                    <textarea name="details" value={formData.details} required onChange={handleChange} placeholder="Required tech stack, reports, PPT needed?..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none', resize: 'none', height: '100px' }}></textarea>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="client" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Full Name</label>
                      <input name="name" value={formData.name} onChange={handleChange} required placeholder="Client Name" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Company / Agency</label>
                      <input name="company" value={formData.company} onChange={handleChange} required placeholder="Company Name" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Phone / WA</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Email</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="director@company.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.4rem' }}>
                    <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Project Overview / Goal</label>
                    <textarea name="overview" value={formData.overview} required onChange={handleChange} placeholder="What are we building?" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none', resize: 'none', height: '80px' }}></textarea>
                  </div>
                  
                  <div style={{ marginBottom: '1.4rem' }}>
                    <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Task & Deliverables List</label>
                    <textarea name="deliverables" value={formData.deliverables} required onChange={handleChange} placeholder="Core features, designs, code ownership..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none', resize: 'none', height: '80px' }}></textarea>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Approx. Budget</label>
                      <input name="budget" value={formData.budget} onChange={handleChange} required placeholder="e.g. $5,000 USD" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.73rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: '0.5rem' }}>Target Launch</label>
                      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '13px', padding: '0.85rem 1.1rem', color: 'var(--tx)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', outline: 'none', colorScheme: 'dark' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="hover-target" style={{
              width: '100%', padding: '0.95rem 2.4rem', marginTop: '0.5rem',
              background: status === 'sent' ? 'linear-gradient(145deg, #059669, #047857)' : (formType === 'student' ? 'linear-gradient(145deg, #f59e0b, #d97706)' : 'linear-gradient(145deg, #0891b2, #06b6d4)'),
              color: formType === 'student' ? '#000' : '#fff', border: 'none', borderRadius: '14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 600, cursor: 'none'
            }}>{getBtnText()}</button>
          </form>

          {/* New CTA Section */}
          <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--c)', marginBottom: '0.5rem' }}>Ready to get started immediately?</h4>
            <p style={{ color: 'var(--mt)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Skip the wait and secure your project slot.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/payment" className="hover-target" style={{
                padding: '0.8rem 1.8rem', background: 'rgba(255,255,255,0.05)', color: 'var(--tx)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s'
              }}>Pay Deposit</a>
              <a href="tel:+917416636417" className="hover-target" style={{
                padding: '0.8rem 1.8rem', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s'
              }}>Book Discovery Call</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
