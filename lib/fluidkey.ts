import { keccak256, pad, toHex } from "viem";
import * as secp from "@noble/secp256k1";
import { generateKeysFromSignature } from "@fluidkey/stealth-account-kit";

export const generateKeysFromSig = (signature: `0x${string}`) => {
  return generateKeysFromSignature(signature);
};

export const generateStealthPrivateKey = (
  metaStealthPrivateKey: string,
  ephemeralPubKey: string
): `0x${string}` => {
  const sharedSecret = secp.getSharedSecret(
    metaStealthPrivateKey.replace("0x", ""),
    ephemeralPubKey.replace("0x", ""),
    false
  );
  const hashedSharedSecret = keccak256(Buffer.from(sharedSecret.slice(1)));
  const privateKeyBigInt =
    (BigInt(metaStealthPrivateKey) * BigInt(hashedSharedSecret)) % secp.CURVE.n;
  return pad(toHex(privateKeyBigInt));
};

// export const generateStealthEOA = (client: FluidkeyClient) => {
//   const { spendingPrivateKey, viewingPrivateKey } =
//     generateKeysFromSig(signature);

//   const spendingAccount = privateKeyToAccount(spendingPrivateKey);

//   const privateViewingKeyNode = extractViewingPrivateKeyNode(
//     viewingPrivateKey,
//     0
//   );

//   const { ephemeralPrivateKey } = generateEphemeralPrivateKey({
//     viewingPrivateKeyNode: privateViewingKeyNode,
//     nonce: BigInt(0),
//     chainId: 8453,
//   });
// };
