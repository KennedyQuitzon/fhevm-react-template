import { NextRequest, NextResponse } from 'next/server';

/**
 * Encryption API Route
 * Handles encryption of plaintext values to FHE ciphertext
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { value, type } = body;

    if (value === undefined || value === null) {
      return NextResponse.json(
        { error: 'Value is required for encryption' },
        { status: 400 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: 'Encryption type is required (e.g., UINT8, UINT32, BOOL)' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['UINT8', 'UINT16', 'UINT32', 'UINT64', 'UINT128', 'UINT256', 'BOOL', 'ADDRESS'];
    if (!validTypes.includes(type.toUpperCase())) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // In a real implementation, this would use the FHE SDK to encrypt
    // For demo purposes, we simulate the encryption process
    const encryptedData = {
      handle: `0x${Math.random().toString(16).substring(2, 42)}`,
      type: type.toUpperCase(),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      encrypted: encryptedData,
      message: 'Value encrypted successfully',
    });
  } catch (error: any) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { error: error.message || 'Encryption failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Encryption endpoint. Use POST to encrypt values.',
    usage: {
      method: 'POST',
      body: {
        value: 'number | boolean | string',
        type: 'UINT8 | UINT16 | UINT32 | UINT64 | UINT128 | UINT256 | BOOL | ADDRESS',
      },
    },
  });
}
