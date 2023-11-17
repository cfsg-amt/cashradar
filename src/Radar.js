import { VictoryChart, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer, VictoryAxis, VictoryZoomContainer } from 'victory';
import { getRadarChartData } from './redux/handlers'
import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchName } from './redux/dataSlice';

const Radar = () => {
  const inactiveSize = 1; // size of data points when not hovered
  const activeSize = 3; // size of data points when hovered

  const dispatch = useDispatch();
  const loading = useSelector(state => state.data.loading);
  const selectedRegion = useSelector(state => state.data.region);
  const selectedGroups = useSelector(state => state.data.selectedGroups);
  const selectedX = useSelector(state => state.data.selectedX);
  const selectedY = useSelector(state => state.data.selectedY);
  const stateData = useSelector(state => state.data);

  // loading check should be after all useSelector calls
  if (loading) {
    return <CircularProgress />;
  }

  const data = getRadarChartData(selectedRegion, selectedGroups, selectedX, selectedY, stateData);

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
              cornerRadius={5} // You can set corner radius here
              flyoutStyle={{ fill: "white", stroke: "lightgrey", strokeWidth: 1 }} // You can adjust the box border color and width here
              // You can adjust the size and other styles here:
              style={[ 
                { fill: "black", fontWeight: "bold", fontSize: 8 }, // styles for the first line of the tooltip
                { fill: "black", fontSize: 8 }, // styles for the second line of the tooltip
                { fill: "black", fontSize: 8 }, // styles for the third line of the tooltip
                { fill: "black", fontSize: 8 }, // styles for the fourth line of the tooltip
              ]}
              flyoutDimensions={{ width: 100, height: 100 }} // You can set tooltip box dimensions here
            />
          }
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => {
                        dispatch(setSearchName({title: props.datum.name}));
                        return null;
                      }
                    }
                  ];
                },
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
