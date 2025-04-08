// src/components/GeolocationInfo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import InfoTable from './InfoTable';
import { queryPermission, createPermissionChangeHandler } from './utils/permissions';

function GeolocationInfo() {
  const [locInfo, setLocInfo] = useState(null);
  const [locError, setLocError] = useState('');
  const [locPerm, setLocPerm] = useState('prompt'); // 'granted', 'prompt', 'denied'

  const permissionChangeHandler = useCallback(createPermissionChangeHandler(setLocPerm), []);

  const fetchLocation = useCallback(() => {
    setLocError('');
    setLocInfo('Fetching...');
    if (!('geolocation' in navigator)) {
        setLocError('Geolocation is not supported by this browser.');
        setLocPerm('denied');
        setLocInfo(null);
        return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocInfo({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
          accuracy: `${position.coords.accuracy.toFixed(0)} meters`,
          altitude: position.coords.altitude ? `${position.coords.altitude.toFixed(0)} m` : 'N/A',
          altitudeAccuracy: position.coords.altitudeAccuracy ? `${position.coords.altitudeAccuracy.toFixed(0)} m` : 'N/A',
          heading: position.coords.heading ?? 'N/A',
          speed: position.coords.speed ?? 'N/A',
          timestamp: new Date(position.timestamp).toLocaleString(),
        });
        setLocPerm('granted'); // Update state on success
      },
      (error) => {
        setLocInfo(null);
        setLocPerm(error.code === error.PERMISSION_DENIED ? 'denied' : 'prompt');
        setLocError(`Error (${error.code}): ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []); // fetchLocation depends on nothing external here

  useEffect(() => {
    let permissionStatusObj = null;
    const checkLocationPermission = async () => {
      const { state, statusObj, error } = await queryPermission('geolocation');
      setLocPerm(state);
      if (error) setLocError(prev => `${prev} ${error}`.trim());

      if (statusObj) {
        permissionStatusObj = statusObj; // Store for cleanup
        statusObj.onchange = permissionChangeHandler;
      }
      if (state === 'granted') {
        fetchLocation(); // Fetch if already granted
      }
    };

    checkLocationPermission();

    // Cleanup
    return () => {
      if (permissionStatusObj) {
        permissionStatusObj.onchange = null; // Remove listener
      }
    };
  }, [fetchLocation, permissionChangeHandler]); // Add dependencies

  const handleRequestLocation = useCallback(() => {
    // Allow request even if granted, to refresh
    if (locPerm === 'prompt' || locPerm === 'granted') {
      fetchLocation(); // Triggers prompt if state is 'prompt'
    }
  }, [locPerm, fetchLocation]);

  return (
    <section>
      <h2>Geolocation</h2>
      <p>Permission Status: <span className={`status-${locPerm}`}>{locPerm}</span></p>
      {locPerm !== 'granted' && (
        <button onClick={handleRequestLocation} disabled={locPerm === 'denied'}>
          {locPerm === 'denied' ? 'Permission Denied' : 'Request Location'}
        </button>
      )}
      {locPerm === 'granted' && <button onClick={handleRequestLocation}>Refresh Location</button>}
      {locError && <p className="error">{locError}</p>}
      {typeof locInfo === 'string' && <p className="info">{locInfo}</p>}
      {typeof locInfo === 'object' && locInfo !== null && <InfoTable title="Location Data" data={locInfo} />}
    </section>
  );
}

export default GeolocationInfo;