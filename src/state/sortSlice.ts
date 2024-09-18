import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../apiTypes/users.types';

export type SortState = {
  keyToSort: keyof User;
  direction: 'asc' | 'desc';
};

const initialState: SortState = { keyToSort: 'name', direction: 'asc' }

export const sortSlice = createSlice({
  name: "userTableSort",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<{ headerKey: keyof User }>) => ({
      keyToSort: action.payload.headerKey,
      direction:
        state.direction === 'asc' ? 'desc' : 'asc'
    })
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;