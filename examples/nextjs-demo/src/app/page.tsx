'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import {
  useFhevm,
  useEncryption,
  useDecryption,
  EncryptedType,
  getProvider,
  requestAccounts,
  formatAddress,
} from '@fhevm/sdk';

export default function Home() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  // FHEVM SDK hooks
  const { client, isInitialized, isLoading, error } = useFhevm({
    provider: provider!,
    contractAddress: '0x0000000000000000000000000000000000000000', // Placeholder
    chainId: 11155111, // Sepolia
  });

  const { encryptValue, isEncrypting } = useEncryption(client);
  const { decryptValue, isDecrypting } = useDecryption(client);

  // State for demo
  const [inputValue, setInputValue] = useState('42');
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [decryptedValue, setDecryptedValue] = useState<string>('');

  // Connect wallet
  const connectWallet = async () => {
    try {
      const web3Provider = await getProvider();
      if (!web3Provider) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await requestAccounts();
      setProvider(web3Provider);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet');
    }
  };

  // Encrypt value
  const handleEncrypt = async () => {
    if (!client || !isInitialized) {
      alert('FHEVM client not initialized');
      return;
    }

    try {
      const value = parseInt(inputValue);
      const result = await encryptValue(value, EncryptedType.UINT32);

      if (result) {
        const hexData = Array.from(result.data)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        setEncryptedData(`0x${hexData.substring(0, 40)}...`);
        alert('Value encrypted successfully!');
      }
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Encryption failed');
    }
  };

  // Handle account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setIsConnected(false);
          setAccount('');
        }
      });
    }
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FHEVM SDK Demo
          </h1>
          <p className="text-xl text-gray-600">
            Privacy-preserving encryption on Ethereum with Next.js
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Wallet Connection
          </h2>

          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-gray-700 font-medium">Connected:</span>
                <span className="text-gray-900 font-mono">
                  {formatAddress(account)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-gray-700 font-medium">Network:</span>
                <span className="text-gray-900">Sepolia Testnet</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-medium">FHEVM Status:</span>
                <span
                  className={`font-semibold ${
                    isInitialized ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {isLoading
                    ? 'Initializing...'
                    : isInitialized
                    ? '✅ Ready'
                    : '⏳ Pending'}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">❌ Error: {error.message}</p>
            </div>
          )}
        </div>

        {/* Encryption Demo */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Encryption Demo
          </h2>

          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Enter a number to encrypt (0-4294967295):
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="42"
                disabled={!isConnected || !isInitialized}
              />
            </div>

            {/* Encrypt Button */}
            <button
              onClick={handleEncrypt}
              disabled={!isConnected || !isInitialized || isEncrypting}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isEncrypting ? '🔄 Encrypting...' : '🔒 Encrypt Value'}
            </button>

            {/* Result */}
            {encryptedData && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 font-medium mb-2">
                  Encrypted Data (preview):
                </p>
                <p className="text-sm text-gray-900 font-mono break-all">
                  {encryptedData}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  ✅ Value encrypted successfully using FHEVM
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Privacy First
            </h3>
            <p className="text-gray-600">
              Encrypt sensitive data on-chain using Fully Homomorphic Encryption
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy Integration
            </h3>
            <p className="text-gray-600">
              Wagmi-like API structure for familiar web3 developer experience
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Framework Agnostic
            </h3>
            <p className="text-gray-600">
              Works with React, Next.js, Vue, Node.js, and more
            </p>
          </div>
        </div>

        {/* Quick Start Code */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Start Code</h2>
          <pre className="text-sm overflow-x-auto">
            <code>{`// 1. Install dependencies
npm install @fhevm/sdk ethers fhevmjs

// 2. Initialize client
const { client } = useFhevm({
  provider,
  contractAddress: '0x...',
  chainId: 11155111
});

// 3. Encrypt a value
const { encryptValue } = useEncryption(client);
const result = await encryptValue(42, EncryptedType.UINT32);

// Done! Your data is now encrypted on-chain.`}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>
            Built with ❤️ using{' '}
            <a
              href="https://www.zama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Zama FHEVM
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
