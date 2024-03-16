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
import {
  useAccount,
  useDisconnect,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import "@/app/polyfills";

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
  const publicClient = usePublicClient();
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
    console.log(smartAccountList, isAuthenticated);
    if (isAuthenticated && smartAccountList && smartAccountList.length > 0)
      generateDefaultAccount();
  }, [isAuthenticated, smartAccountList]);

  const generateDefaultAccount = async () => {
    try {
      setGeneratingStealthAddress(true);

      // const vpkNode = fluidkeyClient?.generateViewingPrivateKeyNode(0);
      // console.log(vpkNode);
      // const { ephemeralPrivateKey } = generateEphemeralPrivateKey({
      //   viewingPrivateKeyNode: vpkNode!,
      //   nonce: BigInt(0),
      //   chainId: 8453,
      // });
      // const ephemeralPubKey = secp.getPublicKey(
      //   Uint8Array.from(Buffer.from(ephemeralPrivateKey.slice(2), "hex"))
      // );
      // const stealthPrivateKey = fluidkeyClient?.getStealthPrivateKey(
      //   `0x${Buffer.from(ephemeralPubKey).toString("hex")}`
      // );
      // const EOA = privateKeyToAccount(stealthPrivateKey!);

      // // @ts-ignore
      // const customSigner = walletClientToSmartAccountSigner(walletClient);
      // // @ts-ignore
      // const safeAccount = await signerToSafeSmartAccount(publicClient, {
      //   entryPoint: ENTRYPOINT_ADDRESS_V06,
      //   signer: customSigner,
      //   saltNonce: BigInt(0), // optional
      //   safeVersion: "1.4.1",
      // });

      // const smartAccountClient = createSmartAccountClient({
      //   account: safeAccount,
      //   entryPoint: ENTRYPOINT_ADDRESS_V06,
      //   chain: base,
      //   bundlerTransport: http(
      //     `https://api.pimlico.io/v1/base/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
      //   ),
      //   middleware: {
      //     gasPrice: async () =>
      //       (await bundlerClient.getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
      //     sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
      //   },
      // });
      // console.log(EOA.address);
      // const encodedAddress = encodeAbiParameters(
      //   parseAbiParameters("address"),
      //   [EOA.address]
      //   // ["0x8F80e70C7A768c5E864BCA7BA95E392BF09a1b01"]
      // );
      // console.log(encodedAddress);
      // const FLUIDKEY_HYDRATOR_ADDRESS = `0x1a93629bfcc6e9c7241e587094fae26f62503fad`;

      // const hydratorContract = getContract({
      //   address: FLUIDKEY_HYDRATOR_ADDRESS,
      //   abi: FLUIDKEY_HYDRATOR_ABI,
      //   client: {
      //     public: publicClient,
      //     wallet: smartAccountClient,
      //   },
      // });

      // const txHash = await hydratorContract.write.deploySafe([
      //   encodedAddress,
      // ] as readonly unknown[]);

      // console.log(txHash);
      // await waitForTransactionReceipt(bundlerClient, { hash: txHash });
      // await setUsername(smartAccountList![0]!.idSmartAccount, user?.username!);
      console.log("PORCO DIO");
      router.push("/home");
      // console.log(address);
    } catch (error) {
      console.log(error);
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
