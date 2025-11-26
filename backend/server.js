import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routers/foodRoute.js';
import userRouter from './routers/userRoute.js';
import 'dotenv/config';

//app config 
const app = express();
const port = 4000;

//middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter);
app.use("/images", express.static("uploads")) // servir imagenes estaticas desde la carpeta uploads
app.use('/api/user', userRouter);

app.get("/",(req,res)=> {
    res.send("API Working")
}) ;

app.listen(port, ()=> {
    console.log(`Server Started on http://localhost:${port}`);
})

