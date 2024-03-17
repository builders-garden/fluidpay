import { fetchUSDCTokenBalances } from "@/lib/airstack";
import { getUserAccounts, upsertAccount } from "@/lib/db/accounts";
import { Account, AccountType } from "@/lib/db/interfaces";
import { upsertRecord } from "@/lib/db/records";
import { EURE_TOKEN_ADDRESS, getWalletBalance } from "@/lib/lifi";
import { formatBigInt } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import slugify from "slugify";
import { createPublicClient, http } from "viem";
import { gnosis } from "viem/chains";
import { normalize } from "viem/ens";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const username = req.headers.get("x-username");
  const { name, address, type } = body;
  const slug = slugify(name.toLowerCase(), "-");
  try {
    const normalizedName = normalize(slug);
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

  if (type !== AccountType.GNOSIS_PAY) {
    // save ens subdomain record
    await upsertRecord({
      owner: username!,
      name: `${slug}.${username}.fluidpay.eth`,
      contenthash: "",
      texts: "",
      addresses: {
        60: address as `0x${string}`,
      },
    });
  }
  return NextResponse.json(newAccount);
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const username = req.headers.get("x-username");
  const accounts = await getUserAccounts(username!);
  const enrichedAccounts = await enrichAccountsWithBalances(accounts);
  return NextResponse.json(enrichedAccounts);
};

export const enrichAccountsWithBalances = async (accounts: Account[]) => {
  const tokenBalances = await fetchUSDCTokenBalances(
    accounts.map((a) => a.address)
  );

  const gnosisPayAccount = accounts.find(
    (a) => a.type === AccountType.GNOSIS_PAY
  );

  let gnosisPayAccountBalance = "0";
  if (gnosisPayAccount) {
    const gnosisPublicClient = createPublicClient({
      chain: gnosis,
      transport: http(),
    });
    const result = await gnosisPublicClient.readContract({
      address: EURE_TOKEN_ADDRESS,
      functionName: "balanceOf",
      abi: [
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      args: [gnosisPayAccount.address as `0x${string}`],
    });
    gnosisPayAccountBalance = formatBigInt(result, 18);
  }

  return accounts.map((a) => {
    if (a.type === AccountType.GNOSIS_PAY) {
      return {
        balance: gnosisPayAccountBalance,
        ...a,
      };
    }
    return {
      balance: tokenBalances
        ? tokenBalances?.find(
            (b) =>
              b.owner?.addresses![0].toLowerCase() === a.address.toLowerCase()
          )?.formattedAmount
        : "0",
      ...a,
    };
  });
};
