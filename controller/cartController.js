const { Carts, Products } = require('../models');



const addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;
  
      const product = await Products.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Check if already exists
      const existingCartItem = await Carts.findOne({
        where: { userId, productId }
      });
  
      if (existingCartItem) {
        // Update quantity
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        return res.status(200).json(existingCartItem);
      } else {
        // Add new cart item
        const cartItem = await Carts.create({
          userId,
          productId,
          quantity
        });
        return res.status(201).json(cartItem);
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
        
   
module.exports={addToCart}