"use client";

import { Avatar, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base, mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  useConfirmTransferOut,
  useGenerateTransferOutQuote,
  useGetUserSmartAccounts,
} from "@sefu/react-sdk";

export default function PayUsername({
  params,
}: {
  params: { username: string };
}) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const predefinedAmount = searchParams.get("amount");
  const [address, setAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(
    predefinedAmount ? parseFloat(predefinedAmount) : null
  );
  const router = useRouter();
  const { data: transferQuote, requestQuote } = useGenerateTransferOutQuote();
  const { confirmTransferOut } = useConfirmTransferOut();
  const { smartAccountList } = useGetUserSmartAccounts();
  const mainAccount =
    smartAccountList !== undefined ? smartAccountList[0] : null;

  const transfer = async () => {
    const quote = await requestQuote({
      amount: BigInt(amount!) * BigInt(10 ** 6),
      to: address!,
      idSmartAccount: mainAccount?.idSmartAccount || "",
      chainId: base.id,
      idToken: process.env.NEXT_PUBLIC_USDC_TOKEN_ID!,
      epochControlStructure: 0,
    });

    const confirmedQuote = await confirmTransferOut({
      idWithdrawalProcedure: quote?.withdrawalProcedure?.idWithdrawalProcedure!,
    });
  };

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
          onPress={() => {
            transfer();
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
