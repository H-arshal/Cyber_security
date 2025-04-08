// src/components/UserPreferences.jsx
import React, { useState, useEffect, useCallback } from 'react';
import InfoTable from './InfoTable';

function UserPreferences() {
  const [prefInfo, setPrefInfo] = useState({});

  const updatePreferences = useCallback(() => {
    setPrefInfo({
      prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'Light' : 'No Preference'),
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Reduce' : 'No Preference',
      primaryPointer: window.matchMedia('(pointer: fine)').matches ? 'Fine (Mouse/Stylus)' : (window.matchMedia('(pointer: coarse)').matches ? 'Coarse (Touch)' : 'Unknown'),
    });
  }, []); // No dependencies for the update logic

  useEffect(() => {
    updatePreferences(); // Initial check

    // Create stable references to queries for listeners
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Stable reference to the update function
    const stableUpdate = updatePreferences;

    // Add listeners
    colorSchemeQuery.addEventListener('change', stableUpdate);
    reducedMotionQuery.addEventListener('change', stableUpdate);

    // Cleanup listeners
    return () => {
      colorSchemeQuery.removeEventListener('change', stableUpdate);
      reducedMotionQuery.removeEventListener('change', stableUpdate);
    };
  }, [updatePreferences]); // Depend on the memoized update function

  return (
    <section>
      <h2>User Preferences</h2>
      <InfoTable data={prefInfo} />
    </section>
  );
}

export default UserPreferences;