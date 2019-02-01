import { combineReducers } from 'redux';

// Reducers
import { reducer as transactions } from './Transactions';

const mainContainersReducer = combineReducers({
  transactions,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return mainContainersReducer(state, action);
  }
};
