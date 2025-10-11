# Demo Video Script

Script for creating the demo.mp4 video showcasing the FHEVM SDK and React template.

## Duration: 3-5 minutes

---

## 1. Introduction (30 seconds)

**Visual**: Show title screen with project logo

**Narration**:
> "Welcome to the FHEVM React Template - a universal SDK for building privacy-preserving dApps with Fully Homomorphic Encryption on Ethereum."

**Visual**: Quick overview animation showing:
- Framework logos (React, Next.js, Vue, Node.js)
- Encryption icon
- Blockchain icon

---

## 2. Problem Statement (30 seconds)

**Visual**: Split screen showing traditional blockchain vs FHEVM

**Narration**:
> "Traditional blockchain applications have a major problem - all data is public. With FHEVM, you can compute on encrypted data directly on-chain, maintaining privacy without sacrificing decentralization."

**Visual**: Show diagram:
```
Traditional:        FHEVM:
❌ Public data     ✅ Encrypted data
❌ No privacy      ✅ On-chain privacy
❌ Off-chain fixes ✅ Native solution
```

---

## 3. Quick Start Demo (45 seconds)

**Visual**: VS Code screen with code

**Narration**:
> "Getting started is incredibly easy. In less than 10 lines of code, you can encrypt data on-chain."

**Visual**: Type out the code:

```typescript
import { createFhevmClient, encrypt } from '@fhevm/sdk';

const provider = new BrowserProvider(window.ethereum);

const client = createFhevmClient({
  provider,
  contractAddress: '0x...',
  chainId: 11155111
});

await client.init();
const encrypted = await encrypt(client, 42, EncryptedType.UINT32);
```

**Narration**:
> "That's it! Your data is now encrypted on-chain."

---

## 4. React Integration (45 seconds)

**Visual**: VS Code with React component

**Narration**:
> "The SDK includes React hooks with a wagmi-like API, making integration familiar for web3 developers."

**Visual**: Show component:

```tsx
function App() {
  const { client } = useFhevm({
    provider,
    contractAddress: '0x...',
    chainId: 11155111
  });

  const { encryptValue } = useEncryption(client);

  const handleEncrypt = async () => {
    const result = await encryptValue(42, EncryptedType.UINT32);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

---

## 5. Next.js Demo Walkthrough (60 seconds)

**Visual**: Browser showing Next.js demo app

**Narration**:
> "Let's see it in action. Here's our Next.js demo application."

**Actions**:
1. Click "Connect Wallet" button
2. MetaMask pops up - approve connection
3. Show FHEVM initialization status
4. Enter a number in the input field
5. Click "Encrypt Value" button
6. Show encryption progress
7. Display encrypted result

**Narration**:
> "As you can see, the SDK handles wallet connection, FHEVM initialization, and encryption seamlessly."

---

## 6. Healthcare App Example (60 seconds)

**Visual**: Browser showing healthcare app

**Narration**:
> "Here's a real-world example - a healthcare records application where all sensitive medical data is encrypted on-chain."

**Visual**: Show interface with:
- Patient registration
- Encrypted rehabilitation records
- Access control

**Actions**:
1. Connect as therapist
2. Create a new record with:
   - Exercise intensity: 75
   - Pain level: 3
   - Mobility score: 80
3. Show encryption happening
4. Display record created with encrypted data

**Narration**:
> "Exercise intensity, pain levels, and mobility scores are all encrypted. Only authorized participants can decrypt this data."

---

## 7. Key Features Overview (30 seconds)

**Visual**: Animated list showing features

**Narration**:
> "The FHEVM SDK provides:"

**Visual**: Show each feature with icon:
- ⚡ Framework agnostic - works with React, Vue, Next.js, Node.js
- 🎯 Wagmi-like API for familiar developer experience
- 🔐 End-to-end encryption for on-chain data
- 📦 Complete TypeScript support
- 🚀 React hooks for easy integration
- 💪 Production-ready examples

---

## 8. Architecture Diagram (30 seconds)

**Visual**: Show architecture flowchart

```
┌─────────────────────────────────────┐
│        Your Application             │
│   (React/Next.js/Vue/Node.js)       │
└──────────────┬──────────────────────┘
               │
       ┌───────▼────────┐
       │  FHEVM SDK     │
       │  - Encryption  │
       │  - Decryption  │
       │  - Hooks       │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │   fhevmjs      │
       │ (Zama Library) │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │  Ethereum      │
       │  (FHEVM)       │
       └────────────────┘
```

---

## 9. Code Structure (20 seconds)

**Visual**: File tree animation

```
fhevm-react-template/
├── packages/fhevm-sdk/     ← Universal SDK
├── examples/
│   ├── nextjs-demo/        ← Next.js example
│   ├── react-demo/         ← React example
│   └── healthcare-app/     ← Full dApp
└── docs/                   ← Documentation
```

**Narration**:
> "The project is organized as a monorepo with the SDK and multiple examples, making it easy to get started."

---

## 10. Benefits Summary (20 seconds)

**Visual**: Split screen comparison table

| Traditional | FHEVM SDK |
|-------------|-----------|
| Public data | Encrypted |
| No privacy | Full privacy |
| Off-chain workarounds | On-chain native |
| Complex setup | Simple API |

---

## 11. Use Cases (20 seconds)

**Visual**: Icons for each use case

**Narration**:
> "Perfect for:"

- 🏥 Healthcare - private medical records
- 💰 Finance - confidential transactions
- 🗳️ Voting - secret ballots
- 📦 Supply chain - private pricing
- 🎮 Gaming - hidden game state

---

## 12. Call to Action (20 seconds)

**Visual**: Show GitHub repository page

**Narration**:
> "Ready to build privacy-preserving dApps? Get started today!"

**Visual**: Show URLs:
- GitHub: github.com/your-repo
- Documentation: docs.zama.ai/fhevm
- Discord: discord.gg/zama

**Visual**: Show installation command:
```bash
npm install @fhevm/sdk
```

---

## 13. Closing (10 seconds)

**Visual**: Logo animation with tagline

**Narration**:
> "FHEVM React Template - Privacy is not optional, it's a fundamental right."

**Visual**: Fade to black with social links

---

## Recording Tips

### Tools
- Screen recording: OBS Studio or Loom
- Video editing: DaVinci Resolve or Adobe Premiere
- Narration: Audacity for audio recording
- Animations: After Effects or Blender

### Settings
- Resolution: 1920x1080 (1080p)
- Frame rate: 60 FPS
- Format: MP4 (H.264 codec)
- Audio: 192kbps, 48kHz

### Best Practices
1. Use smooth transitions between sections
2. Keep cursor movements deliberate and slow
3. Highlight important code sections
4. Use consistent color scheme throughout
5. Add background music (subtle, non-distracting)
6. Include captions for accessibility
7. Test on multiple devices before publishing

### Sections to Emphasize
- Less than 10 lines of code to get started
- Wagmi-like API (familiar to web3 devs)
- Framework agnostic (works everywhere)
- Real-world healthcare example
- Easy integration with React hooks

---

## Alternative: Quick Demo (1 minute)

For a shorter version, focus on:

1. Problem (10s): Traditional blockchains are public
2. Solution (10s): FHEVM encrypts data on-chain
3. Quick Start (20s): Show 10-line code example
4. Live Demo (15s): Encrypt a value in the Next.js app
5. CTA (5s): Get started at [URL]
