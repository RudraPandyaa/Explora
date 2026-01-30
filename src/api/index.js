import axios from 'axios';

export const getPlacesData = async(type,sw,ne)=>{
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
                    bl_latitude: sw.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                    tr_latitude: ne.lat,
        },
        headers: {
                'x-rapidapi-key': '8ecd35e413msh3ce5e98e5be4b21p1667b9jsna1053625550b',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
      })        
        return data;

    } catch (error) {
        console.log(error);
    }
}