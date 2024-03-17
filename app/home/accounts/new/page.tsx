"use client";
import { deployFluidKeyStealthAddress } from "@/lib/contracts";
import { getEOA, predictStealthAddress } from "@/lib/eoa";
import { getSmartAccountClient } from "@/lib/smart-accounts";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  extractViewingPrivateKeyNode,
  generateEphemeralPrivateKey,
  generateKeysFromSignature,
  generateStealthAddresses,
  predictStealthSafeAddressWithBytecode,
} from "@fluidkey/stealth-account-kit";
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
import { privateKeyToAccount } from "viem/accounts";
import { usePublicClient, useSignMessage, useWalletClient } from "wagmi";

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
  const [accountName, setAccountName] = useState<string>("");
  const [gnosisPayAddress, setGnosisPayAddress] = useState<string>("");
  const { user } = useDynamicContext();
  const [loading, setLoading] = useState<boolean>(false);
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

  const { signMessage } = useSignMessage({
    mutation: {
      async onSuccess(data) {
        try {
          await createAccount(data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
    },
  });
  console.log(stealthAddressCreated);

  const createAccount = async (signature: string) => {
    try {
      setLoading(true);

      if (accountType !== "gnosis_pay") {
        const randomNonce =
          Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) +
          1000000000;
        const EOA = getEOA(fluidkeyClient!, randomNonce);
        console.log(`EOA ADDRESS: ${EOA.address}`);
        const stealthAddress = predictStealthAddress(
          fluidkeyClient!,
          randomNonce
        );
        console.log(`STEALTH ADDRESS: ${stealthAddress}`);

        const generatedAddress = await generateNewStealthAddress();
        console.log(`HOOK GENERATION: ${generatedAddress?.address}`);
        const smartAccountClient = await getSmartAccountClient(
          walletClient,
          publicClient
        );

        const { spendingPrivateKey, viewingPrivateKey } =
          generateKeysFromSignature(signature as `0x${string}`);

        const privateViewingKeyNode = extractViewingPrivateKeyNode(
          viewingPrivateKey,
          0
        );
        const spendingAccount = privateKeyToAccount(spendingPrivateKey);
        const spendingPublicKey = spendingAccount.publicKey;

        const { ephemeralPrivateKey } = generateEphemeralPrivateKey({
          viewingPrivateKeyNode: privateViewingKeyNode,
          nonce: BigInt(randomNonce),
          chainId: 8453,
        });

        const { stealthAddresses } = generateStealthAddresses({
          spendingPublicKeys: [spendingPublicKey],
          ephemeralPrivateKey,
        });

        const { stealthSafeAddress: stealthSafeAddressWithBytecode } =
          predictStealthSafeAddressWithBytecode({
            threshold: 1,
            stealthAddresses,
            safeVersion: "1.3.0",
            safeProxyBytecode:
              "0x608060405234801561001057600080fd5b506040516101e63803806101e68339818101604052602081101561003357600080fd5b8101908080519060200190929190505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156100ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806101c46022913960400191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060ab806101196000396000f3fe608060405273ffffffffffffffffffffffffffffffffffffffff600054167fa619486e0000000000000000000000000000000000000000000000000000000060003514156050578060005260206000f35b3660008037600080366000845af43d6000803e60008114156070573d6000fd5b3d6000f3fea2646970667358221220d1429297349653a4918076d650332de1a1068c5f3e07c5c82360c277770b955264736f6c63430007060033496e76616c69642073696e676c65746f6e20616464726573732070726f7669646564",
            useDefaultAddress: true,
          });
        console.log(
          "stealthSafeAddressWithBytecode",
          stealthSafeAddressWithBytecode
        );

        await deployFluidKeyStealthAddress(EOA, smartAccountClient);

        await fetch(`/api/accounts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            address: stealthAddress,
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
            maxLength={20}
            label="Gnosis Pay address"
            placeholder="0x1234..."
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
          signMessage({
            message: fluidkeyMessage(walletClient?.account.address!, "1234"),
          })
        }
      >
        {accountType === "gnosis_pay" ? "Connect Gnosis Pay" : "Create"}
      </Button>
    </div>
  );
}

export default CreateAccountPage;
