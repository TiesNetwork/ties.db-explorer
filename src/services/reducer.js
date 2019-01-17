import { combineReducers } from 'redux';

// Reducers
import modals from './modals';
import progress from './progress';

const servicesReducer = combineReducers({
  modals,
  progress,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return servicesReducer(state, action);
  }
};
