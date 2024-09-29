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
app.get('/api/users',(req,res)=>{
    res.status(200).json({message:'Fetching All Users', data: users})
})

// Create new user
app.post('/api/users', (req, res) => {
    const body = req.body;

    const newUser = {
        id: users.length + 1,
        ...body
    }
    users.push(newUser)
    res.status(201).json({ message: 'New user created!', data: newUser })
})

// Update user
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body }

        // update user in array
        users[userIndex] = updatedUser
        res.status(200).json({ message: `User with id ${userId} updated!`, updatedUser })
    } else {
        res.status(404).json({ message: `User with id ${userId}, Not found!` })
    }
})


//Delete user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex !== -1) {
        users.splice(userIndex, 1)
        res.status(200).json({ message: `User with id ${userId} deleted!` })
    } else {
        res.status(404).json({ message: `User with id ${userId}, Not found!` })
    }
})
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})