import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userController } from "./user.controller.js";

const router = Router();

 // get single user
 router.get("/:id",  userController.getSingleUser)
 // get all users
 router.get("/", userController.getAllUser);
 // create user
 router.post("/",userController.createUser);
 // update user
 router.put("/:id",  userController.updateUser)
 // delete user
 router.delete("/:id",  userController.deleteUser);

export const userRoutes = router;