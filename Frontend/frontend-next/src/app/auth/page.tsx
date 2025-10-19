"use client";

import React, { useState } from 'react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-blue-600 mb-2">Fesnuk</h1>
                    <p className="text-gray-600 text-sm">Connect with friends and the world around you</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    {/* Tabs */}
                    <div className="flex gap-2 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                                isLogin 
                                    ? 'bg-blue-600 text-white shadow-lg' 
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                                !isLogin 
                                    ? 'bg-blue-600 text-white shadow-lg' 
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Forms */}
                    {isLogin ? (
                        <div className="space-y-4">
                            <div>
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    placeholder="Email address" 
                                />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    placeholder="Password" 
                                />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center">
                                    <input 
                                        id="remember-me" 
                                        name="remember-me" 
                                        type="checkbox" 
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot password?
                                </a>
                            </div>
                            <button 
                                onClick={handleSubmit}
                                className="w-full py-3 mt-6 text-white font-semibold bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-300 hover:shadow-xl hover:shadow-blue-400"
                            >
                                Sign in
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <input 
                                    id="username" 
                                    name="username" 
                                    type="text" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    placeholder="Username" 
                                />
                            </div>
                            <div>
                                <input 
                                    id="email-register" 
                                    name="email" 
                                    type="email" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    placeholder="Email address" 
                                />
                            </div>
                            <div>
                                <input 
                                    id="password-register" 
                                    name="password" 
                                    type="password" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    placeholder="Password" 
                                />
                            </div>
                            <div className="pt-2">
                                <p className="text-xs text-gray-500 text-center">
                                    By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                                </p>
                            </div>
                            <button 
                                onClick={handleSubmit}
                                className="w-full py-3 mt-4 text-white font-semibold bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-300 hover:shadow-xl hover:shadow-blue-400"
                            >
                                Sign up
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Fesnuk © 2025 · Privacy · Terms · About
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;