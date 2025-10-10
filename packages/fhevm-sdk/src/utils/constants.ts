/**
 * Common FHEVM network configurations
 */
export const NETWORKS = {
  SEPOLIA: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/',
    blockExplorer: 'https://sepolia.etherscan.io',
    aclAddress: '0x8Fb33A0B4dCEE9510a843fe01b0DB5Cd66E72b2E',
  },
  LOCAL_FHENIX: {
    chainId: 8008135,
    name: 'Local Fhenix',
    rpcUrl: 'http://localhost:8545',
    blockExplorer: '',
    aclAddress: '0x0000000000000000000000000000000000000000',
  },
} as const;

/**
 * Encrypted type sizes (in bits)
 */
export const ENCRYPTED_TYPE_SIZES = {
  euint8: 8,
  euint16: 16,
  euint32: 32,
  euint64: 64,
  euint128: 128,
  euint256: 256,
  ebool: 1,
  eaddress: 160,
} as const;

/**
 * Maximum values for each encrypted type
 */
export const MAX_VALUES = {
  euint8: 255,
  euint16: 65535,
  euint32: 4294967295,
  euint64: BigInt('18446744073709551615'),
  euint128: BigInt('340282366920938463463374607431768211455'),
  euint256: BigInt(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  ),
} as const;

/**
 * Gas estimates for common operations (approximate)
 */
export const GAS_ESTIMATES = {
  ENCRYPT_UINT8: 50000,
  ENCRYPT_UINT16: 60000,
  ENCRYPT_UINT32: 70000,
  ENCRYPT_UINT64: 90000,
  DECRYPT: 100000,
  TRANSFER_ENCRYPTED: 150000,
  COMPARE: 80000,
  ARITHMETIC: 70000,
} as const;

/**
 * Error messages
 */
export const ERRORS = {
  NO_PROVIDER: 'No Ethereum provider found. Please install MetaMask.',
  NOT_INITIALIZED: 'FHEVM client not initialized. Call init() first.',
  INVALID_ADDRESS: 'Invalid Ethereum address format.',
  INVALID_CHAIN: 'Invalid or unsupported chain ID.',
  ENCRYPTION_FAILED: 'Failed to encrypt value.',
  DECRYPTION_FAILED: 'Failed to decrypt value.',
  PERMISSION_DENIED: 'No permission to decrypt this value.',
  CONTRACT_ERROR: 'Contract interaction failed.',
  NETWORK_ERROR: 'Network request failed.',
} as const;

/**
 * Event names
 */
export const EVENTS = {
  ACCOUNT_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
} as const;

/**
 * Storage keys for local/session storage
 */
export const STORAGE_KEYS = {
  ACCOUNT: 'fhevm_account',
  CHAIN_ID: 'fhevm_chain_id',
  PUBLIC_KEY: 'fhevm_public_key',
  CACHED_DATA: 'fhevm_cached_data',
} as const;

/**
 * API endpoints (if using centralized gateway)
 */
export const API_ENDPOINTS = {
  SEPOLIA_GATEWAY: 'https://gateway.sepolia.fhevm.io',
  LOCAL_GATEWAY: 'http://localhost:8545',
} as const;

/**
 * Default configuration values
 */
export const DEFAULTS = {
  CHAIN_ID: 11155111, // Sepolia
  CONFIRMATION_BLOCKS: 1,
  TIMEOUT_MS: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const;

/**
 * Contract ABIs snippets for common interfaces
 */
export const COMMON_ABIS = {
  ACL: [
    'function allow(address account, bytes32 handle) external',
    'function persistAllowed(bytes32 handle, address account) external',
    'function isAllowed(bytes32 handle, address account) external view returns (bool)',
  ],
  GATEWAY: [
    'function requestDecryption(bytes32 handle) external returns (uint256)',
    'function getDecryptedValue(bytes32 handle) external view returns (uint256)',
  ],
} as const;

/**
 * Type guards
 */
export const isValidChainId = (chainId: number): boolean => {
  return Object.values(NETWORKS).some((network) => network.chainId === chainId);
};

export const isEncryptedType = (type: string): boolean => {
  return type in ENCRYPTED_TYPE_SIZES;
};
