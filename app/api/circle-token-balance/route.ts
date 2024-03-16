import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";

const circleAPIKey = process.env.CIRCLE_API_KEY;
const circleSecret = process.env.CIRCLE_SECRET;

const circleContractSdk = initiateSmartContractPlatformClient({
  apiKey: circleAPIKey!,
  entitySecret: circleSecret!,
});

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract input parameters from request body
    const { userAddress, tokenId } = req.body;
    const response = await circleContractSdk.readContract({
      id: '018e476f-85c5-7ad0-8ec6-1c3259d3e92c', 
      abiFunctionSignature: "balanceOf(address, uint256)",
      abiParameters: [userAddress, tokenId], 
    });
    // return encripted data
    return NextResponse.json({ response: response });
    //res.status(200).json({ ciphertext: encryptedData });
  } catch (error) {
    console.error("Error calling mint function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};