import axios from "axios";
import socket from "../socket";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const GET_MESSAGES = "GET_MESSAGES";
const GOT_MESSAGE = "GOT_MESSAGE"
const CLEAR_MESSAGES = "CLEAR_MESSAGES"
//  Action Creators

const getMessages = (messages) => {
  return {
    type: GET_MESSAGES,
    messages,
  };
};

//  used by socket.io integration
export const gotMessage = (newMessage) => {
  return {
    type: GOT_MESSAGE,
    newMessage,
  };
};

//  no thunk for this action. Used to clear local state only.
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
    console.log(err);
  }
};

//  used to send a new message. Integrate with socket.io via EMIT
export const sendMessage = (message) => async (dispatch) => {
  try {
    const newMessage = await authenticateRequest(
      `post`,
      `/api/messages`,
      message
    );
    socket.emit("new-message", { newMessage, channel: newMessage.channelId });
  } catch (error) {
    console.error(error);
  }
};


//  I.State;

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case GOT_MESSAGE:
      return [...state.messages, action.newMessage];
    case CLEAR_MESSAGES:
      return initialState
    default:
      return state
  }
}
