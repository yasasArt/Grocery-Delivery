import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    uesrId: { type: String, required: true, ref: 'User' },
    items: [
        {
            productId: { type: String, required: true, ref: 'Product' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    address: {type: String, required: true, ref: 'address'},
    status: { type: String, default: 'Pending' }, // e.g., Pending, Shipped, Delivered, Cancelled 
    paymentType: { type: String, required: true }, // e.g., Credit Card, PayPal, etc.
    isPaid: { type: Boolean, default: false, required: true }, // Indicates if the order has been paid
},{ timestamps: true  // Added timestamps for created/updated dates}
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;