import { configureStore, PreloadedState, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import inProgressCardSlice from '../features/form/inProgressCardSlice';
import cardsSlice from '../features/cards/cardsSlice';

const rootReducer = combineReducers({
  inProgressCard: inProgressCardSlice,
  cards: cardsSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
