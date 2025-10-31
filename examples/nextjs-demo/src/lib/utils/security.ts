/**
 * Security utilities for FHE operations
 */

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate encrypted handle format
 */
export function isValidHandle(handle: string): boolean {
  return /^0x[a-fA-F0-9]{40,}$/.test(handle);
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
}

/**
 * Validate numeric value is within type bounds
 */
export function isValueInBounds(value: number, type: string): boolean {
  const bounds: { [key: string]: { min: number; max: number } } = {
    UINT8: { min: 0, max: 255 },
    UINT16: { min: 0, max: 65535 },
    UINT32: { min: 0, max: 4294967295 },
    UINT64: { min: 0, max: Number.MAX_SAFE_INTEGER },
  };

  const typeBounds = bounds[type.toUpperCase()];
  if (!typeBounds) return true; // Unknown type, skip validation

  return value >= typeBounds.min && value <= typeBounds.max;
}

/**
 * Generate random nonce for transactions
 */
export function generateNonce(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return '0x' + Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash data using SHA-256
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify signature format
 */
export function isValidSignature(signature: string): boolean {
  return /^0x[a-fA-F0-9]{130}$/.test(signature);
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number = 10, timeWindowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }
}
