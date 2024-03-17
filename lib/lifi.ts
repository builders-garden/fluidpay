import { LiFi, Token } from "@lifi/sdk";
import { parseUnits } from "viem";
import { base, gnosis } from "viem/chains";

export const lifi = new LiFi({
  integrator: "BuildersGarden",
});

export interface WalletBalance {
  address: string;
  balance: number;
}

export const USDC_TOKEN_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const routeOptions: any = {
  slippage: 3 / 100, // 0.03%
  order: "RECOMMENDED",
  allowSwitchChain: false,
  integrator: "BuildersGarden",
};

export async function getWalletBalances(
  addresses: string[]
): Promise<WalletBalance[]> {
  const walletBalances = await Promise.all(
    addresses.map(async (address) => getWalletBalance(address, base.id))
  );
  return walletBalances;
}

export async function getWalletBalance(
  address: string,
  chainId: number,
  tokenAddress = USDC_TOKEN_ADDRESS
): Promise<WalletBalance> {
  const token = await lifi.getToken(chainId, tokenAddress);
  console.log(token);
  const balancesResult = await lifi.getTokenBalance(address, token);
  return {
    address,
    balance: balancesResult?.amount ? parseFloat(balancesResult?.amount) : 0,
  };
}

export const EURE_TOKEN_ADDRESS = "0xcB444e90D8198415266c6a2724b7900fb12FC56E";

export async function getBridgeTransaction(
  amount: string,
  receiver: string,
  userAccount: string
) {
  const routesRequest = {
    fromChainId: base.id,
    fromAmount: parseUnits(amount as `${number}`, 6).toString(),
    fromAddress: userAccount,
    fromTokenAddress: USDC_TOKEN_ADDRESS,
    toChainId: gnosis.id,
    toTokenAddress: EURE_TOKEN_ADDRESS,
    toAddress: receiver,
    options: routeOptions,
  };
  const { routes } = await lifi.getRoutes(routesRequest);
  if (routes.length > 0) {
    const [route] = routes;
    const stepTransactionData = await lifi.getStepTransaction(route.steps[0]);
    return stepTransactionData.transactionRequest;
  }
}
