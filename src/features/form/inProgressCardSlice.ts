import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPhotos } from './formAPI';
import { InProgressCard, GenericObject, Photo } from '../../app/interfaces';

const initialState = {
  image: {
    status: 'idle',
    inited: false,
  },
} as InProgressCard;

export const searchForPhoto = createAsyncThunk(
  'inProgressCard/fetchPhotos',
  async (params: GenericObject, { rejectWithValue }) => {
    const response = await getPhotos(params);

    if (response.type === 'error') {
     return rejectWithValue(response.errors?.length
        ? response.errors[0] : 'Error');
    } else {
      return response;
    }
  },
);

export const inProgressCardSlice = createSlice({
  name: 'inProgressCard',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    clearTopic: (state) => {
      state.topic = '';
    },
    refreshCard: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchForPhoto.pending, (state) => {
        state.image.status = 'loading';
      })
      .addCase(searchForPhoto.fulfilled, (state, action) => {
        const len = action.payload?.response?.results?.length;

        state.image.status = 'idle';

        if (!len) {
          state.image.data = {} as Photo;
        } else {
          state.image.data =
            action.payload?.response?.results[Math.floor(Math.random() * len)];
        }

        state.image.inited = true;
      })
      .addCase(searchForPhoto.rejected, (state) => {
        state.image.status = 'failed';
      })
  },
});

export const {
  setFirstName,
  setLastName,
  setTopic,
  clearTopic,
  refreshCard,
} = inProgressCardSlice.actions;

export const selectInProgressCard = (state: RootState) => state.inProgressCard;

export default inProgressCardSlice.reducer;
