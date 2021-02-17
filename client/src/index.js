import React from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './auth/AuthProvider'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
})


ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </QueryClientProvider>
    , document.getElementById('root')
);