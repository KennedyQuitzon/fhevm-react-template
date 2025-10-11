import { useState, useEffect, useCallback } from 'react';
import { FhevmClient, createFhevmClient } from '../core/client';
import type { FhevmClientConfig } from '../core/types';

/**
 * Hook for managing FHEVM client instance
 * Inspired by wagmi's useClient pattern
 */
export function useFhevm(config: FhevmClientConfig) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Initialize the FHEVM client
   */
  const initialize = useCallback(async () => {
    if (isInitialized) return;

    setIsLoading(true);
    setError(null);

    try {
      const newClient = createFhevmClient(config);
      await newClient.init();
      setClient(newClient);
      setIsInitialized(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('Failed to initialize FHEVM client:', error);
    } finally {
      setIsLoading(false);
    }
  }, [config, isInitialized]);

  /**
   * Reset the client
   */
  const reset = useCallback(() => {
    if (client) {
      client.reset();
    }
    setClient(null);
    setIsInitialized(false);
    setError(null);
  }, [client]);

  /**
   * Auto-initialize on mount
   */
  useEffect(() => {
    initialize();

    return () => {
      // Cleanup on unmount
      if (client) {
        client.reset();
      }
    };
  }, []);

  return {
    client,
    isInitialized,
    isLoading,
    error,
    initialize,
    reset,
  };
}

/**
 * Hook return type
 */
export interface UseFhevmReturn {
  client: FhevmClient | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  reset: () => void;
}
