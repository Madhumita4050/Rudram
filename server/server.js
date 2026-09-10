const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const bcrypt = require('bcrypt');
const path = require('path');

dotenv.config();

const app = express();

// =====================================================
// CORS CONFIGURATION
// =====================================================

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
  })
);

app.use(express.json());

// =====================================================
// LOAD MODELS
// =====================================================

const User = require('./models/User');
const Service = require('./models/Service');
const Registration = require('./models/Registration');
const RequestHistory = require('./models/RequestHistory');
const ContactMessage = require('./models/ContactMessage');
const PaymentSetting = require('./models/PaymentSetting');

// =====================================================
// PAYMENT SETTINGS PUBLIC CONTROLLER
// =====================================================

const paymentSettingController = require('./controllers/paymentSettingController');

app.get(
  '/api/payment-settings',
  paymentSettingController.getPaymentSettings
);

// =====================================================
// API ROUTES
// =====================================================

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/services', require('./routes/serviceRoutes'));

app.use('/api/registrations', require('./routes/registrationRoutes'));

app.use('/api/admin', require('./routes/adminRoutes'));

app.use('/api/user', require('./routes/userRoutes'));

// =====================================================
// SERVE UPLOADS FOLDER
// =====================================================

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// =====================================================
// ROOT / HEALTH CHECK ROUTES
// =====================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Rudran Pay API is running',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

// =====================================================
// PORT
// =====================================================

const PORT = process.env.PORT || 5000;

// =====================================================
// SEED INITIAL DATA
// =====================================================

const seedInitialData = async () => {
  try {
    // -------------------------------------------------
    // 1. SEED ADMIN USER
    // -------------------------------------------------

    const adminEmail =
      process.env.ADMIN_EMAIL || 'admin@rudran.com';

    const anyAdminExists = await User.findOne({
      where: {
        role: 'admin',
      },
    });

    if (!anyAdminExists) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'Admin@12345',
        salt
      );

      await User.create({
        name: 'Super Administrator',
        email: adminEmail,
        phone: '+91 99999 00000',
        password: hashedPassword,
        role: 'admin',
        walletBalance: 50000,
        status: 'active',
      });

      console.log(
        `✅ Default admin created: ${adminEmail} / Admin@12345`
      );
    }

    // -------------------------------------------------
    // 2. SEED SERVICES
    // -------------------------------------------------

    const serviceCount = await Service.count();

    if (serviceCount === 0) {
      const dummyServices = [
        {
          title: 'Mobile Recharge',
          description:
            'Instant mobile recharge across all operators',
          category: 'Recharge',
          price: 0,
          icon: 'Smartphone',
        },

        {
          title: 'DTH Recharge',
          description:
            'Recharge your DTH with instant activation',
          category: 'Recharge',
          price: 0,
          icon: 'Tv',
        },

        {
          title: 'Electricity Bill',
          description:
            'Pay state and private electricity board bills',
          category: 'Utility',
          price: 0,
          icon: 'Zap',
        },

        {
          title: 'Water Bill',
          description:
            'Instant municipal water supply bill payment',
          category: 'Utility',
          price: 0,
          icon: 'Droplet',
        },

        {
          title: 'Credit Card Bill',
          description:
            'Fast BBPS credit card payment processing',
          category: 'Finance',
          price: 0,
          icon: 'CreditCard',
        },

        {
          title: 'Flight Booking',
          description:
            'Domestic & international airline booking',
          category: 'Travel',
          price: 0,
          icon: 'Plane',
        },

        {
          title: 'Fastag Recharge',
          description:
            'Instant FASTag toll wallet recharge',
          category: 'Recharge',
          price: 0,
          icon: 'Tag',
        },

        {
          title: 'LPG Gas Cylinder',
          description:
            'Book and pay for LPG cylinder refills',
          category: 'Utility',
          price: 0,
          icon: 'Flame',
        },
      ];

      await Service.bulkCreate(dummyServices);

      console.log('✅ Default services seeded.');
    }

    // -------------------------------------------------
    // 3. PAYMENT SETTINGS
    // -------------------------------------------------

    let paymentSetting = await PaymentSetting.findByPk(1);

    if (!paymentSetting) {
      paymentSetting = await PaymentSetting.create({
        id: 1,

        payeeName: 'RUDRANARAYAN RUDRAN',

        upiId: 'rudranarayan@upi',

        qrCodeImage: 'uploads/payment-qr.png',

        founderMemberFee: 830,

        fieldOfficerFee: 570,

        computerOperatorFee: 450,

        personalAssistantFee: 1200,

        bankName: 'State Bank of India',

        accountNumber: '',

        ifscCode: '',

        accountHolder: 'RUDRANARAYAN RUDRAN',

        isUpiActive: true,

        isBankActive: true,

        isCashActive: true,

        instructions:
          'Scan the PhonePe QR code, complete your payment, and enter the 12-digit UTR / UPI Reference ID below.',
      });

      console.log(
        '✅ Default payment settings initialized with requested role fees.'
      );
    } else {
      // -----------------------------------------------
      // UPDATE DEFAULT PRICING
      // -----------------------------------------------

      let updated = false;

      if (
        paymentSetting.founderMemberFee === 499 ||
        !paymentSetting.founderMemberFee
      ) {
        paymentSetting.founderMemberFee = 830;
        updated = true;
      }

      if (
        paymentSetting.fieldOfficerFee === 499 ||
        !paymentSetting.fieldOfficerFee
      ) {
        paymentSetting.fieldOfficerFee = 570;
        updated = true;
      }

      if (
        paymentSetting.computerOperatorFee === 499 ||
        !paymentSetting.computerOperatorFee
      ) {
        paymentSetting.computerOperatorFee = 450;
        updated = true;
      }

      if (
        paymentSetting.personalAssistantFee === 499 ||
        !paymentSetting.personalAssistantFee
      ) {
        paymentSetting.personalAssistantFee = 1200;
        updated = true;
      }

      if (!paymentSetting.payeeName) {
        paymentSetting.payeeName = 'RUDRANARAYAN RUDRAN';
        updated = true;
      }

      if (updated) {
        await paymentSetting.save();

        console.log(
          '✅ Payment settings updated with latest role fees.'
        );
      }
    }
  } catch (seedErr) {
    console.warn(
      '⚠️ Seeding initial data notice:',
      seedErr.message
    );
  }
};

// =====================================================
// INITIALIZE DATABASE AND START SERVER
// =====================================================

const init = async () => {
  try {
    // -------------------------------------------------
    // CONNECT TO EXISTING MYSQL DATABASE
    // -------------------------------------------------

    await sequelize.authenticate();

    console.log('✅ MySQL connected via Sequelize.');

    // -------------------------------------------------
    // SYNC MODELS
    // -------------------------------------------------

    await sequelize.sync();

    console.log('✅ Database models synced.');

    // -------------------------------------------------
    // SEED INITIAL DATA
    // -------------------------------------------------

    await seedInitialData();

    // -------------------------------------------------
    // START SERVER
    // -------------------------------------------------

    app.listen(PORT, '0.0.0.0', () => {
      console.log(
        `✅ Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      '❌ Unable to start the server'
    );

    console.error(
      'ERROR MESSAGE:',
      error.message
    );

    console.error(
      'ERROR NAME:',
      error.name
    );

    console.error(
      'ERROR CODE:',
      error.original?.code
    );

    console.error(
      'SQL ERROR:',
      error.original?.sqlMessage
    );

    console.error(
      'SQL:',
      error.sql
    );

    console.error(
      'FULL ERROR:',
      error
    );

    process.exit(1);
  }
};

// =====================================================
// START APPLICATION
// =====================================================

init();