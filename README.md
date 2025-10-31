# FHEVM React Template

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/KennedyQuitzon/fhevm-react-template)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://fhe-rehab-records.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Universal SDK and React template** for building **privacy-preserving dApps** with **Fully Homomorphic Encryption (FHE)** on Ethereum.

🔗 **[GitHub Repository](https://github.com/KennedyQuitzon/fhevm-react-template)** | 🌐 **[Live Demo](https://fhe-rehab-records.vercel.app/)** | 📺 **Demo Video: demo.mp4** (Download to view) | 📖 **[Documentation](./docs/)**

---

## 🎯 Overview

This project provides a comprehensive toolkit for developers to build privacy-preserving decentralized applications using **Zama's FHEVM** (Fully Homomorphic Encryption Virtual Machine). It includes a **framework-agnostic SDK** with a **wagmi-like API structure**, making it familiar and easy to use for web3 developers.

**Key Innovation**: Build privacy-first dApps with less than 10 lines of code.

---

## ✨ Features

### 🎯 Framework Agnostic Core

- Works with **React, Next.js, Vue, Node.js**, and vanilla JavaScript
- No framework lock-in - use what you prefer
- Modular architecture for maximum flexibility

### ⚡ Developer-Friendly API

- **Wagmi-like structure** familiar to web3 developers
- React hooks for easy integration
- TypeScript support with full type definitions
- Comprehensive error handling

### 🔐 Privacy First

- End-to-end encryption for on-chain data
- Fully Homomorphic Encryption (FHE) support
- Fine-grained access control
- Secure decryption with permission management

### 📦 Complete Examples

- **Next.js integration demo** (Required example)
- **Healthcare records dApp** (Full production example)
- React demo (coming soon)
- Node.js backend example (coming soon)

---

## 🚀 Quick Start

### Installation

From the root of the monorepo:

```bash
# Clone the repository
git clone https://github.com/KennedyQuitzon/fhevm-react-template.git
cd fhevm-react-template

# Install all dependencies
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

# Start Private Rehab Records app
npm run dev:rehab
```

### Compile Smart Contracts

```bash
npm run compile:contracts
```

---

## 💻 Usage

### Basic Setup (< 10 lines of code)

```typescript
import { createFhevmClient, encrypt } from '@fhevm/sdk';
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

// Done! Your data is now encrypted on-chain.
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

---

## 📁 Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # Universal FHEVM SDK
│       ├── src/
│       │   ├── core/           # Core functionality
│       │   ├── hooks/          # React hooks
│       │   └── utils/          # Utilities
│       └── README.md
├── examples/                   # Example applications
│   ├── nextjs-demo/            # Next.js integration example ✅
│   ├── PrivateRehabRecords/    # Full healthcare dApp example ✅
│   ├── react-demo/             # React integration (planned)
│   └── nodejs-demo/            # Node.js backend (planned)
├── templates/                  # Symlink to examples/
├── docs/                       # Documentation
│   ├── README.md               # Docs overview
│   ├── installation.md         # Installation guide
│   ├── architecture.md         # Architecture details
│   └── fhe-basics.md           # FHE fundamentals
├── package.json                # Monorepo configuration
├── QUICK_START.md              # Quick start guide
├── DEMO_SCRIPT.md              # Demo script
└── README.md                   # This file
```

---

## 🔧 SDK Features

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

---

## 🌐 Supported Networks

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

---

## 🔐 Encrypted Types

- **euint8**: 8-bit unsigned integer (0-255)
- **euint16**: 16-bit unsigned integer (0-65535)
- **euint32**: 32-bit unsigned integer (0-4294967295)
- **euint64**: 64-bit unsigned integer
- **euint128**: 128-bit unsigned integer
- **euint256**: 256-bit unsigned integer
- **ebool**: Boolean (encrypted)
- **eaddress**: Ethereum address (encrypted)

---

## 📦 Examples

### Example 1: Next.js Demo (Required)

Interactive demo showcasing SDK integration with Next.js.

**Location**: `examples/nextjs-demo/` (also accessible via `templates/nextjs-demo/`)

**Features**:
- Wallet connection (MetaMask)
- FHEVM client initialization
- Value encryption demo
- Real-time status updates
- Responsive UI with Tailwind CSS
- TypeScript throughout
- Complete FHE operations API
- Reusable UI components
- Custom React hooks for FHE
- Comprehensive type definitions

**Structure**:
```
nextjs-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   ├── globals.css         # Global styles
│   │   └── api/                # API routes
│   │       ├── fhe/
│   │       │   ├── route.ts         # General FHE operations
│   │       │   ├── encrypt/route.ts # Encryption API
│   │       │   ├── decrypt/route.ts # Decryption API
│   │       │   └── compute/route.ts # Computation API
│   │       └── keys/route.ts        # Key management
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   └── fhe/                # FHE components
│   │       ├── FHEProvider.tsx
│   │       ├── EncryptionDemo.tsx
│   │       ├── ComputationDemo.tsx
│   │       └── KeyManager.tsx
│   ├── lib/                    # Utility libraries
│   │   ├── fhe/                # FHE integration
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── keys.ts
│   │   │   └── types.ts
│   │   └── utils/              # Utilities
│   │       ├── security.ts
│   │       └── validation.ts
│   ├── hooks/                  # Custom hooks
│   │   ├── useFHE.ts
│   │   ├── useEncryption.ts
│   │   └── useComputation.ts
│   └── types/                  # Type definitions
│       ├── fhe.ts
│       └── api.ts
```

**Run**:
```bash
npm run dev:next
```

**Learn More**: [Next.js Demo Guide](./examples/nextjs-demo/README.md)

---

### Example 2: Private Rehabilitation Records dApp (Full Example)

Full-featured rehabilitation records dApp with encrypted medical data built with React and Vite.

**Live Demo**: [https://fhe-rehab-records.vercel.app/](https://fhe-rehab-records.vercel.app/)

**Location**: `examples/PrivateRehabRecords/`

**Features**:
- Smart contract with FHE encryption
- Role-based access control (Owner, Therapist, Patient)
- Encrypted rehabilitation records
- Patient and therapist interfaces
- Fine-grained permission system
- Deployed on Sepolia testnet

**Run**:
```bash
npm run dev:rehab
```

**Learn More**: [Private Rehab Records Guide](./examples/PrivateRehabRecords/README.md)

---

### Example 3: React Demo

Coming soon - React integration example with SDK.

### Example 4: Node.js Backend

Coming soon - Server-side FHEVM integration.

---

## 🎥 Video Demonstration

**📺 Demo Video**: `demo.mp4` (included in repository)

**Important**: The demo video file must be **downloaded to your local machine** to view. Direct browser links to local files are not supported.

**Demo showcases**:
- 🔐 Quick setup (< 10 lines of code)
- ⚡ FHEVM client initialization
- 🔒 Value encryption with FHE
- 👨‍⚕️ Healthcare app example
- 📊 React hooks integration
- 🎯 Wagmi-like API usage

---

## 🛠️ Development

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

---

## 📖 Documentation

### Core Documentation
- 📘 **[SDK Documentation](./packages/fhevm-sdk/README.md)** - Complete SDK API reference
- 🚀 **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes
- 📖 **[Documentation](./docs/)** - Comprehensive guides

### Example Guides
- 🎯 **[Next.js Demo Guide](./examples/nextjs-demo/README.md)** - Next.js integration
- 🏥 **[Private Rehab Records Guide](./examples/PrivateRehabRecords/README.md)** - Full dApp example

### External Resources
- 🔗 **[Zama FHEVM Documentation](https://docs.zama.ai/fhevm)** - Official FHEVM docs
- 🔗 **[Zama Website](https://www.zama.ai/)** - Learn about FHE technology

---

## 💡 Use Cases

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

---

## 🔍 Why FHEVM?

### Traditional Blockchain vs FHEVM

| Feature | Traditional Blockchain | FHEVM |
|---------|----------------------|-------|
| Data Privacy | ❌ All data is public | ✅ Data encrypted on-chain |
| On-chain Computation | ✅ Yes, but public | ✅ Yes, on encrypted data |
| Off-chain Solutions | ⚠️ Complex | ✅ Not needed |
| Trust Assumptions | ⚠️ Required for privacy | ✅ Trustless privacy |

### FHEVM SDK vs Other Solutions

| Feature | FHEVM SDK | Traditional | ZK Solutions |
|---------|-----------|-------------|--------------|
| On-chain Privacy | ✅ Yes | ❌ No | ⚠️ Partial |
| Compute on Encrypted Data | ✅ Yes | ❌ No | ❌ No |
| No Trusted Setup | ✅ Yes | ✅ Yes | ❌ No |
| Easy Integration | ✅ Yes | ✅ Yes | ⚠️ Complex |
| Framework Agnostic | ✅ Yes | ⚠️ Varies | ⚠️ Varies |
| Wagmi-like API | ✅ Yes | ❌ No | ❌ No |

---

## 📊 Performance

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

---

## 🐛 Troubleshooting

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

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- ✅ Write tests for new features
- ✅ Follow TypeScript best practices
- ✅ Update documentation
- ✅ Use conventional commits

---

## 🔒 Security

This is experimental software. Use at your own risk.

**Best Practices**:
- Never expose private keys
- Test thoroughly on testnet
- Audit smart contracts before mainnet
- Use hardware wallets for production

For security issues, please open a GitHub issue.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 FHEVM Community

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🏆 Acknowledgments

### Built With
- 🎯 **[Zama FHEVM](https://www.zama.ai/)** - Fully Homomorphic Encryption technology
- 📚 **[fhevmjs](https://github.com/zama-ai/fhevmjs)** - JavaScript FHE library
- 🔗 **[Ethers.js](https://ethers.org/)** - Ethereum library
- ⚛️ **[React](https://react.dev/)** - UI framework
- ⚡ **[Next.js](https://nextjs.org/)** - React framework

### Special Thanks
- Zama team for pioneering FHE on blockchain
- Ethereum community for development tools
- Open source contributors

---

## 🌐 Links

- 🔗 **GitHub**: [https://github.com/KennedyQuitzon/fhevm-react-template](https://github.com/KennedyQuitzon/fhevm-react-template)
- 🌐 **Live Demo**: [https://fhe-rehab-records.vercel.app/](https://fhe-rehab-records.vercel.app/)
- 📖 **Documentation**: [docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- 💬 **Discord**: [Zama Discord](https://discord.gg/zama)
- 🐦 **Twitter**: [@zama_fhe](https://twitter.com/zama_fhe)

---

## 📞 Support

### Get Help
- 📧 **Issues**: [GitHub Issues](https://github.com/KennedyQuitzon/fhevm-react-template/issues)
- 📖 **Documentation**: [./docs/](./docs/)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/KennedyQuitzon/fhevm-react-template/discussions)

---

<div align="center">

**Made with ❤️ for the FHEVM community**

*Privacy is not optional, it's a fundamental right.*

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/KennedyQuitzon/fhevm-react-template) • [![Live Demo](https://img.shields.io/badge/demo-live-success)](https://fhe-rehab-records.vercel.app/)

</div>
