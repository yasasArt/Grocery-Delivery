import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// The field name should match the one used in your client FormData append (e.g., 'images' or 'image')
// If your client uses formData.append('images', file), use 'images' here:
productRouter.post('/add', upload.array('images'), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.put('/stock', authSeller, changeStock);

export default productRouter;