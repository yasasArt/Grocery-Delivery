import express from 'express';
import {upload} from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// Fix: use upload.array('image') -- 'image' is the field name as a string
productRouter.post('/add', upload.array('image'), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.put('/stock', authSeller, changeStock);

export default productRouter;