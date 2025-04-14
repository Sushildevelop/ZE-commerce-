const {Products, Orders, OrderItems}=require('../models')

const getOrderItems=async(req,res)=>{
  try {
    const {  orderId } = req.params;

    const orderItems = await OrderItems.findAll({
      where: {  orderId },
      include: [
        {
          model: Products,
          attributes: ['name', 'price']
        }
      ]
    });

    if (!orderItems.length) {
      return res.status(404).json({ message: 'No items found for this order.' });
    }

    res.status(200).json(orderItems);
    
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}

module.exports={getOrderItems}