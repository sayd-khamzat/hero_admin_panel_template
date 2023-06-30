import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// создание Thunk с помощью Redux Toolkit
// const fetchHeroes = createAsyncThunk(
//     'heroes/fetchHeroes',
//     () => {
//         const {request} = useHttp(); чтобы использовать тут, нужно убрать юзколбэк вокруг реквеста
//         return request("http://localhost:3001/heroes");
//     }
// )

// создание редюсера и экшенов в одной функции с помощью Redux Toolkit Slice
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error';
        },
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    // создание Thunk с помощью Redux Toolkit, в таком случае action можно удалить
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchHeroes.pending, state => {
    //             state.heroesLoadingStatus = 'loading';
    //         })
    //         .addCase(fetchHeroes.fulfilled, (state, action) => {
    //             state.heroesLoadingStatus = 'idle';
    //             state.heroes = action.payload;
    //         })
    //         .addCase(fetchHeroes.rejected, state => {
    //             state.heroesLoadingStatus = 'error';
    //         })
    //         .addDefaultCase(() => {})
    // }
})

const {actions, reducer} = heroesSlice;

export default reducer;
export const {heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted} = actions;