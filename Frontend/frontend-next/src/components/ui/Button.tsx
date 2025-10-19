'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    children: React.ReactNode;
}

export const Button = ({ children, className, ...props } : ButtonProps) => {
    return(
        <button
            className={`w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-base font-bold cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl ${className}`}
            {...props}
        >
            {children}
        </button>
    )
};