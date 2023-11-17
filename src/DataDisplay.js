import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitialData } from './ApiTest'; // import the function

const DataDisplay = () => {
  const dispatch = useDispatch();

  // fetching initial data when component mounts
  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  // accessing redux store state
  const data = useSelector((state) => state.data);

  // displaying fetched data
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h2>Data from Redux:</h2>
      {Object.keys(data).map(collection => (
        <div key={collection}>
          <h3>{collection}:</h3>
          <pre>{JSON.stringify(data[collection], null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
