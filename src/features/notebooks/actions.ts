import {createAsyncAction} from "typesafe-actions";

export const register = createAsyncAction(
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE'
)<string, string, string>();
