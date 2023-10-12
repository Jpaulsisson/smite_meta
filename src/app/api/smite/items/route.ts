
import { NextResponse } from 'next/server';
import { getItems } from '@/database/hirez-calls';

export async function GET() {
  try {
    
    const response = await getItems();

    return NextResponse.json({ data: response }, { status: 200 })
  } catch (error) {
    
    return NextResponse.json({ error: error })
  }

}