import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' }, // Fix typo: uesrId -> userId
    items: [
        {
            productId: { type: String, required: true, ref: 'Product' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: 'address' },
    status: { type: String, default: 'Pending' }, // e.g., Pending, Shipped, Delivered, Cancelled 
    paymentType: { type: String, required: true }, // e.g., Credit Card, PayPal, etc.
    isPaid: { type: Boolean, default: false, required: true }, // Indicates if the order has been paid
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;