import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as UserReducer }  from './user/userReducer';
import {reducer as AddSellerProductsReducer, sellerAllProductsReducer as SellerAllProductsReducer} from './seller_products/sellerProductsReducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { Select } from 'antd';
 

const persistConfig = {
  key: 'root',
  storage,  
  blacklist: [
    // 'user',
    "addSellerProducts"
  ],
}

const rootReducer=combineReducers({
    user:UserReducer,  
    addSellerProducts:AddSellerProductsReducer,
    sellerAllProducts:SellerAllProductsReducer
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
