// src/components/BasicInfo.jsx
import React, { useState, useEffect } from 'react';
import InfoTable from './InfoTable';

function BasicInfo() {
  const [basicInfo, setBasicInfo] = useState({});

  useEffect(() => {
    // Gather basic, generally permissionless info on mount
    setBasicInfo({
      userAgent: navigator.userAgent || 'N/A',
      platform: navigator.platform || 'N/A', // Note: Deprecating
      language: navigator.language || 'N/A',
      languages: navigator.languages ? navigator.languages.join(', ') : 'N/A',
      cookieEnabled: navigator.cookieEnabled ? 'Yes' : 'No',
      hardwareConcurrency: navigator.hardwareConcurrency || 'N/A',
      deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory} GB (approx)` : 'N/A',
      screenWidth: window.screen?.width || 'N/A',
      screenHeight: window.screen?.height || 'N/A',
      screenAvailWidth: window.screen?.availWidth || 'N/A',
      screenAvailHeight: window.screen?.availHeight || 'N/A',
      screenColorDepth: window.screen?.colorDepth || 'N/A',
      screenPixelDepth: window.screen?.pixelDepth || 'N/A',
      windowInnerWidth: window.innerWidth || 'N/A',
      windowInnerHeight: window.innerHeight || 'N/A',
      devicePixelRatio: window.devicePixelRatio || 'N/A',
      isSecureContext: window.isSecureContext ? 'Yes' : 'No',
      maxTouchPoints: navigator.maxTouchPoints ?? 'N/A',
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section>
      <h2>Basic Browser & Screen Info</h2>
      <InfoTable data={basicInfo} />
    </section>
  );
}

export default BasicInfo;