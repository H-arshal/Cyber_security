// src/components/MediaDevicesInfo.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import InfoTable from './InfoTable';
import { queryPermission, createPermissionChangeHandler } from './utils/permissions';

function MediaDevicesInfo() {
  const [mediaInfo, setMediaInfo] = useState({ devices: null, status: 'idle' });
  const [mediaError, setMediaError] = useState('');
  const [camPerm, setCamPerm] = useState('prompt');
  const [micPerm, setMicPerm] = useState('prompt');
  const mediaStreamRef = useRef(null);
  // eslint-disable-next-line
  const camPermChangeHandler = useCallback(createPermissionChangeHandler(setCamPerm), []);
  // eslint-disable-next-line
  const micPermChangeHandler = useCallback(createPermissionChangeHandler(setMicPerm), []);


  useEffect(() => {
      let camStatusObj = null;
      let micStatusObj = null;

      const checkMediaPermissions = async () => {
           // Camera / Mic
          const camPermStatus = await queryPermission('camera');
          const micPermStatus = await queryPermission('microphone');
          setCamPerm(camPermStatus.state);
          setMicPerm(micPermStatus.state);

          camStatusObj = camPermStatus.statusObj;
          micStatusObj = micPermStatus.statusObj;

          if (camStatusObj) camStatusObj.onchange = camPermChangeHandler;
          if (micStatusObj) micStatusObj.onchange = micPermChangeHandler;
      };
      checkMediaPermissions();

      // Cleanup
      return () => {
           // Stop media stream if active
          if (mediaStreamRef.current) {
              mediaStreamRef.current.getTracks().forEach(track => track.stop());
              mediaStreamRef.current = null;
          }
           // Remove permission listeners
          if (camStatusObj) camStatusObj.onchange = null;
          if (micStatusObj) micStatusObj.onchange = null;
      };
  }, [camPermChangeHandler, micPermChangeHandler]); // Add dependencies

  const handleRequestMedia = useCallback(async () => {
    setMediaError('');
    setMediaInfo({ devices: null, status: 'Requesting...' });

    // Stop previous stream if any
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMediaError("Media Devices API (getUserMedia) not supported.");
        setMediaInfo({ devices: null, status: 'Error' });
        setCamPerm('denied'); // Assume denied if API not there
        setMicPerm('denied');
        return;
     }

    try {
      // Request both camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream; // Store stream for cleanup
      setCamPerm('granted');
      setMicPerm('granted');

      // Get list of all devices AFTER permission is granted
      const devices = await navigator.mediaDevices.enumerateDevices();
      setMediaInfo({
        devices: devices.map(d => ({ kind: d.kind, label: d.label || 'Label N/A', deviceId: 'ID Hidden' })), // Hide actual device ID for privacy demo
        status: 'Permission Granted',
      });
      // NOTE: Do NOT log actual stream object or detailed device IDs in production demos

    } catch (err) {
      console.error("getUserMedia error:", err);
      setMediaInfo({ devices: null, status: 'Error' });
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMediaError('Permission denied by user.');
        // Re-check permissions to update state accurately
        queryPermission('camera').then(s => setCamPerm(s.state));
        queryPermission('microphone').then(s => setMicPerm(s.state));
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setMediaError('No camera and/or microphone found.');
        setCamPerm('denied'); // Assume denied if not found
        setMicPerm('denied');
      } else if (err.name === 'NotReadableError') {
         setMediaError('Hardware error: Camera or microphone might be in use or malfunctioning.');
      } else {
        setMediaError(`Error: ${err.message} (${err.name})`);
      }
    }
  }, []); // No external dependencies needed for this handler

  return (
    <section>
      <h2>Media Devices (Camera/Microphone)</h2>
      <p>Camera Permission: <span className={`status-${camPerm}`}>{camPerm}</span></p>
      <p>Microphone Permission: <span className={`status-${micPerm}`}>{micPerm}</span></p>
      {mediaError && <p className="error">{mediaError}</p>}
      {mediaInfo.status !== 'Permission Granted' && (
        <button onClick={handleRequestMedia} disabled={camPerm === 'denied' && micPerm === 'denied'}>
          {(camPerm === 'denied' && micPerm === 'denied') ? 'Permissions Denied' : 'Request Camera & Mic Access'}
        </button>
      )}
      {mediaInfo.status === 'Permission Granted' && <p className="info">Access granted. Stream active (but not displayed).</p>}
      <InfoTable title="Detected Media Devices" data={mediaInfo.devices ? { devices: mediaInfo.devices } : null} />
      <p className="info">(Shows detected devices after permission granted. Does not display video/audio.)</p>
    </section>
  );
}

export default MediaDevicesInfo;