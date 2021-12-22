import axios from "axios";
import socket from "../socket";
import { authenticateRequest } from "./gateKeepingMiddleWare";


const initialState = []

//  Reducer

export default (state = initialState, action) => {
  switch (action.type) {

    default:
      return state
  }
}
