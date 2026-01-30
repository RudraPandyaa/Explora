export async function handler(event) {
  const { type, swLat, swLng, neLat, neLng } = event.queryStringParameters;

  const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${swLat}&bl_longitude=${swLng}&tr_longitude=${neLng}&tr_latitude=${neLat}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch places' }),
    };
  }
}