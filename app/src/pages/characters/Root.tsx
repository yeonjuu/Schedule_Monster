import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/characters/Navbar';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export default function Root() {
    return (
        <div>
            <Navbar></Navbar>
            {/* <QueryClientProvider client={queryClient}> */}
                <Outlet />
            {/* </QueryClientProvider> */}
        </div>
    );
}

