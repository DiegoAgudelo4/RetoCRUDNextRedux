import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import pokeReducer from '../features/reduxDucks/pokeDucks'
//es como definir un usestate por fuera de la aplicacion
//un slice es una parte de todo el estado

//useDispatch: funciones que queramos llamar para actualizar el estado
//useSelector la forma que queremos traer algo desde el estado
export const store = configureStore({
  reducer: {
    users: userReducer,
    pokemones: pokeReducer

  }

});
