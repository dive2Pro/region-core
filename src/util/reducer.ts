import { setValueDeep } from './reducerPrototype';
import { Key, FetchTime, Result, Error, State, Action } from '../types';

interface SetKeyParams {
  state: State;
  key: Key;
  fetchTime: FetchTime;
  result: Result;
  results: any;
  id: any;
  error: Error;
}

const increase = (v: number = 0) => v + 1;
const decrease = (v: number = 0) => v - 1 > 0 ? v - 1 : 0;

const setKey = ({ state, key, result, results, id, fetchTime, error }: SetKeyParams) => {
  setValueDeep(state, [key, 'fetchTime'], fetchTime);
  if (id !== undefined) {
    setValueDeep(state, [key, 'results'], results);
    setValueDeep(state, [key, 'id'], id);
  } else if (result !== undefined) {
    setValueDeep(state, [key, 'result'], result);
  }
  setValueDeep(state, [key, 'error'], error); // as well error ===  undefined
  setValueDeep(state, [key, 'loading'], decrease);
  return state;
};

export const reducer = (state: State, action: Action, actionTypes: any) => {
  const { LOAD, SET, RESET } = actionTypes;
  switch (action.type) {
    case LOAD: {
      const { key } = action.payload;
      setValueDeep(state, [key, 'loading'], increase);
      return state;
    }
    case SET: {
      const { key, result, results, id, error } = action.payload;
      const fetchTime = new Date().getTime();
      const nextState = setKey({ state, key, result, results, id, fetchTime, error });
      if (error) {
        console.error(error.message);
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
