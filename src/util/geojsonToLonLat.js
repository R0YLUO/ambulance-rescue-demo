export default function extractCoordinates(geojson) {
  const coordinatesList = [];

  if (geojson && geojson.features && Array.isArray(geojson.features)) {
    geojson.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.coordinates) {
        const [lon, lat] = feature.geometry.coordinates;
        coordinatesList.push({ lon, lat });
      }
    });
  }

  return coordinatesList;
}
