import express from "express";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3000;

const users = [
    {id:1, name:'Ali', email:'ali@gmail.com'},
    {id:2, name:'Alam', email:'alam@gmail.com'}
]

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong',
        error: true
    })
}

//Get all users
app.get('/',(req,res)=>{
    res.status(200).json({message:'Fetching All Users',data: users})
})


app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})