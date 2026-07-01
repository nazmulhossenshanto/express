 import express, {
   type Application,
 } from "express";
 const app: Application = express();
import { userRoutes } from "./modules/user/user.routes.js";
 
 app.use(express.json());
 app.get("/", (req, res) => {
   // res.send('Hello World!')
   res.status(200).json({
     success: true,
     message: "this is root route",
   });
 });

 app.use("/api/users", userRoutes)

 

 export default app;
 