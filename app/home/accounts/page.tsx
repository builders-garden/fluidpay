"use client";

import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { Button, cn } from "@nextui-org/react";
import { useGetUserSmartAccounts } from "@sefu/react-sdk";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sha256 } from "js-sha256";

function getColorFromAddress(address: string) {
  const hash = sha256(address);
  return "#" + hash.slice(0, 6);
}

function AccountsPage() {
  const router = useRouter();
  const { smartAccountList } = useGetUserSmartAccounts();
  const [accounts, setAccounts] = useState<any[]>([]);
  const jwt = getAuthToken();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await fetch("/api/accounts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const jsonResult = await res.json();
    setAccounts(jsonResult);
  };

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
      <div className="bg-[#D9D9D9] bg-opacity-10 rounded-lg flex flex-col space-y-2 p-4">
        {accounts.map((account) => (
          <div className="flex flex-row" key={account.id}>
            <div
              className={cn(`h-[35px] w-[56px] rounded-md`, `bg-red-500`)}
            ></div>
            <div className="flex flex-col">
              <p>{account.name}</p>
              <p>{account.address}</p>
            </div>
          </div>
        ))}
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
