import { useState, useEffect, useCallback } from 'react';

/*
  ============================================================
  BACKEND TODO: Replace localStorage with real API calls
  ============================================================
  
  This hook currently uses localStorage to persist the service
  status (active/inactive + message). When the backend is ready,
  replace with API calls:

  1. GET  /api/admin/service-status
     → Returns: { isActive: boolean, message: string }
     → Called on hook mount to fetch current status

  2. PUT  /api/admin/service-status
     → Body: { isActive: boolean, message: string }
     → Called when admin toggles the switch or updates the message

  3. Remove localStorage reads/writes once API is connected
  4. Consider using react-query (useQuery/useMutation) for
     caching and auto-refetch, similar to GetAdminAllCatalogsApi
  ============================================================
*/

const STORAGE_KEY = 'SERVICE_STATUS';

interface ServiceStatus {
  isActive: boolean;
  message: string;
}

const DEFAULT_STATUS: ServiceStatus = {
  isActive: true,
  message: '',
};

// BACKEND TODO: Replace with API call → GET /api/admin/service-status
function getStoredStatus(): ServiceStatus {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ServiceStatus;
    }
  } catch {
    // ignore parse errors
  }
  return DEFAULT_STATUS;
}

export default function useServiceStatus() {
  const [status, setStatusState] = useState<ServiceStatus>(getStoredStatus);

  // BACKEND TODO: Replace with useQuery to fetch status on mount
  // Sync across tabs (only needed for localStorage approach)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setStatusState(getStoredStatus());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // BACKEND TODO: Replace with useMutation → PUT /api/admin/service-status
  const setServiceStatus = useCallback((isActive: boolean, message: string = '') => {
    const next: ServiceStatus = { isActive, message };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStatusState(next);
  }, []);

  return {
    isActive: status.isActive,
    message: status.message,
    setServiceStatus,
  };
}

