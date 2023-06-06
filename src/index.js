import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './redux/dataSlice';
import App from './App';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
