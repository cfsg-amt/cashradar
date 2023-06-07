import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion, setSearchName, setSelectedGroups, setSelectedX, setSelectedY } from './redux/dataSlice';
import { fetchAdditionalDataForX, fetchAdditionalDataForY } from './redux/dataSlice';
import { Button, Collapse, AppBar, Toolbar } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';

import { ReactComponent as GcIcon } from './static/gc.svg';
import { ReactComponent as UsIcon } from './static/us.svg';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto',
          textTransform: 'none',
          minWidth: '64px',
          height: '64px',
          borderRadius: '12px',
          fontSize: '14px',
          lineHeight: '18px',
          fontWeight: 'bold',
          color: 'black',
        },
        sizeSmall: {
          minWidth: '32px',
          height: '32px',
          borderRadius: '5px',
          fontSize: '10px',
          lineHeight: '12px',
          fontWeight: 'bold',
        },
      },
    },
  },

});

const Filter = () => {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.data.region);
  const [showStocks, setShowStocks] = useState(false);
  const searchName = useSelector((state) => state.data.searchName);
  const selectedGroups = useSelector((state) => state.data.selectedGroups);
  const numHeaders = useSelector((state) => state.data.numHeaders);
  const selectedX = useSelector((state) => state.data.selectedX);
  const selectedY = useSelector((state) => state.data.selectedY);

  const handleRegionChange = (newRegion) => {
    if (newRegion === 'Stk') {
      setShowStocks(!showStocks);
    } else {
      setShowStocks(false);
      dispatch(setRegion(newRegion));
    }
  };

  const handleSearchNameChange = (event) => {
    dispatch(setSearchName(event.target.value));
  };

  const handleGroupChange = (event) => {
    const selectedOptions = event.target.value;
    dispatch(setSelectedGroups(selectedOptions));
  };

  const handleXChange = (event) => {
    const newHeader = event.target.value;
    dispatch(setSelectedX(newHeader));
    dispatch(fetchAdditionalDataForX(newHeader));
  };

  const handleYChange = (event) => {
    const newHeader = event.target.value;
    dispatch(setSelectedY(newHeader));
    dispatch(fetchAdditionalDataForY(newHeader));
  };

  return (
    <div>
      <div style={{ marginTop: '64px' }}>
        <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
          <Toolbar 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton>
              <SvgIcon
                component={GcIcon}
                viewBox="0 0 1000 850"
                sx={{
                  height: '48px',
                  width: 'auto',
                }}
              />
            </IconButton>
            <IconButton disabled>
              <SvgIcon
                component={UsIcon}
                viewBox="0 0 1000, 589" 
                sx={{
                  height: '48px',
                  width: 'auto',
                  filter: 'blur(1px)',
                }}
              />
            </IconButton>
            <ThemeProvider theme={theme}>
              <Button
                variant={region === 'Sec' ? 'contained' : 'outlined'}
                onClick={() => handleRegionChange('Sec')}
                sx={{
                  backgroundColor: region === 'Sec' ? 'rgba(30, 139, 195, 1)' : alpha('rgba(30, 139, 195, 1)', 0.1),
                  color: region === 'Sec' ? 'black' : 'rgba(30, 139, 195, 1)',
                  borderColor: 'rgba(30, 139, 195, 1)',
                  '&:hover': {
                    backgroundColor: region === 'Sec' ? 'rgba(30, 81, 123, 1)' : alpha('rgba(30, 81, 123, 1)', 0.1),
                  },
                }}
              >
                板塊 <br/> Sector
              </Button>
              <Button
                variant={region === 'Ind' ? 'contained' : 'outlined'}
                onClick={() => handleRegionChange('Ind')}
                sx={{
                  backgroundColor: region === 'Ind' ? 'rgba(0, 128, 0, 1)' : alpha('rgba(0, 128, 0, 1)', 0.1),
                  color: region === 'Ind' ? 'black' : 'rgba(0, 128, 0, 1)',
                  borderColor: 'rgba(0, 128, 0, 1)',
                  '&:hover': {
                    backgroundColor: region === 'Ind' ? 'rgba(0, 100, 0, 1)' : alpha('rgba(0, 100, 0, 1)', 0.1),
                  },
                }}
              >
                行業 <br/> Industry
              </Button>
              <Button
                variant={region.startsWith('Stk') ? 'contained' : 'outlined'}
                onClick={() => handleRegionChange('Stk')}
                sx={{
                  backgroundColor: region.startsWith('Stk') ? 'rgba(255, 165, 0, 1)' : alpha('rgba(255, 165, 0, 1)', 0.1),
                  color: region.startsWith('Stk') ? 'black' : 'rgba(255, 165, 0, 1)',
                  borderColor: 'rgba(255, 165, 0, 1)',
                  '&:hover': {
                    backgroundColor: region.startsWith('Stk') ? 'rgba(255, 140, 0, 1)' : alpha('rgba(255, 140, 0, 1)', 0.1),
                  },
                }}
              >
                個股 <br/> Stock
              </Button>
              <Collapse in={showStocks}>
                <Button 
                  variant={region === 'StkSH' ? 'contained' : 'outlined'} 
                  onClick={() => handleRegionChange('StkSH')}
                  size="small"
                  sx={{
                    backgroundColor: region === 'StkSH' ? 'rgba(255, 165, 0, 1)' : alpha('rgba(255, 165, 0, 1)', 0.1),
                    color: region === 'StkSH' ? 'white' : 'rgba(255, 165, 0, 1)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    '&:hover': {
                      backgroundColor: region === 'StkSH' ? 'rgba(255, 140, 0, 1)' : alpha('rgba(255, 140, 0, 1)', 0.1),
                    }
                  }}
                >
                  上海 <br/> SH
                </Button>
                <Button 
                  variant={region === 'StkSZ' ? 'contained' : 'outlined'} 
                  onClick={() => handleRegionChange('StkSZ')}
                  size="small"
                  sx={{
                    backgroundColor: region === 'StkSZ' ? 'rgba(255, 165, 0, 1)' : alpha('rgba(255, 165, 0, 1)', 0.1),
                    color: region === 'StkSZ' ? 'white' : 'rgba(255, 165, 0, 1)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    '&:hover': {
                      backgroundColor: region === 'StkSZ' ? 'rgba(255, 140, 0, 1)' : alpha('rgba(255, 140, 0, 1)', 0.1),
                    }
                  }}
                >
                  深圳 <br/> SZ
                </Button>
                <Button 
                  variant={region === 'StkHK' ? 'contained' : 'outlined'} 
                  onClick={() => handleRegionChange('StkHK')}
                  size="small"
                  sx={{
                    backgroundColor: region === 'StkHK' ? 'rgba(255, 165, 0, 1)' : alpha('rgba(255, 165, 0, 1)', 0.1),
                    color: region === 'StkHK' ? 'white' : 'rgba(255, 165, 0, 1)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    '&:hover': {
                      backgroundColor: region === 'StkHK' ? 'rgba(255, 140, 0, 1)' : alpha('rgba(255, 140, 0, 1)', 0.1),
                    }
                  }}
                >
                  香港 <br/> HK
                </Button>

              </Collapse>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </div>

      <label>Search by name:
        <input type="text" value={searchName} onChange={handleSearchNameChange} />
      </label>
      <label>Groups:
        <select multiple value={selectedGroups} onChange={handleGroupChange}>
          {/* I'm assuming the possible groups are 1 to 10, but you should replace this with the actual possible groups. */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map(group => (
            <option key={group} value={group}>Group {group}</option>
          ))}
        </select>
      </label>
      <label>X:
        <select value={selectedX} onChange={handleXChange}>
          {numHeaders.map(header => <option key={header} value={header}>{header}</option>)}
        </select>
      </label>
      <label>Y:
        <select value={selectedY} onChange={handleYChange}>
          {numHeaders.map(header => <option key={header} value={header}>{header}</option>)}
        </select>
      </label>
    </div>
  );
};

export default Filter;
