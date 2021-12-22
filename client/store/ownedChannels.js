import axios from "axios";
import socket from "../socket";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const GET_OWNED_CHANNELS = "GET_OWNED_CHANNELS";
const CLEAR_OWNED_CHANNELS = "CLEAR_OWNED_CHANNELS"

//  Action Creators

const getOwnedChannels = (channels) => {
  return {
    type: GET_OWNED_CHANNELS,
    channels,
  };
};

//  no thunk for this action. Used to clear local state only.
export const clearOwnedChannels = () => {
  return {
    type: CLEAR_OWNED_CHANNELS,
  }
}

//  Thunks / async calls

export const fetchOwnedChannels = () => async (dispatch) => {
  try {
    const data = await authenticateRequest("get", "/api/channels/owned");
    dispatch(getOwnedChannels(data));
  } catch (err) {
    console.log(err)
  }
};

//  I.State;

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OWNED_CHANNELS:
      return action.channels;
    case CLEAR_OWNED_CHANNELS:
      return initialState;
    default:
      return state
  }
}
