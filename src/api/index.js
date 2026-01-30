import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data } = await axios.get('/.netlify/functions/getPlaces', {
      params: {
        type,
        swLat: sw.lat,
        swLng: sw.lng,
        neLat: ne.lat,
        neLng: ne.lng,
      },
    });

    return data?.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};