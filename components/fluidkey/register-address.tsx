import { useRegisterUser } from "@sefu/react-sdk";
import { useWalletClient } from "wagmi";

function FluidkeyRegisterAddress({
  connectedAddress,
  initializedWalletAddress,
  refetchRegistration,
}: {
  connectedAddress: string;
  initializedWalletAddress: string;
  refetchRegistration: () => Promise<boolean | undefined>;
}) {
  const { data: walletClient } = useWalletClient();
  const {
    registerUser,
    error: errorRegisterUser,
    isLoading: isLoadingRegisterUser,
    isError: isErrorRegisterUser,
  } = useRegisterUser();
  const launchRegistration = async () => {
    if (initializedWalletAddress === connectedAddress) {
      const result = await registerUser({
        // @ts-ignore
        walletClient,
        whitelistCode: "RR8HL2",
      });
      await refetchRegistration();
    }
  };
  if (isLoadingRegisterUser) {
    return <div>Registering user...</div>;
  }
  return (
    <div>
      <button onClick={launchRegistration}>Register</button>
    </div>
  );
}

export default FluidkeyRegisterAddress;
