// src/utils/motion.js

/**
 * Helper to request motion/orientation permission specifically for iOS 13+.
 * @returns {Promise<'granted' | 'denied' | 'not_required'>}
 */
export const requestMotionPermissionIOS = async () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const state = await DeviceMotionEvent.requestPermission();
        if (state === 'granted' && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          await DeviceOrientationEvent.requestPermission(); // Also request orientation
        }
        return state; // 'granted' or 'denied'
      } catch (error) {
        console.error("iOS motion permission request error:", error);
        return 'denied';
      }
    }
    return 'not_required'; // Not iOS 13+ or feature unavailable
  };