import type { Request, Response } from "express";
import { profileService } from "./profile.service.js";

const createProfile = async(req: Request, res: Response)=>{
    
   
    try {
        const profile = await profileService.createProfileIntoDB(req.body);
    console.log(profile);
    if(!profile ){
       return res.status(404).json({
        success: false,
        message: "Profile cannot create", 
        data: null
    })
    }
    res.status(201).json({
        success: true,
        message: "Profile created successfully", 
        data: profile
    })
        
    } catch (error: any) {
        res.status(404).json({
        success: false,
        message: error.message, 
        error: error
    })
        
    }
};

export const profileController = {
    createProfile
}