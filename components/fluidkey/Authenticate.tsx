import { useAuthenticate } from "@sefu/react-sdk";

function FluidkeyAuthenticate({
  isAddressRegistered,
  initializedWalletAddress,
}: {
  isAddressRegistered: boolean;
  initializedWalletAddress: string;
}) {
  const {
    isAuthenticated,
    authenticate,
    setAuthToken,
    isError: isErrorAuthenticate,
    isLoading,
  } = useAuthenticate();
  const authenticateFluidkeyClient = () => {
    if (isAddressRegistered && !!initializedWalletAddress) authenticate();
  };

  if (isLoading) {
    return <div>Authenticating...</div>;
  }

  return (
    <div>
      <button onClick={authenticateFluidkeyClient}>Authenticate</button>
    </div>
  );
}

export default FluidkeyAuthenticate;
