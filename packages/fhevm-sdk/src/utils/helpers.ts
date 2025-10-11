import { BrowserProvider } from 'ethers';
import type { Eip1193Provider } from 'ethers';

/**
 * Convert hex string to Uint8Array
 */
export function hexToUint8Array(hex: string): Uint8Array {
  const cleaned = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleaned.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Convert Uint8Array to hex string
 */
export function uint8ArrayToHex(bytes: Uint8Array): string {
  return (
    '0x' +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * Get provider from window.ethereum
 */
export async function getProvider(): Promise<BrowserProvider | null> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    console.error('No Ethereum provider found. Install MetaMask.');
    return null;
  }

  return new BrowserProvider((window as any).ethereum as Eip1193Provider);
}

/**
 * Request account access from user
 */
export async function requestAccounts(): Promise<string[]> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('No Ethereum provider found');
  }

  const accounts = await (window as any).ethereum.request({
    method: 'eth_requestAccounts',
  });

  return accounts;
}

/**
 * Get current connected account
 */
export async function getCurrentAccount(): Promise<string | null> {
  const provider = await getProvider();
  if (!provider) return null;

  const signer = await provider.getSigner();
  return signer.address;
}

/**
 * Get network chain ID
 */
export async function getChainId(): Promise<number | null> {
  const provider = await getProvider();
  if (!provider) return null;

  const network = await provider.getNetwork();
  return Number(network.chainId);
}

/**
 * Switch to a specific network
 */
export async function switchNetwork(chainId: number): Promise<boolean> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return false;
  }

  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
    return true;
  } catch (error: any) {
    // Chain doesn't exist, try adding it
    if (error.code === 4902) {
      console.error('Network not found. Please add it manually.');
    }
    return false;
  }
}

/**
 * Format address for display (0x1234...5678)
 */
export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Check if value is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Wait for transaction confirmation
 */
export async function waitForTransaction(
  provider: BrowserProvider,
  txHash: string,
  confirmations = 1
): Promise<any> {
  return provider.waitForTransaction(txHash, confirmations);
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number | string): string {
  return Number(num).toLocaleString();
}

/**
 * Sleep for a specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i < maxRetries - 1) {
        await sleep(delayMs * Math.pow(2, i));
      }
    }
  }

  throw lastError || new Error('Retry failed');
}
