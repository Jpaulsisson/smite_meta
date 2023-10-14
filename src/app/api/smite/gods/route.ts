import { NextResponse } from "next/server";
import { getGods } from "@/database/hirez-calls";

export async function GET() {
try {
  const gods = await getGods();

  return NextResponse.json({data: gods }, {status: 200});
} catch (error) {
  return NextResponse.json({error: error})
}
}