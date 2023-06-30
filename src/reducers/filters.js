
// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

// создание Reducer с помощью Redux Toolkit
// тут иммутабельность можно не использовать, поскольку библиотека сама отвечает за это,
// но после state нельзя использовать return (также писать в одну строчку)
// const filters = createReducer(initialState, builder => {
//     builder
//         .addCase(filtersFetching, state => {
//             state.filtersLoadingStatus = 'loading';
//         })
//         .addCase(filtersFetched, (state, action) => {
//             state.filtersLoadingStatus = 'idle';
//             state.filters = action.payload;
//         })
//         .addCase(filtersFetchingError, state => {
//             state.filtersLoadingStatus = 'error';
//         })
//         .addCase(activeFilterChanged, (state, action) => {
//             state.activeFilter = action.payload;
//         })
//         .addDefaultCase(() => {});
// })

// Обычное создание Reducer
// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'ACTIVE_FILTER_CHANGED':
//             return {
//                 ...state,
//                 activeFilter: action.payload,
//             }
//         default:
//             return state;
//     }
// }
//
// export default filters;