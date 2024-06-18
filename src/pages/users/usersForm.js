import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
//--Redux
import { useSelector, useDispatch } from "react-redux";
import { addUser, loadUsers,updateUser } from "../../features/users/userSlice";
//--API
import { fetchCreateUser, fetchUpdateUser } from '../../app/services/apiUsers'
import API_URL from '../../app/urlUsers';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid rgba(0, 0, 0, 0.5)', // Set transparent border
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function UsersForm({ openModal, setOpenModal, editUser, setEditUser }) {
    const dispatch = useDispatch();
    const usersState = useSelector(state => state.users)

    // Initialize formData state with empty values or editUser values if available
    const initialFormData = editUser ? { ...editUser } : { id: '', name: '', username: '', phone: '' }
    const [formData, setFormData] = useState(initialFormData)
    const [exist, setExist] =useState(false)
    const [error, setError] = useState(null)

    // Handle form data changes
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (editUser) {
            //actualizar
            try {
                const updatedUserData = await fetchUpdateUser(API_URL, formData.id, formData)
                dispatch(updateUser(formData))
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setFormData({ id: '', name: '', username: '', phone: '' })
                setOpenModal(false);
                setEditUser(null)
            }
            return
        }

        const exist = usersState.filter(user => user.id == formData.id)
        if (exist.length == 0) {
            //crear
            try {
                const createdUser = await fetchCreateUser(API_URL, formData);
                dispatch(addUser(formData));
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setFormData({ id: '', name: '', username: '', phone: '' });
                setOpenModal(false);
                setEditUser(null)
            }
            return
        }
        setExist(true)

    };

    // Handle modal close
    const handleClose = () => {
        setOpenModal(false);
        setFormData({ id: '', name: '', username: '', phone: '' });
        setEditUser(null)
    };


    if (error) {
        return <Typography color="error">Error fetching data: {error.message}</Typography>
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Formulario de usuarios
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="id"
                        value={formData.id}
                        onChange={handleChange}
                        // Disable editing ID when editing a user
                        disabled={editUser != null}
                        type="number" // Assuming ID is a number
                    />
                    {exist && <label>Este id ya existe</label>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Teléfono"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel" // Set input type to "tel" for phone number formatting (optional)
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Guardar
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default UsersForm;
