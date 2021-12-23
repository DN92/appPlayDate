import axios from "axios";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const SET_OWNED_EVENTS = "SET_OWNED_EVENTS";
const CLEAR_OWNED_EVENTS = "CLEAR_OWNED_EVENTS"

//  Action Creators

const setOwnedEvents = (events) => {
  return {
    type: SET_OWNED_EVENTS,
    events,
  };
};

//  no thunk for this action. Used to clear local state only.
export const clearOwnedEvents = () => {
  return {
    type: CLEAR_OWNED_EVENTS
  }
}

//  Thunks / async backend calls

//  ask our backend for events where createdBy = the user;
export const fetchOwnedEvents = () => async (dispatch) => {
  try {
    const data = await authenticateRequest("get", "/api/events/myevents");
    dispatch(setOwnedEvents(data));
  } catch (err) {
    console.error(err);
  }
};

//  I.State

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_OWNED_EVENTS:
      return action.events;
    case CLEAR_OWNED_EVENTS:
      return initialState;
    default:
      return state;
  }
}
