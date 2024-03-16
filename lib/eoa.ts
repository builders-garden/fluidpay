import {
  generateEphemeralPrivateKey,
  generateStealthAddresses,
  predictStealthSafeAddressWithBytecode,
} from "@fluidkey/stealth-account-kit";
import { FluidkeyClient } from "@sefu/react-sdk";
import { privateKeyToAccount } from "viem/accounts";
import * as secp from "@noble/secp256k1";
import { base } from "viem/chains";

export const getEphemeralPrivateKey = (
  fluidkeyClient: FluidkeyClient,
  nonce = 0
) => {
  const vpkNode = fluidkeyClient?.generateViewingPrivateKeyNode(nonce);
  const { ephemeralPrivateKey } = generateEphemeralPrivateKey({
    viewingPrivateKeyNode: vpkNode!,
    nonce: BigInt(0),
    chainId: base.id,
  });
  return ephemeralPrivateKey;
};

export const getEOA = (fluidkeyClient: FluidkeyClient, nonce = 0) => {
  const ephemeralPrivateKey = getEphemeralPrivateKey(fluidkeyClient, nonce);
  const ephemeralPubKey = secp.getPublicKey(
    Uint8Array.from(Buffer.from(ephemeralPrivateKey.slice(2), "hex"))
  );
  const stealthPrivateKey = fluidkeyClient?.getStealthPrivateKey(
    `0x${Buffer.from(ephemeralPubKey).toString("hex")}`
  );
  return privateKeyToAccount(stealthPrivateKey!);
};

export const predictStealthAddress = (
  fluidkeyClient: FluidkeyClient,
  nonce = 0
) => {
  const ephemeralPrivateKey = getEphemeralPrivateKey(fluidkeyClient, nonce);
  const eoa = getEOA(fluidkeyClient, nonce);
  // Generate the stealth owner address
  const { stealthAddresses } = generateStealthAddresses({
    spendingPublicKeys: [eoa.publicKey],
    ephemeralPrivateKey,
  });
  const { stealthSafeAddress } = predictStealthSafeAddressWithBytecode({
    threshold: 1,
    stealthAddresses,
    safeVersion: "1.3.0",
    safeProxyBytecode:
      "0x608060405234801561001057600080fd5b506040516101e63803806101e68339818101604052602081101561003357600080fd5b8101908080519060200190929190505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156100ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806101c46022913960400191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060ab806101196000396000f3fe608060405273ffffffffffffffffffffffffffffffffffffffff600054167fa619486e0000000000000000000000000000000000000000000000000000000060003514156050578060005260206000f35b3660008037600080366000845af43d6000803e60008114156070573d6000fd5b3d6000f3fea2646970667358221220d1429297349653a4918076d650332de1a1068c5f3e07c5c82360c277770b955264736f6c63430007060033496e76616c69642073696e676c65746f6e20616464726573732070726f7669646564",
    useDefaultAddress: true,
  });
  return stealthSafeAddress;
};
