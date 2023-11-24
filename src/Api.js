// api.js
import axios from 'axios';

// Production
// const serverURL = 'https://radar.cfsg.com.hk';
const serverURL = 'http://localhost:8996';
// const serverURL = 'http://l45411e1993.asuscomm.com'

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
