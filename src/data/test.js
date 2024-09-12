export const r1 = 'nfzeFkhxsZIZKURa@FNPZFJJPLRNRjC`DTTNPQZEJM\Yv@O^GTCLCXEd@GdA?@ANAP??AF?@?L[ISEqA[SCOE]Iq@M{A]EAQE_@GIAK?WAa@?kD?G@EBC@CFCDAF?DAH@F@FHVHVDLBN@J@J@N?HAJAHELEJGJEDIDEBQHE@A?MBC@G@E?K@I@G@I@q@TiA`@GBKDIBMDeA`@GBIBEBaA\QFC@E@E@GBiA`@u@T_@LGBKDOF{@X_Bj@IDMDE@GBGHcDdAIBE@eDlAODQHCKAGCKAGw@_EMs@Mo@e@cCCMESGYRGLEjAc@v@Y^OFCHCrAc@'
export const r2 = 'xcxeFqtvsZ\~ARbATnAFVFZF^BFBN@AJEzCgAHCFCFCdBi@^MXKDAJEPGNI|CeAFCDCHChAa@BApAe@DAFCDCDCFALGxCeAFCJEJErAe@jAc@DAFCCO_A_F[}A_@qBAGCE?GCIAECKAKACYyAQ}@AEIa@EUG[Ke@Y{AOy@AEEQGYCMmAqGS{@AGWwACKAICI?ECMCGu@yDCSa@mBAGc@uBEYAC?A?EEQkBwJOs@AICMI]CMYwAc@}BMU[cBEk@Ow@AEAEIa@DADAFCLExAi@d@Qd@QDAFCz@Yx@[d@OFCHGVKJGBAPIRMRMVSNMPMNONQNONULSJSLUJUJUJWHU|@wBFMJUHUTa@Xa@Ze@DGDELMPOFEF\URWZABOPMPMRKRSb@Ud@Uj@g@nAa@`AKRKTKRQVOROR]^SRUR'
export const stations = [
  {
    lon: 144.9631,
    lat: -37.8136,
    radius: 0.5,
  },
  {
    lon: 144.9734,
    lat: -37.8148,
    radius: 0.5,
  },
  {
    lon: 144.9531,
    lat: -37.8136,
    radius: 0.5,
  },
];

export const ambulances = [
  {
    lon: 144.960863,
    lat: -37.823253,
  },
  {
    lon: 144.958331,
    lat: -37.817848,
  },
];

export const incidents = [
  {
    lon: 144.9591,
    lat: -37.8086,
  },
  {
    lon: 144.9511,
    lat: -37.8156,
  },
];

const dataPoints = [
  [144.968815, -37.814867],
  [144.96737, -37.815294],
  [144.966997, -37.815403],
  [144.966844, -37.815467],
  [144.966705, -37.815508],
  [144.966591, -37.815545],
  [144.966573, -37.815551],
  [144.966557, -37.815556],
  [144.96643, -37.815596],
  [144.965809, -37.815777],
  [144.965786, -37.815783],
  [144.965617, -37.815792],
  [144.965291, -37.815886],
  [144.965229, -37.815904],
  [144.964273, -37.816181],
  [144.964203, -37.816201],
  [144.964156, -37.816215],
  [144.964091, -37.816235],
  [144.964056, -37.816245],
  [144.964015, -37.816255],
  [144.96396, -37.816273],
  [144.963806, -37.816321],
  [144.963429, -37.81643],
  [144.963392, -37.81644],
  [144.963121, -37.816514],
  [144.96182, -37.816891],
  [144.96175, -37.816911],
  [144.961685, -37.81693],
  [144.961547, -37.816968],
  [144.961457, -37.816995],
  [144.960359, -37.817314],
  [144.960276, -37.817338],
  [144.960242, -37.817348],
  [144.96007, -37.817397],
  [144.959325, -37.817613],
  [144.959287, -37.817624],
  [144.959255, -37.817633],
  [144.959199, -37.81765],
  [144.959142, -37.817667],
  [144.959105, -37.817677],
  [144.959052, -37.817692],
  [144.959026, -37.817699],
  [144.958981, -37.817712],
  [144.957872, -37.818034],
  [144.95734, -37.818188],
  [144.956807, -37.818342],
  [144.956792, -37.818346],
  [144.956713, -37.818369],
  [144.956568, -37.818411],
].reverse();

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

export const coordinates = expandedData;
