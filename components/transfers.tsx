import { formatAddress, formatBigInt } from "@/lib/utils";
import { SmartAccountTransfer } from "@sefu/react-sdk";
import { SmartAccountTransferDirection } from "@sefu/react-sdk/lib/core/graphql/codegen/generatedTS/graphql";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
import { ArrowDown, ArrowUp } from "lucide-react";
TimeAgo.addDefaultLocale(en);

export default function Transfers({
  transfers,
}: {
  transfers: SmartAccountTransfer[];
}) {
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className="flex flex-col space-y-2 bg-[#161618] rounded-xl p-4">
      {transfers.map((transfer) => (
        <div
          key={transfer.stealthSafeTransfer?.txHash}
          className="flex flex-row justify-between items-center"
        >
          <div className="flex flex-row space-x-4 items-center">
            {
              // display the direction of the transfer
              transfer.direction === SmartAccountTransferDirection.Incoming ? (
                <ArrowDown size={24} color="green" />
              ) : (
                <ArrowUp size={24} color="red" />
              )
            }
            <div className="flex flex-col">
              <p className="text-lg">
                {formatAddress(
                  transfer.direction === SmartAccountTransferDirection.Incoming
                    ? transfer.stealthSafeTransfer?.from!
                    : transfer.stealthSafeTransfer?.to!
                )}
              </p>
              {
                // format date to a readable format
              }
              <p className="text-sm text-gray-500">
                {timeAgo.format(transfer.createdAt * 1000)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-lg">${formatBigInt(transfer.amount, 6)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
