// serverTest.js
import axios from 'axios';

const serverURL = 'http://127.0.0.1:8080';

function testGetByHeadersHandler() {
  const headers = ["基本分析分數", "技術分析分數", "保留盈餘增長标准分数", "基因分析標準分數"];
  const encodedHeaders = encodeURI(headers.join(','));
  return axios.get(`${serverURL}/api/v1/StkHK/item?headers=${encodedHeaders}`)
    .then(response => console.log('GetByHeadersHandler Response: ', response.data))
    .catch(error => console.error(`Error: ${error}`));
}

function testGetSingleRecordHandler() {
  const stockName = "1112HK-H&H國際控股";
  const encodedStockName = encodeURI(stockName);
  return axios.get(`${serverURL}/api/v1/StkHK/item/${encodedStockName}`)
    .then(response => console.log('GetSingleRecordHandler Response: ', response.data))
    .catch(error => console.error(`Error: ${error}`));
}

function testGetHeadersHandler() {
  return axios.get(`${serverURL}/api/v1/headers/StkHK`)
    .then(response => console.log('GetHeadersHandler Response: ', response.data))
    .catch(error => console.error(`Error: ${error}`));
}

export function runTests() {
  console.log("Starting tests...");
  testGetByHeadersHandler();
  testGetSingleRecordHandler();
  testGetHeadersHandler();
}
