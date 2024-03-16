import { generateEphemeralPrivateKey } from "@fluidkey/stealth-account-kit";
import { FluidkeyClient } from "@sefu/react-sdk";
import { privateKeyToAccount } from "viem/accounts";
import * as secp from "@noble/secp256k1";

export const getEOA = (fluidkeyClient: FluidkeyClient) => {
  const vpkNode = fluidkeyClient?.generateViewingPrivateKeyNode(0);

  const { ephemeralPrivateKey } = generateEphemeralPrivateKey({
    viewingPrivateKeyNode: vpkNode!,
    nonce: BigInt(0),
    chainId: 8453,
  });
  const ephemeralPubKey = secp.getPublicKey(
    Uint8Array.from(Buffer.from(ephemeralPrivateKey.slice(2), "hex"))
  );
  const stealthPrivateKey = fluidkeyClient?.getStealthPrivateKey(
    `0x${Buffer.from(ephemeralPubKey).toString("hex")}`
  );
  return privateKeyToAccount(stealthPrivateKey!);
};
