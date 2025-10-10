# @fhevm/sdk

Universal SDK for building privacy-preserving dApps with Fully Homomorphic Encryption (FHE) on Ethereum.

## Features

- Framework-agnostic core (works with React, Vue, Node.js, etc.)
- Wagmi-like API structure for familiar web3 developer experience
- TypeScript support with full type definitions
- React hooks for easy integration
- Encryption and decryption utilities
- Contract interaction helpers
- Comprehensive error handling

## Installation

```bash
npm install @fhevm/sdk fhevmjs ethers
```

## Quick Start

### Basic Usage (Framework-agnostic)

```typescript
import { createFhevmClient, encrypt, decrypt } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// 1. Create provider
const provider = new BrowserProvider(window.ethereum);

// 2. Create FHEVM client
const client = createFhevmClient({
  provider,
  contractAddress: '0x...',
  chainId: 11155111, // Sepolia
});

// 3. Initialize client
await client.init();

// 4. Encrypt a value
const encrypted = await encrypt(client, 42, EncryptedType.UINT32);

// 5. Decrypt a value
const decrypted = await decrypt(client, {
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: '0x...',
});
```

### React Usage

```tsx
import { useFhevm, useEncryption, useDecryption } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

function App() {
  const provider = new BrowserProvider(window.ethereum);

  // Initialize FHEVM client
  const { client, isInitialized } = useFhevm({
    provider,
    contractAddress: '0x...',
    chainId: 11155111,
  });

  // Encryption hook
  const { encryptValue, isEncrypting } = useEncryption(client);

  // Decryption hook
  const { decryptValue, isDecrypting } = useDecryption(client);

  const handleEncrypt = async () => {
    const result = await encryptValue(42, EncryptedType.UINT32);
    console.log('Encrypted:', result);
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isEncrypting || !isInitialized}>
        Encrypt Value
      </button>
    </div>
  );
}
```

## API Reference

### Core

#### `createFhevmClient(config)`

Creates a new FHEVM client instance.

**Parameters:**
- `config.provider`: Ethereum provider (BrowserProvider or Eip1193Provider)
- `config.contractAddress`: Contract address to interact with
- `config.chainId`: Chain ID (e.g., 11155111 for Sepolia)
- `config.publicKey` (optional): Public key for encryption
- `config.aclAddress` (optional): ACL contract address

**Returns:** `FhevmClient`

#### `encrypt(client, value, type)`

Encrypts a value using FHEVM.

**Parameters:**
- `client`: FHEVM client instance
- `value`: Value to encrypt (number or boolean)
- `type`: Encrypted type (euint8, euint32, ebool, etc.)

**Returns:** `Promise<EncryptionResult>`

#### `decrypt(client, request)`

Decrypts an encrypted value from the blockchain.

**Parameters:**
- `client`: FHEVM client instance
- `request.contractAddress`: Contract address
- `request.handle`: Encrypted value handle
- `request.userAddress`: User address requesting decryption

**Returns:** `Promise<number | boolean | string>`

### React Hooks

#### `useFhevm(config)`

Hook for managing FHEVM client instance.

**Returns:**
- `client`: FHEVM client instance
- `isInitialized`: Whether client is initialized
- `isLoading`: Whether initialization is in progress
- `error`: Error if initialization failed
- `initialize()`: Function to manually initialize
- `reset()`: Function to reset client

#### `useEncryption(client)`

Hook for encrypting values.

**Returns:**
- `encryptValue(value, type)`: Function to encrypt a single value
- `encryptValues(values, types)`: Function to encrypt multiple values
- `isEncrypting`: Whether encryption is in progress
- `error`: Error if encryption failed

#### `useDecryption(client)`

Hook for decrypting values.

**Returns:**
- `decryptValue(contractAddress, handle, userAddress)`: Function to decrypt a single value
- `decryptValues(requests)`: Function to decrypt multiple values
- `isDecrypting`: Whether decryption is in progress
- `error`: Error if decryption failed

#### `useContract(client, contractAddress, abi, provider)`

Hook for interacting with FHEVM contracts.

**Returns:**
- `write(functionName, args)`: Function to call write functions
- `read(functionName, args)`: Function to call read functions
- `isLoading`: Whether operation is in progress
- `error`: Error if operation failed

### Utilities

#### `getProvider()`

Gets the Ethereum provider from window.ethereum.

**Returns:** `Promise<BrowserProvider | null>`

#### `requestAccounts()`

Requests account access from user.

**Returns:** `Promise<string[]>`

#### `getCurrentAccount()`

Gets the current connected account.

**Returns:** `Promise<string | null>`

#### `getChainId()`

Gets the current chain ID.

**Returns:** `Promise<number | null>`

#### `switchNetwork(chainId)`

Switches to a specific network.

**Parameters:**
- `chainId`: Chain ID to switch to

**Returns:** `Promise<boolean>`

#### `formatAddress(address, chars)`

Formats an address for display (0x1234...5678).

**Parameters:**
- `address`: Address to format
- `chars` (optional): Number of characters to show (default: 4)

**Returns:** `string`

## Supported Encrypted Types

- `euint8`: 8-bit unsigned integer (0-255)
- `euint16`: 16-bit unsigned integer (0-65535)
- `euint32`: 32-bit unsigned integer (0-4294967295)
- `euint64`: 64-bit unsigned integer
- `euint128`: 128-bit unsigned integer
- `euint256`: 256-bit unsigned integer
- `ebool`: Boolean (encrypted)
- `eaddress`: Ethereum address (encrypted)

## Networks

### Sepolia Testnet

```typescript
{
  chainId: 11155111,
  name: 'Sepolia Testnet',
  aclAddress: '0x8Fb33A0B4dCEE9510a843fe01b0DB5Cd66E72b2E'
}
```

### Local Fhenix

```typescript
{
  chainId: 8008135,
  name: 'Local Fhenix',
  aclAddress: '0x0000000000000000000000000000000000000000'
}
```

## Examples

See the `examples/` directory for complete examples:

- `nextjs-demo`: Next.js integration example
- `react-demo`: React integration example
- `healthcare-app`: Full healthcare records dApp

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

## Resources

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Zama](https://www.zama.ai/)
- [fhevmjs](https://github.com/zama-ai/fhevmjs)
