import { setValueDeep } from './reducerPrototype';
import { debug, group } from './logger';
import { Key, FetchTime, Result, Error, State, Action } from '../types';

interface SetKeyParams {
  state: State;
  key: Key;
  fetchTime: FetchTime;
  result: Result;
  error: Error;
}

const increase = (v: number = 0) => v + 1;
const decrease = (v: number = 0) => v - 1 > 0 ? v - 1 : 0;

const setKey = ({ state, key, fetchTime, result, error }: SetKeyParams) => {
  setValueDeep(state, [key, 'fetchTime'], fetchTime);
  if (result !== undefined) {
    setValueDeep(state, [key, 'result'], result);
  }
  setValueDeep(state, [key, 'error'], error); // as well error ===  undefined
  setValueDeep(state, [key, 'loading'], decrease, true);
  return state;
};

export const reducer = (state: State, action: Action, actionTypes: any, enableLogInDev?: boolean) => {
  const { LOAD, SET, RESET } = actionTypes;
  switch (action.type) {
    case LOAD: {
      const { key } = action.payload;
      if (enableLogInDev) {
        debug(LOAD, key);
      }
      setValueDeep(state, [key, 'loading'], increase, true);
      return state;
    }
    case SET: {
      const { key, result, error } = action.payload;
      const fetchTime = new Date().getTime();
      const nextState = setKey({ state, key, fetchTime, result, error });
      if (enableLogInDev) {
        if (error) {
          console.error(error.message);
        }
        group({ actionType: SET, key, result, error, nextState });
      }
      return nextState;
    }
    case RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};
