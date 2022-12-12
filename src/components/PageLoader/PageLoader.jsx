import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';

import './PageLoader.scss';
import { LoaderArrows } from '../../assets';
import { useSelector } from 'react-redux';

const CnPageLoader = cn('pageLoader');

export const PageLoader = ({ zIndex }) => {
    const { isLoading } = useSelector((store) => store.loader);
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        setIsShow(true);

        const setTimeoutId = setTimeout(() => {
            setIsShow(false);
        }, 1000);

        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [isLoading]);

    if (isShow || isLoading) {
        return (
            <div className={CnPageLoader()} style={{ zIndex }}>
                <div className={CnPageLoader('loader')}>
                    <LoaderArrows />
                </div>
            </div>
        );
    }

    return null;
};
