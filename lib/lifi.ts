import { LiFi } from "@lifi/sdk";
import { base } from "viem/chains";

export const lifi = new LiFi({
  integrator: "Builders Garden X FluidKey",
});

export interface WalletBalance {
  address: string;
  balance: number;
}

export const chainIds = [1, 137, 10, 8453, 42161, 100]; // Ethereum, Polygon, OP, Arbitrum, Base, Gnosis

export const USDC_TOKEN_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export async function getWalletBalances(
  addresses: string[]
): Promise<WalletBalance[]> {
  const walletBalances = await Promise.all(
    addresses.map(async (address) => getWalletBalance(address))
  );
  return walletBalances;
}

export async function getWalletBalance(
  address: string
): Promise<WalletBalance> {
  const token = await lifi.getToken(base.id, USDC_TOKEN_ADDRESS);
  console.log(address, token);
  const balancesResult = await lifi.getTokenBalance(address, token);
  console.log(balancesResult);
  return {
    address,
    balance: balancesResult?.amount ? parseFloat(balancesResult?.amount) : 0,
  };
}
