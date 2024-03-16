import { NextRequest, NextResponse } from "next/server";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";

const circleAPIKey = process.env.CIRCLE_API_KEY;
const circleSecret = process.env.CIRCLE_SECRET;

const circleContractSdk = initiateSmartContractPlatformClient({
  apiKey: circleAPIKey!,
  entitySecret: circleSecret!,
});

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // Extract input parameters from request body
    const { searchParams } = new URL(req.url);
    const userAddress = req.headers.get("userAddress");
    const tokenId = searchParams.get("tokenId");

    const { data } = await circleContractSdk.readContract({
      id: "018e476f-85c5-7ad0-8ec6-1c3259d3e92c",
      abiFunctionSignature: "balanceOf(address, uint256)",
      abiParameters: [userAddress, tokenId],
    });
    // return encripted data
    return NextResponse.json(data);
    //res.status(200).json({ ciphertext: encryptedData });
  } catch (error: any) {
    console.error("Error calling mint function:", error);
    return NextResponse.json(
      {
        error: "Error checking token balance",
        message: error.message,
      },
      { status: 500 }
    );
  }
};
