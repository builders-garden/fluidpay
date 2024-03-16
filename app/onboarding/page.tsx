"use client";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Input, Skeleton } from "@nextui-org/react";
import {
  useAuthenticate,
  useFluidkeyClient,
  useGenerateKeys,
  useGetUser,
  useGetUserSmartAccounts,
  useInitializedWalletAddress,
  useIsAddressRegistered,
  useRegisterUser,
  useSetUsername,
} from "@sefu/react-sdk";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAccount,
  useDisconnect,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import "@/app/polyfills";
import { getSmartAccountClient } from "@/lib/smart-accounts";
import { deployFluidKeyStealthAddress } from "@/lib/contracts";
import { AccountType } from "@/lib/db/interfaces";
import { getEOA, predictStealthAddress } from "@/lib/eoa";
import { supabase } from "@/lib/supabase";
import { getUserAccounts } from "@/lib/db/accounts";

export default function Onboarding() {
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { address } = useAccount();
  const [inviteCode, setInviteCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fluidkeyClient = useFluidkeyClient();
  const keys = fluidkeyClient?.areMetaStealthKeysInitialized();
  const { user } = useDynamicContext();
  const initializedWalletAddress = useInitializedWalletAddress();
  const { isAddressRegistered, refetch: refetchRegistration } =
    useIsAddressRegistered(address);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const { generateKeys } = useGenerateKeys();
  const {
    authenticate,
    isLoading: isAuthenticateLoading,
    isAuthenticated,
  } = useAuthenticate();

  const { smartAccountList } = useGetUserSmartAccounts();

  const [generatingStealthAddress, setGeneratingStealthAddress] =
    useState(false);
  const jwt = getAuthToken();
  const { setUsername } = useSetUsername();

  const {
    registerUser,
    error: errorRegisterUser,
    isLoading: isLoadingRegisterUser,
    isError: isErrorRegisterUser,
  } = useRegisterUser();

  const generateFluidpayKeys = async () => {
    try {
      setLoading(true);
      // @ts-ignore
      await generateKeys(walletClient, "fluidpay");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const launchRegistration = async () => {
    try {
      if (initializedWalletAddress.address === address) {
        const res = await registerUser({
          // @ts-ignore
          walletClient,
          whitelistCode: inviteCode,
        });
        await refetchRegistration();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && smartAccountList && smartAccountList.length > 0) {
      generateDefaultAccount();
    }
  }, [isAuthenticated, smartAccountList]);

  const createDefaultAccount = async (address: string) => {
    fetch(`/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        address: address,
        name: "Account 1",
        type: AccountType.STANDARD,
      }),
    });
  };

  const generateDefaultAccount = async () => {
    try {
      setGeneratingStealthAddress(true);

      const res = await fetch(`/api/accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      const accounts = await res.json();
      if (accounts.length > 0) {
        router.push("/home");
        return;
      }

      const EOA = getEOA(fluidkeyClient!, 0);
      const stealthAddress = predictStealthAddress(fluidkeyClient!);

      const smartAccountClient = await getSmartAccountClient(
        walletClient,
        publicClient
      );

      await deployFluidKeyStealthAddress(EOA, smartAccountClient);

      await setUsername(smartAccountList![0]!.idSmartAccount, user?.username!);

      await createDefaultAccount(stealthAddress);
      router.push("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingStealthAddress(false);
    }
  };

  if (!fluidkeyClient) {
    return (
      <div className="flex flex-col p-4 space-y-4">
        <Button
          variant="light"
          className="w-min"
          isIconOnly
          radius="full"
          onPress={() => {
            disconnect();
            router.push("/");
          }}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl font-bold">Onboarding</h1>
        <Skeleton className="w-[64px] h-[12px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <Button
        variant="light"
        className="w-min"
        isIconOnly
        radius="full"
        onPress={() => {
          disconnect();
          router.push("/");
        }}
      >
        <ArrowLeft />
      </Button>
      <h1 className="text-4xl font-bold">Onboarding</h1>
      {!keys && (
        <>
          <p>
            First, we need you to generate you a pair of keys. This will allow
            you to use fluidpay in a private and secure way.
          </p>
          <Button
            color="primary"
            className="font-semibold"
            radius="full"
            isLoading={loading}
            onPress={() => generateFluidpayKeys()}
          >
            Generate keys
          </Button>
        </>
      )}
      {keys && !isAddressRegistered && (
        <>
          <p>
            First time here? Please enter the invite code you received to start
            using fluidpay.
          </p>
          <Input
            label="Fluidpay invite code"
            placeholder="ORBULO2024"
            value={inviteCode}
            onValueChange={(val) => setInviteCode(val)}
          />
          <Button
            color="primary"
            className="font-semibold"
            radius="full"
            isLoading={isLoadingRegisterUser}
            onPress={() => {
              launchRegistration();
            }}
            isDisabled={inviteCode.length !== 6}
          >
            Confirm
          </Button>
        </>
      )}
      {keys && isAddressRegistered && (
        <>
          <p>You&apos;re all set! Let&apos;s get started.</p>
          <Button
            color="primary"
            className="font-semibold"
            radius="full"
            onPress={async () => {
              await authenticate();
              generateDefaultAccount();
              // router.push("/home");
            }}
            isLoading={isAuthenticateLoading || generatingStealthAddress}
          >
            Start now!
          </Button>
        </>
      )}
    </div>
  );
}
