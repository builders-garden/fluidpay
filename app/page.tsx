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

  console.log(isFullyConnected, user, fkeyUser);
  if (user) {
    console.log(user.newUser || !isAddressRegistered);
    if (user.newUser || !isAddressRegistered) {
      return redirect("/onboarding");
    } else if (isAuthenticated && isFkeyAuthenticated) {
      return redirect("/home");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-full space-y-8">
      <img src="/logo.png" alt="fluidpay" className="w-64" />
      {/* <h1 className="font-bold text-7xl">
        <span className="text-primary">fluid</span>pay
      </h1> */}
      <DynamicConnectButton buttonClassName="bg-primary px-4 py-2 rounded-lg font-semibold">
        Enter
      </DynamicConnectButton>
    </main>
  );
}
