import React, { useEffect, useState } from 'react';
import Radar from './Radar';
import Filter from "./Filter";
import RadarTab from './RadarTab';
import XYFilter from './XYFilter';
import Search from './Search';
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { fetchInitialData } from './redux/handlers';
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from 'react-redux';

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabletBackgroundColor = theme.palette.grey[50];

  const [isVisible, setIsVisible] = useState(false);

  const handleIconClick = () => {
    setIsVisible(!isVisible); // toggles the visibility state
  };

  // fetching initial data when component mounts
  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <div>
      <div className="App" style={{backgroundColor: isMobile ? 'white' : tabletBackgroundColor}}>
        <AppBar position="static" style={{ backgroundColor: '#FF5733' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src={process.env.PUBLIC_URL + '/static/cfsg.svg'} alt="logo" style={{width: "200px"}}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <RadarTab onIconClick={handleIconClick} />  {/* pass the function as a prop */}
        {isVisible && (  // only render the components if isVisible is true
          <Grid container spacing={0} style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid item xs={12} sm={12} md={6}>
              <Radar />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <XYFilter />
            </Grid>
          </Grid>
        )}
        <Search />
      </div>
    </div>
  );
}

export default App;
