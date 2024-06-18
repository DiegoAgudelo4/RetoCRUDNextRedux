import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name:'users',
    initialState: [],
    reducers:{
        addUser:(state,action) =>{
           console.log(state,action) 
           state.push(action.payload)
        },
        loadUsers:(state,action) =>{
            return action.payload
        },
        updateUser: (state, action) => {
            const { id, name, username, phone } = action.payload
            const user = state.find(user => user.id === id)
            if (user) {
                if (name !== undefined) user.name = name
                if (username !== undefined) user.username = username
                if (phone !== undefined) user.phone = phone
            }
        }
    }
})

export const {addUser,loadUsers,updateUser} = userSlice.actions
export default userSlice.reducer