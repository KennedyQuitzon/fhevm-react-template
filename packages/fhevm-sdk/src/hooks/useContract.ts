import { useState, useCallback } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { FhevmClient } from '../core/client';
import type { ContractResult } from '../core/types';

/**
 * Hook for interacting with FHEVM contracts
 * Similar to wagmi's useContractWrite pattern
 */
export function useContract(
  client: FhevmClient | null,
  contractAddress: string,
  abi: any[],
  provider: BrowserProvider | null
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Call a contract write function
   */
  const write = useCallback(
    async (
      functionName: string,
      args: any[] = []
    ): Promise<ContractResult> => {
      if (!client || !provider) {
        const error = new Error('FHEVM client or provider not initialized');
        setError(error);
        return { success: false, error: error.message };
      }

      setIsLoading(true);
      setError(null);

      try {
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, abi, signer);

        // Execute contract function
        const tx = await contract[functionName](...args);
        const receipt = await tx.wait();

        return {
          success: true,
          data: receipt,
          transactionHash: receipt.hash,
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Contract write failed:', error);
        return { success: false, error: error.message };
      } finally {
        setIsLoading(false);
      }
    },
    [client, contractAddress, abi, provider]
  );

  /**
   * Call a contract read function
   */
  const read = useCallback(
    async (functionName: string, args: any[] = []): Promise<ContractResult> => {
      if (!provider) {
        const error = new Error('Provider not initialized');
        setError(error);
        return { success: false, error: error.message };
      }

      setIsLoading(true);
      setError(null);

      try {
        const contract = new Contract(contractAddress, abi, provider);

        // Execute contract function
        const result = await contract[functionName](...args);

        return {
          success: true,
          data: result,
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error('Contract read failed:', error);
        return { success: false, error: error.message };
      } finally {
        setIsLoading(false);
      }
    },
    [contractAddress, abi, provider]
  );

  return {
    write,
    read,
    isLoading,
    error,
  };
}

/**
 * Hook return type
 */
export interface UseContractReturn {
  write: (functionName: string, args?: any[]) => Promise<ContractResult>;
  read: (functionName: string, args?: any[]) => Promise<ContractResult>;
  isLoading: boolean;
  error: Error | null;
}
