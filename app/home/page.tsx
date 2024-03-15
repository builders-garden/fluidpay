import { Button } from "@nextui-org/react";
import { Download, Plus, Send } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col space-y-12 bg-gradient-to-b from-[#0061FF] h-full to-[#000] from-0% to-60% p-4">
      <div className="flex flex-row justify-between items-center">
        <div>A</div>
        <div>C</div>
      </div>
      <div className="flex flex-col items-center text-center py-8">
        <p className="text-xl">Base • USDC</p>
        <div className="font-bold">
          $<span className="text-6xl">50</span>.00
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-16">
        <div className="flex-flex-col text-center space-y-2">
          <Button isIconOnly radius="full" size="lg">
            <Plus />
          </Button>
          <p className="text-xs">Deposit</p>
        </div>
        <div className="flex-flex-col text-center space-y-2">
          <Button isIconOnly radius="full" size="lg">
            <Download />
          </Button>
          <p className="text-xs">Request</p>
        </div>
        <div className="flex-flex-col text-center space-y-2">
          <Button isIconOnly radius="full" size="lg">
            <Send />
          </Button>
          <p className="text-xs">Send</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 bg-[#161618] rounded-xl p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div>A</div>
            <div className="flex flex-col">
              <p className="text-lg">frankc - dinner out burger</p>
              <p className="text-sm text-gray-500">Today, 13:00</p>
            </div>
          </div>
          <div>
            <p className="text-lg">$10.00</p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div>A</div>
            <div className="flex flex-col">
              <p className="text-lg">frankc - dinner out burger</p>
              <p className="text-sm text-gray-500">Today, 13:00</p>
            </div>
          </div>
          <div>
            <p className="text-lg">$10.00</p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div>A</div>
            <div className="flex flex-col">
              <p className="text-lg">frankc - dinner out burger</p>
              <p className="text-sm text-gray-500">Today, 13:00</p>
            </div>
          </div>
          <div>
            <p className="text-lg">$10.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
