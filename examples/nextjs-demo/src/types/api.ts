/**
 * API-related TypeScript type definitions
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptAPIRequest {
  value: number | boolean | string;
  type: string;
}

export interface EncryptAPIResponse {
  success: boolean;
  encrypted: {
    handle: string;
    type: string;
    timestamp: string;
  };
  message: string;
}

export interface DecryptAPIRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptAPIResponse {
  success: boolean;
  value: number | boolean | string;
  handle: string;
  message: string;
  timestamp: string;
}

export interface ComputeAPIRequest {
  operation: string;
  operands: string[];
}

export interface ComputeAPIResponse {
  success: boolean;
  result: {
    handle: string;
    operation: string;
    operandCount: number;
    timestamp: string;
  };
  message: string;
}

export interface KeysAPIRequest {
  action: 'generate' | 'rotate' | 'revoke';
  contractAddress: string;
}

export interface KeysAPIResponse {
  success: boolean;
  action?: string;
  publicKey?: {
    contractAddress: string;
    key: {
      n: string;
      g: string;
    };
    algorithm: string;
    version: string;
    timestamp: string;
  };
  message: string;
  timestamp?: string;
}

export interface ErrorResponse {
  error: string;
  details?: any;
  timestamp: string;
}
