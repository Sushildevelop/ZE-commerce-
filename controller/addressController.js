const {Addresses}=require('../models')


const { Address } = require('../models');

// Create a new address
const createAddress = async (req, res) => {
  try {
    const userId = req.user.id; // from authentication middleware
    const {
        addressLine1,
        addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      type
    } = req.body;

    const newAddress = await Addresses.create({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      type
    });

    return res.status(201).json(newAddress);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Get all addresses for a user
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Addresses.findAll({
      where: { userId }
    });

    return res.status(200).json(addresses);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update an address
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const address = await Addresses.findOne({ where: { id, userId } });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await address.update(req.body);

    return res.status(200).json(address);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const address = await Addresses.findOne({ where: { id, userId } });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await address.destroy();

    return res.status(200).json({ message: 'Address deleted successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress
};


