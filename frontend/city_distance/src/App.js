import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import './App.css';
import axios from 'axios';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
    setErrorMessage('');
  };

  const calculateDistance = async () => {
    try {
      const response = await axios.post('http://localhost:4000/calculate-distance', {
        origin,
        destination,
      });
      
      setDistance(response.data.distance);
      if (!response.data.distance) {
        setErrorSnackbarOpen(true);
        setErrorMessage('Invalid city or place names. Please check and try again.');
        setDistance('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Typography variant="h3">City Distance Calculator</Typography>
      <div className="input-container">
        <TextField 
          label="Origin City" 
          variant="outlined" 
          value={origin} 
          onChange={(e) => setOrigin(e.target.value)} 
        />
      </div>

      <div className="input-container">
        <TextField 
          label="Destination City" 
          variant="outlined" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
        />
      </div>
      <Button variant="contained" onClick={calculateDistance}>Calculate Distance</Button>
      {distance && <Typography variant="body1">Distance: {distance}</Typography>}
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </div>
  );
}

export default App;
