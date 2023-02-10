import { createStore } from 'redux';
import RootReducer from './Reducers';

export const Store = () => {

  const store = createStore(
    RootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

  return store;
}
