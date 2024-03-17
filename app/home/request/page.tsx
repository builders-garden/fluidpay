"use client";

import { formatAddress } from "@/lib/utils";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Avatar, Button, RadioGroup, Radio, cn } from "@nextui-org/react";
import { Copy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function RequestPage() {
  const router = useRouter();
  const { user } = useDynamicContext();
  const [accounts, setAccounts] = useState<any[]>([]);
  const jwt = getAuthToken();
  const [selectedAccount, setSelectedAccount] = useState<string>("");

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
    <div className="flex flex-col p-4 bg-[#000] space-y-4 h-full">
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
      <h1 className="text-2xl font-bold">Request via link</h1>
      <div className="flex flex-col items-center h-full">
        <Avatar
          name={user?.username?.substring(0, 1).toUpperCase()}
          size="lg"
        />
        <h1 className="font-semibold text-xl mt-4">{user?.username}</h1>
        <p className="text-[#8F8F91]">Share your link so anyone can pay you</p>
        <div className="flex flex-row items-center space-x-2 text-primary mt-4 text-xs">
          <Copy size={16} />
          {!selectedAccount && (
            <p className="font-semibold">
              fluidpay.builders.garden/pay/{user?.username}
            </p>
          )}
          {selectedAccount && (
            <p className="font-semibold">
              fluidpay.builders.garden/pay/{selectedAccount}.{user?.username}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2 bg-[#232324] rounded-xl p-4 mx-6 mt-12 w-full">
          <RadioGroup
            defaultValue=""
            value={selectedAccount}
            onValueChange={(val) => setSelectedAccount(val)}
          >
            <Radio value="">
              New account <span className="font-semibold">(recommended)</span>
            </Radio>
            {accounts.map((account) => (
              <Radio key={account.slug} value={account.slug}>
                <div
                  className="flex flex-row items-center justify-between"
                  key={account.id}
                >
                  <div className="flex flex-row items-center space-x-2">
                    {account.type === "gnosis_pay" ? (
                      <img
                        height={35}
                        width={56}
                        alt="Gnosis Pay Card"
                        src="/cards/gnosis_pay.png"
                      />
                    ) : (
                      <div
                        className={cn(
                          `h-[35px] w-[56px] rounded-md`,
                          `bg-red-500`
                        )}
                      ></div>
                    )}
                    <div className="flex flex-col space-y-1 items-start">
                      <p className="leading-none font-semibold">
                        {account.name}
                      </p>
                      <p className="text-[#8F8F91] leading-none font-medium text-xs">
                        {account.slug}.{user?.username}.fluidpay.eth •{" "}
                        {formatAddress(account.address)}
                      </p>
                    </div>
                  </div>
                </div>
              </Radio>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-grow" />
        <Button
          radius="full"
          color="primary"
          className="w-full font-semibold"
          onPress={() => {
            if (typeof navigator !== "undefined") {
              if (!selectedAccount) {
                navigator.clipboard.writeText(
                  `fluidpay.builders.garden/pay/${user?.username}`
                );
              } else {
                navigator.clipboard.writeText(
                  `fluidpay.builders.garden/pay/${selectedAccount}.${user?.username}`
                );
              }
            }
          }}
        >
          Share link
        </Button>
      </div>
    </div>
  );
}

export default RequestPage;
