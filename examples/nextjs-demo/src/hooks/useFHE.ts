'use client';

import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import { FHEClient, createFHEClient } from '../lib/fhe/client';

export interface UseFHEConfig {
  provider: BrowserProvider | null;
  contractAddress: string;
  chainId: number;
}

export interface UseFHEReturn {
  client: FHEClient | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  reinitialize: () => Promise<void>;
}

/**
 * Hook for managing FHE client lifecycle
 */
export function useFHE(config: UseFHEConfig): UseFHEReturn {
  const [client, setClient] = useState<FHEClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async () => {
    if (!config.provider) {
      setClient(null);
      setIsInitialized(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fheClient = createFHEClient({
        provider: config.provider,
        contractAddress: config.contractAddress,
        chainId: config.chainId,
      });

      await fheClient.init();
      setClient(fheClient);
      setIsInitialized(true);
    } catch (err: any) {
      console.error('Failed to initialize FHE client:', err);
      setError(err);
      setClient(null);
      setIsInitialized(false);
    } finally {
      setIsLoading(false);
    }
  }, [config.provider, config.contractAddress, config.chainId]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    client,
    isInitialized,
    isLoading,
    error,
    reinitialize: initialize,
  };
}
