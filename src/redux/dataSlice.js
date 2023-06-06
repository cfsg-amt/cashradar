// redux/dataSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Sec: {},
  Ind: {},
  StkSH: {},
  StkSZ: {},
  StkHK: {},
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      const { collectionName, header, data } = action.payload;
      if (!state[collectionName][header]) {
        state[collectionName][header] = [];
      }
      state[collectionName][header] = data;
    },
    setHeaders: (state, action) => {
      const { collectionName, headers } = action.payload;
      for (let header of headers) {
        if (!state[collectionName][header]) {
          state[collectionName][header] = [];
        }
      }
    },
  },
});

export const { setData, setHeaders } = dataSlice.actions;

export default dataSlice.reducer;
