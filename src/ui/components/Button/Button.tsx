import { ButtonType, ButtonVariant } from '@/types';
import React, { FunctionComponent } from 'react';

import $ from './Button.module.css';

interface ButtonProps {
   onClick?: () => void;
   type?: ButtonType;
   variant?: ButtonVariant;
   loading?: boolean;
   children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
   children,
   onClick,
   type = 'button',
   variant = 'primary',
   loading = false,
}) => {
   return (
      <button
         // TODDO: Add conditional classNames
         // - Must have a condition to set the '.primary' className
         // - Must have a condition to set the '.secondary' className
         // - Display loading spinner per demo video. NOTE: add data-testid="loading-spinner" for spinner element (used for grading)
         className={`${$.button} ${variant === 'primary' ? $.primary : ''} ${
            variant === 'secondary' ? $.secondary : ''
         }`}
         type={type}
         onClick={onClick}>
         {loading && (
            <span data-testid='loading-spinner' className={$.spinner}></span>
         )}
         {children}
      </button>
   );
};

export default Button;
