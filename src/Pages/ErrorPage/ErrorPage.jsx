import React from 'react';
import { Link, useNavigate } from 'react-router';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'; 

const ErrorPage = () => {
  
    const navigate = useNavigate();

    
    const handleGoBack = () => {
       
        navigate(-1); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
            <title>WinterPetCare - 404 Not Found</title>
            <div className="text-center p-8 sm:p-12 md:p-16 bg-white rounded-xl shadow-2xl max-w-lg w-full">
                
                
                <h1 className="text-9xl font-extrabold text-indigo-600 mb-4 tracking-wider animate-bounce">
                    404
                </h1>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-xs mx-auto">
                    Sorry! The page you were looking for could not be found.
                </p>

               
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    
                    
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 
                                   bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
                                   flex items-center justify-center gap-2"
                    >
                        <HomeIcon className="w-5 h-5" /> 
                        Go Home
                    </Link>

                   
                    <button
                        onClick={handleGoBack}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg text-indigo-600 font-semibold shadow-md transition-all duration-300 
                                   bg-white border-2 border-indigo-600 hover:bg-indigo-50 hover:border-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
                                   flex items-center justify-center gap-2"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;