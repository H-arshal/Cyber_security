// src/App.jsx
import React from 'react';
import './App.css';

// Import all the feature components
import BasicInfo from './components/BasicInfo';
import NetworkInfo from './components/NetworkInfo';
import UserPreferences from './components/UserPreferences';
import StorageInfo from './components/StorageInfo';
import PerformanceInfo from './components/PerformanceInfo';
import BatteryInfo from './components/BatteryInfo';
import GeolocationInfo from './components/GeolocationInfo';
import MotionInfo from './components/MotionInfo';
import MediaDevicesInfo from './components/MediaDevicesInfo';
import NotificationInfo from './components/NotificationInfo';
import ClipboardInfo from './components/ClipboardInfo';
import OtherApisInfo from './components/OtherApisInfo';


const current = new Date();
const todayDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
 // Or use new Date().toLocaleDateString(...)

function App() {
  // App component is now much cleaner, just rendering sections
  return (
    <div className="App">
      <h1>Comprehensive Device Information Dashboard</h1>
      <p className="info" style={{ textAlign: 'center', marginBottom: '25px' }}>
        Data displayed for: {todayDate} (IST)
      </p>

      {/* Render each feature component */}
      <BasicInfo />
      <NetworkInfo />
      <UserPreferences />
      <StorageInfo />
      <PerformanceInfo />
      <BatteryInfo />
      <GeolocationInfo />
      <MotionInfo />
      <MediaDevicesInfo />
      <NotificationInfo />
      <ClipboardInfo />
      {/* <OtherApisInfo /> */}

    </div>
  );
}

export default App;