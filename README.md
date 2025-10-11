# FHEVM React Template

Universal SDK and React template for building privacy-preserving dApps with Fully Homomorphic Encryption (FHE) on Ethereum.

## Overview

This project provides a comprehensive toolkit for developers to build privacy-preserving decentralized applications using Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine). It includes a framework-agnostic SDK with a wagmi-like API structure, making it familiar and easy to use for web3 developers.

## Features

### 🎯 Framework Agnostic Core

- Works with React, Next.js, Vue, Node.js, and vanilla JavaScript
- No framework lock-in - use what you prefer
- Modular architecture for maximum flexibility

### ⚡ Developer-Friendly API

- Wagmi-like structure familiar to web3 developers
- React hooks for easy integration
- TypeScript support with full type definitions
- Comprehensive error handling

### 🔐 Privacy First

- End-to-end encryption for on-chain data
- Fully Homomorphic Encryption (FHE) support
- Fine-grained access control
- Secure decryption with permission management

### 📦 Complete Examples

- Next.js integration demo
- React demo (coming soon)
- Healthcare records dApp (full example)
- Node.js backend example (coming soon)

## Quick Start

### Installation

From the root of the monorepo:

```bash
npm install
```

This will install all packages and examples in one command.

### Build the SDK

```bash
npm run build:sdk
```

### Start Examples

```bash
# Start Next.js demo
npm run dev:next

# Start React demo
npm run dev:react

# Start Healthcare app
npm run dev:healthcare
```

### Compile Smart Contracts

```bash
npm run compile:contracts
```

## Usage

### Basic Setup (< 10 lines of code)

```typescript
import { createFhevmClient, encrypt, decrypt } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// 1. Create provider
const provider = new BrowserProvider(window.ethereum);

// 2. Create FHEVM client
const client = createFhevmClient({
  provider,
  contractAddress: '0x...',
  chainId: 11155111
});

// 3. Initialize
await client.init();

// 4. Encrypt data
const encrypted = await encrypt(client, 42, EncryptedType.UINT32);

// 5. Use in your dApp!
```

### React Integration

```tsx
import { useFhevm, useEncryption } from '@fhevm/sdk';

function App() {
  const { client, isInitialized } = useFhevm({
    provider,
    contractAddress: '0x...',
    chainId: 11155111
  });

  const { encryptValue } = useEncryption(client);

  const handleEncrypt = async () => {
    const result = await encryptValue(42, EncryptedType.UINT32);
    console.log('Encrypted:', result);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

## Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # Universal FHEVM SDK
│       ├── src/
│       │   ├── core/           # Core functionality
│       │   ├── hooks/          # React hooks
│       │   └── utils/          # Utilities
│       └── README.md
├── examples/
│   ├── nextjs-demo/            # Next.js integration example
│   ├── react-demo/             # React integration example
│   ├── healthcare-app/         # Full healthcare dApp example
│   └── nodejs-demo/            # Node.js backend example
├── docs/                       # Documentation
├── package.json                # Monorepo configuration
└── README.md                   # This file
```

## SDK Features

### Core Functions

#### Client Management

```typescript
// Create and initialize client
const client = createFhevmClient(config);
await client.init();

// Check initialization status
if (client.isInitialized()) {
  // Ready to use
}
```

#### Encryption

```typescript
// Encrypt single value
const result = await encrypt(client, 42, EncryptedType.UINT32);

// Encrypt multiple values
const results = await encryptBatch(
  client,
  [42, 100, 255],
  [EncryptedType.UINT32, EncryptedType.UINT32, EncryptedType.UINT8]
);

// Convenience functions
await encryptUint8(client, 255);
await encryptUint32(client, 1000000);
await encryptBool(client, true);
```

#### Decryption

```typescript
// Decrypt single value
const value = await decrypt(client, {
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: '0x...'
});

// Decrypt multiple values
const values = await decryptBatch(client, requests);
```

### React Hooks

#### `useFhevm(config)`

Initialize and manage FHEVM client.

```tsx
const {
  client,
  isInitialized,
  isLoading,
  error
} = useFhevm(config);
```

#### `useEncryption(client)`

Encrypt values easily.

```tsx
const {
  encryptValue,
  encryptValues,
  isEncrypting,
  error
} = useEncryption(client);
```

#### `useDecryption(client)`

Decrypt values with permission.

```tsx
const {
  decryptValue,
  decryptValues,
  isDecrypting,
  error
} = useDecryption(client);
```

#### `useContract(client, address, abi, provider)`

Interact with contracts.

```tsx
const {
  write,
  read,
  isLoading,
  error
} = useContract(client, address, abi, provider);
```

### Utility Functions

```typescript
// Provider management
const provider = await getProvider();
const accounts = await requestAccounts();
const account = await getCurrentAccount();
const chainId = await getChainId();

// Network switching
await switchNetwork(11155111); // Sepolia

// Formatting
const formatted = formatAddress('0x1234...5678');

// Validation
const isValid = isValidAddress('0x...');

// Retry logic
await retry(() => someOperation(), 3, 1000);
```

## Supported Networks

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

## Encrypted Types

- **euint8**: 8-bit unsigned integer (0-255)
- **euint16**: 16-bit unsigned integer (0-65535)
- **euint32**: 32-bit unsigned integer (0-4294967295)
- **euint64**: 64-bit unsigned integer
- **euint128**: 128-bit unsigned integer
- **euint256**: 256-bit unsigned integer
- **ebool**: Boolean (encrypted)
- **eaddress**: Ethereum address (encrypted)

## Examples

### Example 1: Next.js Demo

Interactive demo showcasing SDK integration with Next.js.

**Location**: `examples/nextjs-demo/`

**Features**:
- Wallet connection
- FHEVM initialization
- Value encryption
- Real-time status updates
- Responsive UI with Tailwind CSS

**Run**:
```bash
npm run dev:next
```

### Example 2: Healthcare Records dApp

Full-featured healthcare dApp with encrypted medical records.

**Location**: `examples/healthcare-app/`

**Features**:
- Smart contract with encrypted data
- Role-based access control
- Patient and therapist interfaces
- Encrypted rehabilitation records
- Fine-grained permissions

**Run**:
```bash
npm run dev:healthcare
```

### Example 3: React Demo

Coming soon - React integration example.

### Example 4: Node.js Backend

Coming soon - Server-side FHEVM integration.

## Development

### Install Dependencies

```bash
npm install
```

### Build SDK

```bash
npm run build:sdk
```

### Run Tests

```bash
npm run test:sdk
```

### Lint Code

```bash
npm run lint
```

### Clean

```bash
npm run clean
```

## Documentation

- [SDK Documentation](./packages/fhevm-sdk/README.md)
- [Next.js Demo Guide](./examples/nextjs-demo/README.md)
- [Healthcare App Guide](./examples/healthcare-app/README.md)
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Zama Website](https://www.zama.ai/)

## Use Cases

### Healthcare

- Private medical records
- Encrypted patient data
- Secure health metrics
- HIPAA-compliant blockchain storage

### Finance

- Private transaction amounts
- Encrypted balances
- Confidential trading
- Privacy-preserving DeFi

### Voting

- Secret ballot systems
- Anonymous voting
- Encrypted vote counts
- Transparent yet private elections

### Supply Chain

- Confidential pricing
- Private inventory levels
- Encrypted shipment data
- Competitive advantage protection

### Gaming

- Hidden game state
- Private player stats
- Encrypted loot boxes
- Fair randomness

## Why FHEVM?

### Traditional Blockchain

❌ All data is public
❌ No on-chain privacy
❌ Off-chain solutions are complex
❌ Trust assumptions required

### With FHEVM

✅ Data encrypted on-chain
✅ Compute on encrypted data
✅ No off-chain coordination
✅ Trustless privacy

## Comparison

### FHEVM SDK vs Others

| Feature | FHEVM SDK | Traditional | ZK Solutions |
|---------|-----------|-------------|--------------|
| On-chain Privacy | ✅ Yes | ❌ No | ⚠️ Partial |
| Compute on Encrypted Data | ✅ Yes | ❌ No | ❌ No |
| No Trusted Setup | ✅ Yes | ✅ Yes | ❌ No |
| Easy Integration | ✅ Yes | ✅ Yes | ⚠️ Complex |
| Framework Agnostic | ✅ Yes | ⚠️ Varies | ⚠️ Varies |
| Wagmi-like API | ✅ Yes | ❌ No | ❌ No |

## Performance

### Gas Estimates

| Operation | Gas Cost |
|-----------|----------|
| Encrypt uint8 | ~50,000 |
| Encrypt uint32 | ~70,000 |
| Decrypt | ~100,000 |
| Comparison | ~80,000 |
| Arithmetic | ~70,000 |

### Optimization Tips

1. **Batch Operations**: Group multiple encryptions
2. **Use Appropriate Types**: Choose smallest type needed
3. **Cache Results**: Store decrypted values locally
4. **Minimize On-chain Calls**: Reduce transaction frequency

## Troubleshooting

### Common Issues

#### MetaMask Not Detected

- Install MetaMask browser extension
- Refresh page after installation

#### Wrong Network

- Switch to Sepolia testnet
- Chain ID: 11155111

#### Initialization Failed

- Check contract address is correct
- Verify you have testnet ETH
- Check console for detailed errors

#### Encryption Failed

- Ensure client is initialized
- Verify input values are valid
- Check value is within type bounds

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security

This is experimental software. Use at your own risk.

For security issues, please email: security@example.com

## License

MIT License - see LICENSE file for details

## Acknowledgments

Built with:
- [Zama FHEVM](https://www.zama.ai/) - Fully Homomorphic Encryption
- [fhevmjs](https://github.com/zama-ai/fhevmjs) - JavaScript library
- [Ethers.js](https://ethers.org/) - Ethereum library
- [React](https://react.dev/) - UI framework
- [Next.js](https://nextjs.org/) - React framework

## Contact

- Documentation: [docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- Discord: [Zama Discord](https://discord.gg/zama)
- Twitter: [@zama_fhe](https://twitter.com/zama_fhe)

---

**Made with ❤️ for the FHEVM community**

*Privacy is not optional, it's a fundamental right.*
