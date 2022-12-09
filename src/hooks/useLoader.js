import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loading, loaded } from '../store/reducers/loader';

export const useLoader = (statuses) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isFetching = statuses.reduce((result, status) => {
            return result || status === 'fetching';
        }, false);
        
        if (isFetching) {
            dispatch(loading());
        } else {
            dispatch(loaded());
        }
    }, [statuses, dispatch]);
};
