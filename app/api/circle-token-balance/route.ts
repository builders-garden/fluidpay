// api/circle-wallet/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
import forge from "node-forge";

const circleAPIKey = process.env.CIRCLE_API_KEY;
const circleSecret = process.env.CIRCLE_SECRET;
const circlePublicKey = process.env.CIRCLE_PUBLIC_KEY;
const contractAddress = ""; //TODO

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
  apiKey: circleAPIKey!,
  entitySecret: circleSecret!,
});

const circleContractSdk = initiateSmartContractPlatformClient({
  apiKey: circleAPIKey!,
  entitySecret: circleSecret!,
});

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract input parameters from request body
    const { userAddress, tokenId } = req.body;
    const entitySecret = forge.util.hexToBytes(`${circleSecret}`);
    const publicKey = forge.pki.publicKeyFromPem(`${circlePublicKey}`);
    const response = await circleContractSdk.readContract({
      id: '018e46ec-8af5-7bd4-adce-c59bdec02c2c', //TODO chainge this
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