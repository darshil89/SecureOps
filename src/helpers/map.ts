// const geofence = {
//   center: { lat: 22.780000, lng: 86.150000 },
//   radius: 500,
// };

const geofence = {
  center: { lat: 22.7765, lng: 86.1475 },
  radius: 500,
};


export const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371000; // Earth's radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const checkGeofence = (userLocation: { lat: number; lng: number }) => {
  const distance = getDistance(
    userLocation.lat,
    userLocation.lng,
    geofence.center.lat,
    geofence.center.lng
  );

  if (distance <= geofence.radius) {
    return true;
  } else {
    return false;
  }
};

export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};
