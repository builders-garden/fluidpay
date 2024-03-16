"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Input, Skeleton } from "@nextui-org/react";
import {
  useAuthenticate,
  useFluidkeyClient,
  useGenerateKeys,
  useGenerateStealthAddress,
  useGetUser,
  useGetUserSmartAccounts,
  useInitializedWalletAddress,
  useIsAddressRegistered,
  useRegisterUser,
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
  const mainAccount =
    smartAccountList !== undefined ? smartAccountList[0] : null;
  const [generatingStealthAddress, setGeneratingStealthAddress] =
    useState(false);
  const { generateNewStealthAddress } = useGenerateStealthAddress({
    idSmartAccount: mainAccount?.idSmartAccount!,
    chainId: 8453,
  });

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
      await generateKeys(walletClient, "fluidkey");
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
      const stealthAddress = await generateNewStealthAddress();
      // router.push("/home");
      console.log(stealthAddress);
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
        <p>
          Welcome to <span className="font-bold">fluidkey</span>! Complete the
          onboarding by following the instructions on your device.
        </p>
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
      <p>
        Welcome to <span className="font-bold">fluidkey</span>! Complete the
        onboarding by following the instructions on your device.
      </p>
      {!keys && (
        <>
          <Button
            color="primary"
            className="font-semibold"
            radius="full"
            isLoading={loading}
            onPress={() => generateFluidpayKeys()}
          >
            Generate fluidpay keys
          </Button>
        </>
      )}
      {keys && !isAddressRegistered && (
        <>
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
            Register fluidpay user
          </Button>
        </>
      )}
      {keys && isAddressRegistered && (
        <>
          {!generatingStealthAddress && (
            <Button
              color="primary"
              className="font-semibold"
              radius="full"
              onPress={async () => {
                await authenticate();
              }}
              isLoading={isAuthenticateLoading}
            >
              Start now!
            </Button>
          )}
          {generatingStealthAddress && (
            <p className="animate-pulse text-center text-sm">
              Creating fluidpay card...
            </p>
          )}
        </>
      )}
    </div>
  );
}
