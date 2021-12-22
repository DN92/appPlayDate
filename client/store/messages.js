import axios from "axios";
import socket from "../socket";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const GET_MESSAGES = "GET_MESSAGES";
const CLEAR_MESSAGES = "CLEAR_MESSAGES"
//  Action Creators

const getMessages = (messages) => {
  return {
    type: GET_MESSAGES,
    messages,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  }
}

//  Thunks / async calls
//  fetches all messages using our backend;
export const fetchMessages = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/messages/`);
    //  send action object to the reduced reducer;
    dispatch(getMessages(data));
  } catch (err) {
    throw (err);
  }
};


//  I.State;

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case CLEAR_MESSAGES:
      return initialState
    default:
      return state
  }
}
