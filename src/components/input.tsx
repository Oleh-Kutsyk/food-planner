'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'text' | 'number' | 'password';
  label?: string;
  errorMsg?: string;
}

export default function Input({
  variant = 'text',
  label,
  className = '',
  errorMsg,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = variant === 'password';

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : variant;

  return (
    <div className='w-full max-w-sm'>
      {label && (
        <label className='block mb-1 text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}

      <div className='relative'>
        <input
          type={inputType}
          className={`w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorMsg && 'border-red-500 focus:ring-red-500'} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(v => !v)}
            className='absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-600'
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <span className='text-red-500'>{errorMsg}</span>
    </div>
  );
}
