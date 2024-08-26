//el patrón redux ducks no es una librería, solo es un patrón, este se compone de constantes, reducer y acciones en el mismo documento
import axios from "axios";

//constantes
const dataInicial = {
  array: [],
  offset: 0,
  limit: 6
}

const OBTENER_POKE_EXITOSO="Exito al obtener pokemones";
const SIGUIENTES_POKE_EXITOSO= "Exito al obtener los siguientes pokemones"

//reducer
export default function pokeReducer(state=dataInicial, action){
  switch(action.type){
    case OBTENER_POKE_EXITOSO:
      return {...state, array: action.payload}
    case SIGUIENTES_POKE_EXITOSO:
      return {...state, array: action.payload.array, offset: action.payload.offset}
    default:
      return state;
  }
}

//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) =>{
  const {offset, limit} = getState().pokemones
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    dispatch({
      type: OBTENER_POKE_EXITOSO,
      payload: res.data.results
    })
  } catch (error) {
    console.error(error)
  }
}

export const siguientePokemonAccion = () => async (dispatch, getState) =>{
  const {offset,limit} = getState().pokemones
  const siguiente = offset +limit
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    dispatch({
      type: SIGUIENTES_POKE_EXITOSO,
      payload: {
        array: res.data.results,
        offset: siguiente
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const anteriorPokemonAccion = () => async (dispatch, getState) =>{
  const {offset,limit} = getState().pokemones
  const siguiente = offset - limit
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    dispatch({
      type: SIGUIENTES_POKE_EXITOSO,
      payload: {
        array: res.data.results,
        offset: siguiente
      }
    })
  } catch (error) {
    console.error(error)
  }
}
