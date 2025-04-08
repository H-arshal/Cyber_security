// src/components/OtherApisInfo.jsx
import React from 'react';

// This is a simple static component
function OtherApisInfo() {
  return (
    <section>
      <h2>Other Potential APIs (Not Implemented Here)</h2>
      <ul>
        <li>Web Bluetooth, Web USB, Web Serial, Web HID (Require permission, user interaction, more complex setup)</li>
        <li>Ambient Light Sensor, Proximity Sensor (Experimental, require permission/flags)</li>
        <li>Detailed Performance Metrics (Resource Timing, Long Tasks API, etc.)</li>
        <li>Service Workers API (Background sync, push notifications, caching)</li>
        <li>Cache Storage API (Programmatic caching of requests/responses)</li>
        <li>IndexedDB API (Client-side database)</li>
        <li>Web Authentication API (WebAuthn for passwordless login)</li>
        <li>Web Share API (Invoking native sharing dialog)</li>
        <li>Contact Picker API (Accessing user's contacts - requires permission)</li>
      </ul>
      <p className="info">This dashboard demonstrates many common APIs. Explore MDN Web Docs for even more browser capabilities and their specific requirements.</p>
    </section>
  );
}

export default OtherApisInfo;