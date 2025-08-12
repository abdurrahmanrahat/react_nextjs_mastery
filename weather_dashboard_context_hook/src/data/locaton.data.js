const data = [
  { location: "London", latitude: 51.5073219, longitude: -0.1276474 },
  { location: "Kolkata", latitude: 22.5726723, longitude: 88.3638815 },
  { location: "Dhaka", latitude: 23.777176, longitude: 90.399452 },
  { location: "Singapore", latitude: 1.2899175, longitude: 103.8519072 },
  { location: "New York", latitude: 40.7127281, longitude: -74.0060152 },
  { location: "Toronto", latitude: 43.6534817, longitude: -79.3839347 },
  { location: "Paris", latitude: 48.856614, longitude: 2.3522219 },
  { location: "Tokyo", latitude: 35.689487, longitude: 139.691706 },
  { location: "Sydney", latitude: -33.8688197, longitude: 151.2092955 },
  { location: "Los Angeles", latitude: 34.0522342, longitude: -118.2436849 },
  { location: "Berlin", latitude: 52.5200066, longitude: 13.404954 },
  { location: "Rome", latitude: 41.9027835, longitude: 12.4963655 },
  { location: "Dubai", latitude: 25.2048493, longitude: 55.2707828 },
  { location: "Cairo", latitude: 30.0444196, longitude: 31.2357116 },
  { location: "Bangkok", latitude: 13.7563309, longitude: 100.5017651 },
  { location: "Moscow", latitude: 55.755826, longitude: 37.6173 },
  { location: "Rio de Janeiro", latitude: -22.9068467, longitude: -43.1728965 },
  { location: "Cape Town", latitude: -33.9248685, longitude: 18.4240553 },
  { location: "Seoul", latitude: 37.566535, longitude: 126.9779692 },
  { location: "Mexico City", latitude: 19.4326077, longitude: -99.133208 },
  { location: "Mumbai", latitude: 19.0759837, longitude: 72.8776559 },
  { location: "Jakarta", latitude: -6.2087634, longitude: 106.845599 },
  { location: "Istanbul", latitude: 41.0082376, longitude: 28.9783589 },
  { location: "Madrid", latitude: 40.4167754, longitude: -3.7037902 },
  { location: "Amsterdam", latitude: 52.3702157, longitude: 4.8951679 },
  { location: "Vienna", latitude: 48.2081743, longitude: 16.3738189 },
  { location: "Lisbon", latitude: 38.716894, longitude: -9.139999 },
  { location: "Athens", latitude: 37.9838096, longitude: 23.7275388 },
  { location: "Warsaw", latitude: 52.2296756, longitude: 21.0122287 },
  { location: "Brussels", latitude: 50.8503396, longitude: 4.3517103 },
  { location: "Helsinki", latitude: 60.1698557, longitude: 24.938379 },
  { location: "Stockholm", latitude: 59.3293235, longitude: 18.0685808 },
  { location: "Zurich", latitude: 47.3768866, longitude: 8.541694 },
  { location: "Oslo", latitude: 59.9138688, longitude: 10.7522454 },
  { location: "Budapest", latitude: 47.497912, longitude: 19.040235 },
  { location: "Prague", latitude: 50.0755381, longitude: 14.4378005 },
  { location: "Manila", latitude: 14.5995124, longitude: 120.9842195 },
  { location: "Kuala Lumpur", latitude: 3.139003, longitude: 101.686855 },
  { location: "Hong Kong", latitude: 22.3193039, longitude: 114.1693611 },
  { location: "Beijing", latitude: 39.9041999, longitude: 116.4073963 },
  { location: "Shanghai", latitude: 31.2303904, longitude: 121.4737021 },
  { location: "Lagos", latitude: 6.5243793, longitude: 3.3792057 },
  { location: "Nairobi", latitude: -1.2920659, longitude: 36.8219462 },
  { location: "Santiago", latitude: -33.4488897, longitude: -70.6692655 },
  { location: "Buenos Aires", latitude: -34.6036844, longitude: -58.3815591 },
  { location: "Lima", latitude: -12.046374, longitude: -77.0427934 },
  { location: "Auckland", latitude: -36.8484597, longitude: 174.7633315 },
  { location: "Chicago", latitude: 41.8781136, longitude: -87.6297982 },
  { location: "San Francisco", latitude: 37.7749295, longitude: -122.4194155 },
  { location: "Boston", latitude: 42.3600825, longitude: -71.0588801 },
  { location: "Seattle", latitude: 47.6062095, longitude: -122.3320708 },
];


function getLocations() {
    return data;
}

function getLocationByName(location) {
    if (!location) return null;

    const filtered = data.filter((item) => item.location.toLowerCase() === location.toLowerCase());

    if (filtered.length > 0) {
        return filtered[0];
    } else {
        const defaultLocation = {
            location: "",
            latitude: 0,
            longitude: 0,
        };
        return defaultLocation;
    }
}

export { getLocationByName, getLocations };

