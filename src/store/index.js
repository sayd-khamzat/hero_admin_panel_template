import {configureStore} from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice'

// //Функция, которая позволяет использовать в диспатче строку, вместо actionCreator
// const enhancer = (createStore) = (...args) => {
//     const store = createStore(...args);
//
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
//     return store;
// }
//
// создание store, используя enhancer
// const store = createStore(
//     combineReducers({heroes, filters}),
//     compose(
//         enhancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));

// создание store, используя middleware
// const store = createStore(combineReducers({heroes, filters}),
//     compose(
//         applyMiddleware(ReduxThunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )

//создание store с помощью Redux Toolkit
const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;