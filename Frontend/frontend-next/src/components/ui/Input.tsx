import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
{
    label: string;
    icon?: React.ReactNode;
}

export const Input = ({ label, icon, ...props }: InputProps) => {
    return (
        <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            {icon}
          </span>
        )}
        <input
          className="w-full py-3.5 px-4 pl-12 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 outline-none bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          {...props}
        />
      </div>
    </div>
    )
}