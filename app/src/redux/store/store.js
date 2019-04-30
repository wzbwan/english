import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import mainReducer from '../reducers/mainReducer'
// let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

let finalReducer = combineReducers({

    mainReducer: mainReducer
})

export default function configureStore(initialState = {}) {
    let store = createStore(finalReducer, initialState, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))
    return store
}