import { init, fetchQuery } from "@airstack/node";
import { GetTokenBalanceQuery } from "./airstack-types";

init(process.env.AIRSTACK_API_KEY!);

const query = /* GraphQL */ `
  query GetTokenBalance($addresses: [Identity!]) {
    TokenBalances(
      input: {
        filter: {
          owner: { _in: $addresses }
          tokenAddress: { _eq: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" }
        }
        blockchain: base
        limit: 200
      }
    ) {
      TokenBalance {
        owner {
          addresses
        }
        tokenAddress
        amount
        formattedAmount
      }
    }
  }
`;

interface QueryResponse {
  data: GetTokenBalanceQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

export const fetchUSDCTokenBalances = async (addresses: string[]) => {
  console.log("fetching token balances", addresses);
  const { data, error }: QueryResponse = await fetchQuery(query, {
    addresses,
  });
  if (error || !data || !data.TokenBalances?.TokenBalance) {
    return null;
  }
  return data.TokenBalances.TokenBalance;
};
