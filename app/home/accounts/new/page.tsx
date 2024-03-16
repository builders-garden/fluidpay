"use client";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Input } from "@nextui-org/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateAccountPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<
    "" | "standard" | "usdc-centric" | "save-and-earn"
  >("");
  const [accountName, setAccountName] = useState<string>("");
  const { user } = useDynamicContext();
  const [loading, setLoading] = useState<boolean>(false);
  const jwt = getAuthToken();
  //   const { generateNewStealthAddress } = useGenerateStealthAddress({ idSmartAccount: smartAccountList[0].idSmartAccount, chainId: base.id })

  const createAccount = async () => {
    const deployStealthResult = await fetch("/api/deploy-stealth", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { address } = await deployStealthResult.json();
  };

  if (accountType === "") {
    return (
      <div className="flex flex-col p-4 h-full space-y-4">
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
        <h1 className="text-2xl font-bold">Pick your account</h1>
        <div
          className="bg-[#232324] rounded-xl p-4 flex flex-row items-center cursor-pointer transition-transform hover:-translate-y-1"
          onClick={() => setAccountType("standard")}
        >
          <div className="flex flex-row">
            <img
              src={"/accounts/standard.png"}
              className="flex-shrink-0 h-[48px] w-[48px]"
            />
            <div className="flex flex-col pl-2">
              <h3>Standard</h3>
              <p className="text-[#8F8F91] text-xs">
                The simplest type of account to send and receive payments in
                USDC.
              </p>
            </div>
          </div>
          <ChevronRight />
        </div>
        <div
          className="bg-[#232324] rounded-xl p-4 flex flex-row items-center cursor-pointer transition-transform hover:-translate-y-1"
          onClick={() => setAccountType("usdc-centric")}
        >
          <div className="flex flex-row">
            <img
              src={"/accounts/usdc_centric.png"}
              width={48}
              height={48}
              className="flex-shrink-0 h-[48px] w-[48px]"
            />
            <div className="flex flex-col pl-2">
              <h3>USDC-centric</h3>
              <p className="text-[#8F8F91] text-xs">
                An account that can receive any token on Base and automatically
                swaps them to USDC.
              </p>
            </div>
          </div>
          <ChevronRight />
        </div>
        <div
          className="bg-[#232324] rounded-xl p-4 flex flex-row items-center cursor-pointer transition-transform hover:-translate-y-1"
          onClick={() => setAccountType("save-and-earn")}
        >
          <div className="flex flex-row">
            <img
              src={"/accounts/save_and_earn.png"}
              className="flex-shrink-0 h-[48px] w-[48px]
              "
            />
            <div className="flex flex-col pl-2">
              <h3>Save & Earn</h3>
              <p className="text-[#8F8F91] text-xs">
                An account where to store your savings in ETH and earn interest
                by liquidity staking on Lido and deposits on AAVE.
              </p>
            </div>
          </div>
          <ChevronRight />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 h-full space-y-4">
      <Button
        variant="light"
        className="w-min"
        radius="full"
        isIconOnly
        onPress={() => {
          setAccountType("");
        }}
      >
        <ArrowLeft />
      </Button>
      <h1 className="text-2xl font-bold">Name your account</h1>
      <p>
        This is how people will be able to find and interact with this account.
      </p>
      <div className="flex flex-col space-y-2">
        <Input
          value={accountName}
          onValueChange={(val) => setAccountName(val.toLowerCase())}
          isClearable
          maxLength={20}
          label="Account name"
          placeholder="work"
        />
        <div className="flex flex-row justify-between items-center text-xs text-[#8F8F91]">
          {accountName.length > 0 && (
            <p>
              <span className="font-semibold text-white">{accountName}</span>.
              {user?.username}.fluidpay.eth
            </p>
          )}
          {accountName.length === 0 && (
            <p className="opacity-0">
              <span className="font-semibold">{accountName}</span>.
              {user?.username}.fluidpay.eth
            </p>
          )}
          <p>{accountName.length}/20</p>
        </div>
      </div>
      <div className="flex flex-grow" />
      <Button
        isDisabled={!accountName || accountName.length < 3}
        color="primary"
        className="font-semibold"
        radius="full"
      >
        Create account
      </Button>
    </div>
  );
}

export default CreateAccountPage;
