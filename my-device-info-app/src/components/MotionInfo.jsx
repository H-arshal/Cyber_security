// src/components/MotionInfo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import InfoTable from './InfoTable';
import { queryPermission, createPermissionChangeHandler } from './utils/permissions';
import { requestMotionPermissionIOS } from './utils/motion';

function MotionInfo() {
  const [motionInfo, setMotionInfo] = useState(null);
  const [orientationInfo, setOrientationInfo] = useState(null);
  const [motionError, setMotionError] = useState('');
  const [motionPerm, setMotionPerm] = useState('prompt'); // Combined state
// eslint-disable-next-line
  const permissionChangeHandler = useCallback(createPermissionChangeHandler(setMotionPerm), []);

  const handleOrientation = useCallback((event) => {
    setOrientationInfo({ /* ... format data ... */
        alpha: event.alpha?.toFixed(1) ?? 'N/A', beta: event.beta?.toFixed(1) ?? 'N/A', gamma: event.gamma?.toFixed(1) ?? 'N/A', absolute: event.absolute ? 'Yes' : 'No',
    });
    if (motionError.includes("Waiting for data")) setMotionError(''); // Clear waiting message
  }, [motionError]); // Depend on motionError to clear it

  const handleMotion = useCallback((event) => {
    setMotionInfo({ /* ... format data ... */
        accel_X: event.acceleration?.x?.toFixed(2) ?? 'N/A', accel_Y: event.acceleration?.y?.toFixed(2) ?? 'N/A', accel_Z: event.acceleration?.z?.toFixed(2) ?? 'N/A', accelGrav_X: event.accelerationIncludingGravity?.x?.toFixed(2) ?? 'N/A', accelGrav_Y: event.accelerationIncludingGravity?.y?.toFixed(2) ?? 'N/A', accelGrav_Z: event.accelerationIncludingGravity?.z?.toFixed(2) ?? 'N/A', rotationAlpha: event.rotationRate?.alpha?.toFixed(1) ?? 'N/A', rotationBeta: event.rotationRate?.beta?.toFixed(1) ?? 'N/A', rotationGamma: event.rotationRate?.gamma?.toFixed(1) ?? 'N/A', interval_ms: event.interval?.toFixed(2) ?? 'N/A',
    });
     if (motionError.includes("Waiting for data")) setMotionError(''); // Clear waiting message
  }, [motionError]); // Depend on motionError to clear it


  const removeMotionListeners = useCallback(() => {
    window.removeEventListener('deviceorientation', handleOrientation, true);
    window.removeEventListener('devicemotion', handleMotion, true);
  }, [handleOrientation, handleMotion]);

  const addMotionListeners = useCallback(() => {
    removeMotionListeners(); // Clear existing first
    let errorMsg = '';
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      errorMsg += 'Orientation events not supported. ';
    }
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, true);
    } else {
      errorMsg += 'Motion events not supported.';
    }
    if (errorMsg) {
        setMotionError(prev => prev ? `${prev} | ${errorMsg}` : errorMsg)
    }
  }, [handleOrientation, handleMotion, removeMotionListeners]); // Added removeMotionListeners dep


  useEffect(() => {
    let accStatusObj = null;
    let gyrStatusObj = null;

    const checkMotionPermissions = async () => {
        // Combine accelerometer/gyroscope checks
        const accPerm = await queryPermission('accelerometer');
        const gyrPerm = await queryPermission('gyroscope');
        const state = (accPerm.state === 'granted' || gyrPerm.state === 'granted') ? 'granted' :
                      (accPerm.state === 'denied' && gyrPerm.state === 'denied') ? 'denied' : 'prompt';
        setMotionPerm(state);

        // Attach listeners (simplified: uses first available status object)
        // A more robust solution would re-query both on change.
         accStatusObj = accPerm.statusObj;
         gyrStatusObj = gyrPerm.statusObj;
        if (accStatusObj) accStatusObj.onchange = permissionChangeHandler;
        else if (gyrStatusObj) gyrStatusObj.onchange = permissionChangeHandler; // Fallback

        if (state === 'granted') {
             console.log("Motion sensors potentially granted via Permissions API, attempting to add listeners...");
             addMotionListeners(); // Try adding listeners if query is granted
        }
    };

    checkMotionPermissions();

    // Cleanup
    return () => {
        removeMotionListeners();
        if (accStatusObj) accStatusObj.onchange = null;
        if (gyrStatusObj) gyrStatusObj.onchange = null;
    };
  }, [addMotionListeners, removeMotionListeners, permissionChangeHandler]); // Added dependencies

  const handleRequestMotion = useCallback(async () => {
      setMotionError('');
      setMotionInfo(null);
      setOrientationInfo(null);
      // We don't reset motionPerm here, wait for actual outcome

      const iosState = await requestMotionPermissionIOS();

      if (iosState === 'denied') {
        setMotionError('iOS motion permission denied.');
        setMotionPerm('denied');
        removeMotionListeners();
        return;
      }

      // If granted via iOS prompt or no iOS prompt needed
      if (iosState === 'granted' || iosState === 'not_required') {
        try {
          addMotionListeners();
          // Assume granted tentatively - actual data or errors will confirm
          setMotionPerm('granted');
          setMotionError("Listeners added. Waiting for data... (Permission might still be required/denied silently)");
          // Check if data arrives after a delay
           setTimeout(() => {
                 if(motionInfo === null && orientationInfo === null && motionPerm !== 'denied' && !motionError) { // Check motionPerm and ensure no other error set
                     setMotionError(prev => (prev ? prev + ' | ' : '') + "No motion/orientation data received yet.");
                 } else if (motionPerm === 'granted' && motionError.includes("Waiting for data")) {
                     setMotionError(''); // Clear waiting message if data arrived
                 }
             }, 3500); // Timeout delay
        } catch (err) {
          console.error("Error adding motion listeners:", err);
          setMotionError("Failed to add listeners. Check browser console.");
          // Don't assume denied here, could be API issue
          removeMotionListeners();
        }
      }
  }, [addMotionListeners, removeMotionListeners, motionPerm, motionInfo, orientationInfo, motionError]); // Added motionError

  return (
     <section>
        <h2>Motion & Orientation Sensors</h2>
         <p>Permission Status: <span className={`status-${motionPerm}`}>{motionPerm}</span></p>
        {motionPerm !== 'granted' && (
            <button onClick={handleRequestMotion} disabled={motionPerm === 'denied'}>
                {motionPerm === 'denied' ? 'Permission Denied' : 'Request Motion Access'}
            </button>
        )}
        {motionError && <p className="error">{motionError}</p>}
         {motionPerm === 'granted' && !motionError.includes("No motion/orientation data received") && !motionInfo && !orientationInfo && !motionError && <p className="info">Listeners active, waiting for sensor data...</p>}
         <InfoTable title="Orientation Data (deg)" data={orientationInfo} />
         <InfoTable title="Motion Data (m/s² or deg/s)" data={motionInfo} />
         <p className="info">(Requires permission. iOS requires interaction via the button.)</p>
      </section>
  );
}

export default MotionInfo;