import { updateAccountName } from "@/lib/db/accounts";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { address: string } }
) => {
  const body = await req.json();
  const username = req.headers.get("x-username");
  const { name } = body;
  const updatedAccount = await updateAccountName(
    params.address,
    username!,
    name
  );
  return NextResponse.json(updatedAccount);
};
