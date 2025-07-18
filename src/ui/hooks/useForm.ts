import { useState } from 'react';

export type useFormParams<T> = {
   defaultValues: T;
};

export default function useForm<T extends Record<string, string>>({
   defaultValues,
}: useFormParams<T>) {
   const [fields, setFields] = useState<T>(defaultValues);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const clearFields = () => {
      setFields(defaultValues);
   };

   return {
      fields,
      handleChange,
      clearFields,
   };
}
