/**
 * Validation utilities for user input and data
 */

import { EncryptedType } from '../fhe/types';

/**
 * Validate numeric input
 */
export function validateNumber(value: string): { valid: boolean; error?: string } {
  if (value === '') {
    return { valid: false, error: 'Value is required' };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: 'Invalid number format' };
  }

  if (!Number.isInteger(num)) {
    return { valid: false, error: 'Value must be an integer' };
  }

  if (num < 0) {
    return { valid: false, error: 'Value must be non-negative' };
  }

  return { valid: true };
}

/**
 * Validate value for specific encrypted type
 */
export function validateEncryptedType(
  value: number,
  type: EncryptedType
): { valid: boolean; error?: string } {
  const ranges: { [key: number]: { min: number; max: number; name: string } } = {
    [EncryptedType.UINT8]: { min: 0, max: 255, name: 'UINT8' },
    [EncryptedType.UINT16]: { min: 0, max: 65535, name: 'UINT16' },
    [EncryptedType.UINT32]: { min: 0, max: 4294967295, name: 'UINT32' },
    [EncryptedType.UINT64]: { min: 0, max: Number.MAX_SAFE_INTEGER, name: 'UINT64' },
  };

  const range = ranges[type];
  if (!range) {
    return { valid: true }; // Unknown type, skip validation
  }

  if (value < range.min || value > range.max) {
    return {
      valid: false,
      error: `Value must be between ${range.min} and ${range.max} for ${range.name}`,
    };
  }

  return { valid: true };
}

/**
 * Validate contract address
 */
export function validateContractAddress(
  address: string
): { valid: boolean; error?: string } {
  if (!address) {
    return { valid: false, error: 'Contract address is required' };
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, error: 'Invalid Ethereum address format' };
  }

  if (address === '0x0000000000000000000000000000000000000000') {
    return { valid: false, error: 'Cannot use zero address' };
  }

  return { valid: true };
}

/**
 * Validate chain ID
 */
export function validateChainId(chainId: number): { valid: boolean; error?: string } {
  const supportedChains = [1, 5, 11155111, 8008135]; // Mainnet, Goerli, Sepolia, Local Fhenix

  if (!supportedChains.includes(chainId)) {
    return {
      valid: false,
      error: `Unsupported chain ID. Supported: ${supportedChains.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validate encrypted handle
 */
export function validateHandle(handle: string): { valid: boolean; error?: string } {
  if (!handle) {
    return { valid: false, error: 'Handle is required' };
  }

  if (!/^0x[a-fA-F0-9]{40,}$/.test(handle)) {
    return { valid: false, error: 'Invalid encrypted handle format' };
  }

  return { valid: true };
}

/**
 * Validate operation type
 */
export function validateOperation(
  operation: string
): { valid: boolean; error?: string } {
  const validOperations = [
    'add', 'sub', 'mul', 'div',
    'eq', 'ne', 'gt', 'gte', 'lt', 'lte',
    'and', 'or', 'xor', 'not'
  ];

  if (!validOperations.includes(operation.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid operation. Supported: ${validOperations.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validate array of operands
 */
export function validateOperands(
  operands: string[],
  expectedCount?: number
): { valid: boolean; error?: string } {
  if (!Array.isArray(operands) || operands.length === 0) {
    return { valid: false, error: 'Operands must be a non-empty array' };
  }

  if (expectedCount !== undefined && operands.length !== expectedCount) {
    return {
      valid: false,
      error: `Expected ${expectedCount} operand(s), got ${operands.length}`,
    };
  }

  for (const operand of operands) {
    const handleValidation = validateHandle(operand);
    if (!handleValidation.valid) {
      return handleValidation;
    }
  }

  return { valid: true };
}
