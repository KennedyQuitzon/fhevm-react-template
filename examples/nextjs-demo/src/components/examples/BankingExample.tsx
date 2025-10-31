'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

/**
 * Banking Example Component
 * Demonstrates private financial operations using FHE
 */
export function BankingExample() {
  const [balance, setBalance] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleEncryptBalance = async () => {
    if (!balance) return;

    setIsProcessing(true);
    setResult('');

    try {
      // Simulate encryption process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult(`Balance $${balance} encrypted successfully. Operations can now be performed on encrypted data.`);
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrivateTransfer = async () => {
    if (!amount) return;

    setIsProcessing(true);
    setResult('');

    try {
      // Simulate private transfer
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResult(`Private transfer of $${amount} completed. Transaction amount remains encrypted on-chain.`);
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🏦 Private Banking
          </h2>
          <p className="text-gray-600">
            Perform confidential financial operations with encrypted balances and transaction amounts.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-2">
              Account Balance ($)
            </label>
            <Input
              id="balance"
              type="number"
              placeholder="Enter balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <Button
            onClick={handleEncryptBalance}
            disabled={!balance || isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Encrypting...' : '🔒 Encrypt Balance'}
          </Button>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Transfer Amount ($)
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <Button
            onClick={handlePrivateTransfer}
            disabled={!amount || isProcessing}
            variant="secondary"
            className="w-full"
          >
            {isProcessing ? 'Processing...' : '💸 Private Transfer'}
          </Button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.includes('Error')
              ? 'bg-red-50 text-red-800'
              : 'bg-green-50 text-green-800'
          }`}>
            <p className="text-sm">{result}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Use Case</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Private transaction amounts</li>
            <li>• Encrypted account balances</li>
            <li>• Confidential trading</li>
            <li>• Privacy-preserving DeFi protocols</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
