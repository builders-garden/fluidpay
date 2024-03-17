"use client";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  cn,
} from "@nextui-org/react";
import {
  useConfirmTransferOut,
  useGenerateTransferOutQuote,
  useGetSmartAccountTransfers,
  useGetUserSmartAccounts,
} from "@sefu/react-sdk";
import { ArrowLeft, Cog, Copy, Eye, EyeOff, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatAddress } from "@/lib/utils";
import { base } from "viem/chains";
import Transfers from "@/components/transfers";
import { usePublicClient, useWalletClient } from "wagmi";
import { getSmartAccount, getSmartAccountClient } from "@/lib/smart-accounts";
import "@/app/polyfills";
import { crossChainDepositOnGnosisPay } from "@/lib/contracts";

const bgColors = [
  "bg-yellow-500",
  "bg-green-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-blue-gray-500",
  "bg-cyan-500",
];

function AccountsPage() {
  const router = useRouter();
  const { user } = useDynamicContext();
  const { smartAccountList } = useGetUserSmartAccounts();
  const { data: transferQuote, requestQuote } = useGenerateTransferOutQuote();
  const { confirmTransferOut } = useConfirmTransferOut();
  const mainAccount =
    smartAccountList !== undefined ? smartAccountList[0] : null;
  const { data } = useGetSmartAccountTransfers({
    idSmartAccount: mainAccount?.idSmartAccount || "",
    chainId: base.id,
    polling: true,
  });
  const [accounts, setAccounts] = useState<any[]>([]);
  const { data: walletClient } = useWalletClient();
  const jwt = getAuthToken();
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showDepositOnGnosisPay, setShowDepositOnGnosisPay] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const publicClient = usePublicClient();

  const transferToSafeSmartAccount = async () => {
    const safeAccount = await getSmartAccount(walletClient, publicClient);
    const quote = await requestQuote({
      amount: BigInt(depositAmount!) * BigInt(10 ** 6),
      to: safeAccount.address,
      idSmartAccount: mainAccount?.idSmartAccount || "",
      chainId: base.id,
      idToken: process.env.NEXT_PUBLIC_USDC_TOKEN_ID!,
      epochControlStructure: 0,
    });

    const confirmedQuote = await confirmTransferOut({
      idWithdrawalProcedure: quote?.withdrawalProcedure?.idWithdrawalProcedure!,
    });
  };

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

  const depositOnGnosisPay = async () => {
    setLoading(true);
    try {
      console.log("Transfering USDC to Safe Smart Account")
      await transferToSafeSmartAccount();
      console.log("Depositing to Gnosis Pay")
      await crossChainDepositOnGnosisPay(
        depositAmount,
        selectedCard.address,
        walletClient
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setShowDepositOnGnosisPay(false);
    }
  };

  if (selectedCard) {
    return (
      <div className="flex flex-col p-4 bg-[#502931] space-y-4 h-full relative">
        <div className="h-2/5 w-full">
          <Button
            variant="light"
            className="w-min"
            radius="full"
            isIconOnly
            onPress={() => {
              setSelectedCard(null);
              setShowDetails(false);
            }}
          >
            <ArrowLeft />
          </Button>
          <div className="flex flex-col items-center justify-center mt-4">
            <div
              className={`${bgColors[selectedIndex || 0]} rounded-xl h-[202px] w-[357px] flex flex-col justify-between p-4`}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <p className="text-white text-xl font-bold leading-none">
                    {selectedCard.name}
                  </p>
                  <div className="flex flex-row items-center space-x-1">
                    <p className="leading-none text-xs font-medium">
                      {selectedCard.slug}.{user?.username}.fluidpay.eth
                    </p>
                    <Copy
                      size={10}
                      className="cursor-pointer"
                      onClick={() => {
                        // copy to clipboard
                        if (typeof navigator !== "undefined") {
                          navigator.clipboard.writeText(
                            `${selectedCard.slug}.${user?.username}.fluidpay.eth`
                          );
                        }
                      }}
                    />
                  </div>
                </div>
                <p className="text-white font-medium">
                  ${parseFloat(selectedCard.balance).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-row items-end justify-between">
                {!showDetails && (
                  <p className="leading-none text-sm font-medium">
                    {formatAddress(selectedCard.address)}
                  </p>
                )}
                {showDetails && (
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center space-x-1">
                        <p className="font-semibold text-sm">Address</p>
                        <Copy
                          size={10}
                          className="cursor-pointer"
                          onClick={() => {
                            // copy to clipboard
                            if (typeof navigator !== "undefined") {
                              navigator.clipboard.writeText(
                                selectedCard.address
                              );
                            }
                          }}
                        />
                      </div>
                      <p className="leading-none text-xs overflow-clip">
                        {selectedCard.address}
                      </p>
                    </div>
                  </div>
                )}
                {!showDetails && (
                  <img src="/cards/fluidpay.svg" width={63} height={38} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#161618] absolute bottom-0 left-0 w-full h-3/5 rounded-t-[40px] py-8">
          <div className="flex flex-row items-center justify-center space-x-12">
            {!showDetails && (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  isIconOnly
                  radius="full"
                  size="lg"
                  onPress={() => setShowDetails(true)}
                >
                  <Eye />
                </Button>
                <p className="font-bold">Show details</p>
              </div>
            )}
            {showDetails && (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  isIconOnly
                  color="primary"
                  radius="full"
                  size="lg"
                  onPress={() => setShowDetails(false)}
                >
                  <EyeOff />
                </Button>
                <p className="font-bold">Hide details</p>
              </div>
            )}
            <div className="flex flex-col items-center justify-center space-y-2">
              <Button isIconOnly radius="full" size="lg">
                <Cog />
              </Button>
              <p className="font-bold">Settings</p>
            </div>
            {selectedCard.type === "gnosis_pay" && (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  isIconOnly
                  radius="full"
                  size="lg"
                  onPress={() => setShowDepositOnGnosisPay(true)}
                >
                  <Plus />
                </Button>
                <p className="font-bold">Deposit</p>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2 bg-[#232324] rounded-xl p-4 mx-4 mt-12 max-h-[300px] overflow-y-scroll">
            <Transfers
              transfers={data.filter(
                (transfer) =>
                  transfer.stealthSafeTransfer?.from.toLowerCase() ===
                    selectedCard.address.toLowerCase() ||
                  transfer.stealthSafeTransfer?.to.toLowerCase() ===
                    selectedCard.address.toLowerCase()
              )}
            />
          </div>
        </div>
        {showDepositOnGnosisPay && (
          <Modal
            backdrop={"blur"}
            isOpen={showDepositOnGnosisPay}
            onClose={() => setShowDepositOnGnosisPay(false)}
            isDismissable={false}
          >
            <ModalContent>
              <ModalBody>
                <div className="flex flex-col items-center justify-center pt-4 space-y-2">
                  Deposit to Gnosis Pay
                </div>
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button
                  color="primary"
                  onPress={() => depositOnGnosisPay()}
                  className="font-semibold w-full"
                  isLoading={loading}
                >
                  Deposit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    );
  }

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
      {accounts.length > 0 && (
        <div className="bg-[#D9D9D9] bg-opacity-10 rounded-lg flex flex-col space-y-4 p-2 max-h-[400px] overflow-y-scroll">
          {accounts.map((account, index) => (
            <Button
              className="flex flex-row items-center justify-between p-4 py-6"
              key={account.id}
              variant="light"
              onPress={() => {
                setSelectedCard(account);
                setSelectedIndex(index);
              }}
              // radius="none"
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
                      `${bgColors[index % 10]}`
                    )}
                  ></div>
                )}
                <div className="flex flex-col space-y-1 items-start">
                  <p className="leading-none font-semibold">{account.name}</p>
                  <p className="text-[#8F8F91] leading-none font-medium">
                    {formatAddress(account.address)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 items-end">
                {account.type === "usdc_centric" && (
                  <div className="bg-[#21E9B7]/60 rounded-md p-1">
                    <p className="leading-none font-semibold text-xs">
                      USDC-centric
                    </p>
                  </div>
                )}
                {account.type === "save_and_earn" && (
                  <div className="bg-[#FFA748]/60 rounded-md p-1">
                    <p className="leading-none font-semibold text-xs">
                      Save & Earn
                    </p>
                  </div>
                )}
                {account.type === "gnosis_pay" && (
                  <div className="bg-[#CDDF52] rounded-md p-1">
                    <p className="leading-none font-semibold text-xs text-black">
                      Gnosis Pay
                    </p>
                  </div>
                )}
                <p className="text-[#8F8F91] leading-none font-medium">
                  ${parseFloat(account.balance).toFixed(2)}
                </p>
              </div>
            </Button>
          ))}
        </div>
      )}
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
