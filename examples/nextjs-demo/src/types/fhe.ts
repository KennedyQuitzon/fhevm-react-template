/**
 * FHE-related TypeScript type definitions
 */

export enum EncryptedType {
  UINT8 = 0,
  UINT16 = 1,
  UINT32 = 2,
  UINT64 = 3,
  UINT128 = 4,
  UINT256 = 5,
  BOOL = 6,
  ADDRESS = 7,
}

export interface EncryptedValue {
  data: Uint8Array;
  type: EncryptedType;
  handle?: string;
}

export interface FHEConfig {
  contractAddress: string;
  chainId: number;
  aclAddress?: string;
}

export interface PublicKey {
  n: string;
  g: string;
}

export interface KeyPair {
  publicKey: PublicKey;
  privateKey?: never; // Private keys are never exposed client-side
  algorithm: string;
  version: string;
}

export interface Permission {
  userAddress: string;
  contractAddress: string;
  handle: string;
  granted: boolean;
  timestamp: number;
}

export interface EncryptionResult {
  ciphertext: Uint8Array;
  handle: string;
  type: EncryptedType;
}

export interface DecryptionRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
  signature?: string;
}

export interface DecryptionResult {
  value: number | boolean | string;
  type: EncryptedType;
  timestamp: number;
}

export type SupportedNetworks = 1 | 5 | 11155111 | 8008135;

export interface NetworkConfig {
  chainId: SupportedNetworks;
  name: string;
  rpcUrl: string;
  aclAddress: string;
}

export interface FHEClientConfig {
  contractAddress: string;
  chainId: number;
  publicKey?: PublicKey;
}
