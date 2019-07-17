import axios from 'axios'
export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

//https://udemy-utils.herokuapp.com/api/v1/events?token=token123
//http://localhost:5000/
// const QUERYSTRING = '?token=token123'

const payload = 'http://localhost:5000' 

export const readEvents = () => async dispatch => {
  const response = await axios.get(`${payload}/events`)
  dispatch({ type: READ_EVENTS, response })
}

export const postEvent = values => async dispatch => {
  const response = await axios.post(`${payload}/events`, values)
  dispatch({ type: CREATE_EVENT, response })
}

export const patchEvent = values => async dispatch => {
  const response = await axios.patch(`${payload}/events/${values.id}`, values)
  dispatch({ type: UPDATE_EVENT, response })
}

export const getEvent = id => async dispatch => {
  const response = await axios.get(`${payload}/events/${id}`)
  dispatch({ type: READ_EVENT, response })
}

export const deleteEvent = id => async dispatch => {
  await axios.delete(`${payload}/events/${id}`)
  dispatch({ type: DELETE_EVENT, id })
}
