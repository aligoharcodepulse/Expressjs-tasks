import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.end('GET Request - Fetching all items!')
})
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
})