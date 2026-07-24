import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Rate limiter for /api/notify
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
  }

  next();
};

const isValidE164 = (phone) => typeof phone === 'string' && /^\+[1-9]\d{1,14}$/.test(phone.trim());

// Initialize Twilio Client (only if credentials exist)
const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

app.post('/api/notify', rateLimiter, async (req, res) => {
  try {
    const { formData, amountToPay, txnId, method } = req.body;

    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid form data provided' });
    }

    const clientName = (formData.clientName || 'Valued Client').toString().trim().replace(/[\r\n]+/g, ' ');
    const clientPhone = (formData.clientPhone || '').toString().trim();
    const projectName = (formData.projectName || 'Project').toString().trim().replace(/[\r\n]+/g, ' ');
    const sanitizedTxnId = (txnId || 'N/A').toString().trim().replace(/[\r\n]+/g, ' ');
    const sanitizedMethod = (method || 'Payment Gateway').toString().trim().replace(/[\r\n]+/g, ' ');
    const numericAmount = Number(amountToPay);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid amount to pay' });
    }

    if (!twilioClient) {
      console.log('Payment recorded but Twilio credentials missing. Skipping WhatsApp notification.');
      return res.status(200).json({ success: true, warning: 'Twilio not configured' });
    }

    // Send to Owner
    const ownerMsg = `*New Payment Received!*\n\n*Client:* ${clientName}\n*Phone:* ${clientPhone}\n*Project:* ${projectName}\n*Amount:* ₹${numericAmount.toLocaleString('en-IN')}\n*Method:* ${sanitizedMethod}\n*Txn ID:* ${sanitizedTxnId}`;
    
    if (process.env.OWNER_WHATSAPP && isValidE164(process.env.OWNER_WHATSAPP.replace('whatsapp:', ''))) {
      await twilioClient.messages.create({
        body: ownerMsg,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: process.env.OWNER_WHATSAPP
      });
    }

    // Send to Client (if valid E.164 WhatsApp number)
    if (isValidE164(clientPhone)) {
      const clientMsg = `Hi ${clientName},\n\nWe have received your payment of ₹${numericAmount.toLocaleString('en-IN')} for ${projectName} via ${sanitizedMethod}. (Txn ID: ${sanitizedTxnId})\n\nThank you for choosing Homies Studio! We will get started on your project shortly.\n\nRegards,\nHomies Studio`;
      
      await twilioClient.messages.create({
        body: clientMsg,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${clientPhone}`
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Twilio Notification Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to process notification' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
