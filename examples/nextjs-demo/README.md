# Next.js FHEVM Demo

A comprehensive Next.js example demonstrating integration with the FHEVM SDK for privacy-preserving decentralized applications.

## Overview

This example showcases how to integrate the FHEVM SDK into a Next.js application using the App Router. It demonstrates encryption, decryption, and homomorphic computation on encrypted data.

## Features

- 🔐 **FHE Encryption**: Encrypt values using Fully Homomorphic Encryption
- 🔓 **Secure Decryption**: Decrypt encrypted data with permission checks
- ⚡ **Homomorphic Computation**: Perform calculations on encrypted data
- 🔑 **Key Management**: Manage FHE public keys
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔌 **Wallet Integration**: MetaMask support
- 🧩 **Reusable Components**: Modular component architecture
- 🪝 **Custom Hooks**: React hooks for FHE operations
- 📝 **TypeScript**: Full type safety throughout

## Setup

### 1. Install Dependencies

From the root of the monorepo:

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev:next
```

Or from this directory:

```bash
npm run dev
```

### 3. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### 1. Connect Wallet

Click the "Connect Wallet" button to connect your MetaMask wallet.

Make sure you're on the Sepolia testnet.

### 2. Wait for Initialization

The FHEVM client will automatically initialize when you connect your wallet.

Wait for the status to show "✅ Ready".

### 3. Encrypt a Value

- Enter a number (0-4294967295) in the input field
- Click "🔒 Encrypt Value"
- The encrypted data will be displayed below

## Project Structure

```
nextjs-demo/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main page
│   │   ├── globals.css             # Global styles
│   │   └── api/                    # API routes
│   │       ├── fhe/
│   │       │   ├── route.ts             # FHE operations
│   │       │   ├── encrypt/route.ts     # Encryption API
│   │       │   ├── decrypt/route.ts     # Decryption API
│   │       │   └── compute/route.ts     # Computation API
│   │       └── keys/route.ts            # Key management API
│   │
│   ├── components/                 # React components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx          # Button component
│   │   │   ├── Input.tsx           # Input component
│   │   │   └── Card.tsx            # Card component
│   │   └── fhe/                    # FHE components
│   │       ├── FHEProvider.tsx     # FHE context provider
│   │       ├── EncryptionDemo.tsx  # Encryption demo
│   │       ├── ComputationDemo.tsx # Computation demo
│   │       └── KeyManager.tsx      # Key management
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── fhe/                    # FHE integration
│   │   │   ├── client.ts           # Client-side FHE operations
│   │   │   ├── server.ts           # Server-side FHE operations
│   │   │   ├── keys.ts             # Key management
│   │   │   └── types.ts            # Type definitions
│   │   └── utils/                  # Utilities
│   │       ├── security.ts         # Security helpers
│   │       └── validation.ts       # Validation helpers
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useFHE.ts               # FHE client hook
│   │   ├── useEncryption.ts        # Encryption hook
│   │   └── useComputation.ts       # Computation hook
│   │
│   └── types/                      # TypeScript types
│       ├── fhe.ts                  # FHE-related types
│       └── api.ts                  # API types
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
└── README.md                       # This file
```

## Key Integration Points

### 1. FHEVM Client Hook

```tsx
const { client, isInitialized, isLoading } = useFhevm({
  provider,
  contractAddress: '0x...',
  chainId: 11155111
});
```

### 2. Encryption Hook

```tsx
const { encryptValue, isEncrypting } = useEncryption(client);
const result = await encryptValue(42, EncryptedType.UINT32);
```

### 3. Decryption Hook

```tsx
const { decryptValue, isDecrypting } = useDecryption(client);
const value = await decryptValue(contractAddress, handle, userAddress);
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=11155111
```

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Troubleshooting

### MetaMask Not Detected

- Make sure MetaMask is installed
- Refresh the page after installing MetaMask

### Wrong Network

- Switch to Sepolia testnet in MetaMask
- Network ID: 11155111

### Initialization Failed

- Check console for detailed error messages
- Verify contract address is correct
- Ensure you have Sepolia ETH for gas fees

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## License

MIT
