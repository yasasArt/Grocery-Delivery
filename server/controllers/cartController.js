import User from '../models/User.js';

//update user cartData : /api/cart/update

export const updateCart = async (req, res) => {

    try {
        const { userId, cartData } = req.body;
        await User.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Cart updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
        
}