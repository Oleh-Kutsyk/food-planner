import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}
