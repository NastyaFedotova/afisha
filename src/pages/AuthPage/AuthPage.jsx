import React, { useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './AuthPage.scss';
import { authorizationAction } from '../../store/actions/user';

const cnAuthPage = cn('authPage');

export const AuthPage = () => {
    const dispatch = useDispatch();

    const { isAuthorized } = useSelector((store) => store.user);

    const onSubmit = useCallback(
        (values) => {
            dispatch(authorizationAction(values));
        },
        [dispatch],
    );

    if (isAuthorized) {
        return <Navigate to="/" />;
    }

    return (
        <div className={cnAuthPage()}>
            <div className={cnAuthPage('title')}>Авторизация</div>
            <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={cnAuthPage('form')}>
                        <Field name="username">
                            {({ input }) => (
                                <input
                                    {...input}
                                    placeholder="Введите имя пользователя"
                                    className={cnAuthPage('input')}
                                />
                            )}
                        </Field>
                        <Field name="password">
                            {({ input }) => (
                                <input
                                    {...input}
                                    type="password"
                                    placeholder="Введите пароль"
                                    className={cnAuthPage('input')}
                                />
                            )}
                        </Field>
                        <button className={cnAuthPage('button')} type="submit">
                            Войти
                        </button>
                    </form>
                )}
            </Form>
            <Link to="/registration" className={cnAuthPage('button')} type="button">
                Регистрация
            </Link>
        </div>
    );
};
