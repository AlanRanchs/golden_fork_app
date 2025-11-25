import foodModel from "../models/foodModel.js";
import fs from "fs";


// Añadir un nuevo food item 

// Esta es la API endpoint que maneja la logica de añadir un food item en la database

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`; // multer guarda la info del archivo subido en req.file

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename, // guardamos el nombre del archivo en la DB
    })
    // Este bloque try-catch maneja errores al guardar el food item en la DB
    try {
        await food.save();
        res.json({success: true, message: "Comida añadida exitosamente"});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error al añadir comida"});
    }
}

// toda la lista de comidas
const listFood = async (req, res) => {
    try {
        const foods =  await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error al listar comidas"});
    }
}

// Quitar un food item
const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) // borrar imagen del folder uploads

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Comida eliminada exitosamente"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error al eliminar comida"});
    }
}

export { addFood, listFood, removeFood }