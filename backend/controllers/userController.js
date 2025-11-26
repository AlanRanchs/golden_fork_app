import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

// login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
    const user = await userModel.findOne({email});

        if(!user) {
            return  res.json({success:false, message:"Usuario no encontrado"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success:false, message:"Credenciales invalidas"})
        }

        const token = createToken(user._id);
        res.json({success:true, token});

    }
    catch (error) {
        console.log(error);
        res.json({success:false, message:"Error al iniciar sesion"});
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body
    try {
        // validar si el usuario ya existe
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({success:false, message:"El usuario ya existe"})
        }

        // validar formato de email y password segura
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Ingrese un email valido"})
        }

        if(password.length < 8) {
            return res.json({success:false, message:"Ingrese una contraseña segura"})
        }

        // encriptar la contraseña del usuario
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error al registrar el usuario"});
    }
}

export { loginUser, registerUser }