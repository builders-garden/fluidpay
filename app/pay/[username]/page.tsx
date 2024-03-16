"use client";

import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export default function PayUsername({
  params,
}: {
  params: { username: string };
}) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function resolveAddress() {
      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });
      const resolved = await mainnetClient.getEnsAddress({
        name: normalize(`${params.username}.fkeydev.eth`),
      });
      setAddress(resolved);
    }
    resolveAddress();
  }, [address, params.username]);

  if (!params.username) {
    return <div>User not found</div>;
  }
  const username = `${params.username}.fkeydev.eth`;

  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-8">
      <h1 className="text-4xl font-semibold">Send to {params.username}</h1>
      <div className="flex flex-col space-y-2 justify-center items-center ">
        <Avatar name={params.username.charAt(0).toUpperCase()} size="lg" />
        <div className="flex flex-col space-y0.5 justify-center items-center">
          <p className="text-2xl font-semibold">{params.username}</p>
          <p className="text-gray-500">{username}</p>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
