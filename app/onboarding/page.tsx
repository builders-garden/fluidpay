"use client";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Input, Skeleton } from "@nextui-org/react";
import {
  useAuthenticate,
  useFluidkeyClient,
  useGenerateKeys,
  useGetSmartAccount,
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
import { useAccount, useDisconnect, useWalletClient } from "wagmi";

export default function Onboarding() {
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { address } = useAccount();
  const [inviteCode, setInviteCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fluidkeyClient = useFluidkeyClient();
  const keys = fluidkeyClient?.areMetaStealthKeysInitialized();
  const { user } = useDynamicContext();
  const { user: fkeyUser } = useGetUser({ pollingOnStatusImporting: false });
  const initializedWalletAddress = useInitializedWalletAddress();
  const { isAddressRegistered, refetch: refetchRegistration } =
    useIsAddressRegistered(address);
  const { data: walletClient } = useWalletClient();
  const { generateKeys } = useGenerateKeys();
  const {
    authenticate,
    isLoading: isAuthenticateLoading,
    isAuthenticated,
  } = useAuthenticate();

  const { smartAccountList } = useGetUserSmartAccounts();
  const { smartAccount: mainAccount } = useGetSmartAccount({
    idSmartAccount: smartAccountList ? smartAccountList[0]?.idSmartAccount : "",
  });

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

  // console.log(isAddressRegistered, isErrorRegisterUser, errorRegisterUser);

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
        console.log("registering user");
        const res = await registerUser({
          // @ts-ignore
          walletClient,
          whitelistCode: inviteCode,
        });
        console.log(res);
        await refetchRegistration();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && smartAccountList && smartAccountList.length > 0)
      generateDefaultAccount();
  }, [isAuthenticated, smartAccountList]);

  const generateDefaultAccount = async () => {
    try {
      setGeneratingStealthAddress(true);
      const deployStealthResult = await fetch("/api/deploy-stealth", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const { address } = await deployStealthResult.json();

      await setUsername(smartAccountList![0]!.idSmartAccount, user?.username!);
      router.push("/home");
      // console.log(address);
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
              router.push("/home");
            }}
          >
            Start now!
          </Button>
        </>
      )}
    </div>
  );
}
