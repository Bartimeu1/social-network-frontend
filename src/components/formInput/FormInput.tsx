import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import './FormInput.scss';

interface IFormInputProps {
  type: string;
  placeholder: string;
  error?: FieldError | undefined;
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  function FormInput(props, ref) {
    const { type, placeholder, className, error, ...register } = props;

    return (
      <div className={classNames('form-field', className)}>
        <div className="form-field__wrapper">
          <input
            autoComplete="on"
            className="form-field__input"
            type={type}
            ref={ref}
            placeholder=""
            {...register}
          />
          <span className="form-field__placeholder">{placeholder}</span>
        </div>
        {error && <span className="form-field__error">{error.message}</span>}
      </div>
    );
  }
);

export default FormInput;
