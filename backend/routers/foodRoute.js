import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer'; // para manejar la subida de archivos como imagenes

const foodRouter = express.Router(); // Al usarlo podemos definir el GET, POST

// Imagenes storage config con multer
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=> {
        return cb(null,`${Date.now()}${file.originalname}`); // Este file se guardara en uploads con un nombre unico
    }
})

const upload = multer({storage:storage});

foodRouter.post("/add",upload.single('image'), addFood); // el addFood controller maneja la logica de añadir un food item
foodRouter.get("/list", listFood); // lista todos los food items
foodRouter.post("/remove", removeFood); // quita un food item


export default foodRouter;