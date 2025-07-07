import express from 'express';
import authSeller from '../middlewares/authSeller.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/oderController.js';
import authUser from '../middlewares/authUser.js';

const oderRouter = express.Router();

oderRouter.post('/cod', authUser, placeOrderCOD);
oderRouter.get('/user', authUser, getUserOrders);
oderRouter.get('/seller', authSeller, getAllOrders);

export default oderRouter;