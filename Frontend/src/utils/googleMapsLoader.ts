let googleMapsPromise: Promise<void> | null = null;
let isGoogleMapsLoaded = false;

export const loadGoogleMapsScript = (): Promise<void> => {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  if (isGoogleMapsLoaded) {
    return Promise.resolve();
  }

  // Check if script already exists
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) {
    isGoogleMapsLoaded = true;
    return Promise.resolve();
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD9J9T2jmMlr2M6yFw2TdXfct-nyHQWS4o&libraries=visualization`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isGoogleMapsLoaded = true;
      resolve();
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
      reject(new Error('Failed to load Google Maps script'));
    };
    
    document.head.appendChild(script);
  });

  return googleMapsPromise;
};

export const isGoogleMapsAvailable = (): boolean => {
  return isGoogleMapsLoaded && typeof window !== 'undefined' && window.google && window.google.maps;
};