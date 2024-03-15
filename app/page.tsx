"use client";
import {
  DynamicConnectButton,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { useGetUser, useIsAddressRegistered } from "@sefu/react-sdk";
import { redirect } from "next/navigation";
import { useDisconnect, useConnect, useAccount } from "wagmi";

export default function Home() {
  const { status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { walletConnector, isAuthenticated, isFullyConnected, user } =
    useDynamicContext();
  const { user: fkeyUser } = useGetUser({ pollingOnStatusImporting: false });
  const { isAddressRegistered } = useIsAddressRegistered(
    user?.wallet as `0x${string}`
  );

  console.log(user);

  if (user) {
    if (user.newUser && !isAddressRegistered) {
      return redirect("/onboarding");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-full space-y-8">
      <h1 className="font-bold text-7xl">
        <span className="text-primary">fluid</span>pay
      </h1>
      <DynamicConnectButton buttonClassName="bg-primary px-4 py-2 rounded-lg font-semibold">
        Enter
      </DynamicConnectButton>
    </main>
  );
}
