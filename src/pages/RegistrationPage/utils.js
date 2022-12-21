export const validateRegistrationForm = (values) => {
    const errors = {
        username: undefined,
        password: undefined,
        email: undefined,
        birth_date: undefined,
        sex: undefined,
    };

    if (!values.username) {
        errors.username = 'Пожалуйста укажите имя пользователя';
    }

    if (!values.password) {
        errors.password = 'Пожалуйста укажите пароль';
    }

    if (!values.email) {
        errors.email = 'Пожалуйста укажите email';
    }

    if (!values.first_name) {
        errors.birth_date = 'Пожалуйста укажите ваше имя';
    }

    if (!values.last_name) {
        errors.sex = 'Пожалуйста укажите вашу фамилию';
    }

    return errors;
};
