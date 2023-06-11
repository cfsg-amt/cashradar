import React from 'react';
import { Checkbox, List, ListItem, Divider, Select, MenuItem, FormControl, OutlinedInput } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGroups, setSelectedX, setSelectedY, fetchAdditionalDataForY, fetchAdditionalDataForX } from './redux/dataSlice';

const XYFilter = () => {
  // Grab the colors array
  const colors = [
    "#e93f3a", "#eb4f4a", "#ed6562", "#f49b99", "#fce3e2",
    "#d0ecdb", "#86cda2", "#49b373", "#1ca152", "#00953b",
  ];
  
  const dispatch = useDispatch();
  
  // Retrieve necessary data from Redux store
  const { selectedGroups, selectedX, selectedY, numHeaders } = useSelector(state => state.data);

  const handleCheckboxChange = (index) => {
    const newSelectedGroups = [...selectedGroups];
    
    if (newSelectedGroups.includes(index)) {
      newSelectedGroups.splice(newSelectedGroups.indexOf(index), 1);
    } else {
      newSelectedGroups.push(index);
    }
    
    dispatch(setSelectedGroups(newSelectedGroups));
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const selectPlaceholder = (value, handleChange) => (
    <FormControl sx={{ m: 1, width: '100%', mt: 1 }}>
      <Select
        displayEmpty
        value={value}
        onChange={handleChange}
        input={
          <OutlinedInput 
            sx={{
              color: 'black',
              '& .MuiOutlinedInput-root': {
                borderColor: 'black', 
                height: '30px', 
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black', 
              },
              '& .MuiOutlinedInput-input': {
                color: 'black'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black' 
              },
            }}
          />
        }
        renderValue={(selected) => {
          if (selected === "") {
            return <em>Placeholder</em>;
          }
          return selected;
        }}
        MenuProps={MenuProps}
        sx={{ 
          color: 'black', // Changes the color of the dropdown indicator
          fontFamily: 'SimSun', // Changes the font family
          fontWeight: 'bold', // Makes the text bold
          '& .MuiSelect-icon': {
            color: 'black', // Changes the color of the dropdown indicator
          },
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        {numHeaders.map((header, index) => (
          <MenuItem key={index} value={header} sx={{ fontFamily: 'SimSun', fontWeight: 'bold' }}>{header}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const handleSelectChange = (event, type) => {
    if (type === 'X') {
      dispatch(setSelectedX(event.target.value));
      dispatch(fetchAdditionalDataForX(event.target.value));
    } else if (type === 'Y') {
      dispatch(setSelectedY(event.target.value));
      dispatch(fetchAdditionalDataForY(event.target.value));
    }
  };

  return (
    <List className="XYFilter" sx={{ width: '100%' }}>
      <ListItem sx={{ padding: 0, display: 'flex', alignItems: 'center' }}>
        {[...Array(10).keys()].map((num, index) => (
          <Checkbox
            key={index}
            color="default"
            checked={selectedGroups.includes(index)}
            onChange={() => handleCheckboxChange(index)}
            inputProps={{ 'aria-label': `checkbox ${num}` }}
            sx={{ '& .MuiSvgIcon-root': { fill: colors[num] } }}
          />
        ))}
      </ListItem>
      <Divider light sx={{ bgcolor: '#bbb' }}/>
      <ListItem sx={{ padding: 0, display: 'flex', alignItems: 'center' }}>
        {selectPlaceholder(selectedX, (e) => handleSelectChange(e, 'X'))}
      </ListItem>
      <Divider light sx={{ bgcolor: '#bbb' }}/>
      <ListItem sx={{ padding: 0, display: 'flex', alignItems: 'center' }}>
        {selectPlaceholder(selectedY, (e) => handleSelectChange(e, 'Y'))}
      </ListItem>
    </List>
  );
};

export default XYFilter;
