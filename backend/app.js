const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors")
require('./Config/Db')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const adminrouter = require('./routers/adminroute')
const userrouter = require('./routers/userroute')


app.use("/",adminrouter)
app.use("/",userrouter)



app.listen(PORT, () => console.log("Server running on port " + PORT));