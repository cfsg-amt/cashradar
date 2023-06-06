import React from 'react';
import Radar from './Radar';
import DataDisplay from './DataDisplay';
import { runTests } from './ApiTest';
import './App.css';

const colors = [
  "#e93f3a", "#eb4f4a", "#ed6562", "#f49b99", "#fce3e2",
  "#d0ecdb", "#86cda2", "#49b373", "#1ca152", "#00953b",
];

// Generating random data
const numPoints = 300;
const stockNames = Array.from({ length: numPoints }, (_, i) => `Stock${i+1}`);
const header1 = Array.from({ length: numPoints }, () => Math.random() * 250);
const header2 = Array.from({ length: numPoints }, () => Math.random() * 250);
const CRs = Array.from({ length: numPoints }, () => +(Math.random() * 10).toFixed(2));

const data = stockNames.map((stock, i) => ({
  x: header1[i],
  y: header2[i],
  cr: CRs[i],
  color: colors[i % colors.length], // Reuse colors when i exceeds the length of colors array
  label: `Stock: ${stock}\nCR: ${CRs[i]}\nX: ${header1[i]}\nY: ${header2[i]}`
}));

function App() {
  return (
    <div className="App">
      <button onClick={runTests}>Run Server Tests</button>
      <DataDisplay />
      <Radar data={data} />
    </div>
  );
}

export default App;
