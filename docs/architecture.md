# Architecture Overview

Comprehensive overview of the FHEVM React Template architecture and design patterns.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  (React, Next.js, Vue, Node.js, Vanilla JavaScript)             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                     FHEVM SDK (@fhevm/sdk)                       │
├─────────────────────────────────────────────────────────────────┤
│  ├── Core                                                        │
│  │   ├── FhevmClient (Client Management)                        │
│  │   ├── Encryption (encrypt, encryptBatch)                     │
│  │   ├── Decryption (decrypt, decryptBatch)                     │
│  │   └── Types (TypeScript Definitions)                         │
│  ├── Hooks (React Integration)                                  │
│  │   ├── useFhevm                                               │
│  │   ├── useEncryption                                          │
│  │   ├── useDecryption                                          │
│  │   └── useContract                                            │
│  └── Utils (Helper Functions)                                   │
│      ├── Provider Management                                    │
│      ├── Network Switching                                      │
│      └── Formatting & Validation                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                     fhevmjs (Zama Library)                       │
│            Low-level FHE Operations                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Ethereum + FHEVM                                │
│         Smart Contracts with FHE Support                         │
└─────────────────────────────────────────────────────────────────┘
```

## Monorepo Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # Universal SDK Package
│       ├── src/
│       │   ├── core/           # Core functionality
│       │   ├── hooks/          # React hooks
│       │   ├── utils/          # Utilities
│       │   └── index.ts        # Main export
│       ├── dist/               # Built files
│       ├── package.json
│       └── tsconfig.json
│
├── examples/
│   ├── nextjs-demo/            # Next.js Example
│   │   ├── src/app/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   └── healthcare-app/         # Healthcare Example
│       ├── contracts/
│       ├── scripts/
│       ├── index.html
│       └── package.json
│
├── docs/                       # Documentation
│   ├── README.md
│   ├── installation.md
│   └── architecture.md (this file)
│
├── package.json                # Root package.json (monorepo)
├── QUICK_START.md
└── README.md
```

## SDK Architecture

### Core Module

**Purpose**: Provides framework-agnostic FHE operations.

```typescript
// core/client.ts
export class FhevmClient {
  private instance: FhevmInstance | null;
  private config: FhevmClientConfig;

  async init(): Promise<void>
  getInstance(): FhevmInstance
  isInitialized(): boolean
  updateConfig(config): void
}

// core/encryption.ts
export async function encrypt(client, value, type): Promise<EncryptionResult>
export async function encryptBatch(client, values, types): Promise<EncryptionResult[]>

// core/decryption.ts
export async function decrypt(client, request): Promise<number | boolean | string>
export async function decryptBatch(client, requests): Promise<Array>
```

### Hooks Module

**Purpose**: React-specific integration layer.

```typescript
// hooks/useFhevm.ts
export function useFhevm(config) {
  return {
    client: FhevmClient,
    isInitialized: boolean,
    isLoading: boolean,
    error: Error | null
  }
}

// hooks/useEncryption.ts
export function useEncryption(client) {
  return {
    encryptValue: (value, type) => Promise<EncryptionResult>,
    isEncrypting: boolean,
    error: Error | null
  }
}
```

### Utils Module

**Purpose**: Helper functions and utilities.

```typescript
// utils/helpers.ts
export async function getProvider(): Promise<BrowserProvider>
export async function requestAccounts(): Promise<string[]>
export function formatAddress(address): string
export async function retry<T>(fn, maxRetries, delayMs): Promise<T>
```

## Data Flow

### Encryption Flow

```
User Input (Plaintext)
        ↓
Application Layer
        ↓
SDK: encrypt(client, value, type)
        ↓
fhevmjs: FHE.asEuint32(value)
        ↓
Encrypted Data (ciphertext)
        ↓
Smart Contract Storage
        ↓
Blockchain (Encrypted on-chain)
```

### Decryption Flow

```
Blockchain (Encrypted data)
        ↓
Smart Contract: FHE.allow(data, user)
        ↓
SDK: decrypt(client, request)
        ↓
fhevmjs: Generate EIP-712 signature
        ↓
Gateway: Verify permission
        ↓
Decrypted Value
        ↓
Application Display
```

## Design Patterns

### 1. Client Initialization Pattern

```typescript
// Singleton-like pattern for client
const client = createFhevmClient(config);
await client.init();

// Client can be reused across components
setGlobalClient(client);
```

### 2. Hook Pattern (React)

```typescript
// Encapsulate FHE logic in hooks
function MyComponent() {
  const { client } = useFhevm(config);
  const { encryptValue } = useEncryption(client);

  // Use in component
}
```

### 3. Factory Pattern

```typescript
// Create clients with different configurations
export function createFhevmClient(config) {
  return new FhevmClient(config);
}
```

### 4. Error Handling Pattern

```typescript
// Consistent error handling across SDK
try {
  const result = await encrypt(client, value, type);
} catch (error) {
  // Error automatically wrapped with context
  console.error('Encryption failed:', error.message);
}
```

## Module Dependencies

```
Application
    ↓
@fhevm/sdk
    ├── ethers (^6.9.0)
    ├── fhevmjs (^0.5.0)
    └── react (optional, for hooks)
```

## Network Layer

### Supported Networks

```typescript
const NETWORKS = {
  SEPOLIA: {
    chainId: 11155111,
    aclAddress: '0x8Fb33A0B4dCEE9510a843fe01b0DB5Cd66E72b2E'
  },
  LOCAL_FHENIX: {
    chainId: 8008135,
    aclAddress: '0x0000000000000000000000000000000000000000'
  }
}
```

### Network Communication

```
Application
    ↓
Ethers.js Provider
    ↓
RPC Endpoint (Alchemy/Infura)
    ↓
Ethereum Network (Sepolia)
    ↓
FHEVM-enabled Smart Contract
```

## State Management

### Client State

```typescript
interface ClientState {
  instance: FhevmInstance | null;
  isInitialized: boolean;
  config: FhevmClientConfig;
}
```

### React State (Hooks)

```typescript
// useFhevm manages:
- client instance
- initialization status
- loading state
- error state

// useEncryption manages:
- encryption operation state
- loading state
- error state
```

## Security Architecture

### Access Control

```
User Authentication
    ↓
Wallet Signature (MetaMask)
    ↓
FHE Permission System (FHE.allow)
    ↓
Encrypted Data Access
```

### Permission Model

```typescript
// Contract-level permissions
FHE.allow(encryptedData, authorizedAddress);
FHE.allowThis(encryptedData); // Contract access

// SDK validates permissions before decryption
const hasPermission = await hasDecryptionPermission(
  client,
  contractAddress,
  handle,
  userAddress
);
```

## Performance Considerations

### Optimization Strategies

1. **Lazy Initialization**
   - Client initialized only when needed
   - Reduces initial load time

2. **Batch Operations**
   - Multiple values encrypted/decrypted together
   - Reduces gas costs

3. **Caching**
   - Decrypted values cached locally
   - Minimizes redundant operations

4. **Async Operations**
   - All FHE operations are async
   - Non-blocking UI

## Extension Points

### Custom Networks

```typescript
// Add custom network configuration
const customNetwork = {
  chainId: 123456,
  name: 'Custom Network',
  aclAddress: '0x...'
};

const client = createFhevmClient({
  provider,
  chainId: customNetwork.chainId,
  aclAddress: customNetwork.aclAddress
});
```

### Custom Hooks

```typescript
// Create custom hooks for specific use cases
function useHealthcareEncryption() {
  const { client } = useFhevm(config);
  const { encryptValue } = useEncryption(client);

  const encryptMedicalRecord = async (data) => {
    // Custom logic
  };

  return { encryptMedicalRecord };
}
```

## Testing Architecture

```
Unit Tests
    ├── Core Module Tests
    ├── Hook Tests
    └── Utils Tests

Integration Tests
    ├── SDK + fhevmjs Integration
    └── SDK + Smart Contract Integration

E2E Tests
    ├── Next.js Example
    └── Healthcare App Example
```

## Build Process

```bash
# TypeScript Compilation
tsc → JavaScript + Type Definitions

# Output Structure
dist/
├── index.js          # Main entry
├── index.d.ts        # Type definitions
├── core/             # Core modules
├── hooks/            # React hooks
└── utils/            # Utilities
```

## Deployment Architecture

```
Development
    ↓
Local Testing (Hardhat Network)
    ↓
Testnet Deployment (Sepolia)
    ↓
Frontend Deployment (Vercel)
    ↓
Production (Mainnet - future)
```

## Monitoring & Debugging

### Debug Mode

```typescript
// Enable debug logging
const client = createFhevmClient({
  ...config,
  debug: true
});
```

### Error Tracking

```typescript
// Errors include context
try {
  await encrypt(client, value, type);
} catch (error) {
  // Error includes:
  // - Operation type
  // - Input values
  // - Client state
  // - Stack trace
}
```

## Future Architecture

### Planned Enhancements

1. **Multi-chain Support**
   - Support for multiple blockchains
   - Cross-chain FHE operations

2. **Advanced Caching**
   - IndexedDB for persistent cache
   - Service Worker integration

3. **Plugin System**
   - Extensible architecture
   - Community plugins

4. **Performance Monitoring**
   - Built-in analytics
   - Gas usage tracking

---

**Last Updated**: 2024-10-29

**Version**: 1.0.0
