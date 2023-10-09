import express from "express";
import 'dotenv/config'


const shoppingApp = express()




//middle ware parsing json
shoppingApp.use(express.json())





/**
 * 
 * Sever port configuration and listening
 */

const PORT= process.env.PORT ||8090;

shoppingApp.listen(PORT,()=>{
    console.log('\x1b[34m', `SERVER is listing on PORT ${PORT} 🚀`);
})
