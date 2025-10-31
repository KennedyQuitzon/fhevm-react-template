/**
 * Type definitions for FHE operations
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

export interface DecryptRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptResponse {
  value: number | boolean | string;
  handle: string;
  timestamp: string;
}

export interface EncryptRequest {
  value: number | boolean | string;
  type: EncryptedType;
}

export interface EncryptResponse {
  encrypted: {
    handle: string;
    type: string;
    timestamp: string;
  };
  success: boolean;
  message: string;
}

export type ComputeOperation =
  | 'add'
  | 'sub'
  | 'mul'
  | 'div'
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'and'
  | 'or'
  | 'xor'
  | 'not';

export interface ComputeRequest {
  operation: ComputeOperation;
  operands: string[];
}

export interface ComputeResponse {
  success: boolean;
  result: {
    handle: string;
    operation: string;
    operandCount: number;
    timestamp: string;
  };
  message: string;
}

export interface FHEConfig {
  contractAddress: string;
  chainId: number;
  aclAddress?: string;
}

export interface FHEClientState {
  initialized: boolean;
  loading: boolean;
  error: Error | null;
}
