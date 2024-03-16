import { upsertAccount } from "@/lib/db/accounts";
import { upsertRecord } from "@/lib/db/records";
import { NextResponse, NextRequest } from "next/server";
import slugify from "slugify";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const username = req.headers.get("x-username");
  const { name, address, type } = body;
  const newAccount = await upsertAccount({
    name,
    address,
    type,
    owner_username: username!,
  });

  // save ens subdomain record
  await upsertRecord({
    owner: username!,
    name: slugify(name, "-"),
    contenthash: "",
    text: "",
    addresses: [address],
  });
  return NextResponse.json(newAccount);
};
