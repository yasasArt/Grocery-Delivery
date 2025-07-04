import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    images: { type: Array, required: true }, // Fix: should be 'images' (array of URLs/paths)
    category: { type: Array, required: true }, // Fix: should be a string, not array
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

