
const { Orders } = require('../models')

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id
        const { orderNumber, totalAmount, status, paymentStatus, shippingAddressId, billingAddressId } = req.body

        const placeor = await Orders.findOne({
            where: { id: userId }
        })

        const createOrder = await Orders.create({
            userId,
            orderNumber,
            totalAmount,
            status,
            paymentStatus,
            shippingAddressId,
            billingAddressId

        })
        if (!createOrder) {
            return res.status(400).json("Order is not create")
        }
        return res.status(200).json(createOrder)

    } catch (error) {
        return res.status(501).json({ error: error.message })
    }
}

const cancelOrder=async(req,res)=>{
    try {
        const { orderNumber } = req.params;
        const userId = req.user.id; // from JWT middleware
    
        // Find the order
        const order = await Orders.findOne({ where: { orderNumber, userId } });
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        // Optional: Only allow delete if order is pending/cancelled
        if (order.status !== 'pending' && order.status !== 'cancelled') {
          return res.status(400).json({ message: 'Cannot delete order once shipped or delivered' });
        }
    
        // Delete the order
        await order.destroy();
    
        return res.status(200).json({ message: 'Order deleted successfully' });
        
    } catch (error) {
        return res.status(501).json({ error: error.message })
    }
}

module.exports = { placeOrder,cancelOrder }