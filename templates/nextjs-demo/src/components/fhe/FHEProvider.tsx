'use client';

import { FC, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmClient, EncryptedType } from '@fhevm/sdk';

interface FHEContextType {
  client: FhevmClient | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  provider: BrowserProvider | null;
  setProvider: (provider: BrowserProvider | null) => void;
}

const FHEContext = createContext<FHEContextType>({
  client: null,
  isInitialized: false,
  isLoading: false,
  error: null,
  provider: null,
  setProvider: () => {},
});

export const useFHEContext = () => useContext(FHEContext);

interface FHEProviderProps {
  children: ReactNode;
  contractAddress?: string;
  chainId?: number;
}

export const FHEProvider: FC<FHEProviderProps> = ({
  children,
  contractAddress = '0x0000000000000000000000000000000000000000',
  chainId = 11155111,
}) => {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!provider) {
      setClient(null);
      setIsInitialized(false);
      return;
    }

    const initClient = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // This would be replaced with actual SDK initialization
        // const fhevmClient = await createFhevmClient({
        //   provider,
        //   contractAddress,
        //   chainId,
        // });
        // setClient(fhevmClient);
        setIsInitialized(true);
      } catch (err: any) {
        console.error('Failed to initialize FHE client:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    initClient();
  }, [provider, contractAddress, chainId]);

  return (
    <FHEContext.Provider
      value={{
        client,
        isInitialized,
        isLoading,
        error,
        provider,
        setProvider,
      }}
    >
      {children}
    </FHEContext.Provider>
  );
};
