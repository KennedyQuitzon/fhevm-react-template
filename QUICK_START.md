# Quick Start Guide

Get started with FHEVM SDK in under 5 minutes.

## 1. Installation

```bash
npm install @fhevm/sdk fhevmjs ethers
```

## 2. Basic Setup

```typescript
import { createFhevmClient, encrypt } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Create provider
const provider = new BrowserProvider(window.ethereum);

// Create client
const client = createFhevmClient({
  provider,
  contractAddress: '0xYourContractAddress',
  chainId: 11155111
});

// Initialize
await client.init();
```

## 3. Encrypt Data

```typescript
import { EncryptedType } from '@fhevm/sdk';

// Encrypt a number
const encrypted = await encrypt(client, 42, EncryptedType.UINT32);
console.log('Encrypted:', encrypted);
```

## 4. Use with React

```tsx
import { useFhevm, useEncryption } from '@fhevm/sdk';

function App() {
  const { client } = useFhevm({
    provider,
    contractAddress: '0xYourContractAddress',
    chainId: 11155111
  });

  const { encryptValue } = useEncryption(client);

  const encrypt = async () => {
    const result = await encryptValue(42, EncryptedType.UINT32);
    console.log(result);
  };

  return <button onClick={encrypt}>Encrypt</button>;
}
```

## 5. That's It!

You're ready to build privacy-preserving dApps!

## Next Steps

- Explore the [Next.js demo](./examples/nextjs-demo/)
- Check out the [Healthcare app example](./examples/healthcare-app/)
- Read the [full documentation](./packages/fhevm-sdk/README.md)
- Learn about [FHEVM](https://docs.zama.ai/fhevm)

## Common Patterns

### Connect Wallet

```typescript
import { requestAccounts, getProvider } from '@fhevm/sdk';

const provider = await getProvider();
const accounts = await requestAccounts();
console.log('Connected:', accounts[0]);
```

### Encrypt Multiple Values

```typescript
import { encryptBatch, EncryptedType } from '@fhevm/sdk';

const results = await encryptBatch(
  client,
  [42, 100, 255],
  [
    EncryptedType.UINT32,
    EncryptedType.UINT32,
    EncryptedType.UINT8
  ]
);
```

### Decrypt with Permission

```typescript
import { decrypt } from '@fhevm/sdk';

const value = await decrypt(client, {
  contractAddress: '0x...',
  handle: '0x...', // From contract event or storage
  userAddress: account
});
```

### Contract Interaction

```typescript
import { useContract } from '@fhevm/sdk';

const { write, read } = useContract(
  client,
  contractAddress,
  contractABI,
  provider
);

// Call contract function
const result = await write('functionName', [arg1, arg2]);
```

## Supported Types

```typescript
EncryptedType.UINT8    // 0-255
EncryptedType.UINT16   // 0-65535
EncryptedType.UINT32   // 0-4294967295
EncryptedType.UINT64   // Large numbers
EncryptedType.BOOL     // true/false
```

## Configuration

### Sepolia Testnet

```typescript
{
  chainId: 11155111,
  aclAddress: '0x8Fb33A0B4dCEE9510a843fe01b0DB5Cd66E72b2E'
}
```

### Local Development

```typescript
{
  chainId: 8008135,
  aclAddress: '0x0000000000000000000000000000000000000000'
}
```

## Troubleshooting

### Provider Not Found

```typescript
if (!window.ethereum) {
  alert('Please install MetaMask!');
}
```

### Wrong Network

```typescript
import { switchNetwork } from '@fhevm/sdk';

await switchNetwork(11155111); // Switch to Sepolia
```

### Initialization Failed

```typescript
try {
  await client.init();
} catch (error) {
  console.error('Init failed:', error);
}
```

## Resources

- [SDK Documentation](./packages/fhevm-sdk/README.md)
- [Examples](./examples/)
- [FHEVM Docs](https://docs.zama.ai/fhevm)
- [Zama](https://www.zama.ai/)

---

Need help? Open an issue or ask in the Zama Discord!
