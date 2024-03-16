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
      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });
      const resolved = await mainnetClient.getEnsAddress({
        name: normalize(`${user?.username}.fkeydev.eth`),
      });
      setAddress(resolved);
    }
    resolveAddress();
  }, [user]);

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
        <div className="flex flex-col text-center space-y-4">
          <div className="flex flex-col space-y-4 bg-[#232324] p-4 rounded-lg mx-auto">
            <Canvas
              text={address}
              options={{
                errorCorrectionLevel: "M",
                margin: 2,
                scale: 4,
                width: 250,
                color: {
                  dark: "#000",
                  light: "#FFF",
                },
              }}
            />
            <p>
              <span className="font-bold text-white">{user?.username}</span>
              .fkeydev.eth
            </p>
          </div>
          <p>Get paid by sharing this QR code</p>
        </div>
      )}
    </div>
  );
}

export default QrCodePage;
