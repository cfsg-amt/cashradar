import axios from 'axios';

import { setData, setMinMaxData, setHeaders, setLoading } from './dataSlice';

export function getRadarChartData(selectedRegion, selectedGroups, selectedX, selectedY, state) {
  const colors = [
    "#e93f3a", "#eb4f4a", "#ed6562", "#f49b99", "#fce3e2",
    "#d0ecdb", "#86cda2", "#49b373", "#1ca152", "#00953b",
  ];

  // Get data for selected region
  if (!state || !state[selectedRegion]) {
    return [];
  }

  const regionData = state[state.region]; 

  // Check if data is loaded
  if (!regionData) {
    return [];
  }

  // Convert data to format required by Radar chart
  let formattedData = [];
  for (let groupIndex of selectedGroups) {
    const groupKey = `${selectedRegion}${groupIndex}`;

    // Check if data for the group exists
    if (!regionData[selectedX][groupKey] || !regionData[selectedY][groupKey]) {
      continue;
    }

    for (let i = 0; i < regionData[selectedX][groupKey].length; i++) {
      // The exact format will depend on your data structure and how you want to display it
      formattedData.push({
        x: regionData[selectedX][groupKey][i],
        y: regionData[selectedY][groupKey][i],
        label: `Group: ${groupKey}\n Name: ${regionData["name"][groupKey][i]} \n ${selectedX}: ${regionData[selectedX][groupKey][i]} \n ${selectedY}: ${regionData[selectedY][groupKey][i]}`,
        color: colors[groupIndex],
      });
    }
  }
  return formattedData;
}

// const serverURL = 'http://192.168.222.12';
const serverURL = 'http://localhost:8996';
const collections = ["Sec", "Ind", "StkSH", "StkSZ", "StkHK"];
const initHeaders = ["基本分析分數", "技術分析分數", "時富雷達 (CR)", "行業", "name"];

export function fetchInitialData(dispatch) {
  console.log("fetchInitialData() start")
  let promises = [];
  for (let collection of collections) {
    // Fetch headers
    axios.get(`${serverURL}/api/v1/headers/${collection}`)
      .then(response => {
        console.log(`Headers for ${collection}: `, response.data);
        dispatch(setHeaders({ collectionName: collection, headers: response.data }));
      })
      .catch(error => console.error(`Error: ${error}`));

    // Fetch min max data for each collection

    // Fetch min max data for each collection
    axios.get(`${serverURL}/api/v1/minmax/${collection}`)
      .then(response => {
        console.log(`MinMaxData for ${collection}: `, response.data);
        dispatch(setMinMaxData({ collectionName: collection, minMaxData: response.data }));
      })

  .catch(error => console.error(`Error: ${error}`));
    // Fetch initial data
    const encodedHeaders = encodeURI(initHeaders.join(','));
    let promise = axios.get(`${serverURL}/api/v1/${collection}/item?headers=${encodedHeaders}`)
      .then(response => {
        for (let header of initHeaders) {
          dispatch(setData({ collectionName: collection, header, data: response.data[header] }));
        }
      })
      .catch(error => console.error(`Error: ${error}`));

    promises.push(promise);
  }

  // When all data has been fetched, set loading to false
  Promise.all(promises)
    .then(() => dispatch(setLoading(false)))
    .catch((error) => console.error(`Error: ${error}`));

  console.log('fetchInitialData() done');
}

export function fetchAdditionalData(collection, header, dispatch) {
  // Set loading to true
  dispatch(setLoading(true));

  // Fetch additional data
  const encodedHeader = encodeURI(header);
  axios.get(`${serverURL}/api/v1/${collection}/item?headers=${encodedHeader}`)
    .then(response => {
      // Save the fetched data
      dispatch(setData({ collectionName: collection, header, data: response.data[header] }));
      
      // Set loading to false after successfully saving the data
      dispatch(setLoading(false));
    })
    .catch(error => {
      console.error(`Error: ${error}`);
      
      // Even if there's an error, we should still set loading to false
      dispatch(setLoading(false));
    });
}


export function fetchStockDetails(collection, stockName) {
  return axios.get(`${serverURL}/api/v1/${collection}/item/${stockName}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(`Error: ${error}`);
      throw error;
    });
}
