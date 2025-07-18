import { Address } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface CounterState {
   addresses: Address[];
}

// Define the initial state using that type
const initialState: CounterState = {
   addresses: [],
};

export const addressBookSlice = createSlice({
   name: 'address',
   // `createSlice` will infer the state type from the `initialState` argument
   initialState,
   reducers: {
      addAddress: (state, action: PayloadAction<Address>) => {
         const newAddress = action.payload;
         const existingAddress = state.addresses.find(
            (address) => address.id === newAddress.id
         );

         if (!existingAddress) {
            state.addresses.push(newAddress);
         }
      },
      removeAddress: (state, action: PayloadAction<string>) => {
         const existingAddress = state.addresses.findIndex(
            (address) => address.id === action.payload
         );

         state.addresses.splice(existingAddress, 1);
      },
      updateAddresses: (state, action: PayloadAction<Address[]>) => {
         state.addresses = action.payload;
      },
   },
});

export const { addAddress, removeAddress, updateAddresses } =
   addressBookSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
export const selectAddress = (state: RootState) => state.addressBook.addresses;

export default addressBookSlice.reducer;
