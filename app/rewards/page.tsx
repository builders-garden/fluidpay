"use client";
import RewardItem, { RewardStatus } from "@/components/reward";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "@nextui-org/react";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Rewards() {
  const router = useRouter();
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
        <RewardItem image="kfc.jpg" status={RewardStatus.CLAIMED} />
      </div>
    </div>
  );
}
