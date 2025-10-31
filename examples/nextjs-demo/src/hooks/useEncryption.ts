'use client';

import { useState, useCallback } from 'react';
import { FHEClient } from '../lib/fhe/client';
import { EncryptedType } from '../lib/fhe/types';

export interface UseEncryptionReturn {
  encryptValue: (value: number | boolean, type: EncryptedType) => Promise<Uint8Array | null>;
  encryptBatch: (values: (number | boolean)[], types: EncryptedType[]) => Promise<Uint8Array[] | null>;
  isEncrypting: boolean;
  error: Error | null;
}

/**
 * Hook for encrypting values using FHE
 */
export function useEncryption(client: FHEClient | null): UseEncryptionReturn {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptValue = useCallback(
    async (value: number | boolean, type: EncryptedType): Promise<Uint8Array | null> => {
      if (!client || !client.isInitialized()) {
        const err = new Error('FHE client not initialized');
        setError(err);
        return null;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const encrypted = await client.encrypt(typeof value === 'boolean' ? (value ? 1 : 0) : value, type);
        return encrypted;
      } catch (err: any) {
        console.error('Encryption failed:', err);
        setError(err);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client]
  );

  const encryptBatch = useCallback(
    async (
      values: (number | boolean)[],
      types: EncryptedType[]
    ): Promise<Uint8Array[] | null> => {
      if (!client || !client.isInitialized()) {
        const err = new Error('FHE client not initialized');
        setError(err);
        return null;
      }

      if (values.length !== types.length) {
        const err = new Error('Values and types arrays must have the same length');
        setError(err);
        return null;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const encrypted = await Promise.all(
          values.map((value, index) =>
            client.encrypt(typeof value === 'boolean' ? (value ? 1 : 0) : value, types[index])
          )
        );
        return encrypted;
      } catch (err: any) {
        console.error('Batch encryption failed:', err);
        setError(err);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client]
  );

  return {
    encryptValue,
    encryptBatch,
    isEncrypting,
    error,
  };
}
