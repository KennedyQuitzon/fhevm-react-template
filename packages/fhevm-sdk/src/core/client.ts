import { BrowserProvider } from 'ethers';
import { createInstance, FhevmInstance } from 'fhevmjs';
import type { FhevmClientConfig } from './types';

/**
 * FHEVM Client for managing FHE operations
 * Inspired by wagmi's client pattern
 */
export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private config: FhevmClientConfig;
  private initialized = false;

  constructor(config: FhevmClientConfig) {
    this.config = config;
  }

  /**
   * Initialize the FHEVM instance
   * Must be called before any encryption/decryption operations
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Create FHE instance with chain configuration
      this.instance = await createInstance({
        chainId: this.config.chainId,
        publicKey: this.config.publicKey,
        gatewayUrl: this.getGatewayUrl(),
        aclAddress: this.config.aclAddress,
      });

      this.initialized = true;
      console.log('✅ FHEVM Client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize FHEVM Client:', error);
      throw new Error(`FHEVM initialization failed: ${error}`);
    }
  }

  /**
   * Get the FHEVM instance
   * Throws if not initialized
   */
  getInstance(): FhevmInstance {
    if (!this.instance || !this.initialized) {
      throw new Error('FHEVM Client not initialized. Call init() first.');
    }
    return this.instance;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get the current configuration
   */
  getConfig(): FhevmClientConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<FhevmClientConfig>): void {
    this.config = { ...this.config, ...config };
    this.initialized = false; // Require re-initialization
  }

  /**
   * Get gateway URL based on chain configuration
   */
  private getGatewayUrl(): string | undefined {
    // Add gateway URL logic based on chainId
    const gatewayUrls: Record<number, string> = {
      11155111: 'https://gateway.sepolia.fhevm.io', // Sepolia
      8008135: 'http://localhost:8545', // Local Fhenix
    };

    return gatewayUrls[this.config.chainId];
  }

  /**
   * Reset the client state
   */
  reset(): void {
    this.instance = null;
    this.initialized = false;
  }
}

/**
 * Create a new FHEVM client instance
 * @param config Client configuration
 * @returns Configured FHEVM client
 */
export function createFhevmClient(config: FhevmClientConfig): FhevmClient {
  return new FhevmClient(config);
}

/**
 * Global client instance (optional singleton pattern)
 */
let globalClient: FhevmClient | null = null;

/**
 * Get or create the global FHEVM client
 */
export function getGlobalClient(): FhevmClient | null {
  return globalClient;
}

/**
 * Set the global FHEVM client
 */
export function setGlobalClient(client: FhevmClient): void {
  globalClient = client;
}
