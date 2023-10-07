import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './RegisterPage.scss';

import passClosed from '../../assets/images/passwordClosed.svg';
import passOpened from '../../assets/images/passwordOpened.svg';

import FormInput from '../../components/formInput/FormInput';
import Icon from '../../components/Icon/Icon';

interface IRegisterFormValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
    shouldFocusError: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<IRegisterFormValues> = async (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2 className="register-form__title">Регистрация</h2>
        <div className="register-form__fields">
          <FormInput
            type="text"
            placeholder="First Name"
            className="register-form__input"
            error={errors.firstName}
            {...register('firstName', {
              required: 'Имя пользователя обязательно',
              minLength: {
                value: 3,
                message: 'Минимальная длина - 3 символа',
              },
              maxLength: {
                value: 10,
                message: 'Максимальная длина - 10 символов',
              },
              pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: 'Допустимы только буквы',
              },
            })}
          />
          <FormInput
            type="text"
            placeholder="Second Name"
            className="register-form__input"
            error={errors.secondName}
            {...register('secondName', {
              required: 'Имя пользователя обязательно',
              minLength: {
                value: 3,
                message: 'Минимальная длина - 3 символа',
              },
              maxLength: {
                value: 10,
                message: 'Максимальная длина - 10 символов',
              },
              pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: 'Допустимы только буквы',
              },
            })}
          />
          <FormInput
            type="text"
            placeholder="Email"
            className="register-form__input"
            error={errors.email}
            {...register('email', {
              required: 'Email пользователя обязателен',
              pattern: {
                value: /[^@]+@[^@]+\.[a-zA-Z]{2,6}/,
                message: 'Email некорректный',
              },
            })}
          />
          <div className="register-form__password">
            <FormInput
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="register-form__input"
              error={errors.password}
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 3,
                  message: 'Минимальная длина - 8 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимальная длина - 40 символов',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Пароль может состоять только из цифр и латиницы',
                },
              })}
            />
            <button
              className="register-form__password__button"
              onClick={() => setPasswordVisible((prevState) => !prevState)}
            >
              <Icon
                src={passwordVisible ? passOpened : passClosed}
                alt="passView"
              />
            </button>
          </div>
        </div>
        <input type="submit" className="register-form__button" />
      </form>
    </div>
  );
}

export default RegisterPage;
