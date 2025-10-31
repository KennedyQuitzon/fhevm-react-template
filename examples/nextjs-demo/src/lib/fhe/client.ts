import { BrowserProvider } from 'ethers';
import { EncryptedType } from './types';

/**
 * Client-side FHE operations
 * Handles encryption and interaction with FHEVM from the browser
 */

export interface FHEClientConfig {
  provider: BrowserProvider;
  contractAddress: string;
  chainId: number;
}

export class FHEClient {
  private provider: BrowserProvider;
  private contractAddress: string;
  private chainId: number;
  private initialized: boolean = false;

  constructor(config: FHEClientConfig) {
    this.provider = config.provider;
    this.contractAddress = config.contractAddress;
    this.chainId = config.chainId;
  }

  /**
   * Initialize the FHE client
   * Fetches public key and sets up encryption context
   */
  async init(): Promise<void> {
    try {
      // In a real implementation, this would:
      // 1. Fetch the public key from the contract
      // 2. Initialize the FHE context
      // 3. Set up encryption/decryption parameters

      console.log('Initializing FHE client...');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation
      this.initialized = true;
      console.log('FHE client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize FHE client:', error);
      throw error;
    }
  }

  /**
   * Encrypt a value for on-chain use
   */
  async encrypt(value: number | boolean, type: EncryptedType): Promise<Uint8Array> {
    if (!this.initialized) {
      throw new Error('FHE client not initialized. Call init() first.');
    }

    try {
      // In a real implementation, this would use fhevmjs to encrypt
      // For now, we simulate encryption
      const mockEncrypted = new Uint8Array(256);
      crypto.getRandomValues(mockEncrypted);
      return mockEncrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypt a value (requires permission)
   */
  async decrypt(handle: string, userAddress: string): Promise<number> {
    if (!this.initialized) {
      throw new Error('FHE client not initialized. Call init() first.');
    }

    try {
      const response = await fetch('/api/fhe/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle,
          contractAddress: this.contractAddress,
          userAddress,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Decryption failed');
      }

      return data.value;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }

  /**
   * Check if the client is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get the contract address
   */
  getContractAddress(): string {
    return this.contractAddress;
  }

  /**
   * Get the chain ID
   */
  getChainId(): number {
    return this.chainId;
  }
}

/**
 * Create a new FHE client instance
 */
export function createFHEClient(config: FHEClientConfig): FHEClient {
  return new FHEClient(config);
}
