import React from 'react';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGroups } from './redux/dataSlice';

const XYFilter = () => {
  // Grab the colors array
  const colors = [
    "#e93f3a", "#eb4f4a", "#ed6562", "#f49b99", "#fce3e2",
    "#d0ecdb", "#86cda2", "#49b373", "#1ca152", "#00953b",
  ];
  
  const dispatch = useDispatch();
  
  // Retrieve selectedGroups from Redux store
  const selectedGroups = useSelector(state => state.data.selectedGroups);

  const handleCheckboxChange = (index) => {
    const newSelectedGroups = [...selectedGroups];
    
    if (newSelectedGroups.includes(index)) {
      // Remove the index from the array if it's already included
      newSelectedGroups.splice(newSelectedGroups.indexOf(index), 1);
    } else {
      // Add the index to the array if it's not already included
      newSelectedGroups.push(index);
    }
    
    // Dispatch an action to update the selectedGroups in the Redux store
    dispatch(setSelectedGroups(newSelectedGroups));
  };

  return (
    <div className="XYFilter">
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
    </div>
  );
};

export default XYFilter;
