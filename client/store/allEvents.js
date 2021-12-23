import axios from "axios";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const SET_ALL_EVENTS = "SET_ALL_EVENTS";
const SET_SINGLE_EVENT = "SET_SINGLE_EVENT";
const MAKE_NEW_EVENT = "MAKE_NEW_EVENT";
const DEL_SINGLE_EVENT = "DEL_SINGLE_EVENT";
const CLEAR_ALL_EVENTS = "CLEAR_ALL_EVENTS";

//  Action Creators

const setAllEvents = (events) => {
  return {
    type: SET_ALL_EVENTS,
    events,
  };
};

const makeNewEvent = (event) => {
  return {
    type: MAKE_NEW_EVENT,
    event
  }
}

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
//  create a new event using our backend and add it to front end.
export const createSingleEvent = (body, history) => async () => {
  try {
    const data = await authenticateRequest("post", "/api/events", body);
    dispatch(makeNewEvent(data))
    //  redirect browser to detailed event view for newly created event.
    history.push(`/events/${data.id}`);
  } catch (error) {
    console.error(error);
  }
};

//  I.State

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_ALL_EVENTS:
      return action.events
    case MAKE_NEW_EVENT:
      return [...state, action.event]
  //  from singleEvent.js
    case SET_SINGLE_EVENT:
      return [...state.map(event => {
        if (event.id === action.event.id) {
          return action.event
        } else {
          return event;
        }
      })]
  //  from singleEvent.js
    case DEL_SINGLE_EVENT:
      return [...state.filter(event => {return event.id !== action.id})]
    case CLEAR_ALL_EVENTS:
      return initialState;
    default:
      return state;
  }
}
