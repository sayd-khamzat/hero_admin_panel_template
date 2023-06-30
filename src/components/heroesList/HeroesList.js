import {useHttp} from '../../hooks/http.hook';
import {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {deleteHero, fetchHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {createSelector} from 'reselect';
import './heroesList.scss';

const HeroesList = () => {
    //1 способ
    // const filteredHeroes = useSelector(state => {
    //     if (state.filtersReducer.activeFilter === 'all') {
    //         return state.heroesReducer.heroes;
    //     } else {
    //         return state.heroesReducer.heroes.filter(item => item.element === state.filtersReducer.activeFilter);
    //     }
    // })

    //2 способ   createSelector мемоизирует, т.е. предотвращает ненужные рендеры, без него при каждом клике
    // на одну и ту же кнопку фильтра, компонент перерисовывается
    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter, // 1 === const activeFilter = state.filters.activeFilter,
        state => state.heroes.heroes, // 2
        (activeFilter, heroes) => { // activeFilter - 1, heroes - 2
            if (activeFilter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === activeFilter);
            }
        }
    )
    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
    }, [request])

    const onDelete = useCallback((id) => {
        dispatch(deleteHero(request, id));
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;