import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useMediaQuery } from '@material-ui/core';
import MapMarker from './MapMarker';
import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates, places,setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <div>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhOs7sh-zWBeE1E_2fdpCHtR9hoP-4EQY' }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={(child) => setChildClicked(child)}
        >
        {places?.map((place, i) => {
          if (!place.latitude || !place.longitude) return null;

          return (
            <MapMarker
              key={i}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              place={place}
              isDesktop={isDesktop}
            />
          );
        })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
