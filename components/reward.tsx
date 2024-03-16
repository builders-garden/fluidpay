import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { CheckCircle } from "lucide-react";
import { useWalletClient } from "wagmi";

export enum RewardStatus {
  CLAIMED = "claimed",
  AVAILABLE = "available",
  BLOCKED = "blocked",
}

export default function RewardItem({
  status,
  image,
}: {
  status: RewardStatus;
  image: string;
}) {
  const jwt = getAuthToken();
  const { data: walletClient } = useWalletClient();
  const mintNFT = async () => {
    await fetch("/api/circle-mint", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        addressReceiver: walletClient?.account.address,
        tokenId: 1,
      }),
    });
  };
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="Woman listing to music"
        className={`object-cover ${status === RewardStatus.CLAIMED ? "filter grayscale" : ""}`}
        height={200}
        src={`/images/${image}`}
        width={400}
      />
      <CardFooter className="flex flex-row justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        {status === RewardStatus.AVAILABLE && (
          <div className="flex flex-row flex-grow justify-between items-center space-x-12">
            <p className="text-tiny text-white/80">Available to claim!</p>
            <Button
              className="text-tiny text-white bg-black/75"
              variant="flat"
              color="default"
              radius="md"
              size="sm"
              onPress={mintNFT}
            >
              Claim
            </Button>
          </div>
        )}
        {status === RewardStatus.CLAIMED && (
          <div className="flex flex-row flex-grow justify-between items-center space-x-12">
            <p className="text-tiny text-center text-white/80 py-2">
              Already claimed
            </p>
            <CheckCircle size={20} />
          </div>
        )}
        {status === RewardStatus.BLOCKED && (
          <div className="flex flex-row flex-grow justify-between items-center space-x-12">
            <p className="text-tiny text-white/80">
              5 more purchases to unlock
            </p>
            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="md"
              size="sm"
              disabled
            >
              Claim
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
