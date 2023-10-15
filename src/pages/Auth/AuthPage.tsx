import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { setCredentials } from '../../store/features/user/userSlice';
import { useLoginMutation } from '../../store/features/user/userApi';
import './AuthPage.scss';

import { loginErrorText } from '../../utils/constants/textConstants';
import passClosed from '../../assets/images/passwordClosed.svg';
import passOpened from '../../assets/images/passwordOpened.svg';

import FormInput from '../../components/FormInput/FormInput';
import Icon from '../../components/Icon/Icon';
import Modal from '../../components/Modal/Modal';

interface IAuthFormValues {
  email: string;
  password: string;
}

function AuthPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [useLogin, { error: loginError, reset: resetMutation }] =
    useLoginMutation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset: resetFormFields,
    formState: { errors },
  } = useForm<IAuthFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<IAuthFormValues> = async (data) => {
    try {
      const payload = await useLogin({ ...data });
      dispatch(setCredentials({ ...payload }));

      navigate('/main');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      {loginError ? (
        <Modal
          title="Ошибка авторизации"
          text={loginErrorText}
          buttonText="Назад к авторизации"
          callback={() => {
            resetMutation();
            resetFormFields();
          }}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <h2 className="auth-form__title">Вход в личный кабинет</h2>
          <div className="auth__form__fields">
            <FormInput
              type="text"
              placeholder="Email"
              error={errors.email}
              className="auth-form__input"
              {...register('email', {
                required: 'Email пользователя обязателен',
                pattern: {
                  value: /[^@]+@[^@]+\.[a-zA-Z]{2,6}/,
                  message: 'Email некорректный',
                },
              })}
            />
            <div className="auth-form__password">
              <FormInput
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                error={errors.password}
                className="auth-form__input"
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
                className="auth-form__password__button"
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                <Icon
                  src={passwordVisible ? passOpened : passClosed}
                  alt="passwordView"
                />
              </button>
            </div>
          </div>
          <input type="submit" className="auth-form__button" />
        </form>
      )}
    </div>
  );
}

export default AuthPage;
