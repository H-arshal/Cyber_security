// src/components/StorageInfo.jsx
import React, { useState, useEffect } from 'react';
import InfoTable from './InfoTable';

function StorageInfo() {
  const [storageInfo, setStorageInfo] = useState({ status: 'Checking...' });

  useEffect(() => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        setStorageInfo({
          usage: `${(usage / 1024 / 1024).toFixed(2)} MB`,
          quota: `${(quota / 1024 / 1024).toFixed(2)} MB`,
          percentUsed: quota > 0 ? ((usage / quota) * 100).toFixed(2) + '%' : 'N/A',
          status: 'Available',
        });
      }).catch(err => {
        console.error("Storage estimate error:", err);
        setStorageInfo({ status: 'Error estimating storage' });
      });
    } else {
      setStorageInfo({ status: 'Storage Manager API not supported' });
    }
  }, []); // Run once on mount

  return (
    <section>
      <h2>Storage Estimate</h2>
      <InfoTable data={storageInfo} />
    </section>
  );
}

export default StorageInfo;