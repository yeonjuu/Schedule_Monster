import React from 'react';
import Banner from './banner';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Header } from 'components/header/Header';

function Admin() {
  const queryClient = new QueryClient();
  return (
    <>
      <Header></Header>
      <Banner></Banner>

      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default Admin;
