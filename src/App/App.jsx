import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { EventPage } from '../pages/EventPage';
import { MainPage } from '../pages/MainPage';
import { cn } from '@bem-react/classname';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ru';
import { AvatarIcon } from '../assets';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage } from '../pages/AuthPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { unAuthorizeAction } from '../store/actions/user';
import { EventEditPage } from '../pages/EventEditPage';
import { useRole } from '../hooks/useRole';

moment.locale('ru');
moment.tz.load({
    version: '2021e',
    zones: [
        'Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6',
    ],
    links: ['Europe/Moscow|W-SU'],
});
moment.tz.setDefault('Europe/Moscow');

const cnApp = cn('app');

export const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isAuthorized } = useSelector((store) => store.user);

    const { isStaff } = useRole();

    const handleLogout = useCallback(() => {
        dispatch(unAuthorizeAction());
    }, [dispatch]);

    return (
        <div className={cnApp()}>
            <div className={cnApp('header')}>
                <Link to="/" className={cnApp('title-wrapper')}>
                    <h1 className={cnApp('title')}>Афиша Насти Федотовой</h1>
                </Link>
                {['/'].includes(location?.pathname) && isStaff && (
                    <Link to="/event/create" className={cnApp('button')}>
                        Новое событие
                    </Link>
                )}
                {!['/auth', '/registration'].includes(location?.pathname) && (
                    <>
                        {isAuthorized ? (
                            <button className={cnApp('button')} type="button" onClick={handleLogout}>
                                Выйти
                            </button>
                        ) : (
                            <Link to="/auth" className={cnApp('button')}>
                                Авторизация
                            </Link>
                        )}
                        <Link to="/shopping-cart">
                            <AvatarIcon width={34} height={34} style={{marginTop:7}}/>
                        </Link>
                    </>
                )}
            </div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/event/:id/" element={<EventPage />} />
                <Route path="/shopping-cart" element={isAuthorized ? <ShoppingCartPage /> : <AuthPage />} />
                <Route
                    path="/event/edit/:id"
                    element={isAuthorized ? <EventEditPage isCreateMode={false} /> : <AuthPage />}
                />
                <Route
                    path="/event/create"
                    element={isAuthorized ? <EventEditPage isCreateMode={true} /> : <AuthPage />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};
