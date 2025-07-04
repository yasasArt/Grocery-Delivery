import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Only store the hashed password
    cartItems: { type: Object, default: [] } // Should be an array, not an object
}, { minimize: false, timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;