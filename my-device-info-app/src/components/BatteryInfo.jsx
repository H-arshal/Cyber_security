// src/components/BatteryInfo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import InfoTable from './InfoTable';

function BatteryInfo() {
  const [batteryInfo, setBatteryInfo] = useState({ status: 'Checking...' });

  const updateBatteryStatus = useCallback((battery) => {
    if (!battery) return; // Guard against null battery object
    setBatteryInfo({
      level: `${(battery.level * 100).toFixed(0)}%`,
      charging: battery.charging ? 'Yes' : 'No',
      chargingTime: battery.chargingTime === Infinity ? 'N/A' : `${(battery.chargingTime / 60).toFixed(0)} min`,
      dischargingTime: battery.dischargingTime === Infinity ? 'N/A' : `${(battery.dischargingTime / 60).toFixed(0)} min`,
      status: 'Available',
    });
  }, []); // No dependencies needed for update logic itself

  useEffect(() => {
    let batteryRef = null; // To hold reference for cleanup
    const eventListeners = [
        'levelchange',
        'chargingchange',
        'chargingtimechange',
        'dischargingtimechange'
    ];

    // Define stable handler using the memoized update function
    const stableUpdateHandler = () => updateBatteryStatus(batteryRef);

    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        batteryRef = battery; // Store reference
        updateBatteryStatus(battery); // Initial status

        // Add listeners using the stable handler
        eventListeners.forEach(event => {
            battery.addEventListener(event, stableUpdateHandler);
        });

      }).catch(err => {
        console.error("Battery status error:", err);
        setBatteryInfo({ status: 'Error retrieving battery status' });
      });
    } else {
      setBatteryInfo({ status: 'Battery Status API not supported' });
    }

    // Cleanup function
    return () => {
      if (batteryRef) {
          eventListeners.forEach(event => {
              batteryRef.removeEventListener(event, stableUpdateHandler);
          });
      }
    };
  }, [updateBatteryStatus]); // Depend on the memoized update function

  return (
    <section>
      <h2>Battery Status</h2>
      <InfoTable data={batteryInfo} />
    </section>
  );
}

export default BatteryInfo; 