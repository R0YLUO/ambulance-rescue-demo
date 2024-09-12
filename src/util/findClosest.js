function haversine(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Haversine formula
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  const radius = 6371; // Radius of the Earth in kilometers

  // Calculate the distance
  return radius * c;
}

export default function findClosestCoordinate(x, coordinatesArray) {
  let closestCoordinateId = null;
  let closestDistance = Infinity;

  for (const coordinateObj of coordinatesArray) {
    if (coordinateObj.available) {
      const distance = haversine(
        x[1],
        x[0],
        coordinateObj.lat,
        coordinateObj.lon
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCoordinateId = coordinateObj.id;
      }
    }
  }
  return closestCoordinateId;
}
