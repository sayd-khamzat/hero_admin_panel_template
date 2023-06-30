import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleted,
    heroCreated
} from '../components/heroesList/heroesSlice';
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/filtersSlice';

// export const heroesFetching = () => ({type: 'HEROES_FETCHING'});
// export const heroesFetched = (heroes) => ({type: 'HEROES_FETCHED', payload: heroes});
// export const heroesFetchingError = () => ({type: 'HEROES_FETCHING_ERROR'});
// export const filtersFetching = () => ({type: 'FILTERS_FETCHING'});
// export const filtersFetched = (filters) => ({type: 'FILTERS_FETCHED', payload: filters});
// export const filtersFetchingError = () => ({type: 'FILTERS_FETCHING_ERROR'});
// export const activeFilterChanged = (filter) => ({type: 'ACTIVE_FILTER_CHANGED', payload: filter});
// export const heroCreated = (hero) => ({type: 'HERO_CREATED', payload: hero});
// export const heroDeleted = (id) => ({type: 'HERO_DELETED', payload: id});

// создание action с помощью Redux Toolkit, payload передается в reducer автоматически
// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched = createAction('HEROES_FETCHED');
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
// export const filtersFetching = createAction('FILTERS_FETCHING');
// export const filtersFetched = createAction('FILTERS_FETCHED');
// export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
// export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');
// export const heroCreated = createAction('HERO_CREATED');
// export const heroDeleted = createAction('HERO_DELETED');

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const deleteHero = (request, id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(data => {
            console.log(data, 'Deleted');
            dispatch(heroDeleted(id));
        })
        .catch(err => console.log(err))
}

export const createHero = (request, newHero) => (dispatch) => {
    request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
        .then(data => dispatch(heroCreated(data)))
        .catch(err => console.log(err))
}
