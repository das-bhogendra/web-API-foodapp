import mongoose from "mongoose"; 
import { MONGODB_URI} from "../config/config"; 
export async function connectionDatabase(){
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected sucessfull");
    }catch(error){
        console.error("Database Error:",error);
        process.exit(1);
    }
}