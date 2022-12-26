import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/characters/Navbar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Header } from 'components/header/Header';

const queryClient = new QueryClient();

export default function Root() {
    return (
        <>
            <Header></Header>
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </>
    );
}

