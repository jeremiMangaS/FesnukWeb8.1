"use client";

import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import { ChangeEvent } from 'react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const API_URL = 'https://localhost:7270/api/auth'
                              
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                const response = await axios.post(`${API_URL}/login`, {
                    email: formData.email,
                    password: formData.password,
                });
                console.log('Login success:', response.data);
                localStorage.setItem('token', response.data.token);
                router.push('/');
            } else {
                const response = await axios.post(`${API_URL}/register`, {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                console.log('Register success:', response.data);
                setIsLogin(true);
                alert('Registration successful! Please log in.');
            }
        } catch (err : any) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <h1 className="text-6xl font-black text-white mb-3 tracking-tight">
                        FESNUK
                    </h1>
                    <p className="text-gray-400 text-sm font-light tracking-wide">
                        Social Redefined
                    </p>
                </div>

                {/* Card */}
                <div className="bg-neutral-900 rounded-3xl shadow-2xl p-8 border border-neutral-800 backdrop-blur-xl relative">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        {/* Tabs */}
                        <div className="flex gap-3 mb-8">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 ${
                                    isLogin 
                                        ? 'bg-white text-black shadow-lg ' 
                                        : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-gray-300'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 ${
                                    !isLogin 
                                        ? 'bg-white text-black shadow-lg' 
                                        : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-gray-300'
                                }`}
                            >
                                Register
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl relative mb-6 backdrop-blur-sm" role="alert">
                                <span className="block sm:inline text-sm">{error}</span>
                            </div>
                        )}

                        {/* Forms */}
                        <form onSubmit={handleSubmit}>
                            {isLogin ? (
                                <div className="space-y-5">
                                    <div>
                                        <input 
                                            name="email" 
                                            type="email" 
                                            required 
                                            className="w-full px-5 py-4 bg-black/40 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-white placeholder-gray-500" 
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name="password" 
                                            type="password" 
                                            required 
                                            className="w-full px-5 py-4 bg-black/40 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-white placeholder-gray-500" 
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center">
                                            <input 
                                                id="remember-me" 
                                                name="remember-me" 
                                                type="checkbox" 
                                                className="w-4 h-4 bg-black/40 border-neutral-700 rounded focus:ring-white/50 focus:ring-2" 
                                            />
                                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#" className="text-sm text-white hover:text-gray-300 font-medium transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 mt-6 text-black font-bold bg-white rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl disabled:bg-gray-600 disabled:text-gray-400"
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div>
                                        <input 
                                            name="username" 
                                            type="text" 
                                            required 
                                            className="w-full px-5 py-4 bg-black/40 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-white placeholder-gray-500" 
                                            placeholder="Username" 
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name="email" 
                                            type="email" 
                                            required 
                                            className="w-full px-5 py-4 bg-black/40 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-white placeholder-gray-500" 
                                            placeholder="Email address" 
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name="password" 
                                            type="password" 
                                            required 
                                            className="w-full px-5 py-4 bg-black/40 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-white placeholder-gray-500" 
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                                            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                                        </p>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 mt-4 text-black font-bold bg-white rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl disabled:bg-gray-600 disabled:text-gray-400"
                                    >
                                        {loading ? 'Signing up...' : 'Sign up'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">
                        Fesnuk © 2025 · Privacy · Terms · About
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;