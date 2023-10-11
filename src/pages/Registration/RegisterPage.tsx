import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../store/features/user/userApi';
import './RegisterPage.scss';

import {
  existsEmailErrorText,
  unhandledRegisterErrorText,
  succeedRegisterText,
} from '../../utils/constants/textConstants';
import passClosed from '../../assets/images/passwordClosed.svg';
import passOpened from '../../assets/images/passwordOpened.svg';

import FormInput from '../../components/FormInput/FormInput';
import Icon from '../../components/Icon/Icon';
import Modal from '../../components/Modal/Modal';

interface IRegisterFormValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [
    userRegister,
    { error, reset: resetMutation, isSuccess: isMutationSucceed },
  ] = useRegisterMutation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset: resetFormFields,
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

  const onSubmit: SubmitHandler<IRegisterFormValues> = async (data) => {
    try {
      const payload = await userRegister({ ...data }).unwrap();
      console.log(payload);
    } catch (e) {
      console.log(e);
    }
  };

  const resetFormAndMutation = () => {
    resetMutation();
    resetFormFields();
  };

  return (
    <div className="register">
      {error && 'status' in error && error.status === 409 ? (
        <Modal
          title="Данные не сохранились"
          text={existsEmailErrorText}
          buttonText="Назад к регистрации"
          callback={() => resetFormAndMutation()}
        />
      ) : error && 'status' in error && error.status !== 409 ? (
        <Modal
          title="Данные не сохранились"
          text={unhandledRegisterErrorText}
          buttonText="Повторить"
          callback={() => resetFormAndMutation()}
        />
      ) : !error && isMutationSucceed ? (
        <Modal
          title="Регистрация успешна"
          text={succeedRegisterText}
          buttonText="Вход"
          callback={() => {
            navigate('/auth');
          }}
        />
      ) : (
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
                type="button"
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
      )}
    </div>
  );
}

export default RegisterPage;
