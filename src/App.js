import React, { useEffect } from 'react';
import Radar from './Radar';
import Filter from "./Filter";
import { fetchInitialData } from './redux/handlers';

import { useDispatch } from 'react-redux';
import { runTests } from './ApiTest';
import './App.css';

function App() {

  const dispatch = useDispatch();

  // fetching initial data when component mounts
  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <button onClick={runTests}>Run Server Tests</button>
      <Filter />
      <Radar />
    </div>
  );
}

export default App;
