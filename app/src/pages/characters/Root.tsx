import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/characters/Navbar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const queryClient = new QueryClient();

export default function Root() {
  const isLogin = useSelector(
    (state: RootState) => state.persistedReducer.isLogin,
  );
  return (
    <>
      {isLogin ? (
        <>
          <Navbar></Navbar>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}
