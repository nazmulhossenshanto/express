import type { Request, Response } from "express";
import { pool } from "../../db/index.js";
import { userService } from "./user.service.js";

const getSingleUser = async(req: Request, res: Response)=>{
     const id = req.params.id;
     try {
       const result  = await userService.getSingleUserFromDB(id as string)
     if(result.rows.length === 0){
       res.status(404).json({
         success: false,
         message : "User not found",
         data: {}
       })
     };
     res.status(200).json({
       success: true, 
       message: "Single user retrive successfully", 
       data: result.rows
     })
       
     } catch (error: any) {
       res.status(500).json({
       success: false, 
       message: error.message, 
       error: error
     })
       
     }
     
 };

 const getAllUser = async(req: Request, res: Response)=>{
    
      try {
        const result  = await userService.getAllUserFromDB()
      res.status(200).json({
        success: true, 
        message: "All users retrive successfully", 
        data: result.rows
      });
      
        
      } catch (error: any) {
        res.status(500).json({
        success: false, 
        message: error.message, 
        error: error
      })
        
      }
      
  };
  const createUser =  async (req: Request, res: Response) => {
  
   try {
     const result = await userService.createUSerIntoDB(req.body)
       console.log(result);
   res.status(200).json({
     success: true,
     message: "User created successfully",
     data: result.rows[0],
   });
   } catch (error: any) {
     res.status(500).json({
     success: false,
     message: error.message,
     error: error,
   });
   }
 };

 const updateUser = async(req: Request, res: Response)=>{
   const id = req.params.id;
   try {
     const result = await userService.updateUserIntoDB(id as string, req.body)

       if(result.rows.length === 0){
       res.status(404).json({
         success: false,
         message : "User not found",
         data: {}
       })
     };
       res.status(200).json({
         success: true,
         message: "User updated successfully",
         data: result.rows
       })
   } catch (error: any) {
     res.status(500).json({
     success: false,
     message: error.message,
     error: error,
   });
   }
 };

 const deleteUser = async(req: Request, res: Response)=>{
   const id = req.params.id;
   try {
     const result = await userService.deleteUserFromDB(id as string)
     res.status(200).json({
         success: true,
         message: "User deleted successfully",
         data: null
       })
   } catch (error: any) {
     res.status(500).json({
     success: false,
     message: error.message,
     error: error,
   });
   }
 };

 export const userController = {
    getSingleUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
 }