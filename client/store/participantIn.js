import axios from "axios";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const SET_PARTICIPANT_IN = "SET_PARTICIPANT_IN";
const CLEAR_PARTICIPANT_IN = "CLEAR_ALL_EVENTS"

//  Action Creators

const setParticipantIn = (events) => {
  return {
    type: SET_PARTICIPANT_IN,
    events,
  };
};

//  no thunk for this action. Used to clear local state only.
export const clearParticipantIn = () => {
  return {
    type: CLEAR_PARTICIPANT_IN;
  }
}


//  Thunks / async backend calls

//  ask our backend for events that the user is a
//    participant in (through table)
export const fetchParticipantIn = () => async (dispatch) => {
  try {
    const data = await authenticateRequest("get", "/api/events/participating");
    dispatch(setParticipantIn(data));
  } catch (err) {
    console.error(err);
  }
};

//  I.State

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_PARTICIPANT_IN:
      return action.events;
    case CLEAR_PARTICIPANT_IN:
      return initialState;
    default:
      return state;
  }
}
