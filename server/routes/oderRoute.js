import express from 'express';
import authSeller from '../middlewares/authSeller.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/oderController.js';

const oderRouter = express.Router();

oderRouter.post('/cod', authSeller, placeOrderCOD);
oderRouter.get('/user', authSeller, getUserOrders);
oderRouter.get('/seller', authSeller, getAllOrders);

export default oderRouter;