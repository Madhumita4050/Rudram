const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Registration = require('../models/Registration');
const RequestHistory = require('../models/RequestHistory');
const Service = require('../models/Service');
const ContactMessage = require('../models/ContactMessage');

// ==================== DASHBOARD STATS ====================
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalRegistrations = await Registration.count();
    const completedRegistrations = await Registration.count({ where: { paymentStatus: 'Completed' } });
    const pendingRegistrations = await Registration.count({ where: { paymentStatus: 'Pending' } });
    const totalRequests = await RequestHistory.count();
    const completedRequests = await RequestHistory.count({ where: { status: 'Completed' } });
    const totalServices = await Service.count();
    const pendingMessages = await ContactMessage.count({ where: { status: 'Pending' } });

    // Calculate revenue from completed registrations (based on feeAmount) + completed requests
    const regRevenue = await Registration.sum('feeAmount', { where: { paymentStatus: 'Completed' } }) || 0;
    const requestRevenueAgg = await RequestHistory.sum('amount', { where: { status: 'Completed' } }) || 0;
    const totalRevenue = regRevenue + requestRevenueAgg;

    // Recent 5 registrations
    const recentRegistrations = await Registration.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    // Recent 5 requests
    const recentRequests = await RequestHistory.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'user', attributes: ['name', 'email'] },
        { model: Service, as: 'service', attributes: ['title', 'category', 'icon'] }
      ]
    });

    res.json({
      stats: {
        totalUsers,
        totalRegistrations,
        completedRegistrations,
        pendingRegistrations,
        totalRequests,
        completedRequests,
        totalServices,
        pendingMessages,
        totalRevenue: Math.round(totalRevenue)
      },
      recentRegistrations,
      recentRequests
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

// ==================== REGISTRATIONS MANAGEMENT ====================
exports.getAllRegistrations = async (req, res) => {
  try {
    const { search, role, paymentStatus, page = 1, limit = 20 } = req.query;
    const where = {};

    if (role && role !== 'All') {
      where.role = role;
    }
    if (paymentStatus && paymentStatus !== 'All') {
      where.paymentStatus = paymentStatus;
    }
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { contactNumber: { [Op.like]: `%${search}%` } },
        { district: { [Op.like]: `%${search}%` } },
        { state: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Registration.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      registrations: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations', error: error.message });
  }
};

exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registration', error: error.message });
  }
};

exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, feeAmount, transactionId, adminNotes } = req.body;

    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (paymentStatus !== undefined) registration.paymentStatus = paymentStatus;
    if (feeAmount !== undefined) registration.feeAmount = parseFloat(feeAmount) || 0;
    if (transactionId !== undefined) registration.transactionId = transactionId;
    if (adminNotes !== undefined) registration.adminNotes = adminNotes;

    await registration.save();

    res.json({ message: 'Registration updated successfully', registration });
  } catch (error) {
    res.status(500).json({ message: 'Error updating registration', error: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    await registration.destroy();
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting registration', error: error.message });
  }
};

// ==================== USER MANAGEMENT ====================
exports.getAllUsers = async (req, res) => {
  try {
    const { search, role, status } = req.query;
    const where = {};

    // Strictly exclude admin accounts so they are never visible in general user list
    if (role && role !== 'All') {
      where.role = role === 'admin' ? 'user' : role;
    } else {
      where.role = { [Op.ne]: 'admin' };
    }

    if (status && status !== 'All') where.status = status;
    if (search) {
      const baseRole = where.role;
      where[Op.and] = [
        { role: baseRole },
        {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } }
          ]
        }
      ];
      delete where.role;
    }

    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.json({ message: `User role updated to ${role}`, user: { id: user.id, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    await user.save();

    res.json({ message: `User status changed to ${status}`, user: { id: user.id, status: user.status } });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
};

exports.updateUserWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, action } = req.body; // action: 'credit' or 'debit'

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const numAmount = parseFloat(amount) || 0;
    if (action === 'credit') {
      user.walletBalance = (user.walletBalance || 0) + numAmount;
    } else if (action === 'debit') {
      user.walletBalance = Math.max(0, (user.walletBalance || 0) - numAmount);
    } else {
      user.walletBalance = numAmount;
    }

    await user.save();
    res.json({ message: 'Wallet balance updated', walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error updating wallet', error: error.message });
  }
};

// ==================== SERVICE REQUESTS MANAGEMENT ====================
exports.getAllRequests = async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status && status !== 'All') {
      where.status = status;
    }
    if (search) {
      where.refId = { [Op.like]: `%${search}%` };
    }

    const requests = await RequestHistory.findAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Service, as: 'service' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await RequestHistory.findByPk(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();

    res.json({ message: 'Request status updated', request });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request status', error: error.message });
  }
};

// ==================== SERVICE CATALOG MANAGEMENT ====================
exports.createService = async (req, res) => {
  try {
    const { title, description, category, price, icon } = req.body;
    const service = await Service.create({
      title,
      description,
      category,
      price: price || 0,
      icon: icon || 'Briefcase'
    });
    res.status(201).json({ message: 'Service created', service });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, price, icon } = req.body;

    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (title) service.title = title;
    if (description !== undefined) service.description = description;
    if (category) service.category = category;
    if (price !== undefined) service.price = price;
    if (icon) service.icon = icon;

    await service.save();
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

// ==================== CONTACT & GRIEVANCES ====================
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, type, subject, message } = req.body;
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      type: type || 'Contact',
      subject,
      message,
      status: 'Pending'
    });
    res.status(201).json({ message: 'Message submitted successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting message', error: error.message });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const { status, type } = req.query;
    const where = {};
    if (status && status !== 'All') where.status = status;
    if (type && type !== 'All') where.type = type;

    const messages = await ContactMessage.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    const message = await ContactMessage.findByPk(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    if (status) message.status = status;
    if (adminReply !== undefined) message.adminReply = adminReply;

    await message.save();
    res.json({ message: 'Message status updated', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
};

// ==================== USER DASHBOARD SUMMARY ====================
exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Recent requests
    const recentRequests = await RequestHistory.findAll({
      where: { userId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: Service, as: 'service' }]
    });

    // Check if user has an active registration application with their email
    const registrations = await Registration.findAll({
      where: { email: user.email },
      order: [['createdAt', 'DESC']]
    });

    const totalRequestsCount = await RequestHistory.count({ where: { userId } });
    const totalSpent = await RequestHistory.sum('amount', { where: { userId, status: 'Completed' } }) || 0;

    res.json({
      user,
      walletBalance: user.walletBalance || 0,
      totalRequestsCount,
      totalSpent,
      recentRequests,
      registrations
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ message: 'Error fetching user dashboard', error: error.message });
  }
};

// ==================== ADMIN PROFILE & SECURITY MANAGEMENT ====================
exports.getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await User.findByPk(adminId, {
      attributes: { exclude: ['password'] }
    });
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin account not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Error fetching admin profile', error: error.message });
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, email, phone, currentPassword, newPassword } = req.body;

    const admin = await User.findByPk(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin account not found or access denied' });
    }

    // Email update check
    if (email && email.toLowerCase() !== admin.email.toLowerCase()) {
      const trimmedEmail = email.toLowerCase().trim();
      const existingUser = await User.findOne({
        where: {
          email: trimmedEmail,
          id: { [Op.ne]: adminId }
        }
      });
      if (existingUser) {
        return res.status(400).json({ message: 'This email address is already registered by another account.' });
      }
      admin.email = trimmedEmail;
    }

    // Password update check
    if (newPassword && newPassword.trim() !== '') {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to update to a new password.' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
      }

      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password does not match.' });
      }

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }

    if (name) admin.name = name.trim();
    if (phone !== undefined) admin.phone = phone.trim();

    await admin.save();

    // Generate renewed JWT token
    const payload = { user: { id: admin.id, role: admin.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'rudran_jwt_secret_key_2026', { expiresIn: '7d' });

    res.json({
      message: 'Admin profile and credentials updated successfully.',
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        walletBalance: admin.walletBalance,
        status: admin.status,
        avatar: admin.avatar,
        updatedAt: admin.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    res.status(500).json({ message: 'Error updating admin credentials', error: error.message });
  }
};
