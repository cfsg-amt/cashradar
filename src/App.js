import React, { useEffect, useState } from 'react';
import Radar from './Radar';
import Pwd from './Pwd';
import RadarTab from './RadarTab';
import { HashRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import XYFilter from './XYFilter';
import Search from './Search';
import Details from './Details';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { fetchInitialData } from './redux/handlers';
import { Grid, useMediaQuery } from "@mui/material";
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // adjust the path if necessary
import Login from './Login';
import MenuIcon from '@mui/icons-material/Menu'; // import Menu icon

function AuthenticatedApp({ handleMenuClick, anchorEl, handleMenuClose, isVisible, handleIconClick }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabletBackgroundColor = theme.palette.grey[50];

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App" style={{backgroundColor: isMobile ? 'white' : tabletBackgroundColor}}>
      <AppBar position="static" style={{ backgroundColor: '#ad9f92' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={process.env.PUBLIC_URL + '/static/cfsg.svg'} alt="logo" style={{width: "200px"}}/>
          </IconButton>
          <Box flexGrow={1}></Box> {/* Add this Box component to push the subsequent items to the right */}
          <IconButton edge="end" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
            <MenuIcon /> {/* Replace button text with Menu icon */}
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component="a" href="/news/index.html">主頁</MenuItem>
            <MenuItem onClick={handleMenuClose} component="a" href="/news/index.html">宏觀經濟</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/">時富雷達</MenuItem>
          </Menu>
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
      <Details />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = () => {
    setIsVisible(!isVisible); // toggles the visibility state
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // fetching initial data when component mounts
  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  // Use AuthenticatedApp in your routes
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/changepwd" element={<Pwd />} />
          <Route path="/" element={
            <AuthenticatedApp 
              handleMenuClick={handleMenuClick} 
              anchorEl={anchorEl} 
              handleMenuClose={handleMenuClose} 
              isVisible={isVisible} 
              handleIconClick={handleIconClick} 
            />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );

}

export default App;
