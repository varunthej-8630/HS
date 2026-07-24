import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Helmet } from 'react-helmet-async';
import logoImg from '../assets/logo.png';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// UPI Details
const upiDetails = {
  phonepe: { id: '9392881913@ybl', name: 'PhonePe', color: '#5F259F', scheme: 'phonepe://pay', fallback: 'https://phon.pe/pay' },
  gpay: { id: 'varunthejparimi143@oksbi', name: 'GPay', color: '#4285F4', scheme: 'tez://upi/pay', fallback: 'https://gpay.app.goo.gl/pay' },
  paytm: { id: '9392881913@ptsbi', name: 'Paytm', color: '#00BAF2', scheme: 'paytmmp://pay', fallback: 'https://paytm.com/' }
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

  // Custom UI Modals
  const [activeModal, setActiveModal] = useState(null); // 'upi', 'card', null

  // UPI State
  const [activeUpiTab, setActiveUpiTab] = useState('phonepe');
  const [copied, setCopied] = useState(false);
  const [showUtrInput, setShowUtrInput] = useState(false);
  const [utr, setUtr] = useState('');

  // Card State
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isProcessingCard, setIsProcessingCard] = useState(false);

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
    setAmountToPay(calculateAmount());
    setStep(2);
  };

  const generateInvoicePDF = (txnId, method, logoData) => {
    const doc = new jsPDF();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const invoiceNo = `INV-${timestamp}`;
    const today = new Date().toLocaleDateString();

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
    doc.text(`Due Date: ${today}`, 14, 46);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BILLED TO:', 14, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(formData.clientName, 14, 66);
    doc.text(formData.projectName, 14, 72);
    doc.text(formData.clientPhone, 14, 78);
    doc.text(formData.clientEmail, 14, 84);

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
        ['1', formData.serviceType, formData.projectDesc.substring(0, 45) + '...', `INR ${amountToPay.toLocaleString('en-IN')}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [245, 166, 35] }
    });

    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.text(`Subtotal: INR ${amountToPay.toLocaleString('en-IN')}`, 120, finalY);
    doc.text(`Payment Type: ${formData.paymentType}`, 120, finalY + 6);
    doc.text(`Amount Paid Today: INR ${amountToPay.toLocaleString('en-IN')}`, 120, finalY + 12);
    if (formData.paymentType === '50% Deposit') {
      doc.text(`Remaining Balance: INR ${amountToPay.toLocaleString('en-IN')}`, 120, finalY + 18);
    }
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

  const handlePaymentSuccess = async (txnId, method) => {
    setActiveModal(null);
    setStatus('success');
    setPaymentDetails({ txnId });

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

    const { pdfBlobUrl } = generateInvoicePDF(txnId, method, logoData);
    setInvoicePdf(pdfBlobUrl);

    // Call Backend Notification API
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData,
          amountToPay,
          txnId,
          method
        })
      });
    } catch (e) {
      console.error("Failed to send notification:", e);
    }
  };

  const openRazorpay = async (methodConfig) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) return alert('Razorpay SDK failed to load');

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_PLACEHOLDER',
      amount: amountToPay * 100,
      currency: 'INR',
      name: 'Homies Studio',
      description: `${formData.projectName} - ${formData.serviceType}`,
      image: '/assets/icon.png',
      handler: async function (response) {
        handlePaymentSuccess(response.razorpay_payment_id, 'Razorpay');
      },
      prefill: {
        name: formData.clientName,
        email: formData.clientEmail,
        contact: formData.clientPhone
      },
      theme: { color: '#F5A623' }
    };

    if (methodConfig) {
      options.method = methodConfig;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSelectPaymentMethod = (method) => {
    if (method === 'upi') {
      setActiveModal('upi');
      setShowUtrInput(false);
      setUtr('');
    } else if (method === 'card') {
      setActiveModal('card');
    } else if (method === 'netbanking') {
      openRazorpay({ card: false, upi: false, netbanking: true, wallet: false });
    } else if (method === 'checkout') {
      openRazorpay(null);
    }
  };

  // UPI Helpers
  const triggerUpiDeepLink = (app) => {
    const { id, scheme, fallback } = upiDetails[app];
    const encodedPn = encodeURIComponent('Homies Studio');
    const encodedTn = encodeURIComponent(formData.projectName || 'Project Deposit');
    const deepLink = `${scheme}?pa=${encodeURIComponent(id)}&pn=${encodedPn}&am=${amountToPay}&cu=INR&tn=${encodedTn}`;
    
    // Attempt deep link
    window.location.href = deepLink;
    
    // Fallback timer (in case app isn't installed)
    setTimeout(() => {
      window.open(`${fallback}?pa=${encodeURIComponent(id)}&pn=${encodedPn}&am=${amountToPay}&cu=INR`, '_blank', 'noopener,noreferrer');
    }, 2000);
  };

  const handleCopyUpiId = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (!utr) return;
    handlePaymentSuccess(utr, `UPI - ${upiDetails[activeUpiTab].name}`);
  };

  // Card Helpers
  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') {
      value = value.replace(/\D/g, '').substring(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      value = value.replace(/\D/g, '').substring(0, 4);
      if (value.length > 2) value = `${value.substring(0,2)}/${value.substring(2)}`;
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3);
    } else if (name === 'name') {
      value = value.toUpperCase();
    }
    setCardData({ ...cardData, [name]: value });
  };

  const getCardNetwork = (num) => {
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    if (num.startsWith('6')) return 'RuPay';
    return '';
  };

  const processCardPayment = (e) => {
    e.preventDefault();
    setIsProcessingCard(true);
    // Simulate processing delay before passing to razorpay
    setTimeout(() => {
      setIsProcessingCard(false);
      openRazorpay({ card: true, upi: false, netbanking: false, wallet: false });
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', padding: '5vw' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '4rem 3rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <span style={{ color: '#fff', fontSize: '2.5rem' }}>✓</span>
          </motion.div>
          <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Payment Successful!</h2>
          <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Transaction ID: {paymentDetails?.txnId}</p>
          <p style={{ color: '#10b981', marginBottom: '2rem' }}>Your invoice has been generated.<br/>We'll WhatsApp you shortly!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => {
              const link = document.createElement('a');
              link.href = invoicePdf;
              link.download = `INV-${paymentDetails?.txnId}.pdf`;
              link.click();
            }} style={{ padding: '0.8rem 2rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Download Invoice PDF
            </button>
            <button onClick={() => window.location.href = '/'} style={{ padding: '0.8rem 2rem', background: '#F5A623', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Back to Home</button>
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

              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>Select Payment Method</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {[
                  { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                  { id: 'checkout', label: 'More Options (Razorpay)', icon: '📲' }
                ].map(m => (
                  <button key={m.id} onClick={() => handleSelectPaymentMethod(m.id)} style={{ padding: '1.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }} onMouseEnter={e => {e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.boxShadow = '0 0 15px rgba(245, 166, 35, 0.2)'}} onMouseLeave={e => {e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'}}>
                    <span style={{ fontSize: '2rem' }}>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* UPI MODAL */}
        <AnimatePresence>
          {activeModal === 'upi' && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <motion.div initial={{ scale: 0.95, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 50, opacity: 0 }} style={{ background: '#111', border: '1px solid #F5A623', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '420px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '1rem', right: '1.2rem', background: 'none', border: 'none', color: '#aaa', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}>&times;</button>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', marginTop: '0.5rem' }}>
                  {Object.keys(upiDetails).map(key => {
                    const isActive = activeUpiTab === key;
                    const c = upiDetails[key].color;
                    return (
                      <button key={key} onClick={() => { setActiveUpiTab(key); setShowUtrInput(false); }} style={{ flex: 1, padding: '0.6rem 0', borderRadius: '100px', border: `1px solid ${c}`, background: isActive ? c : 'transparent', color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}>
                        {upiDetails[key].name}
                      </button>
                    )
                  })}
                </div>

                <motion.div key={activeUpiTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>Paying ₹{amountToPay.toLocaleString('en-IN')} to Homies Studio</div>
                    
                    <button onClick={() => handleCopyUpiId(upiDetails[activeUpiTab].id)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '8px', fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.8rem', width: '100%', justifyContent: 'center' }}>
                      <span style={{color: '#aaa'}}>UPI ID:</span> {upiDetails[activeUpiTab].id} 
                      {copied ? <span style={{color: '#10b981'}}>✓</span> : '📋'}
                    </button>
                  </div>

                  <p style={{ color: '#aaa', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                    Tap the button below to open {upiDetails[activeUpiTab].name} and complete payment
                  </p>

                  <button onClick={() => triggerUpiDeepLink(activeUpiTab)} style={{ width: '100%', padding: '1rem', background: upiDetails[activeUpiTab].color, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '2rem', boxShadow: `0 10px 20px ${upiDetails[activeUpiTab].color}40` }}>
                    Open {upiDetails[activeUpiTab].name}
                  </button>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    {!showUtrInput ? (
                      <button onClick={() => setShowUtrInput(true)} style={{ width: '100%', padding: '1rem', background: '#F5A623', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        I've Paid
                      </button>
                    ) : (
                      <form onSubmit={handleUpiSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Enter 12-digit UTR No." value={utr} onChange={(e) => setUtr(e.target.value)} required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid #F5A623', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.1em' }} />
                        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Submit UTR</button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CUSTOM CARD MODAL */}
        <AnimatePresence>
          {activeModal === 'card' && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={{ background: '#111', border: '1px solid #333', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '450px', position: 'relative' }}>
                <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '1rem', right: '1.2rem', background: 'none', border: 'none', color: '#aaa', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}>&times;</button>
                
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>Secure Card Payment</h3>

                {/* 3D Card Preview */}
                <div style={{ perspective: '1000px', marginBottom: '2rem', height: '220px' }}>
                  <div style={{ width: '100%', height: '100%', position: 'relative', transition: 'transform 0.6s', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                    {/* Front */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #2c3e50, #000000)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '30px', background: 'linear-gradient(135deg, #e0e0e0, #999)', borderRadius: '4px' }}></div>
                        <div style={{ color: '#fff', fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.2rem' }}>{getCardNetwork(cardData.number) || 'CARD'}</div>
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '1.4rem', letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: '1rem' }}>
                          {cardData.number || '•••• •••• •••• ••••'}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                          <div>
                            <div style={{ fontSize: '0.6rem' }}>Cardholder Name</div>
                            <div style={{ color: '#fff', fontSize: '0.9rem' }}>{cardData.name || 'YOUR NAME'}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.6rem' }}>Expires</div>
                            <div style={{ color: '#fff', fontSize: '0.9rem' }}>{cardData.expiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Back */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #1a1a1a, #000000)', borderRadius: '16px', transform: 'rotateY(180deg)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ width: '100%', height: '40px', background: '#000', marginTop: '20px' }}></div>
                      <div style={{ padding: '20px' }}>
                        <div style={{ background: '#fff', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '15px', color: '#000', fontFamily: 'monospace', fontSize: '1.1rem', borderRadius: '4px' }}>
                          {cardData.cvv ? '•'.repeat(cardData.cvv.length) : '•••'}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.6rem', marginTop: '10px', textAlign: 'right' }}>CVV NUMBER</div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={processCardPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#aaa', fontSize: '0.8rem' }}>Cardholder Name</label>
                    <input type="text" name="name" value={cardData.name} onChange={handleCardChange} onFocus={() => setIsFlipped(false)} required style={{ width: '100%', padding: '0.8rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#aaa', fontSize: '0.8rem' }}>Card Number</label>
                    <input type="text" name="number" value={cardData.number} onChange={handleCardChange} onFocus={() => setIsFlipped(false)} required placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.8rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontFamily: 'monospace', fontSize: '1.1rem' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#aaa', fontSize: '0.8rem' }}>Expiry</label>
                      <input type="text" name="expiry" value={cardData.expiry} onChange={handleCardChange} onFocus={() => setIsFlipped(false)} required placeholder="MM/YY" style={{ width: '100%', padding: '0.8rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'center' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#aaa', fontSize: '0.8rem' }}>CVV</label>
                      <input type="password" name="cvv" value={cardData.cvv} onChange={handleCardChange} onFocus={() => setIsFlipped(true)} onBlur={() => setIsFlipped(false)} required placeholder="•••" style={{ width: '100%', padding: '0.8rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'center', letterSpacing: '0.2em' }} />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={isProcessingCard} style={{ width: '100%', padding: '1rem', background: '#F5A623', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {isProcessingCard ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '20px', height: '20px', border: '3px solid #000', borderTopColor: 'transparent', borderRadius: '50%' }}></motion.div> : `Pay ₹${amountToPay.toLocaleString('en-IN')} Securely`}
                  </button>
                  
                  <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.75rem' }}>
                    🔒 256-bit SSL Encrypted • Your card details are never stored
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default PaymentPage;
