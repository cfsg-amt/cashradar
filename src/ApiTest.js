import axios from 'axios';
import { setData, setHeaders } from './redux/dataSlice';

// const serverURL = 'http://192.168.222.12';
const serverURL = 'http://localhost:8996';
const collections = ["Sec", "Ind", "StkSH", "StkSZ", "StkHK"];
const initHeaders = ["基本分析分數", "技術分析分數", "時富雷達 (CR)", "行業", "name"];

export function fetchInitialData(dispatch) {
  for (let collection of collections) {
    // Fetch headers
    axios.get(`${serverURL}/api/v1/headers/${collection}`)
      .then(response => {
        dispatch(setHeaders({ collectionName: collection, headers: response.data }));
      })
      .catch(error => console.error(`Error: ${error}`));

    // Fetch initial data
    const encodedHeaders = encodeURI(initHeaders.join(','));
    axios.get(`${serverURL}/api/v1/${collection}/item?headers=${encodedHeaders}`)
      .then(response => {
        for (let header of initHeaders) {
          dispatch(setData({ collectionName: collection, header, data: response.data[header] }));
        }
      })
      .catch(error => console.error(`Error: ${error}`));
  }
}

export function testGetByHeadersHandler(dispatch) {
  const headers = ["基本分析分數", "技術分析分數", "時富雷達 (CR)", "行業", "name"];
  const encodedHeaders = encodeURI(headers.join(','));
  
  return axios.get(`${serverURL}/api/v1/Sec/item?headers=${encodedHeaders}`)
    .then(response => {
      console.log('GetByHeadersHandler Response: ', response.data);
      for (let header of headers) {
        dispatch(setData({ collectionName: 'Sec', header, data: response.data[header] }));
      }
    })
    .catch(error => console.error(`Error: ${error}`));
}

function testGetByHeadersHandler2() {
  const headers = ["基本分析分數", "技術分析分數", "保留盈餘增長标准分数", "基因分析標準分數"];
  const encodedHeaders = encodeURI(headers.join(','));
  return axios.get(`${serverURL}/api/v1/Sec/item?headers=${encodedHeaders}`)
    .then(response => console.log('GetByHeadersHandler Response: ', response.data))
    .catch(error => console.error(`Error: ${error}`));
}

function testGetSingleRecordHandler() {
  const stockName = "通信服務";
  const encodedStockName = encodeURI(stockName);
  return axios.get(`${serverURL}/api/v1/Sec/item/${encodedStockName}`)
    .then(response => console.log('GetSingleRecordHandler Response: ', response.data))
    .catch(error => console.error(`Error: ${error}`));
}

function testGetHeadersHandler() {
  return axios.get(`${serverURL}/api/v1/headers/Sec`)
    .then(response => console.log('GetHeadersHandler Response: ', response.data))
    .catch(error => console.error(`Error: ${error}`));
}

export function runTests() {
  console.log("Starting tests...");
  testGetByHeadersHandler2();
  testGetSingleRecordHandler();
  testGetHeadersHandler();
}

