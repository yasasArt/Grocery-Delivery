import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRouter.js';
import connectCloudinary from './configs/coloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cardRoute.js';
import addressRouter from './routes/addressRoute.js';
import oderRouter from './routes/oderRoute.js';


const app = express();
const port = process.env.PORT ||4000;

await connectDB()
await connectCloudinary()

//Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/',(req, res)=> res.send("Api is working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', oderRouter)

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})