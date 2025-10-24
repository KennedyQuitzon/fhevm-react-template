# Installation Guide

Complete guide for installing and setting up the FHEVM React Template.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **Git** (for cloning the repository)

### Optional

- **MetaMask** browser extension (for testing)
- **VS Code** or your preferred code editor

## Verify Prerequisites

```bash
# Check Node.js version
node --version
# Should output: v18.0.0 or higher

# Check npm version
npm --version
# Should output: 9.0.0 or higher

# Check Git
git --version
```

## Installation Methods

### Method 1: Clone from GitHub (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/KennedyQuitzon/fhevm-react-template.git

# 2. Navigate to the directory
cd fhevm-react-template

# 3. Install dependencies
npm install

# 4. Build the SDK
npm run build:sdk
```

### Method 2: Install SDK as npm Package

If you just want to use the SDK in your existing project:

```bash
# Install the SDK (when published)
npm install @fhevm/sdk fhevmjs ethers

# Or use from local workspace
npm install
```

## Project Structure After Installation

```
fhevm-react-template/
├── node_modules/           # Dependencies
├── packages/
│   └── fhevm-sdk/         # SDK source code
│       ├── dist/          # Built SDK (after npm run build:sdk)
│       └── src/           # Source files
├── examples/
│   ├── nextjs-demo/       # Next.js example
│   └── healthcare-app/    # Healthcare example
└── docs/                  # Documentation
```

## Verify Installation

### Test 1: Build SDK

```bash
npm run build:sdk
```

Expected output: SDK builds successfully without errors.

### Test 2: Run Tests (if available)

```bash
npm run test:sdk
```

### Test 3: Start Next.js Demo

```bash
npm run dev:next
```

Expected: Next.js development server starts successfully.

## Environment Setup

### 1. Create Environment File

```bash
# Copy example environment file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` file:

```env
# Network Configuration
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_here

# Optional
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 3. Get Sepolia Testnet ETH

For testing, you'll need Sepolia testnet ETH:

- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Infura Faucet](https://www.infura.io/faucet/sepolia)

## IDE Setup

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Common Installation Issues

### Issue 1: Node Version Too Old

**Error**: `The engine "node" is incompatible with this module`

**Solution**:
```bash
# Install nvm (Node Version Manager)
# Then install Node 18 or higher
nvm install 18
nvm use 18
```

### Issue 2: npm Install Fails

**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Option 1: Use sudo (not recommended)
sudo npm install

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue 3: Build Fails

**Error**: `Cannot find module`

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build:sdk
```

### Issue 4: Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Option 1: Use different port
PORT=3001 npm run dev:next

# Option 2: Kill process using port
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Post-Installation Steps

### 1. Verify SDK Build

```bash
# Check if SDK was built
ls packages/fhevm-sdk/dist

# Should see:
# - index.js
# - index.d.ts
# - (other files)
```

### 2. Install MetaMask

1. Install [MetaMask browser extension](https://metamask.io/)
2. Create or import wallet
3. Switch to Sepolia testnet
4. Get test ETH from faucet

### 3. Run Examples

```bash
# Terminal 1: Next.js demo
npm run dev:next
# Open http://localhost:3000

# Terminal 2: Healthcare app
npm run dev:healthcare
# Open according to output
```

## Updating

To update to the latest version:

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
npm install

# Rebuild SDK
npm run build:sdk
```

## Uninstallation

To completely remove the project:

```bash
# Remove project directory
cd ..
rm -rf fhevm-react-template

# Clean npm cache (optional)
npm cache clean --force
```

## Next Steps

After successful installation:

1. Read the [Quick Start Guide](../QUICK_START.md)
2. Explore the [SDK Overview](./sdk-overview.md)
3. Try the [Next.js Demo](../examples/nextjs-demo/)
4. Build your [First dApp](./guides/first-dapp.md)

## Getting Help

If you encounter issues:

1. Check [Troubleshooting Guide](./troubleshooting.md)
2. Search [GitHub Issues](https://github.com/KennedyQuitzon/fhevm-react-template/issues)
3. Ask in [GitHub Discussions](https://github.com/KennedyQuitzon/fhevm-react-template/discussions)
4. Join [Zama Discord](https://discord.gg/zama)

---

**Congratulations!** You've successfully installed the FHEVM React Template. 🎉
