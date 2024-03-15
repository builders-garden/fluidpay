import { useGenerateStealthAddress } from "@sefu/react-sdk";

const FluidkeyGenerateStealthAddress = ({
  idSmartAccount,
}: {
  idSmartAccount: string;
}) => {
  const { stealthAddressCreated, generateNewStealthAddress } =
    useGenerateStealthAddress({
      idSmartAccount,
    });

  return (
    <button
      onClick={async () => {
        const result = await generateNewStealthAddress();
        console.log(result);
      }}
    >
      Generate New Stealth Address
    </button>
  );
};

export default FluidkeyGenerateStealthAddress;
