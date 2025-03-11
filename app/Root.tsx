'use client'
import React, { useEffect, useState } from 'react';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const [isOnline, setOnline] = useState<boolean>(
    typeof window !== 'undefined' && navigator.onLine
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleOnline = () => setOnline(true);
      const handleOffline = () => setOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return (
    <>
      {isOnline ? (
        children
      ) : (
        <div className="fixed top-4 left-0 w-full bg-red-500 text-white text-center p-2">
          You are currently offline! Some features may not work.
        </div>
      )}
    </>
  );
}
