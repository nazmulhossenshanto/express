import { Pool } from "pg";

 export const pool = new Pool({
   connectionString:
     "postgresql://neondb_owner:npg_7HcOBqknCNt0@ep-royal-smoke-ai8e5sa3-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
 });
 export const initDB = async () => {
   try {
     await pool.query(`
       CREATE TABLE IF NOT EXISTS users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(50),
       email VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       is_Active BOOLEAN DEFAULT true,
       age INT,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
       )
       `);


        await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(20),
        gender VARCHAR(10)
        
        )  
          `)
     console.log("Database connected successfully");
   } catch (error) {
     console.log(`Database err::`, error);
   }
 };