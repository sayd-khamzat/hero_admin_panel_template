import {useEffect} from 'react';
import {fetchFilters} from '../../actions';
import {activeFilterChanged} from './filtersSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        return arr.map((item) => {
            // Используем библиотеку classnames и формируем классы динамически
            const btnClass = classNames('btn', item.className, {
                'active': item.name === activeFilter
            })
            return <button key={item.name} id={item.name} className={btnClass}
                           onClick={() => dispatch(activeFilterChanged(item.name))}>{item.label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;