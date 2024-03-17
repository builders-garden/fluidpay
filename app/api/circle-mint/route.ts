import { NextRequest, NextResponse } from "next/server";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import { numberToBytes } from "viem";

const circleAPIKey = process.env.CIRCLE_API_KEY;
const circleSecret = process.env.CIRCLE_SECRET;
const contractAddress = "0x5dA54faE364b554a528946535ACe706a1bc9F52d";

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
  apiKey: circleAPIKey!,
  entitySecret: circleSecret!,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Extract input parameters from request body
    const { addressReceiver, tokenId } = await req.json();

    const voidBytes = numberToBytes(0);
    //call the mint function on the ERC1155 NFT contract
    const { data } =
      await circleDeveloperSdk.createContractExecutionTransaction({
        walletId: "39fd2c15-550a-5f6f-beda-1ec1b4260ce0",
        contractAddress: contractAddress,
        abiFunctionSignature: "safeMint(address, uint256, uint256, bytes)",
        // bytes param
        abiParameters: [addressReceiver, tokenId, 1, "0x"],
        fee: {
          type: "level",
          config: {
            feeLevel: "MEDIUM",
          },
        },
      });
    // return encripted data
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error calling mint function:", error);
    return NextResponse.json(
      {
        error: "Error calling mint function",
        message: error.message,
      },
      { status: 500 }
    );
  }
};
