import { combineReducers } from 'redux';

// Reducers
import modals from './modals';

const servicesReducer = combineReducers({
  modals,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return servicesReducer(state, action);
  }
};
