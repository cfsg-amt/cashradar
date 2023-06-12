import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearchName } from './redux/dataSlice';
import Box from '@mui/material/Box';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchName(inputValue));
  };

  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Paper 
        component="form" 
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 800 }} // set maximum width here
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for stocks, industries, or sectors"
          inputProps={{ 'aria-label': 'Search for stocks, industries or sectors' }}
          value={inputValue}
          onChange={handleChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchComponent;
