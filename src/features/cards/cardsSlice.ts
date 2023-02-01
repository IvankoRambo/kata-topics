import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Card } from '../../app/interfaces';

const initialState = [] as Card[];

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { addCard } = cardsSlice.actions;

export const selectCards = (state: RootState) => state.cards;

export default cardsSlice.reducer;
