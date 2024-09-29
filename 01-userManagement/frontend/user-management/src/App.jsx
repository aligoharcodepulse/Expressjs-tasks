import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import {Container, Typography, Input, Button, Table, TableContainer, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

const API_URL = 'http://localhost:3000/api/users'

function App() {
  const [users, setUsers]  = useState([])
  const [newUser, setNewUser] = useState('');
  const [updateUser, setUpdateUser] = useState({ id: '', name: '' });

  async function fetchUsers(){
    const response = await axios.get(API_URL)
    const content = response.data
    setUsers(content.data)
 }

 useEffect(()=>{
  fetchUsers()
 },[])

 // Add a user (CREATE)
 const addUser = () => {
  axios.post(API_URL, { name: newUser })
    .then(response => {
      setUsers([...users, response.data]);
      setNewUser(''); // Reset input
      fetchUsers()
    })
    .catch(err => console.error(err));
};

const updateUserById = (id) => {
  axios.put(`${API_URL}/${id}`, { name: updateUser.name })
    .then(response => {
      setUsers(users.map(user => (user.id === id ? response.data : user)));
      setUpdateUser({ id: '', name: '' }); // Reset input
      fetchUsers()
    })
    .catch(err => console.error(err));
};

// Delete a user (DELETE)
const deleteUserById = (id) => {
  axios.delete(`${API_URL}/${id}`)
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
    })
    .catch(err => console.error(err));
};

  return (
    <Container maxWidth='md' sx={{display:'flex',
      flexWrap:'wrap',
      flexDirection:'column',
      alignItems:'center',
      border:'1px solid #ccc',
      borderRadius:2,
      gap:2
       }}>
    <Typography variant='h4' mt={4} color='blue' fontWeight='bold'>CRUD Operations</Typography>
    <Typography variant='h4' color='blue' fontWeight='bold'>Express & React</Typography>
    <Container sx={{m:3,textAlign:'center'}}>
    <Input
      type="text"
      value={newUser.name}
      onChange={(e) => setNewUser(e.target.value)}
      placeholder="Enter Name"
      sx={{width:'70%',p:1, border:'1px solid #ccc', borderRadius:2,mr:'10px'}}
    />
    {/* <Input
      type="text"
      value={newUser.email}
      onChange={(e) => setNewUser(e.target.value)}
      placeholder="Enter Email"
      sx={{width:'40%',p:1, border:'1px solid #ccc', borderRadius:2,mr:'10px'}}
    /> */}
    <Button onClick={addUser}
    sx={{py:1.5, border:'1px solid #ccc', borderRadius:2}}
    variant='contained'
    >Add User</Button>
    </Container>


    {/* Update User */}
    {updateUser.id && (
      <Container sx={{m:3,textAlign:'center'}}>
        <Input
          type="text"
          value={updateUser.name}
          onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
          placeholder="Update user name"
          sx={{width:'70%',p:1, border:'1px solid #ccc', borderRadius:2,mr:'10px'}}
        />
        <Button onClick={() => updateUserById(updateUser.id)}
          variant='contained'
          sx={{py:1.5, border:'1px solid #ccc', borderRadius:2}}
          >Update User</Button>
      </Container>
    )}

<TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <EditIcon color="primary" 
                onClick={() => setUpdateUser({ id: user.id, name: user.name })}
                sx={{cursor:'pointer'}}
                />
              <DeleteIcon
                onClick={() => deleteUserById(user.id)} 
                sx={{cursor:'pointer',ml:1,color:'crimson'}}
                />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

    {/* <List>
      {users.map(user => (
        <ListItem key={user.id}>
          {user.name}
          <Button onClick={() => setUpdateUser({ id: user.id, name: user.name })}>
            Edit
          </Button>
          <Button onClick={() => deleteUserById(user.id)}>Delete</Button>
        </ListItem>
      ))}
    </List> */}
  </Container>
  )
}

export default App
