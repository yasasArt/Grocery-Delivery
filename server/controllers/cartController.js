import User from '../models/User.js';

//update user cartData : /api/cart/update

export const updateCart = async (req, res) => {
    try {
        const { userId, cartData } = req.body;
        // If your User model uses 'cartItems' instead of 'cartData', update accordingly:
        await User.findByIdAndUpdate(userId, { cartItems: cartData });
        res.json({ success: true, message: 'Cart updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}