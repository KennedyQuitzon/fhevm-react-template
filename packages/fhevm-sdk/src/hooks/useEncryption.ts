import { useState, useCallback } from 'react';
import { FhevmClient } from '../core/client';
import { encrypt, encryptBatch } from '../core/encryption';
import type { EncryptionResult, EncryptedType } from '../core/types';

/**
 * Hook for encrypting values
 */
export function useEncryption(client: FhevmClient | null) {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Encrypt a single value
   */
  const encryptValue = useCallback(
    async (
      value: number | boolean,
      type: EncryptedType = EncryptedType.UINT32
    ): Promise<EncryptionResult | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const result = await encrypt(client, value, type);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Encryption failed:', error);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client]
  );

  /**
   * Encrypt multiple values
   */
  const encryptValues = useCallback(
    async (
      values: (number | boolean)[],
      types: EncryptedType[]
    ): Promise<EncryptionResult[] | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const results = await encryptBatch(client, values, types);
        return results;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Batch encryption failed:', error);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client]
  );

  return {
    encryptValue,
    encryptValues,
    isEncrypting,
    error,
  };
}

/**
 * Hook return type
 */
export interface UseEncryptionReturn {
  encryptValue: (
    value: number | boolean,
    type?: EncryptedType
  ) => Promise<EncryptionResult | null>;
  encryptValues: (
    values: (number | boolean)[],
    types: EncryptedType[]
  ) => Promise<EncryptionResult[] | null>;
  isEncrypting: boolean;
  error: Error | null;
}
