import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/config.js";
const app: Application = express();
import { Pool } from "pg";

app.use(express.json());

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_7HcOBqknCNt0@ep-royal-smoke-ai8e5sa3-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(50) NOT NULL,
      is_Active BOOLEAN DEFAULT true,
      age INT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Database err::`, error);
  }
};
initDB();
app.get("/", (req, res) => {
  // res.send('Hello World!')
  res.status(200).json({
    success: true,
    message: "this is root route",
  });
});
// get single user
app.get("/api/users/:id", async(req: Request, res: Response)=>{
    const id = req.params.id;
    try {
      const result  = await pool.query(`
    SELECT * from users where id=$1
    `, [id]);
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
    
});
// get all users
app.get("/api/users", async(req: Request, res: Response)=>{
  
    try {
      const result  = await pool.query(`
    SELECT * from users
    `);
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
    
});
// create user
app.post("/api/users", async (req: Request, res: Response) => {
 
  try {
    const { name, email, password, age } = req.body;
  const result = await pool.query(`
    INSERT INTO
     users(name, email, password, age)
    VALUES($1, $2,$3,$4)
      RETURNING *
      `, [name, email, password, age]);
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
});
// update user
app.put("/api/users/:id", async(req: Request, res: Response)=>{
  const id = req.params.id;
  const {name, email, password, age} = req.body;
  try {
    const result = await pool.query(`
     UPDATE users SET
      name=COALESCE($1, name), 
      email=COALESCE($2, email), 
      password=COALESCE($3, password), 
      age=COALESCE($4, age)
     where id=$5 RETURNING *
      `, [name, email, password, age,id]);
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
})
// delete user
app.delete("/api/users/:id", async(req: Request, res: Response)=>{
  const id = req.params.id;
  try {
    const result = await pool.query(`
      DELETE FROM users where id=$1`, [id])
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
})
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
