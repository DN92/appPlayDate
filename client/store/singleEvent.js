import axios from "axios";
import { authenticateRequest } from "./gateKeepingMiddleWare";

//  Action Declarations

const SET_SINGLE_EVENT = "SET_SINGLE_EVENT";
const CLEAR_SINGLE_EVENT = "CLEAR_SINGLE_EVENT"

//  Action Creators


//  no thunk for this action. Used to clear local state only.


//  Thunks / async backend calls

//  I.State

const initialState = {}

//  Reducer

export default (state = initialState, action) => {
  switch(action.type) {

    default:
      return state;
  }
}
