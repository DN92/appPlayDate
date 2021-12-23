import axios from "axios";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const SET_ALL_EVENTS = "SET_ALL_EVENTS";
const CLEAR_ALL_EVENTS = "CLEAR_ALL_EVENTS"

//  Action Creators

const setAllEvents = (events) => {
  return {
    type: SET_ALL_EVENTS,
    events,
  };
};

//  no thunk for this action. Used to clear local state only.
export const clearAllEvents = () => {
  return {
    type: CLEAR_ALL_EVENTS,
  }
}

//  Thunks / async backend calls

//  ask our backend for all events from our Database.
export const fetchAllEvents = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/events`);
      dispatch(setAllEvents(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//  I.State

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_ALL_EVENTS:
      return action.events
    case CLEAR_ALL_EVENTS:
      return initialState;
    default:
      return state;
  }
}
