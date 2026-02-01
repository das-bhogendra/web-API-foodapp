"use server"

import { success } from "zod";
import {loginUser, registerUser} from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";
export const handleRegister = async(formData: any)=>{
    try{
        const result = await registerUser(formData);
        //handle how to send data back to component
        if(result.success){
            return{
                success:true,
                message: "Registration sucessful",
                data: result.data
            };
        }
        return{
            success: false,
            message:result.message || "registration failed"
        }
    } catch(err:Error | any){
        return{
            sucess:false, message:err.message || "Registration failed"
        }
    }
}

export const handleLogin = async(formData: any)=>{
    try{
        const result = await loginUser(formData);
        //handle how to send data back to component
        if(result.success){
            await setUserData(result.data)
            await setAuthToken(result.token)
            return{
                success:true,
                message: "Login sucessful",
                data: result.data
            };
        }
        return{
            success: false,
            message:result.message || "Login failed"
        }
    } catch(err:Error | any){
        return{
            sucess:false, message:err.message || "Login failed"
        }
    }
}

export async function handleUpdateProfile(profileData: FormData) {
    try {
        const result = await updateProfile(profileData);
        if (result.success) {
            await setUserData(result.data); // update cookie 
            revalidatePath('/user/profile'); // revalidate profile page/ refresh new data
            return {
                success: true,
                message: 'Profile updated successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to update profile' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}