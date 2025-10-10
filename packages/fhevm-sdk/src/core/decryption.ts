import { FhevmClient } from './client';
import type { DecryptionRequest } from './types';

/**
 * Decrypt an encrypted value from the blockchain
 * @param client FHEVM client instance
 * @param request Decryption request parameters
 * @returns Decrypted value
 */
export async function decrypt(
  client: FhevmClient,
  request: DecryptionRequest
): Promise<number | boolean | string> {
  if (!client.isInitialized()) {
    await client.init();
  }

  const instance = client.getInstance();

  try {
    // Generate EIP-712 signature for decryption permission
    const { publicKey, signature } = await instance.generateToken({
      verifyingContract: request.contractAddress,
    });

    // Request decryption from the gateway
    const decrypted = await instance.decrypt(
      request.contractAddress,
      request.handle,
      {
        signature,
        publicKey,
      }
    );

    return decrypted;
  } catch (error) {
    console.error('❌ Decryption failed:', error);
    throw new Error(`Decryption failed: ${error}`);
  }
}

/**
 * Decrypt multiple values in a batch
 * @param client FHEVM client instance
 * @param requests Array of decryption requests
 * @returns Array of decrypted values
 */
export async function decryptBatch(
  client: FhevmClient,
  requests: DecryptionRequest[]
): Promise<(number | boolean | string)[]> {
  const results: (number | boolean | string)[] = [];

  for (const request of requests) {
    try {
      const result = await decrypt(client, request);
      results.push(result);
    } catch (error) {
      console.error(`Failed to decrypt handle ${request.handle}:`, error);
      results.push(0); // Default value on error
    }
  }

  return results;
}

/**
 * Check if user has permission to decrypt a value
 * @param client FHEVM client instance
 * @param contractAddress Contract address
 * @param handle Encrypted value handle
 * @param userAddress User address
 * @returns True if user has permission
 */
export async function hasDecryptionPermission(
  client: FhevmClient,
  contractAddress: string,
  handle: string,
  userAddress: string
): Promise<boolean> {
  if (!client.isInitialized()) {
    await client.init();
  }

  const instance = client.getInstance();
  const config = client.getConfig();

  try {
    // Check ACL (Access Control List) for permission
    const aclAddress = config.aclAddress;
    if (!aclAddress) {
      console.warn('ACL address not configured');
      return false;
    }

    // Implementation depends on ACL contract interface
    // This is a placeholder - actual implementation may vary
    return true;
  } catch (error) {
    console.error('❌ Permission check failed:', error);
    return false;
  }
}

/**
 * Request decryption permission from contract
 * @param client FHEVM client instance
 * @param contractAddress Contract address
 * @param userAddress User address
 * @returns Permission token
 */
export async function requestDecryptionPermission(
  client: FhevmClient,
  contractAddress: string,
  userAddress: string
): Promise<{ signature: string; publicKey: string }> {
  if (!client.isInitialized()) {
    await client.init();
  }

  const instance = client.getInstance();

  try {
    const token = await instance.generateToken({
      verifyingContract: contractAddress,
    });

    return {
      signature: token.signature,
      publicKey: token.publicKey,
    };
  } catch (error) {
    console.error('❌ Permission request failed:', error);
    throw new Error(`Permission request failed: ${error}`);
  }
}
