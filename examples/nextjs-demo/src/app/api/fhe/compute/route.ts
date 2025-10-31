import { NextRequest, NextResponse } from 'next/server';

/**
 * Homomorphic Computation API Route
 * Handles computations on encrypted data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, operands } = body;

    if (!operation) {
      return NextResponse.json(
        { error: 'Operation type is required' },
        { status: 400 }
      );
    }

    if (!operands || !Array.isArray(operands) || operands.length === 0) {
      return NextResponse.json(
        { error: 'Operands array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate operation type
    const validOperations = ['add', 'sub', 'mul', 'div', 'eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'and', 'or', 'xor', 'not'];
    if (!validOperations.includes(operation.toLowerCase())) {
      return NextResponse.json(
        { error: `Invalid operation. Must be one of: ${validOperations.join(', ')}` },
        { status: 400 }
      );
    }

    // Check operand count
    const unaryOps = ['not'];
    const binaryOps = ['add', 'sub', 'mul', 'div', 'eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'and', 'or', 'xor'];

    if (unaryOps.includes(operation.toLowerCase()) && operands.length !== 1) {
      return NextResponse.json(
        { error: `Operation '${operation}' requires exactly 1 operand` },
        { status: 400 }
      );
    }

    if (binaryOps.includes(operation.toLowerCase()) && operands.length !== 2) {
      return NextResponse.json(
        { error: `Operation '${operation}' requires exactly 2 operands` },
        { status: 400 }
      );
    }

    // In a real implementation, this would perform homomorphic computation
    // For demo purposes, we simulate the computation
    const resultHandle = `0x${Math.random().toString(16).substring(2, 42)}`;

    return NextResponse.json({
      success: true,
      result: {
        handle: resultHandle,
        operation: operation.toLowerCase(),
        operandCount: operands.length,
        timestamp: new Date().toISOString(),
      },
      message: `Homomorphic ${operation} computation completed successfully`,
    });
  } catch (error: any) {
    console.error('Computation error:', error);
    return NextResponse.json(
      { error: error.message || 'Computation failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Homomorphic computation endpoint. Use POST to perform computations on encrypted data.',
    usage: {
      method: 'POST',
      body: {
        operation: 'add | sub | mul | div | eq | ne | gt | gte | lt | lte | and | or | xor | not',
        operands: ['handle1', 'handle2?'] // Array of encrypted handles
      },
    },
    examples: {
      addition: {
        operation: 'add',
        operands: ['0xabc...', '0xdef...']
      },
      comparison: {
        operation: 'gt',
        operands: ['0xabc...', '0xdef...']
      },
      negation: {
        operation: 'not',
        operands: ['0xabc...']
      }
    }
  });
}
