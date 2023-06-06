import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion, setSearchName } from './redux/dataSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.data.region);
  const searchName = useSelector((state) => state.data.searchName);

  const handleRegionChange = (event) => {
    dispatch(setRegion(event.target.value));
  };

  const handleSearchNameChange = (event) => {
    dispatch(setSearchName(event.target.value));
  };

  return (
    <div>
      <label>Region:
        <select value={region} onChange={handleRegionChange}>
          <option value="Sec">Sector</option>
          <option value="Ind">Industry</option>
          <option value="StkSH">SH</option>
          <option value="StkSZ">SZ</option>
          <option value="StkHK">HK</option>
        </select>
      </label>
      <label>Search by name:
        <input type="text" value={searchName} onChange={handleSearchNameChange} />
      </label>
    </div>
  );
};

export default Filter;
