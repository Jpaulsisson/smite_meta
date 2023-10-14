import { NextResponse } from 'next/server';
import { getItems } from '@/database/hirez-calls';

export async function GET() {
  try {
    
    const items = await getItems();

    return NextResponse.json({ data: items }, { status: 200 })
  } catch (error) {
    
    return NextResponse.json({ error: error })
  }

}