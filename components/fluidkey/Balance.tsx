import { useGetSmartAccountBalance } from "@sefu/react-sdk";

function FluidkeyBalance({
  idSmartAccount,
  chainId,
}: {
  idSmartAccount: string;
  chainId: number;
}) {
  const { data: balances } = useGetSmartAccountBalance({
    idSmartAccount,
    chainId,
  });

  if (balances && balances.length === 0) {
    return <p>No balances yet</p>;
  }

  return <div />;
}

export default FluidkeyBalance;
