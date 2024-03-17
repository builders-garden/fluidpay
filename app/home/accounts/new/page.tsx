"use client";
import { deployFluidKeyStealthAddress } from "@/lib/contracts";
import { getGnosisPayModules } from "@/lib/gnosis-pay-delay-module";
import { getSmartAccountClient } from "@/lib/smart-accounts";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Input } from "@nextui-org/react";
import {
  useFluidkeyClient,
  useGenerateStealthAddress,
  useGetUserSmartAccounts,
} from "@sefu/react-sdk";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { keccak256, toHex } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const fluidkeyMessage = (address: `0x${string}`, secret: string) => {
  const nonce = keccak256(toHex(address + secret)).replace("0x", "");

  return `Sign this message to generate your Fluidkey private payment keys.

WARNING: Only sign this message within a trusted website or platform to avoid loss of funds.

Secret: ${nonce}`;
};

function CreateAccountPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<
    "" | "standard" | "usdc_centric" | "save_and_earn" | "gnosis_pay"
  >("");
  const { address } = useAccount();
  const [accountName, setAccountName] = useState<string>("");
  const [gnosisPayAddress, setGnosisPayAddress] = useState<string>("");
  const { user } = useDynamicContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const jwt = getAuthToken();
  //   const { generateNewStealthAddress } = useGenerateStealthAddress({ idSmartAccount: smartAccountList[0].idSmartAccount, chainId: base.id })
  const fluidkeyClient = useFluidkeyClient();
  const { smartAccountList } = useGetUserSmartAccounts();
  const mainAccount =
    smartAccountList !== undefined ? smartAccountList[0] : null;
  const { generateNewStealthAddress, stealthAddressCreated } =
    useGenerateStealthAddress({
      chainId: 8453,
      idSmartAccount: mainAccount?.idSmartAccount || "",
    });

  const linkGnosisPayCard = async () => {
    try {
      const { delayMod } = await getGnosisPayModules(gnosisPayAddress);
      if (!delayMod) {
        console.error("Gnosis Pay delay module not found");
        return;
      }
    } catch (error) {
      console.error(error);
      setError("This is not a Gnosis Pay address");
      return;
    }
    await fetch(`/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        address: gnosisPayAddress,
        name: accountName,
        type: accountType,
      }),
    });
    router.push("/home/accounts");
  };

  const createAccount = async () => {
    try {
      setLoading(true);

      if (accountType !== "gnosis_pay") {
        const smartAccountClient = await getSmartAccountClient(
          walletClient,
          publicClient
        );

        const result = await deployFluidKeyStealthAddress(
          address!,
          // @ts-ignore
          walletClient,
          smartAccountClient,
          {
            isUSDCCentric: accountType === "usdc_centric",
            isSaveAndEarn: accountType === "save_and_earn",
          }
        );
        console.log("CREATED", result);
        await fetch(`/api/accounts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            address: result,
            name: accountName,
            type: accountType,
          }),
        });
      }

      router.push("/home/accounts");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          onClick={() => setAccountType("usdc_centric")}
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
          onClick={() => setAccountType("save_and_earn")}
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
        <div
          className="bg-[#232324] rounded-xl p-4 flex flex-row items-center cursor-pointer transition-transform hover:-translate-y-1"
          onClick={() => setAccountType("gnosis_pay")}
        >
          <div className="flex flex-row">
            <img
              src={"/accounts/gnosis.png"}
              className="flex-shrink-0 h-[48px] w-[48px]
              "
            />
            <div className="flex flex-col pl-2">
              <h3>Gnosis Pay</h3>
              <p className="text-[#8F8F91] text-xs">
                Connect your Gnosis Pay card and start spending your crypto in
                real life!
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
        {accountType === "gnosis_pay" && (
          <Input
            value={gnosisPayAddress}
            onValueChange={(val) => setGnosisPayAddress(val.toLowerCase())}
            isClearable
            label="Gnosis Pay address"
            placeholder="0x1234..."
            errorMessage={error}
          />
        )}
      </div>
      <div className="flex flex-grow" />
      <Button
        isDisabled={!accountName || accountName.length < 3}
        color="primary"
        className="font-semibold"
        radius="full"
        isLoading={loading}
        onPress={() =>
          accountType === "gnosis_pay" ? linkGnosisPayCard() : createAccount()
        }
      >
        {accountType === "gnosis_pay" ? "Connect Gnosis Pay" : "Create"}
      </Button>
    </div>
  );
}

export default CreateAccountPage;
