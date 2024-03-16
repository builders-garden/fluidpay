import { upsertAccount } from "@/lib/db/accounts";
import { upsertRecord } from "@/lib/db/records";
import { NextResponse, NextRequest } from "next/server";
import slugify from "slugify";
import { normalize } from "viem/ens";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const username = req.headers.get("x-username");
  const { name, address, type } = body;
  const slug = slugify(name.toLowerCase(), "-");
  try {
    const normalizedName = normalize(slug);
    console.log(normalizedName);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Invalid name",
      },
      { status: 400 }
    );
  }
  const newAccount = await upsertAccount({
    name,
    slug,
    address,
    type,
    owner_username: username!,
  });

  // save ens subdomain record
  await upsertRecord({
    owner: username!,
    name: slug,
    contenthash: "",
    text: "",
    addresses: [address],
  });
  return NextResponse.json(newAccount);
};
