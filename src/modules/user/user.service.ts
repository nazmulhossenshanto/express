import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import type { ICreateUser, IUpdateUser, IUser } from "./user.interface.js";

 const createUSerIntoDB = async(payLoad: ICreateUser)=>{
     const { name, email, password, age } = payLoad;
     const hashedPassword = await bcrypt.hash(password, 8);
       const result = await pool.query(`
         INSERT INTO
          users(name, email, password, age)
         VALUES($1, $2,$3,$4)
           RETURNING *
           `, [name, email, hashedPassword, age]);
           delete result.rows[0].password;
           return result.rows[0];
 };

 const getSingleUserFromDB = async(id: string)=>{
    const result  = await pool.query(`
     SELECT * from users where id=$1
     `, [id]);
     return result;

 };

 const getAllUserFromDB = async()=>{
    const result  = await pool.query(`
      SELECT * from users
      `);
      return result;
 };

 const updateUserIntoDB = async(id: string, payLoad: IUpdateUser)=>{
    const {name, email, password, age} = payLoad
     const result = await pool.query(`
      UPDATE users SET
       name=COALESCE($1, name), 
       email=COALESCE($2, email), 
       password=COALESCE($3, password), 
       age=COALESCE($4, age)
      where id=$5 RETURNING *
       `, [name, email, password, age,id]);
       return result;
 };

 const deleteUserFromDB = async(id: string)=>{
    const result = await pool.query(`
       DELETE FROM users where id=$1 
       RETURNING *`, [id]);
       return result;
 }



 export const userService = {
    createUSerIntoDB,
    getSingleUserFromDB,
    getAllUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB

 }