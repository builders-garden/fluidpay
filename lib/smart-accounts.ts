import {
  ENTRYPOINT_ADDRESS_V06,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { http } from "viem";
import { base } from "viem/chains";
import { bundlerClient, paymasterClient } from "./pimlico";
import { signerToSafeSmartAccount } from "permissionless/accounts";

export const getSmartAccount = async (walletClient: any, publicClient: any) => {
  const customSigner = walletClientToSmartAccountSigner(walletClient);

  // @ts-ignore
  return await signerToSafeSmartAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    signer: customSigner,
    saltNonce: BigInt(0), // optional
    safeVersion: "1.4.1",
  });
}

export const getSmartAccountClient = async (
  walletClient: any,
  publicClient: any
) => {
  const safeAccount = await getSmartAccount(walletClient, publicClient);
  return createSmartAccountClient({
    account: safeAccount,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: base,
    bundlerTransport: http(
      `https://api.pimlico.io/v1/base/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
    ),
    middleware: {
      gasPrice: async () =>
        (await bundlerClient.getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
      sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
    },
  });
};
