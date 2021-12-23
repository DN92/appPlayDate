import axios from "axios";
import socket from "../socket";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const GET_CHANNELS = "GET_CHANNELS";
const ADD_CHANNEL = "ADD_CHANNEL";
const REMOVE_CHANNEL = "REMOVE_CHANNEL";
const CLEAR_CHANNELS = "CLEAR_CHANNELS";
//  Action Creators

const _getChannels = (channels) => {
  return {
    type: GET_CHANNELS,
    channels,
  };
};

const addChannel = (newChannel) => {
  return {
    type: ADD_CHANNEL,
    newChannel,
  }
};

const removeChannel = (id) => {
  return {
    type: REMOVE_CHANNEL,
    id,
  }
};

//  no thunk for this action. Used to clear local state only.
export const clearChannels = () => {
  return {
    type: CLEAR_CHANNELS,
  }
}

//  Thunks / async calls

//  get all chat channels from Database.
export const getChannels = () => async (dispatch) => {
  try {
    const {data} = await axios.get("/api/channels");
    dispatch(_getChannels(data));
  } catch (error) {
    console.error(error);
  }
};

//  add a chat channel to our database
export const createChannel = (channel, history) => async (dispatch) => {
  try {
    const newChannel = await authenticateRequest(
      "post",
      "/api/channels",
      channel
    );
    dispatch(addChannel(newChannel));
    history.push(`/chat/channels/${newChannel.id}`);
  } catch (err) {
    console.log(error);
  }
};

//  allow user to delete a chat channel they made/ or an admin upon
//    feature implementation.
export const deleteChannel = (id, history) => async (dispatch) => {
  try {
    await authenticateRequest("delete", `/api/channels/${id}`);
    dispatch(removeChannel(id));
    // redirect browser to main chat channel
    history.push(`/chat/channels/${1}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//  I.State;

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels;
    case ADD_CHANNEL:
      return [...state, action.newChannel];
    case REMOVE_CHANNEL:
      return [...state.channels.filter((channel) => channel.id !== action.id)];
    case CLEAR_CHANNELS:
      return initialState;
    default:
      return state
  }
}
