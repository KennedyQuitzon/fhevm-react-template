import { useState, useCallback } from 'react';
import { FhevmClient } from '../core/client';
import { decrypt, decryptBatch } from '../core/decryption';
import type { DecryptionRequest } from '../core/types';

/**
 * Hook for decrypting values
 */
export function useDecryption(client: FhevmClient | null) {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Decrypt a single value
   */
  const decryptValue = useCallback(
    async (
      contractAddress: string,
      handle: string,
      userAddress: string
    ): Promise<number | boolean | string | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const result = await decrypt(client, {
          contractAddress,
          handle,
          userAddress,
        });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Decryption failed:', error);
        return null;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client]
  );

  /**
   * Decrypt multiple values
   */
  const decryptValues = useCallback(
    async (
      requests: DecryptionRequest[]
    ): Promise<(number | boolean | string)[] | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const results = await decryptBatch(client, requests);
        return results;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Batch decryption failed:', error);
        return null;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client]
  );

  return {
    decryptValue,
    decryptValues,
    isDecrypting,
    error,
  };
}

/**
 * Hook return type
 */
export interface UseDecryptionReturn {
  decryptValue: (
    contractAddress: string,
    handle: string,
    userAddress: string
  ) => Promise<number | boolean | string | null>;
  decryptValues: (
    requests: DecryptionRequest[]
  ) => Promise<(number | boolean | string)[] | null>;
  isDecrypting: boolean;
  error: Error | null;
}
