import { combineReducers } from 'redux';

// Reducers
import { reducer as dashboard } from './Dashboard';
import { reducer as main } from './Main';
import { reducer as welcome } from './Welcome';

const viewsReducer = combineReducers({
  dashboard,
  main,
  welcome,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return viewsReducer(state, action);
  }
};
