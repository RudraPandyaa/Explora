import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';
import  Rating  from '@material-ui/lab/Rating';

const MapMarker = ({ place, isDesktop }) => {
  const classes = useStyles();

  return (
    <div className={classes.markerContainer}>
      {!isDesktop ? (
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Typography className={classes.typography} variant="subtitle2" gutterBottom>
            {place.name}
          </Typography>
          <img
            className={classes.pointer}
            src={place.photo?.images?.large?.url || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            alt={place.name}
          />
          <Rating size='small' value={Number(place.rating)} readOnly/>
        </Paper>
      )}
    </div>
  );
};

export default MapMarker;
