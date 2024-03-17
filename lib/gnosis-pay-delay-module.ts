import { createPublicClient, createWalletClient, http } from "viem";
import { gnosis } from "viem/chains";

import { SAFE_ABI } from "./abi-safe";
import { isDelayModule, isRolesModule } from "./gnosis-pay.js";

const publicClient = createPublicClient({
  chain: gnosis,
  transport: http(),
});

export async function getGnosisPayModules(address: string) {
  const SENTINEL_ADDRESS = "0x0000000000000000000000000000000000000001";


  let moduleAddresses = await publicClient.readContract({
    abi: SAFE_ABI,
    address: `0x${address}`,
    functionName: "getModulesPaginated",
    args: [SENTINEL_ADDRESS, 10],
  }) as string[];
  const modules = await Promise.all(
    moduleAddresses.map(async (address) => ({
      address: `0x${address}`,
      bytecode: await publicClient.getBytecode({
        address: `0x${address}`,
      }),
    }))
  );

  const delayMod = modules.find((module) =>
    isDelayModule(module.bytecode!)
  )?.address;

  const rolesMod = modules.find((module) =>
    isRolesModule(module.bytecode!)
  )?.address;

  return { delayMod, rolesMod };
}