// api.js
import axios from 'axios';

const serverURL = 'http://127.0.0.1:8080';

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
