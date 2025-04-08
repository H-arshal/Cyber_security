// src/components/PerformanceInfo.jsx
import React, { useState, useEffect } from 'react';
import InfoTable from './InfoTable';

function PerformanceInfo() {
  const [perfInfo, setPerfInfo] = useState({});

  useEffect(() => {
    // Give browser a moment to ensure performance timings are available
    const timer = setTimeout(() => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
        const timing = performance.timing; // Fallback

        if (navigation) {
           setPerfInfo({
                pageLoadTime: `${(navigation.domComplete - navigation.startTime).toFixed(0)} ms`,
                dnsLookup: `${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(0)} ms`,
                tcpHandshake: `${(navigation.connectEnd - navigation.connectStart).toFixed(0)} ms`,
                ttfb: `${(navigation.responseStart - navigation.startTime).toFixed(0)} ms`, // Time To First Byte
                domInteractive: `${(navigation.domInteractive - navigation.startTime).toFixed(0)} ms`,
                type: navigation.type, // navigate, reload, back_forward
            });
        } else if (timing) {
             setPerfInfo({ // Using older timing API as fallback
                pageLoadTime: `${timing.loadEventEnd - timing.navigationStart} ms`,
                dnsLookup: `${timing.domainLookupEnd - timing.domainLookupStart} ms`,
                tcpHandshake: `${timing.connectEnd - timing.connectStart} ms`,
                ttfb: `${timing.responseStart - timing.navigationStart} ms`,
                domInteractive: `${timing.domInteractive - timing.navigationStart} ms`,
                status: 'Using legacy Timing API'
            });
        } else {
            setPerfInfo({ status: 'Performance Navigation Timing not supported' });
        }
      } else {
        setPerfInfo({ status: 'Performance API not supported' });
      }
    }, 100); // Short delay

    return () => clearTimeout(timer); // Cleanup timeout
  }, []); // Run once on mount

  return (
    <section>
      <h2>Performance (Basic Timings)</h2>
      <InfoTable data={perfInfo} />
    </section>
  );
}

export default PerformanceInfo;