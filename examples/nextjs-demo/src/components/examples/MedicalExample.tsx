'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

/**
 * Medical Example Component
 * Demonstrates private healthcare data management using FHE
 */
export function MedicalExample() {
  const [patientId, setPatientId] = useState<string>('');
  const [vitalSign, setVitalSign] = useState<string>('');
  const [vitalType, setVitalType] = useState<string>('heart-rate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleEncryptVitals = async () => {
    if (!patientId || !vitalSign) return;

    setIsProcessing(true);
    setResult('');

    try {
      // Simulate encryption process
      await new Promise(resolve => setTimeout(resolve, 1000));

      const vitalTypeName = vitalType === 'heart-rate' ? 'Heart Rate' :
                           vitalType === 'blood-pressure' ? 'Blood Pressure' :
                           vitalType === 'temperature' ? 'Temperature' : 'Vital Sign';

      setResult(`${vitalTypeName} for patient ${patientId} encrypted successfully. Data is now private on-chain.`);
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewRecord = async () => {
    if (!patientId) return;

    setIsProcessing(true);
    setResult('');

    try {
      // Simulate permission check and decryption
      await new Promise(resolve => setTimeout(resolve, 1200));
      setResult(`Medical records for patient ${patientId} retrieved. Access logged and auditable.`);
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
            🏥 Private Healthcare Records
          </h2>
          <p className="text-gray-600">
            Securely manage patient data with encrypted medical records on blockchain.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
              Patient ID
            </label>
            <Input
              id="patientId"
              type="text"
              placeholder="Enter patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <div>
            <label htmlFor="vitalType" className="block text-sm font-medium text-gray-700 mb-2">
              Vital Sign Type
            </label>
            <select
              id="vitalType"
              value={vitalType}
              onChange={(e) => setVitalType(e.target.value)}
              disabled={isProcessing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="heart-rate">Heart Rate (bpm)</option>
              <option value="blood-pressure">Blood Pressure (mmHg)</option>
              <option value="temperature">Temperature (°F)</option>
              <option value="oxygen-level">Oxygen Level (%)</option>
            </select>
          </div>

          <div>
            <label htmlFor="vitalSign" className="block text-sm font-medium text-gray-700 mb-2">
              Vital Sign Value
            </label>
            <Input
              id="vitalSign"
              type="number"
              placeholder="Enter value"
              value={vitalSign}
              onChange={(e) => setVitalSign(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <Button
            onClick={handleEncryptVitals}
            disabled={!patientId || !vitalSign || isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Encrypting...' : '🔒 Encrypt & Store Vitals'}
          </Button>
        </div>

        <div className="border-t pt-4">
          <Button
            onClick={handleViewRecord}
            disabled={!patientId || isProcessing}
            variant="secondary"
            className="w-full"
          >
            {isProcessing ? 'Loading...' : '📋 View Patient Record'}
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
            <li>• HIPAA-compliant blockchain storage</li>
            <li>• Encrypted patient vital signs</li>
            <li>• Private medical records</li>
            <li>• Secure health data sharing</li>
            <li>• Auditable access logs</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
