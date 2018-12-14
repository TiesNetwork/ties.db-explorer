import { combineReducers } from 'redux';

// Reducers
import { reducer as dashboard } from './Dashboard';
import { reducer as welcome } from './Welcome';

const viewsReducer = combineReducers({
  dashboard,
  welcome,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return viewsReducer(state, action);
  }
};
