import express from "express";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3000;

app.get('/',(req,res)=>{
    res.status(200).json({message:'Get All Users'})
})



app.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})