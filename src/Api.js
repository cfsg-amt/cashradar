// api.js
import axios from 'axios';

const serverURL = 'http://192.168.222.12:8996';

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
