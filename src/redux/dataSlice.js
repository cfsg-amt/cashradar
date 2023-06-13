import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdditionalData } from './handlers';

const initialState = {
  // collections
  Sec: { minMaxData: {} },
  Ind: { minMaxData: {} },
  StkSH: { minMaxData: {} },
  StkSZ: { minMaxData: {} },
  StkHK: { minMaxData: {} },

  // filters
  region: 'Sec',
  searchName: '',
  selectedGroups: [6, 7, 8, 9],
  headers: [],
  numHeaders: ['基本分析分數', '技術分析分數', '銷售額增長标准分数', '債務股本比例标准分数', '淨收入改善标准分数', '資本回報标准分数', '保留盈餘增長标准分数', '基因分析標準分數', '價格及交易量變化比率分数', '調整後移動平均線标准分数', '調整後動向指標分数', '相對強弱指數标准分数', '布林线指數标准分数', '技術分析標準分數', '相對強弱指數 (9日)', '布林线 (上線) (20日)', '布林线 (下線) (20日)', '波幅指數 (10日)', '移動平均線 (5日)', '每首股數', '預測1年股息回報', '分析員分數', '分析員分數變化', '大行中位目標價', '中位目標價變化', '分析員數量'],
  
  // initial selectedX and selectedY
  selectedX: "基本分析分數",
  selectedY: "技術分析分數",

  loading: true,
};

export const fetchAdditionalDataForX = createAsyncThunk(
  'data/fetchAdditionalDataForX',
  async (header, { dispatch, getState }) => {
    const state = getState().data;
    if (state[state.region][header].length === 0) {
      fetchAdditionalData(state.region, header, dispatch);
    }
  }
);

export const fetchAdditionalDataForY = createAsyncThunk(
  'data/fetchAdditionalDataForY',
  async (header, { dispatch, getState }) => {
    const state = getState().data;
    if (state[state.region][header].length === 0) {
      fetchAdditionalData(state.region, header, dispatch);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state[action.payload.collectionName][action.payload.header] = action.payload.data;
    },

    setMinMaxData(state, action) {
      const { collectionName, minMaxData } = action.payload;
      state[collectionName].minMaxData = minMaxData;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setRegion(state, action) {
      state.region = action.payload;
    },

    setHeaders(state, action) {
      const { collectionName, headers } = action.payload;
      for (let header of headers) {
        if (!state[collectionName][header]) {
          state[collectionName][header] = [];
        }
      }
    },

    setSelectedGroups(state, action) {
      state.selectedGroups = action.payload;
    },

    setSearchName(state, action) {
      state.searchName = action.payload.title;
      console.log(state.searchName);
    },

    setSelectedX(state, action) {
      state.selectedX = action.payload;
    },

    setSelectedY(state, action) {
      state.selectedY = action.payload;
    },
  },
});

export const { setData, setMinMaxData, setRegion, setSearchName, setHeaders, setLoading, setSelectedGroups, setSelectedX, setSelectedY } = dataSlice.actions;

export default dataSlice.reducer;
