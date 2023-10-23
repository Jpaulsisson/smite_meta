import { NextResponse } from "next/server";
import { getGods } from "@/database/hirez-calls";

export async function UPDATE() {
try {
  const gods = await getGods();

  
} catch (error) {
  return NextResponse.json({error: error})
}
}