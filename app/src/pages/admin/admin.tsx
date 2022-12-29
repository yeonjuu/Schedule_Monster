import React from 'react';
import Banner from './banner';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Header } from 'components/header/Header';
import { useSelector } from 'react-redux';
import { NotFound } from 'pages/NotFound';

function Admin() {
  const loginUser = useSelector((state: any) => state.persistedReducer);
  const queryClient = new QueryClient();
  return (
    <>
      {loginUser.auth === 'admin' ? (
        <>
          <Header></Header>
          <Banner></Banner>

          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Admin;
