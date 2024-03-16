// api/circle-wallet/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import forge from "node-forge";
import viem from "viem";

const circleAPIKey = process.env.CIRCLE_API_KEY;
const circleSecret = process.env.CIRCLE_SECRET;
const circlePublicKey = process.env.CIRCLE_PUBLIC_KEY;
const contractAddress = "0x5dA54faE364b554a528946535ACe706a1bc9F52d";

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
  apiKey: circleAPIKey!,
  entitySecret: circleSecret!,
});

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract input parameters from request body
    const { addressReceiver, tokenId } = req.body;
    const entitySecret = forge.util.hexToBytes(`${circleSecret}`);
    const publicKey = forge.pki.publicKeyFromPem(`${circlePublicKey}`);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });

    const encryptedData64 = forge.util.encode64(encryptedData);

    const voidBytes = viem.numberToBytes(0);
    //call the mint function on the ERC1155 NFT contract
    const response =
      await circleDeveloperSdk.createContractExecutionTransaction({
        walletId: "39fd2c15-550a-5f6f-beda-1ec1b4260ce0",
        contractAddress: contractAddress,
        abiFunctionSignature: 'safeMint(address, uint256, uint256, bytes)',
        // bytes param
        abiParameters: [addressReceiver, tokenId, 1, voidBytes], 
        fee: {
          type: "level",
          config: {
            feeLevel: "MEDIUM",
          },
        },
      });
    // return encripted data
    return NextResponse.json({ response: response });
    //res.status(200).json({ ciphertext: encryptedData });
  } catch (error) {
    console.error("Error calling mint function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
