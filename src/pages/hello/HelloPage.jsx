import React from 'react';
import { Link } from 'react-router-dom';
import './HelloPage.scss';

function HelloPage() {
  return (
    <div className="hello">
      <div className="hello__content">
        <h1 className="hello__title">Привет, мы знакомы?</h1>
        <div className="hello__buttons">
          <Link to='/auth' className="hello__button hello__button--login">Sign In</Link>
          <Link to='/register'className="hello__button hello__button--register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default HelloPage;
