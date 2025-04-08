// src/utils/permissions.js

/**
 * Safely queries the status of a given permission.
 * @param {PermissionDescriptor | string} descriptor - The permission name (e.g., 'geolocation') or descriptor object.
 * @returns {Promise<{state: PermissionState, statusObj: PermissionStatus | null, error?: string}>}
 */
export const queryPermission = async (descriptor) => {
    if (!('permissions' in navigator)) {
      return { state: 'prompt', statusObj: null, error: 'Permissions API not supported' };
    }
    try {
      const desc = typeof descriptor === 'string' ? { name: descriptor } : descriptor;
      const status = await navigator.permissions.query(desc);
      return { state: status.state, statusObj: status };
    } catch (e) {
      console.warn(`Permission query failed for '${JSON.stringify(descriptor)}':`, e);
      return { state: 'prompt', statusObj: null, error: `Query failed or name not supported: ${e.message}` };
    }
  };
  
  /**
   * Creates a state update handler for permission status changes.
   * Uses useCallback in the component to memoize.
   * @param {Function} setter - The React state setter function (e.g., setLocPerm).
   * @returns {Function} - An event handler function.
   */
  export const createPermissionChangeHandler = (setter) => (event) => {
    if (event.target) {
      setter(event.target.state);
    }
  };