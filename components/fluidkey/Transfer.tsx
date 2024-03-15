import {
  useConfirmTransferOut,
  useGenerateTransferOutQuote,
} from "@sefu/react-sdk";
import { useState } from "react";

function FluidkeyTransfer({
  idSmartAccount,
  chainId,
}: {
  idSmartAccount: string;
  chainId: number;
}) {
  const { data: transferQuote, requestQuote } = useGenerateTransferOutQuote();
  const { confirmTransferOut } = useConfirmTransferOut();
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");

  const transfer = async () => {
    const quote = await requestQuote({
      amount: BigInt(amount),
      to: recipient,
      idSmartAccount,
      chainId,
      idToken: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
      epochControlStructure: 0,
    });

    const confirmedQuote = await confirmTransferOut({
      idWithdrawalProcedure: quote?.withdrawalProcedure?.idWithdrawalProcedure!,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient address"
      ></input>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Amount"
      ></input>
      <button onClick={() => transfer()}>Transfer</button>
    </div>
  );
}

export default FluidkeyTransfer;
