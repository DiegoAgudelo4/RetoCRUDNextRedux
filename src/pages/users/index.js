// ** MUI Imports
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import CircularProgress from '@mui/material/CircularProgress'

//--
import IconButton from '@mui/material/IconButton'
//import CloseIcon from '@mui/icons-material/Close';

//--
import { fetchUsers, fetchDeleteUser } from '../../app/services/apiUsers'
import API_URL from '../../app/urlUsers';

import UsersForm from './usersForm'

//-- redux
import { loadUsers } from "../../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";



const users = () => {
    const [Users, setUsers] = useState([])
    const [editUser, setEditUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch()
    //dispatch(loadUsers())
    const usersState = useSelector(state => state.users)
    //console.log(usersState)

    const getUsers = async (API_URL) => {
        try {
            const data = await fetchUsers(API_URL)
            //console.log(data)
            dispatch(loadUsers(data))
            //setData(data)
            //setUsers(data.results)
            setFilteredUsers(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getUsers(API_URL)

    }, [])

    useEffect(() => {
        setFilteredUsers(usersState)
    }, [usersState])

    const handleSearch = (searchTerm) => {
        const filtered = usersState.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchTerm(searchTerm)
        setFilteredUsers(filtered)
    }

    const handleAddUser = () => {
        setOpenModal(true)
    }
    const handleEditUser = (userId) =>{
        const edit=usersState.filter(user => user.id == userId)
        setEditUser(edit[0])
        
        setOpenModal(true)
    }

    const handleDeleteUser = (userId) => {
        fetchDeleteUser(API_URL, userId)
            .then(response => {
                if (response) {
                    console.log(response.message); // "Usuario eliminado exitosamente."
                    // Handle successful deletion, e.g., update UI
                    const newUsers = usersState.filter(user => user.id !== userId);
                    dispatch(loadUsers(newUsers))
                    setFilteredUsers(newUsers)
                } else {
                    console.error('Error al eliminar usuario.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handleClearSearch = () => {
        setFilteredUsers(usersState)
        setSearchTerm("")
    }
    if (loading) {
        return <CircularProgress align="center" />
    }

    if (error) {
        return <Typography color="error">Error fetching data: {error.message}</Typography>
    }


    return (
        <>{openModal ? (
            <UsersForm openModal={openModal} setOpenModal={setOpenModal} 
                        editUser={editUser} setEditUser={setEditUser} />
        ) : null}
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">Users</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            label="Search"
                                            variant="outlined"
                                            value={searchTerm}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            size="small"
                                        />
                                        {searchTerm && (
                                            <IconButton onClick={handleClearSearch}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    fill="#000000"
                                                >
                                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                                    <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7a.996.996 0 10-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.41z" />
                                                </svg>
                                            </IconButton>
                                        )}

                                    </TableCell>
                                    <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="contained" color="primary" onClick={handleAddUser}>
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Phone</TableCell>

                                    <TableCell align="right"
                                    >Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers ? (
                                    filteredUsers.map((User) => (
                                        <TableRow key={User.id}>
                                            <TableCell>
                                                {User.id}
                                            </TableCell>
                                            <TableCell>{User.name}</TableCell>
                                            <TableCell>{User.username}</TableCell>
                                            <TableCell>{User.phone}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleEditUser(User.id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDeleteUser(User.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default users
