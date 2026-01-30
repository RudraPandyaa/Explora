import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {
  const [places, setPlaces ] = useState([])
  const [childClicked, setChildClicked] = useState(null)
  const [coordinates,setCoordinates] = useState({ lat: 0,lng: 0 });
  const [bounds,setBounds] = useState({});
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    setCoordinates({ lat: latitude, lng: longitude });
  });
}, []);


useEffect(() => {
  if (bounds.sw && bounds.ne) {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      console.log("Fetched data:", data);
      
      // Filter out places without name or with no reviews
      const filteredData = data
        ?.filter((place) => place.name && Number(place.num_reviews) > 0)
        ?.filter((place) => {
          if (!rating) return true; // if no rating selected, show all
          return Number(place.rating) >= Number(rating);
        });

      setPlaces(filteredData);

      setIsLoading(false);
    });
  }
}, [type, bounds, rating]);




  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
          isLoading={isLoading}
          places={places}
          childClicked={childClicked}  
          // setChildClicked={setChildClicked}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />

        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            />
        </Grid>
      </Grid>
    </>
  );
}

export default App;