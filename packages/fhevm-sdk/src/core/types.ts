import type { BrowserProvider, Eip1193Provider } from 'ethers';

/**
 * FHEVM Client Configuration
 */
export interface FhevmClientConfig {
  provider: BrowserProvider | Eip1193Provider;
  contractAddress: string;
  chainId: number;
  publicKey?: string;
  aclAddress?: string;
}

/**
 * Encryption result containing ciphertext and handles
 */
export interface EncryptionResult {
  data: Uint8Array;
  handles: string[];
}

/**
 * Decryption request parameters
 */
export interface DecryptionRequest {
  contractAddress: string;
  handle: string;
  userAddress: string;
}

/**
 * Encrypted value type
 */
export type EncryptedValue = Uint8Array | string;

/**
 * Supported encrypted types
 */
export enum EncryptedType {
  UINT8 = 'euint8',
  UINT16 = 'euint16',
  UINT32 = 'euint32',
  UINT64 = 'euint64',
  UINT128 = 'euint128',
  UINT256 = 'euint256',
  BOOL = 'ebool',
  ADDRESS = 'eaddress',
}

/**
 * Contract interaction result
 */
export interface ContractResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  transactionHash?: string;
}

/**
 * FHEVM Network Configuration
 */
export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  aclAddress: string;
  gatewayUrl?: string;
}

/**
 * Common FHEVM Networks
 */
export const FHEVM_NETWORKS: Record<string, NetworkConfig> = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY',
    aclAddress: '0x8Fb33A0B4dCEE9510a843fe01b0DB5Cd66E72b2E',
  },
  localfhenix: {
    chainId: 8008135,
    name: 'Local Fhenix',
    rpcUrl: 'http://localhost:8545',
    aclAddress: '0x0000000000000000000000000000000000000000',
  },
};
