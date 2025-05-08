import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ariaLabel,
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/20',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/20',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10 focus:ring-primary/20',
    text: 'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary/20',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  // Common styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-colors duration-200
    focus:outline-none focus:ring-4
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  // Loading indicator
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles} aria-label={ariaLabel}>
        {loading && <LoadingSpinner />}
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={baseStyles}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;