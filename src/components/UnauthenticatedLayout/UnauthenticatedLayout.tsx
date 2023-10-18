import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectCurrentToken } from '../../store/features/user/userSlice';

function UnauthenticatedLayout() {
  const token = useAppSelector(selectCurrentToken);

  return !token ? <Outlet /> : <Navigate to="/" />;
}

export default UnauthenticatedLayout;
