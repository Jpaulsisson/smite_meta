import { updateAllItemsOnSupabaseDB } from '@/database/hirez-calls';
import { NextResponse } from "next/server";


export async function GET() {
try {
  
  const itemsUpdate = await updateAllItemsOnSupabaseDB();

  console.log(itemsUpdate);
  return NextResponse.json({ data: itemsUpdate }, { status: 200 });
} catch (error) {

  return NextResponse.json({error: error});
}
}
