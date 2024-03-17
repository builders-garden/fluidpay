"use client";
import RewardItem, { RewardStatus } from "@/components/reward";
import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { Button, user } from "@nextui-org/react";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setBalance } from "viem/actions";
import { useWalletClient } from "wagmi";

export default function Rewards() {
  const router = useRouter();
  const { data: walletClient } = useWalletClient();
  const [balance, setBalance] = useState(0);
  console.log(balance);
  useEffect(() => {
    fetch(
      `/api/circle-token-balance?userAddress=${walletClient?.account.address}&tokenId=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data: any) => {
        setBalance(data.outputValues[0]);
        console.log(data.outputValues, balance);
      });
  }, []);

  return (
    <div className="flex flex-col p-8 bg-[#000] space-y-4">
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
      </Button>{" "}
      <h1 className="text-2xl font-bold">Rewards</h1>
      <p>
        Get rewarded for paying your favourite merchants with fluidpay. The more
        purchases, the more rewards you unlock!
      </p>
      <div className="flex flex-col py-4 bg-[#000] space-y-4">
        <RewardItem image="supreme.webp" status={RewardStatus.AVAILABLE} />
        <RewardItem image="roma.jpeg" status={RewardStatus.BLOCKED} />
        <RewardItem
          image="kfc.jpg"
          status={balance > 0 ? RewardStatus.CLAIMED : RewardStatus.AVAILABLE}
        />
      </div>
    </div>
  );
}
