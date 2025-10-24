# FHE Basics

Introduction to Fully Homomorphic Encryption and how it works in the FHEVM ecosystem.

## What is FHE?

**Fully Homomorphic Encryption (FHE)** is a form of encryption that allows computations to be performed directly on encrypted data without decrypting it first.

### Traditional Encryption vs FHE

#### Traditional Encryption

```
Plaintext → Encrypt → Ciphertext → Decrypt → Plaintext → Compute → Result
                         ↓
                  Cannot compute!
```

#### Fully Homomorphic Encryption

```
Plaintext → Encrypt → Ciphertext → Compute on Ciphertext → Encrypted Result
                                              ↓
                                    Decrypt → Final Result
```

**Key Difference**: With FHE, you can perform operations on encrypted data!

## How FHE Works

### Basic Concept

Imagine you have a locked box with a special property:
- You can put a number inside and lock it
- While locked, you can still perform math operations on the number
- When you unlock it, you get the correct result

```
[5] → Lock → [🔒5] → Add [🔒3] → [🔒8] → Unlock → [8]
                           ↓
                  Computed while encrypted!
```

### FHE in Blockchain

On traditional blockchains, all data is public. With FHEVM:

```
Traditional Blockchain:
User → Smart Contract → Public Storage → Everyone can see!
       [Balance: 100 ETH]

FHEVM Blockchain:
User → Smart Contract → Encrypted Storage → Only authorized users can decrypt
       [🔒 encrypted balance]
```

## FHEVM Explained

**FHEVM (Fully Homomorphic Encryption Virtual Machine)** is Zama's implementation of FHE for Ethereum.

### Key Features

1. **On-chain Privacy**
   - Data encrypted on the blockchain
   - Computation without decryption

2. **Trustless**
   - No trusted third parties
   - Cryptographically secure

3. **Ethereum Compatible**
   - Works with existing Ethereum tools
   - Solidity smart contracts

4. **Selective Disclosure**
   - Control who can decrypt data
   - Fine-grained permissions

## Encrypted Types

FHEVM provides encrypted versions of standard types:

### Integer Types

```solidity
// Standard Solidity
uint8 age = 25;          // Public
uint32 balance = 1000;   // Public

// FHEVM
euint8 age = FHE.asEuint8(25);      // Encrypted
euint32 balance = FHE.asEuint32(1000); // Encrypted
```

### Boolean Type

```solidity
// Standard Solidity
bool isActive = true;    // Public

// FHEVM
ebool isActive = FHE.asEbool(true);  // Encrypted
```

### Supported Types

| Type | Description | Range |
|------|-------------|-------|
| `euint8` | 8-bit encrypted integer | 0-255 |
| `euint16` | 16-bit encrypted integer | 0-65535 |
| `euint32` | 32-bit encrypted integer | 0-4294967295 |
| `euint64` | 64-bit encrypted integer | Large numbers |
| `euint128` | 128-bit encrypted integer | Very large numbers |
| `euint256` | 256-bit encrypted integer | Maximum range |
| `ebool` | Encrypted boolean | true/false |

## FHE Operations

### Encryption

Converting plaintext to ciphertext:

```typescript
// JavaScript/TypeScript (SDK)
import { encrypt, EncryptedType } from '@fhevm/sdk';

const encrypted = await encrypt(client, 42, EncryptedType.UINT32);

// Solidity (Smart Contract)
euint32 encrypted = FHE.asEuint32(42);
```

### Decryption

Converting ciphertext back to plaintext (with permission):

```typescript
// JavaScript/TypeScript (SDK)
const decrypted = await decrypt(client, {
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: '0x...'
});

// Note: Decryption requires permission!
```

### Homomorphic Operations

Operations on encrypted data:

```solidity
// Addition
euint32 a = FHE.asEuint32(10);
euint32 b = FHE.asEuint32(20);
euint32 sum = FHE.add(a, b);  // Encrypted 30

// Comparison
ebool isGreater = FHE.gt(a, b);  // Encrypted false

// Multiplication
euint32 product = FHE.mul(a, b);  // Encrypted 200
```

## Access Control

### Permission System

FHE includes a built-in permission system:

```solidity
// Grant permission to decrypt
FHE.allow(encryptedData, userAddress);

// Grant permission to contract
FHE.allowThis(encryptedData);

// Check permission
bool hasAccess = FHE.isAllowed(encryptedData, userAddress);
```

### Permission Flow

```
1. Data encrypted and stored on-chain
        ↓
2. Owner grants permission: FHE.allow(data, user)
        ↓
3. User requests decryption
        ↓
4. System verifies permission
        ↓
5. If authorized, data decrypted
        ↓
6. User receives plaintext
```

## Use Cases

### Healthcare

```solidity
// Store encrypted medical records
struct MedicalRecord {
    euint32 bloodPressure;  // Private
    euint32 heartRate;      // Private
    address patient;        // Public (pseudonymous)
}

// Only patient and doctor can decrypt
FHE.allow(record.bloodPressure, patientAddress);
FHE.allow(record.bloodPressure, doctorAddress);
```

### Finance

```solidity
// Private balances
mapping(address => euint64) private balances;

// Private transactions
function transfer(address to, uint64 amount) {
    euint64 encryptedAmount = FHE.asEuint64(amount);
    balances[msg.sender] = FHE.sub(balances[msg.sender], encryptedAmount);
    balances[to] = FHE.add(balances[to], encryptedAmount);
}
```

### Voting

```solidity
// Secret ballot
struct Vote {
    ebool choice;  // Encrypted vote
    address voter; // Public voter ID
}

// Votes remain secret until reveal
mapping(address => Vote) public votes;
```

## Advantages of FHE

### Privacy

✅ **Complete Privacy**: Data never exposed in plaintext on-chain
✅ **Zero-Knowledge**: Computation without seeing raw data
✅ **Selective Disclosure**: Control who can decrypt

### Security

✅ **Cryptographically Secure**: Based on lattice cryptography
✅ **No Trusted Setup**: Unlike some ZK systems
✅ **Quantum Resistant**: Secure against quantum computers

### Functionality

✅ **Rich Operations**: Addition, multiplication, comparison, etc.
✅ **Composability**: Combine encrypted operations
✅ **Smart Contract Compatible**: Works with Solidity

## Limitations

### Performance

⚠️ **Gas Costs**: FHE operations are more expensive than regular operations
⚠️ **Computation Time**: Slower than plaintext operations

### Complexity

⚠️ **Learning Curve**: New concepts to learn
⚠️ **Development**: Requires understanding of encryption

### Maturity

⚠️ **New Technology**: Still evolving
⚠️ **Limited Tooling**: Growing ecosystem

## Gas Costs

Approximate gas costs for FHE operations:

| Operation | Gas Cost |
|-----------|----------|
| Encrypt uint8 | ~50,000 |
| Encrypt uint32 | ~70,000 |
| FHE Addition | ~70,000 |
| FHE Multiplication | ~150,000 |
| FHE Comparison | ~80,000 |
| Decrypt | ~100,000 |

*Note: Costs vary by operation and network*

## Best Practices

### When to Use FHE

✅ **Use FHE when**:
- Privacy is critical
- Need to compute on sensitive data
- Want on-chain privacy
- Regulatory compliance required

❌ **Don't use FHE when**:
- Data can be public
- Performance is critical
- Simple applications
- Gas costs are prohibitive

### Optimization Tips

1. **Use smallest type**: `euint8` cheaper than `euint256`
2. **Batch operations**: Multiple operations in one transaction
3. **Cache results**: Store computed values
4. **Minimize decryption**: Decrypt only when necessary

## Example: Private Counter

### Smart Contract

```solidity
contract PrivateCounter {
    euint32 private count;
    address public owner;

    constructor() {
        owner = msg.sender;
        count = FHE.asEuint32(0);
        FHE.allowThis(count);
    }

    function increment() public {
        euint32 one = FHE.asEuint32(1);
        count = FHE.add(count, one);
        FHE.allowThis(count);
    }

    function getCount(address user) public view returns (uint32) {
        require(user == owner, "Not authorized");
        // Decryption happens off-chain with permission
        return 0; // Placeholder
    }
}
```

### Frontend

```typescript
import { encrypt, decrypt } from '@fhevm/sdk';

// Increment (encrypted)
await contract.increment();

// Get count (requires permission)
const encrypted = await contract.count();
const decrypted = await decrypt(client, {
  contractAddress,
  handle: encrypted,
  userAddress: myAddress
});
```

## Learning Path

1. **Understand basics** (this document)
2. **Try examples** (Next.js demo, Healthcare app)
3. **Read SDK docs** ([SDK Overview](./sdk-overview.md))
4. **Build a simple dApp** ([First dApp Guide](./guides/first-dapp.md))
5. **Explore advanced topics** ([Advanced Guides](./advanced/))

## Resources

### Official Documentation
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm) - Official documentation
- [fhevmjs GitHub](https://github.com/zama-ai/fhevmjs) - JavaScript library

### Academic Papers
- [FHE: A Survey](https://eprint.iacr.org/2021/1402) - Comprehensive overview
- [Zama Whitepaper](https://www.zama.ai/whitepaper) - Technical details

### Community
- [Zama Discord](https://discord.gg/zama) - Community support
- [GitHub Discussions](https://github.com/zama-ai/fhevm/discussions) - Q&A

## FAQ

### Q: Is FHE the same as Zero-Knowledge Proofs?

**A**: No. ZK proofs verify computations without revealing inputs. FHE allows computation on encrypted data. They solve different problems.

### Q: Can I decrypt any encrypted value?

**A**: No. You can only decrypt values you have permission for, granted by the contract or data owner.

### Q: Is FHE quantum-resistant?

**A**: Yes. FHE is based on lattice cryptography, which is considered quantum-resistant.

### Q: How much slower is FHE?

**A**: FHE operations are significantly slower than plaintext operations, but performance is improving.

### Q: Can I use FHE on Ethereum mainnet?

**A**: Currently, FHEVM is available on testnets. Mainnet support is planned.

---

**Next Steps**:
- Read [SDK Overview](./sdk-overview.md)
- Try [Quick Start](../QUICK_START.md)
- Build [First dApp](./guides/first-dapp.md)
