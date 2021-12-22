import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import users from './users';
import messages from './messages'
import channels from './channels'
import ownedChannels from './ownedChannels'
import participantChannels from './participantChannels'
import events from './events';
import places from './places';
import selectedPlace from './selectedPlace';

const reducer = combineReducers({
  auth,
  users,
  messages,
  channels,
  ownedChannels,
  participantChannels,
  events,
  places,
  selectedPlace
 });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
