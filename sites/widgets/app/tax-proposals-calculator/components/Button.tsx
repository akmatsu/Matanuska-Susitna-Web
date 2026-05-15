interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  variant?: 'toggle' | 'primary' | 'secondary';
  className?: string;
}

export function Button({
  children,
  onClick,
  isActive = false,
  variant = 'toggle',
  className = '',
}: ButtonProps) {
  const baseClasses = 'rounded font-semibold transition cursor-pointer';

  const variantClasses = {
    toggle: isActive
      ? 'bg-blue-600 text-white'
      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    primary:
      'bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base hover:bg-blue-700 w-full text-center',
    secondary:
      'border-2 border-gray-300 bg-white text-gray-700 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base hover:border-gray-400 hover:bg-gray-50 w-full text-center',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
