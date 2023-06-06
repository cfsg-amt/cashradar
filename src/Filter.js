import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion, setSearchName, setSelectedGroups, setSelectedX, setSelectedY } from './redux/dataSlice';
import { fetchAdditionalDataForX, fetchAdditionalDataForY } from './redux/dataSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.data.region);
  const searchName = useSelector((state) => state.data.searchName);
  const selectedGroups = useSelector((state) => state.data.selectedGroups);
  const numHeaders = useSelector((state) => state.data.numHeaders);
  const selectedX = useSelector((state) => state.data.selectedX);
  const selectedY = useSelector((state) => state.data.selectedY);

  const handleRegionChange = (event) => {
    dispatch(setRegion(event.target.value));
  };

  const handleSearchNameChange = (event) => {
    dispatch(setSearchName(event.target.value));
  };

  const handleGroupChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => Number(option.value));
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
