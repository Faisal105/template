import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center'>
            <p className='text-2xl font-bold uppercase'>{error?.message || 'An error occurred'}</p>
        </div>
    );
};

export default ErrorPage;