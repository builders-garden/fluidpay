import { FLUIDKEY_HYDRATOR_ABI } from "./abi";
import { account, publicClient, walletClient } from "./config";

const FLUIDKEY_HYDRATOR_ADDRESS = `0x1a93629bfcc6e9c7241e587094fae26f62503fad`;

export const deployFluidKeyStealthAddress = async (address: `0x${string}`) => {
  const { request } = await publicClient.simulateContract({
    account,
    address: FLUIDKEY_HYDRATOR_ADDRESS,
    abi: FLUIDKEY_HYDRATOR_ABI,
    args: [address as `0x${string}`],
    functionName: "deploySafe",
  });
  await walletClient.writeContract(request);
};
