import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../apiTypes/users.types';

const initialState: Partial<Record<keyof User, string>> = {
  name: '',
  username: '',
  email: '',
  phone: '',
}

export const filterSlice = createSlice({
  name: "userTableFilters",
  initialState,
  reducers: {
    changeFilterState: (state, action: PayloadAction<{ headerKey: keyof User, value: string }>) => ({
      ...state,
      [action.payload.headerKey]: action.payload.value
    })
  },
});

export const { changeFilterState } = filterSlice.actions;
export default filterSlice.reducer;