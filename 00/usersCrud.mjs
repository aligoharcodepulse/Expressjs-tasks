import express from 'express'

const app = express()
app.use(express.json())

const users = [
    {id:1, name:"Ali", email:"ali@gmail.com"},
    {id:2, name:"Alam", email:"alam@gmail.com"}
]
//GET Request
app.get('/api/users',(req,res)=>{
    res.status(200).json({message:'GET Request - Fetching all items!', users})
})
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
})