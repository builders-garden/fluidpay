import { createPublicClient, http, createWalletClient } from "viem";
import { base } from "viem/chains";

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});
