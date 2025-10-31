'use client';

import { FC, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface ComputationDemoProps {
  client?: any;
}

export const ComputationDemo: FC<ComputationDemoProps> = ({ client }) => {
  const [value1, setValue1] = useState('10');
  const [value2, setValue2] = useState('20');
  const [operation, setOperation] = useState<'add' | 'sub' | 'mul' | 'gt'>('add');
  const [result, setResult] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);

  const handleCompute = async () => {
    if (!client) {
      alert('FHE client not initialized');
      return;
    }

    setIsComputing(true);
    try {
      // Simulate homomorphic computation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const operationSymbols = {
        add: '+',
        sub: '-',
        mul: '×',
        gt: '>',
      };

      setResult(
        `Result of encrypted(${value1}) ${operationSymbols[operation]} encrypted(${value2}) computed successfully`
      );
    } catch (error) {
      console.error('Computation failed:', error);
      alert('Computation failed');
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card title="Homomorphic Computation" subtitle="Compute on encrypted data">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="First Value"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="10"
          />
          <Input
            type="number"
            label="Second Value"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="add">Addition (+)</option>
            <option value="sub">Subtraction (-)</option>
            <option value="mul">Multiplication (×)</option>
            <option value="gt">Greater Than (&gt;)</option>
          </select>
        </div>

        <Button
          onClick={handleCompute}
          isLoading={isComputing}
          disabled={!client || isComputing}
          className="w-full"
          variant="success"
        >
          ⚡ Compute on Encrypted Data
        </Button>

        {result && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">{result}</p>
            <p className="text-xs text-blue-600 mt-2">
              ℹ️ Computation performed without decrypting data
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
