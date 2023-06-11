import React, { useEffect, useState } from 'react';
import Radar from './Radar';
import Filter from "./Filter";
import RadarTab from './RadarTab';
import XYFilter from './XYFilter';
import { fetchInitialData } from './redux/handlers';
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from 'react-redux';

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabletBackgroundColor = theme.palette.grey[100];

  const [isVisible, setIsVisible] = useState(false);

  const handleIconClick = () => {
    setIsVisible(!isVisible); // toggles the visibility state
  };

  // fetching initial data when component mounts
  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <div className="App" style={{backgroundColor: isMobile ? 'white' : tabletBackgroundColor}}>
      <RadarTab onIconClick={handleIconClick} />  {/* pass the function as a prop */}
      {isVisible && (  // only render the components if isVisible is true
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Radar />
          </Grid>
          <Grid item xs={12} sm={6}>
            <XYFilter />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default App;
