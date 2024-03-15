import { useGenerateKeys } from "@sefu/react-sdk";
import { useState } from "react";
import { useWalletClient } from "wagmi";

function FluidkeyGenerateKeys() {
  const { generateKeys } = useGenerateKeys();
  const { data: walletClient } = useWalletClient();
  const [secret, setSecret] = useState<string>("");
  const launchKeyGeneration = () => {
    // @ts-ignore
    generateKeys(walletClient, secret);
  };
  return (
    <div>
      <input
        type="password"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      ></input>
      <button onClick={launchKeyGeneration}>Generate keys</button>
    </div>
  );
}

export default FluidkeyGenerateKeys;
