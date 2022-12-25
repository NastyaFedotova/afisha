import React, { useCallback, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { validateRegistrationForm } from './utils';
import { registrationAction } from '../../store/actions/user';
import './RegistrationPage.scss';


const cnRegistrationPage = cn('registrationPage');

export const RegistrationPage = () => {
    const dispatch = useDispatch();

    const [registration, setRegistration] = useState(false);

    const onSubmit = useCallback(
        (values) => {
            dispatch(registrationAction(values));
            setRegistration(true);
        },
        [dispatch],
    );

    if (registration) {
        return <Navigate to="/auth" />;
    }

    return (
        <div className={cnRegistrationPage()}>
            <div className={cnRegistrationPage('title')}>Регистрация</div>
            <Form onSubmit={onSubmit} validate={validateRegistrationForm}>
                {({ handleSubmit, dirtySinceLastSubmit }) => (
                    <form onSubmit={handleSubmit} className={cnRegistrationPage('form')}>
                        <Field name="username">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="Введите имя пользователя"
                                    className={cnRegistrationPage('input', {
                                        error: meta.submitFailed && !meta.valid && !dirtySinceLastSubmit,
                                    })}
                                />
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    type="password"
                                    placeholder="Введите пароль"
                                    className={cnRegistrationPage('input', {
                                        error: meta.submitFailed && !meta.valid && !dirtySinceLastSubmit,
                                    })}
                                />
                            )}
                        </Field>
                        <Field name="first_name">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="Ваше имя"
                                    className={cnRegistrationPage('input', {
                                        error: meta.submitFailed && !meta.valid && !dirtySinceLastSubmit,
                                    })}
                                />
                            )}
                        </Field>
                        <Field name="last_name">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="Ваша Фамилия"
                                    className={cnRegistrationPage('input', {
                                        error: meta.submitFailed && !meta.valid && !dirtySinceLastSubmit,
                                    })}
                                />
                            )}
                        </Field>
                        <Field name="email">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="Введите email"
                                    type="email"
                                    className={cnRegistrationPage('input', {
                                        error: meta.submitFailed && !meta.valid && !dirtySinceLastSubmit,
                                    })}
                                />
                            )}
                        </Field>
                        <button className={cnRegistrationPage('button')} type="submit">
                            Зарегистрироваться
                        </button>
                    </form>
                )}
            </Form>
        </div>
    );
};
