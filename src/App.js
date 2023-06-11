import React, { useEffect } from 'react';
import Radar from './Radar';
import Filter from "./Filter";
import RadarTab from './RadarTab';
import XYFilter from './XYFilter';
import { fetchInitialData } from './redux/handlers';

import { useDispatch } from 'react-redux';
import './App.css';

function App() {

  const dispatch = useDispatch();

  // fetching initial data when component mounts
  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <RadarTab />
      <Radar />
      <XYFilter />
    </div>
  );
}

export default App;
