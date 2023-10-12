import { NextResponse } from "next/server";
import { getGods } from "@/database/hirez-calls";

export async function GET() {

const response = await getGods();

return NextResponse.json({data: response }, {status: 200});
  
}