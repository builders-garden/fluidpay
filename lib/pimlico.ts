import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
  transport: http("https://base.llamarpc.com"),
});

export const paymasterClient = createPimlicoPaymasterClient({
  transport: http(
    `https://api.pimlico.io/v2/base/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
  ),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

export const bundlerClient = createPimlicoBundlerClient({
  transport: http(
    `https://api.pimlico.io/v1/base/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
  ),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});
