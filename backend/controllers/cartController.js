import userModel from '../models/userModel.js';

// Add to Cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message: "Comida agregada al carrito"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al agregar comida al carrito"});
    }
}

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        
        if (cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message: "Comida eliminada del carrito"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al eliminar comida del carrito"});
    }
}

// Traer datos del carrito
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error al obtener datos del carrito"});
    }
}

export { addToCart, removeFromCart, getCart };