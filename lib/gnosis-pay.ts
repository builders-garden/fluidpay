import { concat, encodeFunctionData, encodePacked, getAddress } from "viem";

import { DELAY_MOD_ABI } from "./abi-delay-module";

const DELAY_MOD_MASTERCOPY = "0x4A97E65188A950Dd4b0f21F9b5434dAeE0BBF9f5";
const ROLES_MOD_MASTERCOPY = "0x9646fDAD06d3e24444381f44362a3B0eB343D337";

export function isGenericProxy(bytecode: string) {
  if (bytecode.length !== 92) return false;
  return (
    bytecode.startsWith("0x363d3d373d3d3d363d73") &&
    bytecode.endsWith("5af43d82803e903d91602b57fd5bf3")
  );
}

export function getGenericProxyMastercopy(bytecode: string) {
  if (!isGenericProxy(bytecode)) return null;
  return "0x" + bytecode.substring(22, 22 + 40);
}

export function isDelayModule(bytecode: string) {
  return (
    getAddress(getGenericProxyMastercopy(bytecode)!) ===
    getAddress(DELAY_MOD_MASTERCOPY)
  );
}

export function isRolesModule(bytecode: string) {
  return (
    getAddress(getGenericProxyMastercopy(bytecode)!) ===
    getAddress(ROLES_MOD_MASTERCOPY)
  );
}

export function saltFromTimestamp() {
    return encodePacked(["uint256"], [BigInt(Date.now())]);
}

export function typedDataForModifierTransaction(
    { modifier, chainId }: { modifier: any, chainId: any },
    { data, salt }: { data: any, salt: any }
) {
  const domain = { verifyingContract: modifier, chainId };
  const primaryType = "ModuleTx";
  const types = {
    ModuleTx: [
      { type: "bytes", name: "data" },
      { type: "bytes32", name: "salt" },
    ],
  };
  const message = {
    data,
    salt,
  };

  return { domain, primaryType, types, message };
}

export async function queueDelayedTx({ moduleAddress }: { moduleAddress: string }, tx: any, sign: any) {
  const { to, value, data } = {
    to: moduleAddress,
    value: 0,
    data: encodeFunctionData({
      abi: DELAY_MOD_ABI,
      functionName: "execTransactionFromModule",
      args: [
        tx.to,
        tx.value || 0,
        tx.data,
        0, // Call
      ],
    }),
  };

  const salt = saltFromTimestamp();
  const { domain, primaryType, types, message } =
    typedDataForModifierTransaction(
      { modifier: moduleAddress, chainId: 100 },
      { data, salt }
    );

  const signature = await sign({ domain, primaryType, types, message });

  return { to, value, data: concat([data, salt, signature]) };
}