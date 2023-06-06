import { VictoryChart, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer, VictoryAxis } from 'victory';
import { getRadarChartData } from './redux/handlers'
import { useSelector } from 'react-redux';

const Radar = () => {
  const inactiveSize = 1; // size of data points when not hovered
  const activeSize = 3; // size of data points when hovered



  const loading = useSelector(state => state.data.loading);
  const selectedRegion = useSelector(state => state.data.region);
  const stateData = useSelector(state => state.data);

  // loading check should be after all useSelector calls
  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  const data = getRadarChartData(selectedRegion, stateData);
  console.log('data: ', data);

  return (
    <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
      <circle cx="150" cy="150" r="150" fill="black"/>
      <VictoryChart
        standalone={false}
        width={300} height={300}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryScatter
          data={data}
          size={({ active }) => active ? activeSize : inactiveSize}
          labels={({ datum, active }) => active ? datum.label : null}
          style={{ 
            data: { 
              fill: ({ datum }) => datum.color,
              stroke: ({ active }) => active ? "black" : "none",
              strokeWidth: ({ active }) => active ? 2 : 0
            } 
          }}
          labelComponent={
            <VictoryTooltip 
              renderInPortal={false}
              orientation="top"
              pointerLength={0}
              cornerRadius={0}
              flyoutStyle={{ fill: "white" }}
            />
          }

          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => ({ style: { ...props.style, fill: props.datum.color }, size: activeSize }) // increased size
                    }, {
                      target: 'labels',
                      mutation: () => ({ active: true })
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => ({ style: { ...props.style, fill: props.datum.color }, size: inactiveSize }) // original size
                    }, {
                      target: 'labels',
                      mutation: () => ({ active: false })
                    }
                  ];
                }
              }
            }
          ]}
        />
        <VictoryAxis style={{ axis: { visibility: 'hidden' }, ticks: { visibility: 'hidden' }, tickLabels: { visibility: 'hidden' } }} />
        <VictoryAxis dependentAxis style={{ axis: { visibility: 'hidden' }, ticks: { visibility: 'hidden' }, tickLabels: { visibility: 'hidden' } }} />
      </VictoryChart>
    </svg>
  );
};

export default Radar;
