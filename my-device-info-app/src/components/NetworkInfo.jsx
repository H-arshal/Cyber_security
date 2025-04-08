// src/components/NetworkInfo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import InfoTable from './InfoTable';

function NetworkInfo() {
  const [networkInfo, setNetworkInfo] = useState({});
  const [externalIP, setExternalIP] = useState({ ip: 'Not fetched', status: 'idle' });

  const updateNetworkState = useCallback(() => {
    const conn = navigator.connection;
    if (conn) {
      setNetworkInfo({
        status: navigator.onLine ? 'Online' : 'Offline',
        effectiveType: conn.effectiveType || 'N/A',
        downlink: conn.downlink ? `${conn.downlink} Mbps` : 'N/A',
        rtt: conn.rtt ? `${conn.rtt} ms` : 'N/A',
        saveData: conn.saveData ? 'Enabled' : 'Disabled',
        type: conn.type || 'N/A',
      });
    } else {
      setNetworkInfo({
        status: navigator.onLine ? 'Online' : 'Offline',
        details: 'Connection API not supported',
      });
    }
  }, []); // No dependencies needed for the update logic itself

  useEffect(() => {
    updateNetworkState(); // Initial fetch

    const conn = navigator.connection;
    if (conn) {
      // Use a stable reference for the listener function
      const stableUpdate = updateNetworkState;
      conn.addEventListener('change', stableUpdate);

      // Cleanup listener
      return () => {
        conn.removeEventListener('change', stableUpdate);
      };
    }
  }, [updateNetworkState]); // Depend on the memoized update function

  const handleFetchIP = useCallback(async () => {
    setExternalIP({ ip: 'Fetching...', status: 'loading' });
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setExternalIP({ ip: data.ip, status: 'success' });
    } catch (error) {
      console.error("Error fetching IP:", error);
      setExternalIP({ ip: 'Error fetching IP', status: 'error' });
    }
  }, []); // No dependencies

  return (
    <section>
      <h2>Network Status</h2>
      <InfoTable title="Connection Details" data={networkInfo} />
      <hr />
      <h3>External IP Address</h3>
      <p>Status: <span className={`value ${externalIP.status === 'error' ? 'error' : ''}`}>{externalIP.status}</span></p>
      <p>IP: <span className="value">{externalIP.ip}</span></p>
      <button onClick={handleFetchIP} disabled={externalIP.status === 'loading'}>
        {externalIP.status === 'loading' ? 'Fetching...' : 'Fetch/Refresh External IP'}
      </button>
    </section>
  );
}

export default NetworkInfo;