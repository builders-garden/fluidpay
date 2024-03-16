import { deployFluidKeyStealthAddress } from "@/lib/contracts";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    if (!body?.address) {
      return NextResponse.json({
        status: "error",
        message: "No address provided",
      });
    }
    const { address } = body;
    await deployFluidKeyStealthAddress(address);
    return NextResponse.json({ status: "ok" });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: "Unexpected error.", error: e.message });
  }
};
