import { NextRequest, NextResponse } from 'next/server';

/**
 * FHE Operations API Route
 * Handles general FHE operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, data } = body;

    if (!operation) {
      return NextResponse.json(
        { error: 'Operation type is required' },
        { status: 400 }
      );
    }

    // Handle different FHE operations
    switch (operation) {
      case 'init':
        return NextResponse.json({
          success: true,
          message: 'FHEVM initialized successfully',
        });

      case 'status':
        return NextResponse.json({
          success: true,
          status: 'ready',
          message: 'FHEVM is operational',
        });

      default:
        return NextResponse.json(
          { error: `Unknown operation: ${operation}` },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('FHE operation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'FHE API is running',
    endpoints: {
      POST: '/api/fhe - General FHE operations',
      encrypt: '/api/fhe/encrypt - Encrypt data',
      decrypt: '/api/fhe/decrypt - Decrypt data',
      compute: '/api/fhe/compute - Homomorphic computation',
    },
  });
}
