import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as UserReducer }  from './user/userReducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer=combineReducers({
    user:UserReducer,    
});

//Persist Store to LocalStorage
const persistedReducer=persistReducer(persistConfig,rootReducer);

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const store=createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)));

export default () => {  
  let persistor = persistStore(store)
  return { store, persistor }
}
