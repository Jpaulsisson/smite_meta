import { getItems, getGods } from "@/database/hirez-calls";

import { NextResponse } from "next/server";


export async function GET() {
try {
  
  const itemsUpdate = await getGods();

  console.log(itemsUpdate);
  return NextResponse.json({ data: itemsUpdate }, { status: 200 });
} catch (error) {

  return NextResponse.json({error: error});
}
}