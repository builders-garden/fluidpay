"use client";
import { Button, Skeleton } from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

import { createPublicClient, http } from "viem";

function QrCodePage() {
  const router = useRouter();
  const { Canvas } = useQRCode();
  const { user, authToken } = useDynamicContext();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function resolveAddress() {
      console.log("Resolving address for", `${user?.username}.fkey.eth`);
      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });
      const resolved = await mainnetClient.getEnsAddress({
        name: normalize(`${user?.username}.fkey.eth`),
      });
      console.log("result", resolved);
      setAddress(resolved);
    }
    resolveAddress();
  });

  console.log(address);
  return (
    <div className="flex flex-col p-4 bg-[#000] space-y-4">
      <Button
        variant="light"
        className="w-min"
        radius="full"
        isIconOnly
        onPress={() => {
          router.push("/home");
        }}
      >
        <X />
      </Button>
      {!address && <Skeleton className="w-200 h-200" />}
      {address && (
        <Canvas
          text={address}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000",
              light: "#FFF",
            },
          }}
        />
      )}
    </div>
  );
}

export default QrCodePage;
