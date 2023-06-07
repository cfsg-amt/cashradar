import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './redux/dataSlice';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
