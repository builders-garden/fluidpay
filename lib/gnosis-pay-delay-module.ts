import { createPublicClient, getAddress, http } from "viem";
import { gnosis } from "viem/chains";

import { SAFE_ABI } from "./abi-safe";
import { isDelayModule, isRolesModule } from "./gnosis-pay";

const publicClient = createPublicClient({
  chain: gnosis,
  transport: http(),
});

export async function getGnosisPayModules(address: string) {
  const SENTINEL_ADDRESS = "0x0000000000000000000000000000000000000001";

  let [moduleAddresses] = (await publicClient.readContract({
    abi: SAFE_ABI,
    address: getAddress(address),
    functionName: "getModulesPaginated",
    args: [SENTINEL_ADDRESS, 10],
  })) as unknown as string[][];
  const modules = await Promise.all(
    moduleAddresses.map(async (address: string) => ({
      address,
      bytecode: await publicClient.getBytecode({
        address: address as `0x${string}`,
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
