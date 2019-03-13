import { combineReducers } from 'redux';

// Reducers
import { reducer as connections } from './Connections';
import { reducer as dashboard } from './Dashboard';
import { reducer as main } from './Main';

const viewsReducer = combineReducers({
  connections,
  dashboard,
  main,
});

export default (state = {}, action: Object) => {
  switch (action.type) {
    default:
      return viewsReducer(state, action);
  }
};
