import axios from "axios";
import socket from "../socket";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const GET_PARTICIPANT_CHANNELS = "GET_PARTICIPANT_CHANNELS";
const CLEAR_PARTICIPANT_CHANNELS = "CLEAR_PARTICIPANT_CHANNELS"

//  Action Creators

const getParticipantChannels = (channels) => {
  return {
    type: GET_PARTICIPANT_CHANNELS,
    channels,
  };
};

//  no thunk for this action. Used to clear local state only.
export const clearParticipantChannels = () => {
  return {
    type: CLEAR_PARTICIPANT_CHANNELS,
  }
}

//  Thunks / async calls

//  fetch channels that the used has posted at least one message in
//    from our database.
export const fetchParticipantChannels = () => async (dispatch) => {
  try {
    const data = await authenticateRequest(
      "get",
      "api/messages/channels/participant"
    );
    dispatch(getParticipantChannels(data));
  } catch (err) {
    console.error(err);
  }
};

//  I.State;

const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTICIPANT_CHANNELS:
      return action.channels;
    case CLEAR_PARTICIPANT_CHANNELS:
      return initialState;
    default:
      return state
  }
}
