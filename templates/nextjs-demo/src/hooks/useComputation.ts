'use client';

import { useState, useCallback } from 'react';
import { ComputeOperation } from '../lib/fhe/types';
import { performComputation, ComputeResult } from '../lib/fhe/server';

export interface UseComputationReturn {
  compute: (operation: ComputeOperation, operands: string[]) => Promise<ComputeResult | null>;
  isComputing: boolean;
  error: Error | null;
}

/**
 * Hook for performing homomorphic computations on encrypted data
 */
export function useComputation(): UseComputationReturn {
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const compute = useCallback(
    async (
      operation: ComputeOperation,
      operands: string[]
    ): Promise<ComputeResult | null> => {
      setIsComputing(true);
      setError(null);

      try {
        const result = await performComputation({
          operation,
          operands,
        });
        return result;
      } catch (err: any) {
        console.error('Computation failed:', err);
        setError(err);
        return null;
      } finally {
        setIsComputing(false);
      }
    },
    []
  );

  return {
    compute,
    isComputing,
    error,
  };
}
