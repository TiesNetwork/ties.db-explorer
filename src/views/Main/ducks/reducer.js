import { combineReducers } from 'redux';

// Reducers
import containers from '../containers/reducer';

const mainReducer = combineReducers({
  containers,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return mainReducer(state, action);
  }
};
