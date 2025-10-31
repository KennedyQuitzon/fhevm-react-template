'use client';

import { FC, useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface KeyManagerProps {
  client?: any;
  contractAddress?: string;
}

export const KeyManager: FC<KeyManagerProps> = ({ client, contractAddress }) => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [keyStatus, setKeyStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  const fetchPublicKey = async () => {
    if (!contractAddress) {
      alert('Contract address not set');
      return;
    }

    setKeyStatus('loading');
    try {
      const response = await fetch(`/api/keys?contractAddress=${contractAddress}`);
      const data = await response.json();

      if (data.success) {
        setPublicKey(JSON.stringify(data.publicKey.key, null, 2));
        setKeyStatus('loaded');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch public key:', error);
      setKeyStatus('error');
    }
  };

  const generateNewKey = async () => {
    if (!contractAddress) {
      alert('Contract address not set');
      return;
    }

    setKeyStatus('loading');
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          contractAddress,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('New key generated successfully');
        await fetchPublicKey();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to generate key:', error);
      setKeyStatus('error');
    }
  };

  return (
    <Card title="Key Management" subtitle="Manage FHE encryption keys">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={fetchPublicKey}
            isLoading={keyStatus === 'loading'}
            disabled={!contractAddress}
            className="flex-1"
            variant="outline"
          >
            🔑 Fetch Public Key
          </Button>
          <Button
            onClick={generateNewKey}
            isLoading={keyStatus === 'loading'}
            disabled={!contractAddress}
            className="flex-1"
            variant="secondary"
          >
            🔄 Generate New Key
          </Button>
        </div>

        {keyStatus === 'loaded' && publicKey && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Public Key:
            </p>
            <pre className="text-xs text-gray-900 font-mono overflow-x-auto">
              {publicKey}
            </pre>
          </div>
        )}

        {keyStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              ❌ Failed to load public key
            </p>
          </div>
        )}

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            ⚠️ <strong>Note:</strong> Public keys are used for encrypting data.
            Private keys remain secure on-chain and are never exposed.
          </p>
        </div>
      </div>
    </Card>
  );
};
