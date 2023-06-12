import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchName } from './redux/dataSlice';
import Box from '@mui/material/Box';

export default function Search() {
  const dispatch = useDispatch();

  // getting region and grouped name data from store
  const { region, collections } = useSelector((state) => {
    const { region, Sec, Ind, StkSH, StkSZ, StkHK } = state.data;
    return { region, collections: { Sec, Ind, StkSH, StkSZ, StkHK }};
  });

  const options = Object.keys(collections[region].name || {}).flatMap((groupKey) => {
    return collections[region].name[groupKey].map((name) => {
      return {
        groupLabel: groupKey,
        title: name,
      };
    });
  });

  const handleChange = (event, value) => {
    dispatch(setSearchName(value));
  };

  // Conditionally set the label based on the region
  let label;
  switch(region) {
    case 'Ind':
      label = 'Search for industries';
      break;
    case 'Sec':
      label = 'Search for sectors';
      break;
    case 'StkSH':
      label = 'Search for Shanghai stocks';
      break;
    case 'StkSZ':
      label = 'Search for Shenzhen stocks';
      break;
    case 'StkHK':
      label = 'Search for Hong Kong stocks';
      break;
    default:
      label = 'Search';
      break;
  }

  return (
    <Box sx={{ margin: '10px auto 0', width: '100%', maxWidth: 700 }}>
      <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.groupLabel.localeCompare(a.groupLabel))}
        groupBy={(option) => option.groupLabel}
        getOptionLabel={(option) => option.title}
        sx={{ 
          width: '100%', 
          "& .MuiOutlinedInput-root": { 
            borderColor: "black", 
            "&.Mui-focused fieldset": { 
              borderColor: "black" 
            },
            "& fieldset": {
              borderColor: "black",
            },
          }, 
          "& .MuiOutlinedInput-input": { 
            color: "black" 
          },
          "& .MuiFormLabel-root": {
            color: "black",
            "&.Mui-focused": {
              color: "black",
            },
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "black"
          },
          "& .MuiAutocomplete-listbox": {
            backgroundColor: "white",
            "& .MuiAutocomplete-option:first-child": {
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
            },
            "& .MuiAutocomplete-option:last-child": {
              borderBottomLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }
          },
          "& .MuiPaper-root": {
            backgroundColor: "white"
          }
        }}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      />
    </Box>
  );
}
