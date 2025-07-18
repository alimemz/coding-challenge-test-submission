import React from 'react';

import Address from '@/components/Address/Address';
import AddressBook from '@/components/AddressBook/AddressBook';
import Button from '@/components/Button/Button';
import Radio from '@/components/Radio/Radio';
import Section from '@/components/Section/Section';
import useAddressBook from '@/hooks/useAddressBook';

import { Address as AddressType } from './types';
import useForm from '@/hooks/useForm';
import { AddressFormFields } from './types/formFields';
import Form from '@/components/Form/Form';
import transformAddress from './core/models/address';
import type { GetAddressResponse } from '@/pages/api/getAddresses';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

function App() {
   /**
    * Form custom hook to manage form fields
    */
   const { fields, handleChange, clearFields } = useForm<AddressFormFields>({
      defaultValues: {
         postCode: '',
         houseNumber: '',
         firstName: '',
         lastName: '',
         selectedAddress: '',
      },
   });

   const { postCode, houseNumber, firstName, lastName, selectedAddress } =
      fields;

   /**
    * Results states
    */
   const [error, setError] = React.useState<undefined | string>(undefined);
   const [loading, setLoading] = React.useState(false);
   const [addresses, setAddresses] = React.useState<AddressType[]>([]);

   /**
    * Redux actions
    */
   const { addAddress } = useAddressBook();

   const handleAddressSubmit = async (
      e: React.ChangeEvent<HTMLFormElement>
   ) => {
      e.preventDefault();

      if (!postCode || !houseNumber) {
         setError('Post code and house number are required');
         return;
      }

      setLoading(true);
      setError(undefined);
      setAddresses([]);

      try {
         const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
         const response = await fetch(
            `${baseUrl}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
         );

         const data: {
            details: GetAddressResponse;
            errormessage?: string;
            status: 'error' | 'ok';
         } = await response.json();

         if (data.status === 'error') {
            throw new Error(data.errormessage || 'Failed to fetch addresses');
         }

         const transformedAddresses = data.details.map((address) =>
            transformAddress({
               city: address.city,
               houseNumber: address.houseNumber,
               postcode: address.postcode,
               street: address.street,
               lat: address.lat.toString(),
               lon: address.long.toString(),
               firstName, // empty during submit
               lastName, // empty during submit
               id: '', // will be set when added to address book
            })
         );

         setAddresses(transformedAddresses);
      } catch (err) {
         setError(
            err instanceof Error ? err.message : 'An unexpected error occurred'
         );
      } finally {
         setLoading(false);
      }
   };

   const handlePersonSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!firstName || !lastName) {
         setError('First name and last name fields mandatory!');
         return;
      }

      if (!selectedAddress || !addresses.length) {
         setError(
            "No address selected, try to select an address or find one if you haven't"
         );
         return;
      }

      const foundAddress = addresses.find(
         (address) => address.id === selectedAddress
      );

      if (!foundAddress) {
         setError('Selected address not found');
         return;
      }

      addAddress({ ...foundAddress, firstName, lastName });
   };

   return (
      <main>
         <Section>
            <h1>
               Create your own address book!
               <br />
               <small>
                  Enter an address by postcode add personal info and done! 👏
               </small>
            </h1>
            <Form
               label='🏠 Find an address'
               submitText='Find'
               loading={loading}
               onFormSubmit={handleAddressSubmit}
               formEntries={[
                  {
                     name: 'postCode',
                     placeholder: 'Post Code',
                     extraProps: { value: postCode, onChange: handleChange },
                  },
                  {
                     name: 'houseNumber',
                     placeholder: 'House number',
                     extraProps: { value: houseNumber, onChange: handleChange },
                  },
               ]}
            />

            {addresses.length > 0 &&
               addresses.map((address) => {
                  return (
                     <Radio
                        name='selectedAddress'
                        id={address.id}
                        key={address.id}
                        onChange={handleChange}>
                        <Address {...address} />
                     </Radio>
                  );
               })}

            {selectedAddress && (
               <Form
                  label='✏️ Add personal info to address'
                  submitText='Add to addressbook'
                  loading={loading}
                  onFormSubmit={handlePersonSubmit}
                  formEntries={[
                     {
                        name: 'firstName',
                        placeholder: 'First name',
                        extraProps: {
                           value: firstName,
                           onChange: handleChange,
                        },
                     },
                     {
                        name: 'lastName',
                        placeholder: 'Last name',
                        extraProps: { value: lastName, onChange: handleChange },
                     },
                  ]}
               />
            )}

            <ErrorMessage error={error} />

            <Button
               variant='secondary'
               onClick={() => {
                  clearFields();
                  setAddresses([]);
                  setError(undefined);
               }}>
               Clear all fields
            </Button>
         </Section>

         <Section variant='dark'>
            <AddressBook />
         </Section>
      </main>
   );
}

export default App;
