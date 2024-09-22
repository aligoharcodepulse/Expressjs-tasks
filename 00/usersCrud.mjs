import express from 'express'

const app = express()
app.use(express.json())
const PORT = 3000;
const users = [
    {id:1, name:"Ali", email:"ali@gmail.com"},
    {id:2, name:"Alam", email:"alam@gmail.com"}
]
//GET Request
app.get('/api/users',(req,res)=>{
    res.status(200).json({message:'GET Request - Fetching all items!', users})
})

//POST Request
app.post('/api/users',(req,res)=>{
    const body = req.body;
    const newUser = {
        id: users.length + 1,
        ...body
    }
    users.push(newUser)
    res.status(201).json({message:'POST Request - Adding new item!', newUser})
        
})


app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
})