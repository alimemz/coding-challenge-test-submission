import React, { FunctionComponent } from 'react';

import $ from './InputText.module.css';

export interface InputTextProps {
   name: string;
   placeholder: string;
   value: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   disabled?: boolean;
}

const InputText: FunctionComponent<InputTextProps> = ({
   name,
   onChange,
   placeholder,
   value,
   disabled,
}) => {
   return (
      <input
         aria-label={name}
         className={$.inputText}
         name={name}
         onChange={onChange}
         placeholder={placeholder}
         type='text'
         value={value}
         disabled={disabled}
      />
   );
};

export default InputText;
