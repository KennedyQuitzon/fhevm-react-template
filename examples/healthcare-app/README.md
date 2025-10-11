# Healthcare Records dApp with FHEVM

Privacy-preserving rehabilitation records management system using Fully Homomorphic Encryption.

## Overview

This application demonstrates how to build a healthcare dApp that keeps sensitive medical data encrypted on-chain using FHEVM. All rehabilitation records including exercise intensity, pain levels, and mobility scores are encrypted and can only be accessed by authorized participants.

## Features

- **🔐 End-to-End Encryption**: All sensitive medical data is encrypted on-chain
- **👨‍⚕️ Role-Based Access**: Therapists, patients, and administrators have different permissions
- **📊 Progress Tracking**: Track rehabilitation progress over time while maintaining privacy
- **🔒 Secure Sharing**: Grant access to specific records for consultations
- **⚡ FHEVM SDK Integration**: Easy-to-use encryption and decryption functions

## Smart Contract

### Key Functions

#### Owner Functions
- `authorizeTherapist(address, licenseNumber)`: Authorize a therapist
- `registerPatient(address, assignedTherapist)`: Register a patient
- `revokeTherapistAuthorization(address)`: Revoke therapist access

#### Therapist Functions
- `createRecord(patient, intensity, pain, mobility, type, duration)`: Create encrypted record
- `updateRecord(recordId, ...)`: Update existing record
- `grantRecordAccess(recordId, address)`: Share record with another provider

#### Patient Functions
- `getPatientRecords(address)`: Get list of their record IDs
- `getRecordMetadata(recordId)`: Get non-sensitive metadata

### Encrypted Data Fields

All sensitive medical data is encrypted using FHEVM:

- `exerciseIntensity`: euint32 (0-100 scale)
- `painLevel`: euint32 (0-10 scale)
- `mobilityScore`: euint32 (0-100 scale)
- `exerciseType`: euint8 (exercise category)
- `sessionDuration`: euint32 (minutes)

### Access Control

The contract implements fine-grained access control:

- **Owner**: Can authorize therapists and register patients
- **Therapists**: Can create and update records for their assigned patients
- **Patients**: Can view their own records and metadata
- **Record Participants**: Both patient and therapist can access the encrypted data

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY
PRIVATE_KEY=your_private_key_without_0x_prefix
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Deploy to Sepolia

```bash
npm run deploy
```

### 5. Start Frontend

Open `index.html` in a browser or use a local server:

```bash
npx serve .
```

## Usage

### As Contract Owner

1. Deploy the contract
2. Authorize therapists:
   ```solidity
   authorizeTherapist(therapistAddress, "LICENSE-12345")
   ```
3. Register patients:
   ```solidity
   registerPatient(patientAddress, assignedTherapist)
   ```

### As Therapist

1. Connect wallet
2. Create encrypted rehabilitation records for assigned patients
3. Update records as treatment progresses
4. Grant access to other providers if needed for consultations

### As Patient

1. Connect wallet
2. View list of your rehabilitation records
3. Access encrypted data (requires decryption permission)
4. Track your progress over time

## Integration with FHEVM SDK

This example demonstrates how to integrate the FHEVM SDK with a real-world application:

```javascript
import { createFhevmClient, encrypt, decrypt } from '@fhevm/sdk';

// 1. Initialize client
const client = createFhevmClient({
  provider,
  contractAddress: HEALTHCARE_CONTRACT_ADDRESS,
  chainId: 11155111
});

await client.init();

// 2. Encrypt medical data
const encryptedIntensity = await encrypt(client, 75, EncryptedType.UINT32);
const encryptedPain = await encrypt(client, 3, EncryptedType.UINT32);
const encryptedMobility = await encrypt(client, 80, EncryptedType.UINT32);

// 3. Create record on-chain
await contract.createRecord(
  patientAddress,
  75,  // Values are encrypted in the contract
  3,
  80,
  1,
  45
);

// 4. Decrypt data (requires permission)
const intensity = await decrypt(client, {
  contractAddress,
  handle: recordHandle,
  userAddress: account
});
```

## Security Features

### Data Privacy

- ✅ All sensitive medical data is encrypted on-chain
- ✅ Only authorized participants can decrypt data
- ✅ Access control enforced at contract level
- ✅ Fine-grained permission system

### Access Control

- ✅ Role-based permissions (Owner, Therapist, Patient)
- ✅ Record-level access control
- ✅ Emergency authorization revocation
- ✅ Audit trail via events

### Best Practices

- ✅ Input validation on all parameters
- ✅ Checks-effects-interactions pattern
- ✅ No unbounded loops
- ✅ Comprehensive event logging

## Testing

Run the test suite:

```bash
npm test
```

Test coverage:

```bash
npm run coverage
```

## Project Structure

```
healthcare-app/
├── contracts/
│   └── PrivateRehabRecords.sol    # Main smart contract
├── scripts/
│   └── deploy.js                   # Deployment script
├── index.html                      # Frontend UI
├── package.json
└── README.md
```

## Privacy Model

### What's Encrypted (Private)

- Exercise intensity levels
- Pain level measurements
- Mobility scores
- Exercise type categories
- Session duration data

### What's Public

- Record existence
- Timestamp
- Patient address
- Therapist address
- Record active status

### Who Can Decrypt

- **Patient**: Can decrypt all their own record data
- **Assigned Therapist**: Can decrypt data for their assigned patients
- **Consulting Providers**: Can decrypt if explicitly granted access
- **Contract Owner**: Has administrative access but not automatic decryption rights

## Gas Costs

Approximate gas costs for main operations:

| Operation | Gas Cost |
|-----------|----------|
| Authorize Therapist | ~50,000 |
| Register Patient | ~60,000 |
| Create Record | ~150,000 |
| Update Record | ~80,000 |
| Grant Access | ~50,000 |

## Future Enhancements

- [ ] Add record versioning
- [ ] Implement record templates
- [ ] Add multi-signature authorization
- [ ] Create mobile app interface
- [ ] Integrate with IPFS for additional data
- [ ] Add analytics dashboard (privacy-preserving)

## License

MIT

## Resources

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [Hardhat Documentation](https://hardhat.org/docs)
