"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { type ReactNode } from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { base } from "viem/chains";
import { FluidkeyClient, FluidkeyProvider } from "@sefu/react-sdk";

const sefuClient = new FluidkeyClient({
  clientId: process.env.NEXT_PUBLIC_FLUIDKEY_APP_ID!,
  clientKey: process.env.NEXT_PUBLIC_FLUIDKEY_APP_KEY!,
  isExperimental: true,
});

const config = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  // @ts-expect-error
  transports: {
    // @ts-ignore
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

const environmentId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID!;

export default function Providers(props: { children: ReactNode }) {
  return (
    <FluidkeyProvider client={sefuClient}>
      <DynamicContextProvider
        settings={{
          environmentId,
          walletConnectors: [EthereumWalletConnectors],
          //   hideEmbeddedWalletTransactionUIs: true,
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </FluidkeyProvider>
  );
}
