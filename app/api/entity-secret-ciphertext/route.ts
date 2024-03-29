import { NextRequest, NextResponse } from "next/server";
import forge from "node-forge";

const circleSecret = process.env.CIRCLE_SECRET as string;
const circlePublicKey = process.env.CIRCLE_PUBLIC_KEY as string;

export const GET = (req: NextRequest, res: NextResponse) => {
  try {
    // Extract input parameters from request body
    const entitySecret = forge.util.hexToBytes(`${circleSecret}`);
    const publicKey = forge.pki.publicKeyFromPem(`${circlePublicKey}`);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });

    const encryptedData64 = forge.util.encode64(encryptedData);
    return NextResponse.json({ encryptedData64: encryptedData64 });
  } catch (error) {
    console.error("Error calling mint function:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
