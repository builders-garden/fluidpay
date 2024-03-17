import { getContract, padHex } from "viem";

import { FLUIDKEY_HYDRATOR_ABI } from "./abi";
import { publicClient } from "./config";
import { waitForTransactionReceipt } from "viem/actions";

const FLUIDKEY_HYDRATOR_ADDRESS = `0x1a93629bfcc6e9c7241e587094fae26f62503fad`;

export const deployFluidKeyStealthAddress = async (
  address: `0x${string}`,
  smartAccountClient: any
) => {
  const encodedAddress = padHex(address, { dir: "right", size: 32 });

  // @ts-ignore
  const hydratorContract = getContract({
    address: FLUIDKEY_HYDRATOR_ADDRESS,
    abi: FLUIDKEY_HYDRATOR_ABI,
    client: {
      public: publicClient,
      wallet: smartAccountClient,
    },
  });

  // @ts-ignore
  const txHash = await hydratorContract.write.deploySafe([
    encodedAddress,
  ] as readonly unknown[]);

  const receipt = await waitForTransactionReceipt(publicClient, {
    hash: txHash,
  });

  console.log(receipt.logs);
};
