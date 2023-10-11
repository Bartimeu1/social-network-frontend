import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';

import { store } from './store/store';
import HelloPage from './pages/Hello/HelloPage';
import RegisterPage from './pages/Registration/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HelloPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
