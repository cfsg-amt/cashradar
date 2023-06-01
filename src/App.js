import React from 'react';
import ReactDOM from 'react-dom';
import Radar from './Radar';
import './App.css';

const header1 = [50, 100, 150, 200, 250];
const header2 = [250, 200, 150, 100, 50];
const stockNames = ["Stock1", "Stock2", "Stock3", "Stock4", "Stock5"];

const data = header1.map((value, i) => ({
  x: value, 
  y: header2[i], 
  label: `Stock: ${stockNames[i]}\nX: ${value}\nY: ${header2[i]}`
}));

function App() {
  return (
    <div className="App">
      <Radar data={data} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
