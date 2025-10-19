"use client";

import React, {useState} from 'react';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

                {/* Tab */}
                <div className="flex border-b">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 text-center font-semibold ${isLogin ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 text-center font-semibold ${!isLogin ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                        Register
                    </button>
                </div>

                


                
                {/* Form */}
               <div>
                {isLogin ? (
                    // Jika isLogin adalah true, tampilkan Form Login
                    <form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Email address" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Sign in
                        </button>
                    </div>
                    </form>
                ) : (
                    // Jika isLogin adalah false, tampilkan Form Register
                    <form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="email-register" className="sr-only">Email address</label>
                        <input id="email-register" name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Email address" />
                    </div>
                    <div>
                        <label htmlFor="password-register" className="sr-only">Password</label>
                        <input id="password-register" name="password" type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Password" />
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Sign up
                        </button>
                    </div>
                    </form>
                )}
                </div>

            </div>
        </div>
    );
};

export default AuthPage;