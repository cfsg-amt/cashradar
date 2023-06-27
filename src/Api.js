// api.js
import axios from 'axios';

// Production
const serverURL = 'http://radar.cfsg.com.hk';
// const serverURL = 'http://localhost:8996';

export function fetchServerData() {
  return axios.get(serverURL)
    .then(response => response.data)
    .catch(error => console.error(`Error: ${error}`));
}

export function postToServer(data) {
  return axios.post(serverURL, data)
    .then(response => response.data)
    .catch(error => console.error(`Error: ${error}`));
}
