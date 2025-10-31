/**
 * Key management utilities for FHE
 * Handles public/private key operations
 */

export interface PublicKey {
  n: string;
  g: string;
}

export interface KeyPair {
  publicKey: PublicKey;
  contractAddress: string;
  algorithm: string;
  version: string;
  timestamp: string;
}

/**
 * Fetch public key from contract
 */
export async function getPublicKey(contractAddress: string): Promise<KeyPair> {
  try {
    const response = await fetch(`/api/keys?contractAddress=${contractAddress}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch public key');
    }

    return data.publicKey;
  } catch (error) {
    console.error('Failed to get public key:', error);
    throw error;
  }
}

/**
 * Generate new key pair (requires admin privileges)
 */
export async function generateKeyPair(contractAddress: string): Promise<void> {
  try {
    const response = await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate',
        contractAddress,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to generate key pair');
    }
  } catch (error) {
    console.error('Failed to generate key pair:', error);
    throw error;
  }
}

/**
 * Rotate encryption keys (requires admin privileges)
 */
export async function rotateKeys(contractAddress: string): Promise<void> {
  try {
    const response = await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'rotate',
        contractAddress,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to rotate keys');
    }
  } catch (error) {
    console.error('Failed to rotate keys:', error);
    throw error;
  }
}

/**
 * Validate public key format
 */
export function isValidPublicKey(key: PublicKey): boolean {
  return (
    typeof key.n === 'string' &&
    typeof key.g === 'string' &&
    key.n.startsWith('0x') &&
    key.g.startsWith('0x')
  );
}
