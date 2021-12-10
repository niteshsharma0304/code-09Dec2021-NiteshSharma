import { createStore } from 'redux'
import RootReducer from '../Reducer/RootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import initialState from '../CommonUtils/InitialState';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export default ()=>{
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
}