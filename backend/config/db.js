import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://alanrodriguez:Elalan1234@cluster0.menmvn6.mongodb.net/golden_fork_app').then(() => console.log("MongoDB connected"));
}