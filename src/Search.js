import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchName } from './redux/dataSlice';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/system/GlobalStyles';

export default function Search() {
  const dispatch = useDispatch();

  // getting region and grouped name data from store
  const { region, collections } = useSelector((state) => {
    const { region, Sec, Ind, StkSH, StkSZ, StkHK } = state.data;
    return { region, collections: { Sec, Ind, StkSH, StkSZ, StkHK }};
  });


  const options = Object.keys(collections[region].name || {}).flatMap((groupKey) => {
    // Take the group number from the key, assuming the format is always 'SecX'
    const groupNumber = groupKey.replace(/^\D+/g, '');

    // Create the custom label
    const groupLabel = `時富雷達分數: ${groupNumber}.x`;

    return collections[region].name[groupKey].map((name) => {
      return {
        groupLabel,
        title: name,
      };
    });
  });

  const handleChange = (event, value) => {
    if (value !== null) {
      dispatch(setSearchName(value));
    } else {
      dispatch(setSearchName({ title: '', groupLabel: '' }));
    }
  };

  // Conditionally set the label based on the region
  let label;
  switch(region) {
    case 'Ind':
      label = '檢索行業';
      break;
    case 'Sec':
      label = '檢索板塊';
      break;
    case 'StkSH':
      label = '檢索上海股票';
      break;
    case 'StkSZ':
      label = '檢索深圳股票';
      break;
    case 'StkHK':
      label = '檢索香港股票';
      break;
    default:
      label = '輸入檢索名稱';
      break;
  }

  return (
    <Box sx={{ margin: '10px auto 0', width: '100%', maxWidth: 700 }}>
      <GlobalStyles
        styles={{
          '.MuiAutocomplete-option': {
            fontFamily: "'SimSun', serif",
          },
        }}
      />
      <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.groupLabel.localeCompare(a.groupLabel))}
        isOptionEqualToValue={(option, value) => option.title === value.title && option.groupLabel === value.groupLabel}
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
            color: "black",
            fontFamily: "'SimSun', serif",
            fontWeight: "bold",
          },
          "& .MuiFormLabel-root": {
            color: "black",
            "&.Mui-focused": {
              color: "black",
            },
            fontFamily: "'SimSun', serif",
            fontWeight: "bold",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "black",
            fontFamily: "'SimSun', serif",
            fontWeight: "bold",
          },
          "& .MuiAutocomplete-option": {
            fontFamily: "'SimSun', serif",
            fontWeight: "bold",
          },
          "& .MuiAutocomplete-listbox": {
            backgroundColor: "white",
            "& .MuiAutocomplete-option:first-of-type": {
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
            },
            "& .MuiAutocomplete-option:last-of-type": {
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
