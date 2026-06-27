import express from "express"
import config from "./config/config.js";
const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})