import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import {register} from "./actions";

interface User {
  name: string;
  token: string;
}

const initialUser: User = {
  name: localStorage.getItem('name') || 'Guest',
  token: localStorage.getItem('token') || '',
};

const reducer = combineReducers({
  user: createReducer(initialUser)
    .handleAction([register.success], (state, action) => {
      return {
        name: state.name,
        token: action.payload,
      };
    }),
});

export default reducer;
