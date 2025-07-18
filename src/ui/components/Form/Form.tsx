import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText, { InputTextProps } from '../InputText/InputText';
import $ from './Form.module.css';

interface FormEntry {
   name: string;
   placeholder: string;
   // TODO: Defined a suitable type for extra props
   // This type should cover all different of attribute types
   extraProps: Omit<InputTextProps, 'name' | 'placeholder'>;
}

interface FormProps {
   label: string;
   loading: boolean;
   formEntries: FormEntry[];
   onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
   submitText: string;
}

const Form: FunctionComponent<FormProps> = ({
   label,
   loading,
   formEntries,
   onFormSubmit,
   submitText,
}) => {
   return (
      <form onSubmit={onFormSubmit}>
         <fieldset>
            <legend>{label}</legend>
            {formEntries.map(({ name, placeholder, extraProps }, index) => (
               <div key={`${name}-${index}`} className={$.formRow}>
                  <InputText
                     key={`${name}-${index}`}
                     name={name}
                     placeholder={placeholder}
                     disabled={extraProps.disabled || loading}
                     onChange={extraProps.onChange}
                     value={extraProps.value || ''}
                  />
               </div>
            ))}

            <Button loading={loading} type='submit' variant='primary'>
               {submitText}
            </Button>
         </fieldset>
      </form>
   );
};

export default Form;
