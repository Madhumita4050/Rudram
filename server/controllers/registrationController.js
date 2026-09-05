const Registration = require('../models/Registration');
const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.createRegistration = async (req, res) => {
  try {
    const {
      role, name, fatherHusbandName, village, post, block,
      district, state, pinCode, contactNumber, email, education
    } = req.body;

    let photoPath = null;
    if (req.file) {
      photoPath = req.file.path;
    }

    const newRegistration = await Registration.create({
      role, name, fatherHusbandName, village, post, block,
      district, state, pinCode, contactNumber, email, education,
      photo: photoPath
    });

    res.status(201).json({
      message: 'Registration submitted successfully.',
      registrationId: newRegistration.id
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Verify Signature (Skip if Dummy Mode is active)
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'your_key_id_here' && razorpay_signature && razorpay_signature !== 'dummy_signature') {
      const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest('hex');

      if (digest !== razorpay_signature) {
        return res.status(400).json({ message: 'Transaction verification failed. Signature mismatch.' });
      }
    }

    registration.paymentStatus = paymentStatus || 'Completed';
    if (razorpay_order_id) registration.razorpay_order_id = razorpay_order_id;
    if (razorpay_payment_id) registration.razorpay_payment_id = razorpay_payment_id;
    if (razorpay_signature) registration.razorpay_signature = razorpay_signature;

    await registration.save();

    res.status(200).json({ message: 'Payment status updated successfully', registration });
  } catch (error) {
    console.error('Payment Update Error:', error);
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
};

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_key_id_here') {
      // Dummy Mode
      return res.status(200).json({
        order: {
          id: `order_dummy_${Date.now()}`,
          amount: 49900,
          currency: "INR"
        },
        key_id: 'dummy_key'
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 49900, // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_reg_${id}`
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.status(200).json({
      order: order,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ message: 'Error creating Razorpay order', error: error.message });
  }
};

exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // If webhook secret is missing, we can't verify
    if (!secret || secret === 'your_webhook_secret_here') {
      return res.status(400).json({ status: 'Webhook secret not configured' });
    }

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
      // Process successful payment event
      if (req.body.event === 'payment.captured') {
        const payment = req.body.payload.payment.entity;
        const order_id = payment.order_id;
        
        // Find registration by razorpay_order_id and update status
        const registration = await Registration.findOne({ where: { razorpay_order_id: order_id } });
        if (registration) {
          registration.paymentStatus = 'Completed';
          registration.razorpay_payment_id = payment.id;
          await registration.save();
        }
      }
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'invalid signature' });
    }
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ status: 'error' });
  }
};
