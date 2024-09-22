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
    res.status(200).json({message:'GET Request - Fetching all users!', users})
})

//POST Request
app.post('/api/users',(req,res)=>{
    const body = req.body;
    const newUser = {
        id: users.length + 1,
        ...body
    }
    users.push(newUser)
    res.status(201).json({message:'POST Request - Adding new User!', newUser})
        
})

//PUT Request
app.put('/api/users/:id',(req,res)=>{
    const body = req.body;
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user=> user.id === userId)

    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...body }

        // update user in array
        users[userIndex] = updatedUser
        res.status(200).json({ message: `User with id ${userId} updated 😊`, updatedUser })
    } else {
        res.status(404).json({ message: `User with id ${userId} not found 😢` })
    }
})

//DELETE Request
app.delete('/api/users/:id',(req, res)=>{
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user=> user.id === userId)

    if (userIndex!==-1) {
        users.splice(userIndex,1)
        res.status(200).json({message:`DELETE Request - User with id ${userId} deleted.`,})
    }
    else{
        res.status(404).json({message:`User with id ${userId}, Not Found`})
    }
})
app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
})