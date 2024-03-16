"use client";
import {
  DynamicConnectButton,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import {
  useAuthenticate,
  useGetUser,
  useIsAddressRegistered,
} from "@sefu/react-sdk";
import { redirect } from "next/navigation";
import { useDisconnect, useAccount } from "wagmi";

export default function Home() {
  const { status, address } = useAccount();
  const { disconnect } = useDisconnect();
  const {
    walletConnector,
    isAuthenticated,
    isFullyConnected,
    user,
    authToken,
  } = useDynamicContext();
  const { user: fkeyUser } = useGetUser({ pollingOnStatusImporting: false });
  const { isAddressRegistered } = useIsAddressRegistered(
    address as `0x${string}`
  );
  const { isAuthenticated: isFkeyAuthenticated } = useAuthenticate();

  console.log(authToken);

  console.log(isAddressRegistered);

  if (user) {
    if (user.newUser || !isAddressRegistered) {
      return redirect("/onboarding");
    } else if (isAuthenticated) {
      return redirect("/home");
    } else {
      return redirect("/security-check");
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
