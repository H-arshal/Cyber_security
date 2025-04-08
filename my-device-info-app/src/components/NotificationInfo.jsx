// src/components/NotificationInfo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { queryPermission, createPermissionChangeHandler } from './utils/permissions';

function NotificationInfo() {
  const [notifPerm, setNotifPerm] = useState('prompt');
  const [notifError, setNotifError] = useState('');
// eslint-disable-next-line
  const permissionChangeHandler = useCallback(createPermissionChangeHandler(setNotifPerm), []);

  useEffect(() => {
    let permissionStatusObj = null;
    const checkNotificationPermission = async () => {
        const { state, statusObj, error } = await queryPermission('notifications');
        // Treat 'default' as 'prompt' for UI consistency
        setNotifPerm(state === 'default' ? 'prompt' : state);
        if (error) setNotifError(prev => `${prev} ${error}`.trim());

        permissionStatusObj = statusObj;
        if (permissionStatusObj) {
            permissionStatusObj.onchange = permissionChangeHandler;
        }
    };

    if (!('Notification' in window)) {
        setNotifError("Notifications API not supported.");
        setNotifPerm('denied');
    } else {
        checkNotificationPermission();
    }

    // Cleanup
    return () => {
        if (permissionStatusObj) {
            permissionStatusObj.onchange = null;
        }
    };
  }, [permissionChangeHandler]); // Add dependency

  const handleRequestNotifications = useCallback(async () => {
    setNotifError('');
    if (!('Notification' in window)) {
      setNotifError("Notifications API not supported.");
      setNotifPerm('denied');
      return;
    }
    try {
      // requestPermission uses a callback in older specs, Promise in newer.
      // The modern Promise-based approach is preferred.
      const permissionResult = await Notification.requestPermission(); // Triggers prompt
      setNotifPerm(permissionResult === 'default' ? 'prompt' : permissionResult); // 'granted', 'denied', 'default'

      if (permissionResult === 'granted') {
        // Optional: Show a test notification
        try {
             new Notification("Permissions Granted!", {
                body: "You can now receive notifications.",
                icon: "/favicon.ico", // Make sure this exists in public/
             });
        } catch (notifyError) {
            // Handle errors specific to showing the notification (e.g., OS level blocks)
             console.error("Error showing test notification:", notifyError);
             setNotifError("Permission granted, but showing test notification failed.");
        }

      } else if (permissionResult === 'denied') {
        setNotifError("Notification permission denied.");
      }
    } catch (err) {
      console.error("Notification request error:", err);
      setNotifError("Error requesting notification permission.");
    }
  }, []); // No dependencies

  return (
    <section>
      <h2>Notifications</h2>
      {/* Display 'prompt' if state is 'default' */}
      <p>Permission Status: <span className={`status-${notifPerm}`}>{notifPerm}</span></p>
      {notifError && <p className="error">{notifError}</p>}
      {notifPerm !== 'granted' && (
        <button onClick={handleRequestNotifications} disabled={notifPerm === 'denied'}>
          {notifPerm === 'denied' ? 'Permission Denied' : 'Request Notification Permission'}
        </button>
      )}
      {notifPerm === 'granted' && <p className="info">Permission granted. Test notification may have been shown.</p>}
    </section>
  );
}

export default NotificationInfo;