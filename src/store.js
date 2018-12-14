import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

// Middleware
import { routerMiddleware, routerReducer as router } from 'react-router-redux';

// Reducers
import { reducer as form } from 'redux-form';
import views from './views/reducer';

const reducer = combineReducers({
  form,
  router,
  views,
});

export default (history: Object) => createStore(reducer, compose(
  applyMiddleware(
    routerMiddleware(history),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));
