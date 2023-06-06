import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  // collections
  Sec: {},
  Ind: {},
  StkSH: {},
  StkSZ: {},
  StkHK: {},

  // filters
  region: 'Sec',
  searchName: '',

  loading: true,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state[action.payload.collectionName][action.payload.header] = action.payload.data;
      console.log("setData() done, state: ", current(state));
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setRegion(state, action) {
      state.region = action.payload;
    },

    setSearchName(state, action) {
      state.searchName = action.payload;
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

export const { setData, setRegion, setSearchName, setHeaders, setLoading } = dataSlice.actions;

export default dataSlice.reducer;
