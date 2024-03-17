import { simulateContract, waitForTransactionReceipt } from "viem/actions";
import {
  SAFE_ABI,
  SAFE_FACTORY_ABI,
  SAFE_FACTORY_ADDRESS,
  SINGLETON_ADDRESS,
} from "./safe";
import {
  WalletClient,
  decodeEventLog,
  encodeFunctionData,
  erc20Abi,
  getContract,
} from "viem";
import { publicClient } from "./config";
import "@/app/polyfills";
import {
  EURE_TOKEN_ADDRESS,
  USDC_TOKEN_ADDRESS,
  getBridgeTransaction,
} from "./lifi";
import { getSmartAccountClient } from "./smart-accounts";

export const deployFluidKeyStealthAddress = async (
  address: `0x${string}`,
  walletClient: WalletClient,
  smartAccountClient: any,
  { isUSDCCentric = false, isSaveAndEarn = false }
) => {
  const randomNonce =
    Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

  const args = [
    [address],
    1,
    "0x0000000000000000000000000000000000000000",
    "0x",
    "0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
  ];

  const initializer = encodeFunctionData({
    abi: SAFE_ABI,
    functionName: "setup",
    args,
  });

  const { request, result } = await simulateContract(walletClient, {
    address: SAFE_FACTORY_ADDRESS,
    abi: SAFE_FACTORY_ABI,
    functionName: "createProxyWithNonce",
    args: [
      "0x41675C099F32341bf84BFc5382aF534df5C7461a",
      initializer,
      randomNonce,
    ],
  });

  const safeFactory = getContract({
    address: SAFE_FACTORY_ADDRESS,
    abi: SAFE_FACTORY_ABI,
    client: {
      public: publicClient,
      wallet: smartAccountClient,
    },
  });

  // @ts-ignore
  const hash = await safeFactory.write.createProxyWithNonce([
    SINGLETON_ADDRESS,
    initializer,
    randomNonce,
  ]);

  console.log(hash);

  const receipt = await waitForTransactionReceipt(publicClient, {
    hash: hash,
  });

  let stealthAddress = "";
  for (let i = 0; i < receipt.logs.length; i++) {
    const log = receipt.logs[i];
    if (
      log.topics.length === 2 &&
      log.topics.includes(
        "0x4f51faf6c4561ff95f067657e43439f0f856d97c04d9ec9070a6199ad418e235"
      )
    ) {
      const { args } = decodeEventLog({
        abi: SAFE_FACTORY_ABI,
        data: log.data,
        topics: log.topics,
      });
      // @ts-ignore
      stealthAddress = args.proxy;
    }
  }

  if (stealthAddress) {
    const safeContract = getContract({
      address: stealthAddress as `0x${string}`,
      abi: SAFE_ABI,
      client: {
        public: publicClient,
        wallet: smartAccountClient,
      },
    });
    const usdcContract = getContract({
      address: USDC_TOKEN_ADDRESS,
      abi: erc20Abi,
      client: {
        public: publicClient,
        wallet: smartAccountClient,
      },
    });
    if (isUSDCCentric || isSaveAndEarn) {
      // @ts-ignore
      const hash = await safeContract.write.enableModule([SINGLETON_ADDRESS]);

      await waitForTransactionReceipt(publicClient, { hash });
    }

    if (isUSDCCentric) {
      // @ts-ignore
      const approveHash = await usdcContract.write.approve([
        "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb", // PancakeSwap
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      ]);

      await waitForTransactionReceipt(publicClient, { hash: approveHash });
    }

    if (isSaveAndEarn) {
      // @ts-ignore
      const approveHash = await usdcContract.write.approve([
        "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5", // AAVE
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      ]);

      await waitForTransactionReceipt(publicClient, { hash: approveHash });
    }
  }

  return stealthAddress;
};

export const crossChainDepositOnGnosisPay = async (
  amount: string,
  receiver: string,
  walletClient: any
) => {
  const lifiRes = await getBridgeTransaction(
    amount,
    receiver,
    walletClient?.account!.address
  );
  const safeSmartAccountClient = await getSmartAccountClient(
    walletClient,
    publicClient
  );
  const eureContract = getContract({
    address: EURE_TOKEN_ADDRESS,
    abi: erc20Abi,
    client: {
      public: publicClient,
      wallet: safeSmartAccountClient,
    },
  });
  const approveHash = await eureContract.write.approve([
    lifiRes?.to as `0x${string}`,
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" as any,
  ]);
  const txHash = await safeSmartAccountClient.sendTransaction(lifiRes as any);
  console.log(txHash);
};
