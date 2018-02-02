import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import chart from '../redux/chartRedux';

const store = createStore(
  chart,
  applyMiddleware(thunk)
);

export default store;