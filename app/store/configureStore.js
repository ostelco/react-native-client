import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import api from '../middleware/api'
import rootReducer from '../reducers'


const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api)
)

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['pseudonyms', 'auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk, api))
  let persistor = persistStore(store)
  return { store, persistor }
}
