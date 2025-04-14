const { Orders, OrderItems, Products } = require('../models');

const placeOrder1 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    console.log(products);
    

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'No products to order.' });
    }

    // Create new order
    const newOrder = await Orders.create({
      userId,
      status: 'pending'
    });

    const orderItemsData = [];

    // Fetch prices from Products
    for (const item of products) {
      const product = await Products.findByPk(item.productId);
      
      if (!product) {
        return res.status(404).json({ error: `Product ID ${item.productId} not found.` });
      }

      orderItemsData.push({
        orderId: newOrder.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price // Capture the price at the time of order
      });
    }

    // Bulk create order items
    await OrderItems.bulkCreate(orderItemsData);

    return res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { placeOrder1 };
