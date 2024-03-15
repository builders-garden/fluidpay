import { useGetSmartAccountTransfers } from "@sefu/react-sdk";

function FluidkeyTransactions({
  idSmartAccount,
  chainId,
}: {
  idSmartAccount: string;
  chainId: number;
}) {
  const { data: transactions } = useGetSmartAccountTransfers({
    idSmartAccount,
    chainId,
  });

  if (transactions && transactions.length === 0) {
    return <p>No transactions yet</p>;
  }

  return <div />;
}

export default FluidkeyTransactions;
