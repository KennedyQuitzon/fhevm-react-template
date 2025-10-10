import { FhevmClient } from './client';
import type { EncryptionResult, EncryptedType } from './types';

/**
 * Encrypt a value using FHEVM
 * @param client FHEVM client instance
 * @param value Value to encrypt
 * @param type Encrypted type (euint8, euint32, ebool, etc.)
 * @returns Encrypted data and handles
 */
export async function encrypt(
  client: FhevmClient,
  value: number | boolean,
  type: EncryptedType = EncryptedType.UINT32
): Promise<EncryptionResult> {
  if (!client.isInitialized()) {
    await client.init();
  }

  const instance = client.getInstance();
  const config = client.getConfig();

  try {
    // Convert boolean to number for encryption
    const numericValue = typeof value === 'boolean' ? (value ? 1 : 0) : value;

    // Encrypt based on type
    let encrypted: Uint8Array;

    switch (type) {
      case EncryptedType.UINT8:
        encrypted = instance.encrypt8(numericValue);
        break;
      case EncryptedType.UINT16:
        encrypted = instance.encrypt16(numericValue);
        break;
      case EncryptedType.UINT32:
        encrypted = instance.encrypt32(numericValue);
        break;
      case EncryptedType.UINT64:
        encrypted = instance.encrypt64(BigInt(numericValue));
        break;
      case EncryptedType.UINT128:
        encrypted = instance.encrypt128(BigInt(numericValue));
        break;
      case EncryptedType.BOOL:
        encrypted = instance.encryptBool(Boolean(numericValue));
        break;
      default:
        throw new Error(`Unsupported encryption type: ${type}`);
    }

    return {
      data: encrypted,
      handles: [], // Handles are generated after transaction
    };
  } catch (error) {
    console.error('❌ Encryption failed:', error);
    throw new Error(`Encryption failed: ${error}`);
  }
}

/**
 * Encrypt multiple values in a batch
 * @param client FHEVM client instance
 * @param values Array of values to encrypt
 * @param types Array of encrypted types
 * @returns Array of encrypted results
 */
export async function encryptBatch(
  client: FhevmClient,
  values: (number | boolean)[],
  types: EncryptedType[]
): Promise<EncryptionResult[]> {
  if (values.length !== types.length) {
    throw new Error('Values and types arrays must have the same length');
  }

  const results: EncryptionResult[] = [];

  for (let i = 0; i < values.length; i++) {
    const result = await encrypt(client, values[i], types[i]);
    results.push(result);
  }

  return results;
}

/**
 * Encrypt a uint8 value
 * Convenience wrapper for encrypt()
 */
export async function encryptUint8(
  client: FhevmClient,
  value: number
): Promise<EncryptionResult> {
  return encrypt(client, value, EncryptedType.UINT8);
}

/**
 * Encrypt a uint16 value
 * Convenience wrapper for encrypt()
 */
export async function encryptUint16(
  client: FhevmClient,
  value: number
): Promise<EncryptionResult> {
  return encrypt(client, value, EncryptedType.UINT16);
}

/**
 * Encrypt a uint32 value
 * Convenience wrapper for encrypt()
 */
export async function encryptUint32(
  client: FhevmClient,
  value: number
): Promise<EncryptionResult> {
  return encrypt(client, value, EncryptedType.UINT32);
}

/**
 * Encrypt a uint64 value
 * Convenience wrapper for encrypt()
 */
export async function encryptUint64(
  client: FhevmClient,
  value: number | bigint
): Promise<EncryptionResult> {
  return encrypt(client, Number(value), EncryptedType.UINT64);
}

/**
 * Encrypt a boolean value
 * Convenience wrapper for encrypt()
 */
export async function encryptBool(
  client: FhevmClient,
  value: boolean
): Promise<EncryptionResult> {
  return encrypt(client, value, EncryptedType.BOOL);
}

/**
 * Generate input for contract call with encrypted parameters
 * @param client FHEVM client instance
 * @param contractAddress Contract address
 * @param userAddress User address
 * @returns Input object for contract transaction
 */
export async function generateContractInput(
  client: FhevmClient,
  contractAddress: string,
  userAddress: string
) {
  if (!client.isInitialized()) {
    await client.init();
  }

  const instance = client.getInstance();

  return instance.generateToken({
    verifyingContract: contractAddress,
  });
}
