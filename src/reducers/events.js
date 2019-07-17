import _ from 'lodash'

//mannggil action
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from '../actions'

const initialState = {
  events: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

//            initail state
const wikwikwiwkwi = (events = initialState, action) => {

  switch (action.type) {
    
    case CREATE_EVENT:
      
    case READ_EVENT:
      

    case UPDATE_EVENT:
      const data = action.response.data
      return { ...events, [data.id]: data }

    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id')

    case DELETE_EVENT:
      delete events[action.id]
      return { ...events }

    default:
      return events
  }
}
export default wikwikwiwkwi;
