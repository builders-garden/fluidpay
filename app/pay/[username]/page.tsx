"use client";

import { Avatar, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PayUsername({
  params,
}: {
  params: { username: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const predefinedAmount = searchParams.get("amount");
  const [address, setAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(
    predefinedAmount ? parseFloat(predefinedAmount) : null
  );
  const router = useRouter();

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
    <div className="flex flex-col py-0 space-y-4 px-4">
      <div className="flex flex-row">
        <Button
          variant="light"
          className="w-min"
          radius="full"
          isIconOnly
          onPress={() => {
            // TODO: uncomment
            router.back();
          }}
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center text-center space-y-8">
        <h1 className="text-4xl font-semibold">Send to {params.username}</h1>
        <div className="flex flex-col space-y-2 justify-center items-center ">
          <Avatar name={params.username.charAt(0).toUpperCase()} size="lg" />
          <div className="flex flex-col space-y0.5 justify-center items-center">
            <p className="text-2xl font-semibold">{params.username}</p>
            <p className="text-gray-500">{username}</p>
          </div>
        </div>

        <Input
          value={amount?.toString()}
          onValueChange={(val) => setAmount(parseFloat(val))}
          isClearable
          type="number"
          label="Amount to send"
          placeholder="0"
        />
        <Button
          color="primary"
          variant="solid"
          radius="full"
          size="lg"
          className="w-full font-semibold"
          onPress={() => console.log("send")}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
