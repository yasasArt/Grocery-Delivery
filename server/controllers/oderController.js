import Order from '../models/Order.js';
import Product from '../models/Product.js';

//place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
     try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' });
        }
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.productId);
            return (await acc) + (product.offerprice * item.quantity); 
        },0);
        // Add Tax Charges (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
           
        });

        return res.json({ success: true, message: 'Order placed successfully' });


    }catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

//Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentMethod: 'COD' }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });
        res.json({ success: true, orders });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Get All Orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentMethod: 'COD' }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });
        res.json({ success: true, orders });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}