import { deployFluidKeyStealthAddress } from "@/lib/contracts";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  if (req.headers.get("x-api-secret") !== process.env.API_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { address } = await req.json();
  await deployFluidKeyStealthAddress(address);
  return NextResponse.json({ status: "ok" });
};
