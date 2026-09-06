const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://rudranpay.com',
  'https://www.rudranpay.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Load Models
const User = require('./models/User');
const Service = require('./models/Service');
const Registration = require('./models/Registration');
const RequestHistory = require('./models/RequestHistory');
const ContactMessage = require('./models/ContactMessage');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Serve uploads folder
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

// Helper to seed initial admin & services
const seedInitialData = async () => {
  try {
    // 1. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@rudram.com';
    const adminExists = await User.findOne({ where: { email: adminEmail } });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', salt);
      await User.create({
        name: 'Super Administrator',
        email: adminEmail,
        phone: '+91 99999 00000',
        password: hashedPassword,
        role: 'admin',
        walletBalance: 50000,
        status: 'active'
      });
      console.log(`✅ Default admin created: ${adminEmail} / Admin@12345`);
    } else if (adminExists.role !== 'admin') {
      adminExists.role = 'admin';
      await adminExists.save();
    }

    // 2. Seed Services if empty
    const serviceCount = await Service.count();
    if (serviceCount === 0) {
      const dummyServices = [
        { title: "Mobile Recharge", description: "Instant mobile recharge across all operators", category: "Recharge", price: 0, icon: "Smartphone" },
        { title: "DTH Recharge", description: "Recharge your DTH with instant activation", category: "Recharge", price: 0, icon: "Tv" },
        { title: "Electricity Bill", description: "Pay state and private electricity board bills", category: "Utility", price: 0, icon: "Zap" },
        { title: "Water Bill", description: "Instant municipal water supply bill payment", category: "Utility", price: 0, icon: "Droplet" },
        { title: "Credit Card Bill", description: "Fast BBPS credit card payment processing", category: "Finance", price: 0, icon: "CreditCard" },
        { title: "Flight Booking", description: "Domestic & international airline booking", category: "Travel", price: 0, icon: "Plane" },
        { title: "Fastag Recharge", description: "Instant FASTag toll wallet recharge", category: "Recharge", price: 0, icon: "Tag" },
        { title: "LPG Gas Cylinder", description: "Book and pay for LPG cylinder refills", category: "Utility", price: 0, icon: "Flame" }
      ];
      await Service.bulkCreate(dummyServices);
      console.log('✅ Default services seeded.');
    }
  } catch (seedErr) {
    console.warn('⚠️ Seeding initial data notice:', seedErr.message);
  }
};

// Initialize Database and Start Server
const init = async () => {
  try {
    // 1. Create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      port: process.env.DB_PORT || 3306,
      password: process.env.DB_PASSWORD || '',
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'rudram_db'}\`;`);
    await connection.end();
    console.log('Database checked/created successfully.');

    // 2. Connect Sequelize
    await sequelize.authenticate();
    console.log('MySQL connected via Sequelize.');

    // 3. Sync Models
    await sequelize.sync({ alter: true });
    console.log('Database models synced.');

    // 4. Seed initial data
    await seedInitialData();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

init();

