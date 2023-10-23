import { NextResponse } from "next/server";
import { updateAllSkinsOnSupabaseDB } from "@/database/hirez-calls";


export async function GET() {
try {
  
  const skinsUpdate = await updateAllSkinsOnSupabaseDB();

  console.log(skinsUpdate);
  return NextResponse.json({ data: skinsUpdate }, { status: 200 });
} catch (error) {

  return NextResponse.json({error: error});
}
}
