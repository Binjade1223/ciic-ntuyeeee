export const keyToLoc = (key) => {
  const BASE_LOCATION = 'Saraburi_TEST';
  return BASE_LOCATION + key;
}

export const generateLoc = (minLat, maxLat, minLng, maxLng, num) => {
  let data = [];
  const colors = ['#FFB300', '#FB8C00', '#F4511E'];
  for(let i = 0; i < num; i++) {
    data.push({
      id: i + 1, 
      lat: Math.random() * (maxLat - minLat) + minLat, 
      lng: Math.random() * (maxLng - minLng) + minLng,
      // color: colors[Math.floor(Math.random() * 3)]
    }) 
  }
  return data;
}

export const tdsExpAvg = (data, beta) => {
  let history = data[0][1];
  for(let i = 1; i < data.length; i++) {
    data[i][1] = (1-beta) * history + beta * data[i][1];
    history = data[i][1];
    data[i][0] *= 1.5;
  }
  return data;
}