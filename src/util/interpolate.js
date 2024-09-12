// Function to interpolate between two points
function interpolate(point1, point2, numPoints) {
  const [lon1, lat1] = point1;
  const [lon2, lat2] = point2;
  const interpolatedPoints = [];

  for (let i = 0; i < numPoints; i++) {
    const fraction = i / (numPoints - 1);
    const lon = lon1 + fraction * (lon2 - lon1);
    const lat = lat1 + fraction * (lat2 - lat1);
    interpolatedPoints.push([lon, lat]);
  }

  return interpolatedPoints;
}

function calculateDistance(point1, point2) {
  const [lon1, lat1] = point1;
  const [lon2, lat2] = point2;

  // Radius of the Earth in kilometers
  const earthRadiusKm = 6371;

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2Rad - lon1Rad;
  const dlat = lat2Rad - lat1Rad;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = earthRadiusKm * c;

  return distance;
}

export default function interpolateCoordinates(dataPoints) {
  // Interpolate and expand the data points
  const expandedData = [];

  for (let i = 0; i < dataPoints.length - 1; i++) {
    expandedData.push(dataPoints[i]);
    var interpolatedPoints = null;
    if (calculateDistance(dataPoints[i], dataPoints[i + 1]) < 0.05) {
      interpolatedPoints = interpolate(dataPoints[i], dataPoints[i + 1], 100);
    } else {
      interpolatedPoints = interpolate(dataPoints[i], dataPoints[i + 1], 800);
    }
    expandedData.push(...interpolatedPoints);
  }

  expandedData.push(dataPoints[dataPoints.length - 1]); // Add the last point
  return expandedData;
}
