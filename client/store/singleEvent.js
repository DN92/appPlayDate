import axios from "axios";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const SET_SINGLE_EVENT = "SET_SINGLE_EVENT";
const MAKE_NEW_EVENT = "MAKE_NEW_EVENT";
const DEL_SINGLE_EVENT = "DEL_SINGLE_EVENT"
const CLEAR_SINGLE_EVENT = "CLEAR_SINGLE_EVENT"

//  Action Creators

const setSingleEvent = (event) => {
  return {
    type: SET_SINGLE_EVENT,
    event,
  };
};


const delSingleEvent = (id) => {
  return {
    type: DEL_SINGLE_EVENT,
    id
  }
}

//  no thunk for this action. Used to clear local state only.
export const clearSingleEvent = () => {
  return {
    type: CLEAR_SINGLE_EVENT,
  }
}

//  Thunks / async backend calls

//  fetch a singular event by Id type to set it as focus
export const fetchSingleEvent = (eventId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/events/${eventId}`);
    dispatch(setSingleEvent(data));
  } catch (error) {
    console.error(error);
  }
};

//  update focused event
export const updateSingleEvent = (id, body) => {
  return async (dispatch) => {
    try {
      const data = authenticateRequest('put', `/api/events/${id}`, body)
      dispatch(setSingleEvent(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//  creates user to event associations in our Database.
export const addUserToEvent = (eventId, targetId) => async (dispatch) => {
  try {
    const body = {targetId: targetId}
    const data = await authenticateRequest('put', `/api/userEvents/${eventId}`, body)
    dispatch(setSingleEvent(data));
  } catch (error) {
    console.error(error);
  }
};

//  delete focused event
export const deleteSingleEvent = (id) => async(dispatch) => {
  return async () => {
    try {
      await axios.delete(`/api/events/${id}`);
      dispatch(delSingleEvent(id))
    } catch (error) {
      console.error(error);
    }
  };
};

//  I.State

const initialState = {}

//  Reducer

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SINGLE_EVENT:
      return action.event
  //  from './allEvents'
    case MAKE_NEW_EVENT:
      return action.event
    case DEL_SINGLE_EVENT:
      return initialState;
    case CLEAR_SINGLE_EVENT:
      return initialState;
    default:
      return state;
  }
}
