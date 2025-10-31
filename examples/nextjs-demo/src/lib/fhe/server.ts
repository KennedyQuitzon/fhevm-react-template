/**
 * Server-side FHE operations
 * Handles FHE operations that should run on the server
 */

import { EncryptedType } from './types';

export interface ComputeRequest {
  operation: 'add' | 'sub' | 'mul' | 'div' | 'eq' | 'gt' | 'lt';
  operands: string[]; // Array of encrypted handles
}

export interface ComputeResult {
  handle: string;
  operation: string;
  timestamp: string;
}

/**
 * Perform homomorphic computation on encrypted data
 */
export async function performComputation(
  request: ComputeRequest
): Promise<ComputeResult> {
  try {
    const response = await fetch('/api/fhe/compute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Computation failed');
    }

    return data.result;
  } catch (error) {
    console.error('Computation failed:', error);
    throw error;
  }
}

/**
 * Fetch public encryption key from the contract
 */
export async function fetchPublicKey(contractAddress: string): Promise<any> {
  try {
    const response = await fetch(
      `/api/keys?contractAddress=${contractAddress}`
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch public key');
    }

    return data.publicKey;
  } catch (error) {
    console.error('Failed to fetch public key:', error);
    throw error;
  }
}

/**
 * Validate encrypted data handle format
 */
export function isValidHandle(handle: string): boolean {
  return /^0x[a-fA-F0-9]{40,}$/.test(handle);
}

/**
 * Validate encryption type
 */
export function isValidEncryptedType(type: string): boolean {
  const validTypes = ['UINT8', 'UINT16', 'UINT32', 'UINT64', 'UINT128', 'UINT256', 'BOOL', 'ADDRESS'];
  return validTypes.includes(type.toUpperCase());
}
