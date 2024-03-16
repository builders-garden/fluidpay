import { createPublicClient, http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

export const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY! as `0x${string}`
);

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: base,
  transport: http(),
  account,
});
