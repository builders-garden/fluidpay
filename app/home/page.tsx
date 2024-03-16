"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import {
  useGetSmartAccountBalance,
  useGetUserSmartAccounts,
  useResetClient,
} from "@sefu/react-sdk";
import { CreditCard, Download, Plus, QrCode, Search, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { base } from "viem/chains";
import { useDisconnect } from "wagmi";

export default function Home() {
  const { user } = useDynamicContext();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const { smartAccountList } = useGetUserSmartAccounts();
  const mainAccount =
    smartAccountList !== undefined ? smartAccountList[0] : null;
  const { data: balanceData } = useGetSmartAccountBalance({
    idSmartAccount: mainAccount?.idSmartAccount || "",
    chainId: base.id,
  });

  const { reset } = useResetClient();

  const resetClient = () => {
    reset();
    disconnect();
    router.push("/");
  };

  return (
    <>
      <div className="flex flex-col space-y-12 bg-gradient-to-b from-[#0061FF] h-full to-[#000] from-0% to-60% p-4">
        <div className="flex flex-row justify-between items-center">
          {/* <Avatar name={user?.username?.substring(0, 1).toUpperCase()} /> */}
          <div className="flex flex-row space-x-4">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  name={user?.username?.substring(0, 1).toUpperCase()}
                  className="transition-transform w-[52px]"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => resetClient()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input
              placeholder="Search"
              isClearable
              className="w-full"
              startContent={<Search />}
            />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="light"
              isIconOnly
              radius="full"
              onPress={() => router.push("/home/qr")}
            >
              <QrCode />
            </Button>
            <Button
              variant="light"
              isIconOnly
              radius="full"
              onPress={() => router.push("/home/accounts")}
            >
              <CreditCard />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center py-8">
          <p className="text-xl">Base • USDC</p>
          <div className="font-bold">
            $
            <span className="text-6xl">
              {balanceData.length === 0 ? "0" : balanceData[0].amount}
            </span>
            .00
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-16">
          <div className="flex-flex-col text-center space-y-2">
            <Button isIconOnly radius="full" size="lg">
              <Plus />
            </Button>
            <p className="text-xs">Deposit</p>
          </div>
          <div className="flex-flex-col text-center space-y-2">
            <Button isIconOnly radius="full" size="lg">
              <Download />
            </Button>
            <p className="text-xs">Request</p>
          </div>
          <div className="flex-flex-col text-center space-y-2">
            <Button isIconOnly radius="full" size="lg">
              <Send />
            </Button>
            <p className="text-xs">Send</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 bg-[#161618] rounded-xl p-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-4 items-center">
              <Avatar name="A" />
              <div className="flex flex-col">
                <p className="text-lg">frankc - dinner out burger</p>
                <p className="text-sm text-gray-500">Today, 13:00</p>
              </div>
            </div>
            <div>
              <p className="text-lg">$10.00</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-4 items-center">
              <div>A</div>
              <div className="flex flex-col">
                <p className="text-lg">frankc - dinner out burger</p>
                <p className="text-sm text-gray-500">Today, 13:00</p>
              </div>
            </div>
            <div>
              <p className="text-lg">$10.00</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-4 items-center">
              <div>A</div>
              <div className="flex flex-col">
                <p className="text-lg">frankc - dinner out burger</p>
                <p className="text-sm text-gray-500">Today, 13:00</p>
              </div>
            </div>
            <div>
              <p className="text-lg">$10.00</p>
            </div>
          </div>
        </div>
      </div>
      {/* <QrCodeModal isOpen={qrCodeModalOpen} onOpenChange={onQrCodeOpenChange} /> */}
    </>
  );
}
