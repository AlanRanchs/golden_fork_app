import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Realizar un pedido de usuario para el frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            payment:false  // Se actualizará a true cuando se confirme el pago
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}}); // Vaciar el carrito después de realizar el pedido

        // Crear sesión de pago con Stripe

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "mxn",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100  // Convertir pesos a centavos
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "mxn",
                product_data: {
                    name: "Costo de envío",
                },
                unit_amount: 200  // $2.00 MXN en centavos
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true, session_url: session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al realizar el pedido"});
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message: "Pago verificado y pedido completado"});
        }
        else{
         await orderModel.findByIdAndDelete(orderId);
            res.json({success:true, message: "Pago fallido, pedido cancelado"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al verificar el pedido"});
    }
}

// ordenes de usuario para el frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al obtener las órdenes del usuario"});
    }
}

// Listar todas las órdenes (para admin)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al obtener las órdenes"});
    }
}

// Api para actualizar el estado de la orden (preparando, enviado, entregado) - para admin

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success:true, message: "Estado de la orden actualizado"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al actualizar el estado de la orden"});
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };