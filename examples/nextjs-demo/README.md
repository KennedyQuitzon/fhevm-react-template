# Next.js FHEVM SDK Demo

Interactive demonstration of FHEVM SDK integration with Next.js.

## Features

- Wallet connection (MetaMask)
- FHEVM client initialization
- Value encryption with FHE
- Real-time status updates
- Responsive UI with Tailwind CSS
- TypeScript support

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

## Code Structure

```
nextjs-demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main demo page
│   │   └── globals.css      # Global styles
│   └── components/          # Reusable components (if any)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
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
