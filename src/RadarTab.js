import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { setRegion } from './redux/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const IconWrapper = ({ children, onClick }) => {
  return (
    <Box sx={{ alignSelf: 'center', display: 'flex', alignItems: 'center' }} onClick={onClick}>
      {children}
    </Box>
  );
};

const RadarTab = ({ onIconClick }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [iconMode, setIconMode] = useState(0);
  const [hasSelectedInTab2, setHasSelectedInTab2] = useState(false); // Added state

  const currentRegion = useSelector((state) => state.data.region);

  // Define the region-to-tab mapping
  const regionTabMapping = {
    StkHK: 4,
    StkSZ: 5,
    StkSH: 6,
  };

  const initMapping = {
    Sec: 4,
    Ind: 5,
  }

  const initValue = currentRegion in initMapping ? initMapping[currentRegion] : 6;

  const [value, setValue] = useState(initValue);
  const [tabMode, setTabMode] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 6:
        setTabMode(1);
        break;
      default:
        break;
    }
  };

  const handleSpecialStkClick = () => {
    setTabMode(1);
    // If user has clicked a tab in `tabs2` before, set that tab as selected
    if (hasSelectedInTab2 && currentRegion in regionTabMapping) {
      setValue(regionTabMapping[currentRegion]);
    } else {
      setValue(3);
    }
  };

  const handleRegionChange = (region) => {
    console.log(region);
    dispatch(setRegion(region));
    setHasSelectedInTab2(true);
  }

  const handleBack = () => {
    setTabMode(0);
    setValue(6);
  };

  const handleIconClick = () => {
    setIconMode(iconMode === 0 ? 1 : 0);
    onIconClick();
  };

  const gcSvgPath = "./static/gc.svg"
  const usSvgPath = "./static/us.svg"

  const tabs1 = [
    <IconWrapper key="unfold-icon" onClick={handleIconClick}>
      {iconMode === 0 ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
    </IconWrapper>,
    <IconWrapper key="GC">
      <img src={gcSvgPath} alt="GC Icon" style={{ height: '40px', width: 'auto', borderBottom: '2px solid red' }} />
    </IconWrapper>,
    <IconWrapper key="US">
      <img src={usSvgPath} alt="US Icon" style={{ height: '35px', width: 'auto', filter: 'blur(1px)' }} />
    </IconWrapper>,
    <IconWrapper key="separator1">
      <ShowChartOutlinedIcon />
    </IconWrapper>,
    <Tab label="板塊" key="3" onClick={() => handleRegionChange('Sec') } />,
    <Tab label="行業" key="4" onClick={() => handleRegionChange('Ind') } />,
    <Tab label="個股" key="5" onClick={() => handleSpecialStkClick() } />
  ];

  const tabs2 = [
    <IconWrapper key="unfold-icon" onClick={handleIconClick}>
      {iconMode === 0 ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
    </IconWrapper>,
    <IconWrapper key="GC">
      <img src={gcSvgPath} alt="GC Icon" style={{ height: '40px', width: 'auto', borderBottom: '2px solid red' }} />
    </IconWrapper>,
    <IconWrapper key="US">
      <img src={usSvgPath} alt="US Icon" style={{ height: '35px', width: 'auto', filter: 'blur(1px)' }} />
    </IconWrapper>,
    <IconWrapper onClick={handleBack} key="separator2">
      <ArrowBackIosOutlinedIcon />
    </IconWrapper>,
    <Tab label="香港" key="3" onClick={() => handleRegionChange('StkHK')} />,
    <Tab label="深圳" key="4" onClick={() => handleRegionChange('StkSZ')} />,
    <Tab label="上海" key="5" onClick={() => handleRegionChange('StkSH')} />
  ];

  return (
    <Box
      sx={{
        backgroundColor: isMobile ? 'white' : 'grey.100', // Main container background color
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: isMobile ? 'white' : 'grey.100', // Same color as the main container
          width: isMobile ? '100%' : '80%',
          margin: '0 auto',
          '@media (min-width:600px)': {
            backgroundColor: 'grey.100',
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontFamily: 'Roboto', // Set the font to Roboto
              fontWeight: 'bold', // Set the font weight to bold
              color: 'grey.900', // Set unselected tab labels to dark grey
            },
            '& .Mui-selected': {
              color: 'black', // Set selected tab labels to black
            },
          }}
        >
          {tabMode === 0 ? tabs1 : tabs2}
        </Tabs>
      </Box>
    </Box>
  );
}

export default RadarTab;
