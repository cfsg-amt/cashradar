import React from 'react';
import { VictoryScatter, VictoryLabel, VictoryAxis } from 'victory';

const CustomScatterPlot = ({ data }) => {
  return (
    <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
      <circle cx="150" cy="150" r="150" fill="black"/>
      <VictoryScatter
        standalone={false}
        width={300} height={300}
        data={data}
        size={7}
        style={{ data: { fill: "white" } }}
        labels={({ datum }) => datum.label}
        labelComponent={<VictoryLabel dy={-20}/>}
      />
    </svg>
  );
};

export default CustomScatterPlot;
