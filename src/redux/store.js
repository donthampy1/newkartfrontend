import { combineReducers, configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice.js'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import filterReducer from './user/filterSlice.js'


const rootReducer = combineReducers({user: useReducer,filters: filterReducer})
const persistConfig = {
    key: 'root' ,
    version: 1,
    storage,
    blacklist: ['filters'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const  store = configureStore ({
    reducer:  persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})


export const persistor = persistStore(store)