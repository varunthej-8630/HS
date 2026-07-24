import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Helmet } from 'react-helmet-async';
import logoImg from '../assets/logo.png';

const RAZORPAY_PAYMENT_LINK = 'https://pages.razorpay.com/pl_THSoddrEFSykut/view';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '+91',
    clientEmail: '',
    projectName: '',
    serviceType: 'Web Development',
    projectDesc: '',
    budget: '₹10,000–₹50,000',
    paymentType: '50% Deposit',
    customAmount: '',
    timeline: '1–3 Months'
  });
  const [amountToPay, setAmountToPay] = useState(0);
  const [status, setStatus] = useState('idle');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [invoicePdf, setInvoicePdf] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateAmount = () => {
    if (formData.paymentType === 'Custom Amount') return Number(formData.customAmount) || 0;
    
    let baseAmount = 0;
    switch (formData.budget) {
      case 'Under ₹10,000': baseAmount = 10000; break;
      case '₹10,000–₹50,000': baseAmount = 30000; break;
      case '₹50,000–₹1,50,000': baseAmount = 100000; break;
      case '₹1,50,000+': baseAmount = 150000; break;
      default: baseAmount = 30000;
    }
    
    if (formData.paymentType === '50% Deposit') return baseAmount * 0.5;
    return baseAmount;
  };

  const generateQuote = (e) => {
    e.preventDefault();
    const calculated = calculateAmount();
    setAmountToPay(calculated);
    
    // Save state to localStorage so data persists across Razorpay redirect
    try {
      localStorage.setItem('hs_pending_payment', JSON.stringify({
        formData,
        amountToPay: calculated
      }));
    } catch (err) {
      console.warn("Could not save pending payment to localStorage", err);
    }

    setStep(2);
  };

  // Load Razorpay Embed Button Bundle JS on Step 2
  useEffect(() => {
    if (step === 2) {
      const scriptId = 'razorpay-embed-btn-js';
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdn.razorpay.com/static/embed_btn/bundle.js';
        script.defer = true;
        script.onload = () => {
          if (window.__rzp__ && window.__rzp__.init) {
            window.__rzp__.init();
          }
        };
        document.body.appendChild(script);
      } else {
        if (window.__rzp__ && window.__rzp__.init) {
          window.__rzp__.init();
        }
      }
    }
  }, [step]);

  const generateInvoicePDF = (txnId, method, logoData, activeForm, activeAmount) => {
    const doc = new jsPDF();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const invoiceNo = `INV-${timestamp}`;
    const today = new Date().toLocaleDateString();

    const client = activeForm || formData;
    const amount = activeAmount || amountToPay;

    if (logoData) {
      doc.addImage(logoData, 'PNG', 160, 10, 35, 35);
    }

    doc.setFontSize(22);
    doc.setTextColor(245, 166, 35);
    doc.text('HOMIES STUDIO', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(51, 51, 51);
    doc.text('TAX INVOICE', 14, 28);
    doc.text(`Invoice Number: ${invoiceNo}`, 14, 34);
    doc.text(`Invoice Date: ${today}`, 14, 40);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BILLED TO:', 14, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(client.clientName || 'Valued Client', 14, 66);
    doc.text(client.projectName || 'Project', 14, 72);
    doc.text(client.clientPhone || '', 14, 78);
    doc.text(client.clientEmail || '', 14, 84);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BILLED BY:', 120, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Homies Studio', 120, 66);
    doc.text('WhatsApp: +91 7416636417', 120, 72);
    doc.text('Email: ihomiesstudio@gmail.com', 120, 78);

    autoTable(doc, {
      startY: 95,
      head: [['#', 'Service', 'Description', 'Amount']],
      body: [
        ['1', client.serviceType || 'Service', (client.projectDesc || 'Development Services').substring(0, 45) + '...', `INR ${(amount || 0).toLocaleString('en-IN')}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [245, 166, 35] }
    });

    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.text(`Subtotal: INR ${(amount || 0).toLocaleString('en-IN')}`, 120, finalY);
    doc.text(`Total Amount Paid: INR ${(amount || 0).toLocaleString('en-IN')}`, 120, finalY + 6);

    doc.text(`Payment Method: ${method}`, 14, finalY);
    doc.text(`Transaction ID: ${txnId}`, 14, finalY + 6);
    doc.setTextColor(16, 185, 129);
    doc.text(`Payment Status: PAID`, 14, finalY + 12);

    doc.setTextColor(102, 102, 102);
    doc.setFontSize(9);
    doc.text('Thank you for choosing us!', 14, 270);
    doc.text('Terms: Remaining balance due on project completion. No refunds after work has begun.', 14, 275);

    doc.save(`${invoiceNo}.pdf`);

    const pdfBlob = doc.output('blob');
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);
    
    return { invoiceNo, pdfBlobUrl };
  };

  const handlePaymentSuccess = async (txnId, method, overrideForm, overrideAmount) => {
    setStatus('success');
    setPaymentDetails({ txnId });

    const activeForm = overrideForm || formData;
    const activeAmount = overrideAmount || amountToPay;

    let logoData = null;
    try {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = logoImg;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      logoData = canvas.toDataURL('image/png');
    } catch {
      console.warn("Logo not found");
    }

    const { pdfBlobUrl } = generateInvoicePDF(txnId, method, logoData, activeForm, activeAmount);
    setInvoicePdf(pdfBlobUrl);

    // Call Backend Notification API
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: activeForm,
          amountToPay: activeAmount,
          txnId,
          method
        })
      });
    } catch (e) {
      console.error("Failed to send notification:", e);
    }

    // Clean up pending storage
    try {
      localStorage.removeItem('hs_pending_payment');
    } catch (e) {}
  };

  // Auto-detect redirect back from Razorpay Payment Page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('razorpay_payment_id') || urlParams.get('payment_id') || urlParams.get('razorpay_payment_link_id');
    const paymentStatus = urlParams.get('status') || urlParams.get('razorpay_payment_link_status');
    const queryAmount = urlParams.get('amount') || urlParams.get('amt');

    if (paymentId || paymentStatus === 'paid' || paymentStatus === 'success' || urlParams.has('payment_id')) {
      // Restore pending payment data from localStorage
      let restoredForm = null;
      let restoredAmount = queryAmount ? Number(queryAmount) : null;

      try {
        const saved = localStorage.getItem('hs_pending_payment');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.formData) {
            restoredForm = parsed.formData;
            setFormData(parsed.formData);
          }
          if (!restoredAmount && parsed.amountToPay) {
            restoredAmount = parsed.amountToPay;
            setAmountToPay(parsed.amountToPay);
          }
        }
      } catch (err) {
        console.warn("Could not restore pending payment", err);
      }

      const txnId = paymentId || `RZP-${Date.now()}`;
      handlePaymentSuccess(txnId, 'Razorpay', restoredForm, restoredAmount);
    }
  }, []);

  const openRazorpay = async () => {
    const key = import.meta.env.VITE_RAZORPAY_KEY;
    if (key && key !== 'rzp_test_YOUR_KEY_HERE') {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (res) {
        const options = {
          key: key,
          amount: amountToPay * 100,
          currency: 'INR',
          name: 'Homies Studio',
          description: `${formData.projectName || 'Project'} - ${formData.serviceType}`,
          image: logoImg,
          handler: async function (response) {
            handlePaymentSuccess(response.razorpay_payment_id || `RZP-${Date.now()}`, 'Razorpay', formData, amountToPay);
          },
          prefill: {
            name: formData.clientName,
            email: formData.clientEmail,
            contact: formData.clientPhone
          },
          theme: { color: '#CD913C' }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }
    }

    // Direct Payment Page link
    window.location.href = RAZORPAY_PAYMENT_LINK;
  };

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', padding: '5vw' }}>
        <Helmet>
          <title>Payment Successful | Homies Studio</title>
        </Helmet>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '4rem 3rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.3)', maxWidth: '500px', width: '100%' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <span style={{ color: '#fff', fontSize: '2.5rem' }}>✓</span>
          </motion.div>
          <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Payment Successful!</h2>
          <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Transaction ID: {paymentDetails?.txnId}</p>
          <p style={{ color: '#10b981', marginBottom: '2rem' }}>Your Tax Invoice has been generated and downloaded.<br/>We've also notified you via WhatsApp!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => {
              if (invoicePdf) {
                const link = document.createElement('a');
                link.href = invoicePdf;
                link.download = `INV-${paymentDetails?.txnId}.pdf`;
                link.click();
              }
            }} style={{ padding: '0.8rem 1.8rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Download Invoice PDF
            </button>
            <button onClick={() => window.location.href = '/'} style={{ padding: '0.8rem 1.8rem', background: '#F5A623', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Back to Home</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '100px', paddingBottom: '4rem', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <Helmet>
        <title>Payment Portal | Homies Studio</title>
      </Helmet>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <div style={{ color: step === 1 ? '#F5A623' : '#10b981', fontWeight: 'bold' }}>Step 1: Custom Quote</div>
          <div style={{ color: step === 2 ? '#F5A623' : '#666', fontWeight: 'bold' }}>Step 2: Payment</div>
          <div style={{ color: status === 'success' ? '#10b981' : '#666', fontWeight: 'bold' }}>Done</div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={generateQuote}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }}>Project Details</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Full Name *</label>
                  <input required name="clientName" value={formData.clientName} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>WhatsApp Number *</label>
                  <input required name="clientPhone" value={formData.clientPhone} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Email Address *</label>
                  <input required type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Company / Project Name *</label>
                  <input required name="projectName" value={formData.projectName} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Service Type</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}>
                  {['Web Development', 'Mobile App', 'AI/ML Model', 'Data Science', 'Full Stack', 'Custom'].map(o => <option key={o} style={{background:'#0a0a0a'}}>{o}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Project Description</label>
                <textarea required name="projectDesc" value={formData.projectDesc} onChange={handleChange} rows="3" style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', resize: 'none' }}></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Estimated Budget Range</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}>
                    {['Under ₹10,000', '₹10,000–₹50,000', '₹50,000–₹1,50,000', '₹1,50,000+'].map(o => <option key={o} style={{background:'#0a0a0a'}}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>Timeline</label>
                  <select name="timeline" value={formData.timeline} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}>
                    {['1 Week', '2 Weeks', '1 Month', '1–3 Months', 'Custom'].map(o => <option key={o} style={{background:'#0a0a0a'}}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', color: '#aaa', fontSize: '0.85rem' }}>Payment Type</label>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {['Full Payment', '50% Deposit', 'Custom Amount'].map(o => (
                    <label key={o} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="paymentType" value={o} checked={formData.paymentType === o} onChange={handleChange} />
                      {o}
                    </label>
                  ))}
                </div>
                {formData.paymentType === 'Custom Amount' && (
                  <input type="number" name="customAmount" placeholder="Enter Exact Amount (₹)" value={formData.customAmount} onChange={handleChange} required style={{ width: '100%', marginTop: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid #F5A623', borderRadius: '8px', color: '#fff' }} />
                )}
              </div>

              <button type="submit" style={{ width: '100%', padding: '1rem', background: '#F5A623', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Generate Quote</button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>← Back to Edit</button>
              
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Payment Summary</h3>
                <div style={{ color: '#ccc', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                  <p><strong>Client:</strong> {formData.clientName}</p>
                  <p><strong>Project:</strong> {formData.projectName}</p>
                  <p><strong>Service:</strong> {formData.serviceType}</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(245, 166, 35, 0.1)', border: '1px dashed #F5A623', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#F5A623', marginBottom: '0.5rem' }}>AMOUNT TO PAY ({formData.paymentType})</div>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>₹{amountToPay.toLocaleString('en-IN')}</div>
                  {formData.paymentType === '50% Deposit' && <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>Remaining balance due upon completion</div>}
                </div>
              </div>

              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Proceed with Razorpay</h4>

              {/* Official Razorpay Embedded Button Container */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
                <div 
                  className="razorpay-embed-btn" 
                  data-url="https://pages.razorpay.com/pl_THSoddrEFSykut/view" 
                  data-text={`Pay ₹${amountToPay.toLocaleString('en-IN')} Now`} 
                  data-color="#CD913C" 
                  data-size="large"
                ></div>

                {/* Direct Action Link Button */}
                <a 
                  href="https://pages.razorpay.com/pl_THSoddrEFSykut/view"
                  onClick={() => {
                    try {
                      localStorage.setItem('hs_pending_payment', JSON.stringify({ formData, amountToPay }));
                    } catch(e){}
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '1.3rem 1.5rem', 
                    background: 'linear-gradient(135deg, #CD913C, #a66e1e)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '16px', 
                    fontWeight: 'bold', 
                    fontSize: '1.25rem', 
                    cursor: 'pointer', 
                    boxShadow: '0 10px 30px rgba(205, 145, 60, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '0.8rem',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, boxShadow 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  💳 Pay ₹{amountToPay.toLocaleString('en-IN')} via Razorpay Page ↗
                </a>
              </div>

              <div style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
                🔒 256-bit SSL Encrypted Payment via Razorpay
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default PaymentPage;
