// src/components/ui/button.jsx
import React from 'react';
import classNames from 'classnames';

export const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
