// src/components/ClipboardInfo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { queryPermission, createPermissionChangeHandler } from './utils/permissions';

function ClipboardInfo() {
  const [clipboardText, setClipboardText] = useState('');
  const [clipboardError, setClipboardError] = useState('');
  const [clipboardReadPerm, setClipboardReadPerm] = useState('prompt');
// eslint-disable-next-line
  const permissionChangeHandler = useCallback(createPermissionChangeHandler(setClipboardReadPerm), []);

  useEffect(() => {
      let permissionStatusObj = null;
      const checkClipboardPermission = async () => {
        // Note: 'clipboard-read' query support varies significantly
        const { state, statusObj, error } = await queryPermission({ name: 'clipboard-read', allowWithoutGesture: false });
        setClipboardReadPerm(state);
        if (error) setClipboardError(prev => `${prev} ${error}`.trim());

        permissionStatusObj = statusObj;
        if (permissionStatusObj) {
            // Clipboard change events might not be reliably implemented
             permissionStatusObj.onchange = permissionChangeHandler;
        }
      };

       if (!navigator.clipboard || !navigator.clipboard.readText) {
            setClipboardError("Clipboard Read API not supported or not available in this context.");
            setClipboardReadPerm('denied');
       } else {
           checkClipboardPermission();
       }

      // Cleanup
      return () => {
          if (permissionStatusObj) {
              permissionStatusObj.onchange = null;
          }
      };

  }, [permissionChangeHandler]); // Add dependency

  const handleReadClipboard = useCallback(async () => {
    setClipboardText('');
    setClipboardError('');
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      setClipboardError("Clipboard Read API not supported or not available in this context.");
      setClipboardReadPerm('denied');
      return;
    }
    try {
      // Reading requires focus and may trigger a prompt or require specific interaction
      const text = await navigator.clipboard.readText();
      setClipboardText(text);
      setClipboardReadPerm('granted'); // Assume granted if successful
    } catch (err) {
      console.error("Clipboard read error:", err);
      setClipboardText(''); // Clear text on error
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setClipboardError("Clipboard read permission denied or interaction required.");
        // Re-check permission state as browser might have updated it
        queryPermission({ name: 'clipboard-read', allowWithoutGesture: false }).then(s => setClipboardReadPerm(s.state));
      } else if (err.name === 'SecurityError') {
         setClipboardError("Clipboard access requires a secure context (HTTPS) or user interaction.");
      } else {
        setClipboardError(`Error reading clipboard: ${err.message}`);
      }
    }
  }, []); // No external dependencies

  return (
    <section>
      <h2>Clipboard Read Access</h2>
      <p>Permission Status: <span className={`status-${clipboardReadPerm}`}>{clipboardReadPerm}</span></p>
      {clipboardError && <p className="error">{clipboardError}</p>}
      <button onClick={handleReadClipboard} disabled={clipboardReadPerm === 'denied'}>
        Read from Clipboard
      </button>
      {clipboardText && <pre>Clipboard Content: {clipboardText}</pre>}
    </section>
  );
}

export default ClipboardInfo;