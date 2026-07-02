import { Router, type Request, type Response } from "express";
import { profileController } from "./profile.controller.js";

const router = Router();

router.get('/', async(req:Request, res: Response)=>{
    res.send("This is profile route")
});

router.post('/', profileController.createProfile);


export const profileRoutes = router;