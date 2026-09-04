const Service = require('../models/Service');
const RequestHistory = require('../models/RequestHistory');

// Setup dummy services if none exist
exports.seedServices = async (req, res) => {
  try {
    const count = await Service.count();
    if (count === 0) {
      const dummyServices = [
        { title: "Mobile Recharge", description: "Instant mobile recharge", category: "Recharge", price: 0, icon: "Smartphone" },
        { title: "DTH Recharge", description: "Recharge your DTH", category: "Recharge", price: 0, icon: "Tv" },
        { title: "Electricity Bill", description: "Pay electricity bills", category: "Utility", price: 0, icon: "Zap" },
        { title: "Water Bill", description: "Pay water bills", category: "Utility", price: 0, icon: "Droplet" },
        { title: "Credit Card Bill", description: "Pay CC bills", category: "Finance", price: 0, icon: "CreditCard" },
        { title: "Flight Booking", description: "Book flights", category: "Travel", price: 0, icon: "Plane" }
      ];
      await Service.bulkCreate(dummyServices);
      res.json({ message: 'Services seeded successfully' });
    } else {
      res.json({ message: 'Services already exist' });
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.requestService = async (req, res) => {
  const { serviceId, amount, mode } = req.body;
  try {
    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const refId = 'RP-' + Math.floor(10000 + Math.random() * 90000);
    
    const newRequest = await RequestHistory.create({
      refId,
      amount,
      mode: mode || 'Online',
      status: 'Pending',
      userId: req.user.id,
      serviceId: service.id
    });

    res.json({ success: true, request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getMyHistory = async (req, res) => {
  try {
    const history = await RequestHistory.findAll({
      where: { userId: req.user.id },
      include: [{ model: Service, as: 'service' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
