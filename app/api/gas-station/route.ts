// api/circle-wallet/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import { initiateSmartContractPlatformClient } from '@circle-fin/smart-contract-platform';
import forge from "node-forge";

const circleAPIKey = process.env.CIRCLE_API_KEY;
const circleSecret = process.env.CIRCLE_SECRET;
const circlePublicKey = process.env.CIRCLE_PUBLIC_KEY;
const contractAddress =  "" //TODO

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
    apiKey: circleAPIKey!,
    entitySecret: circleSecret!
});

const circleContractSdk = initiateSmartContractPlatformClient({
    apiKey: circleAPIKey!,
    entitySecret: circleSecret!
});

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract input parameters from request body
    const { addressReceiver, tokenId } = req.body;
    const entitySecret = forge.util.hexToBytes(
        `${circleSecret}`
    );
    const publicKey = forge.pki.publicKeyFromPem(
        `${circlePublicKey}`
      );
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });

    console.log(encryptedData)
    console.log(forge.util.encode64(encryptedData))
    const encryptedData64 = forge.util.encode64(encryptedData);
    console.log(encryptedData64)

    //call the mint function on the ERC1155 NFT contract
    const response = await circleDeveloperSdk.createContractExecutionTransaction({
        walletId: '39fd2c15-550a-5f6f-beda-1ec1b4260ce0',
        contractAddress: contractAddress,
        abiFunctionSignature: 'safeMint(address, uint256, uint256, bytes)',
        abiParameters: [addressReceiver, tokenId, 1, "0x"], 
        fee: {
          type: 'level',
          config: {
            feeLevel: 'MEDIUM'
          }
        }
    });
    // return encripted data
    return NextResponse.json({ response: response});
    //res.status(200).json({ ciphertext: encryptedData });
  } catch (error) {
    console.error("Error calling mint function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};