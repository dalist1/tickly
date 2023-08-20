import React, { forwardRef } from 'react'

const variantClasses = {
  primary: 'bg-blue-500/20 hover:bg-blue-400/90',
  secondary: 'bg-red-500/20 hover:bg-red-400/90',
};

const Button = forwardRef(
    (
        {
            children,
            type = 'button',
            className,
            variant = 'primary',
            size = 'normal',
            pill,
            disabled = false,
            ...props
        }, ref
    ) => {
        const variantClass = variantClasses[variant];
        return (
            <button
                ref={ref}
                disabled={disabled}
                type={type}
                className={`cursor-pointer rounded-full p-10 ${variantClass} text-white ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

export default Button;
