const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const axios = require('axios');
const app = express();

const cors =  require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const PORT = process.env.PORT || 4000;
app.use(cors(corsOptions));

app.use(express.json());

app.post('/calculate-distance', async (req, res) => {
  const { origin, destination } = req.body;

  try {
    // (Google Maps Distance Matrix API) to calculate distance.
    const API_KEY = process.env.GOOGLE_API;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${API_KEY}`
    );

   
    const distance = response.data.rows[0].elements[0].distance.text;   // Extract distance from the response and send it back to the client.
    res.json({ distance });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error calculating distance' });
  }
});  
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
     