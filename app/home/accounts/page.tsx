"use client";

import { Button } from "@nextui-org/react";
import { useGetUserSmartAccounts } from "@sefu/react-sdk";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

function AccountsPage() {
  const router = useRouter();
  const { smartAccountList } = useGetUserSmartAccounts();

  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-[#0061FF] h-full w-full to-[#000] space-y-4">
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
      <h1 className="text-2xl font-bold">Accounts</h1>
      <p>
        Generate new accounts to receive payments separetely and maintain your
        privacy.
      </p>
      <div className="">
        {smartAccountList === undefined ||
          (smartAccountList.length === 0 && <p>No address created yet!</p>)}
      </div>
      <div className="flex flex-grow" />
      <Button
        color="default"
        className="bg-white text-black font-semibold"
        radius="full"
        onPress={() => router.push("/home/accounts/new")}
      >
        <Plus />
        <span>Add new</span>
      </Button>
    </div>
  );
}

export default AccountsPage;
