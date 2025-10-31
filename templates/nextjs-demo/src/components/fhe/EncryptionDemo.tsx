'use client';

import { FC, useState } from 'react';
import { useFhevm, useEncryption, EncryptedType } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface EncryptionDemoProps {
  client?: any;
}

export const EncryptionDemo: FC<EncryptionDemoProps> = ({ client }) => {
  const [inputValue, setInputValue] = useState('42');
  const [encryptedResult, setEncryptedResult] = useState<string>('');
  const [selectedType, setSelectedType] = useState<EncryptedType>(EncryptedType.UINT32);

  const { encryptValue, isEncrypting } = useEncryption(client);

  const handleEncrypt = async () => {
    if (!client) {
      alert('FHE client not initialized');
      return;
    }

    try {
      const value = parseInt(inputValue);
      if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
      }

      const result = await encryptValue(value, selectedType);

      if (result) {
        const hexData = Array.from(result.data)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        setEncryptedResult(`0x${hexData.substring(0, 64)}...`);
      }
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Encryption failed. Check console for details.');
    }
  };

  return (
    <Card title="Encryption Demo" subtitle="Encrypt values using FHE">
      <div className="space-y-4">
        <Input
          type="number"
          label="Value to encrypt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          helperText="Enter any integer value to encrypt"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Encryption Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(Number(e.target.value) as EncryptedType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={EncryptedType.UINT8}>UINT8 (0-255)</option>
            <option value={EncryptedType.UINT16}>UINT16 (0-65535)</option>
            <option value={EncryptedType.UINT32}>UINT32 (0-4294967295)</option>
            <option value={EncryptedType.UINT64}>UINT64</option>
          </select>
        </div>

        <Button
          onClick={handleEncrypt}
          isLoading={isEncrypting}
          disabled={!client || isEncrypting}
          className="w-full"
        >
          🔒 Encrypt Value
        </Button>

        {encryptedResult && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Encrypted Result:
            </p>
            <p className="text-sm text-gray-900 font-mono break-all">
              {encryptedResult}
            </p>
            <p className="text-xs text-green-600 mt-2">
              ✅ Successfully encrypted using FHE
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
