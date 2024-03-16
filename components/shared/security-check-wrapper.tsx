"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  useAuthenticate,
  useFluidkeyClient,
  useGenerateKeys,
} from "@sefu/react-sdk";
import { Lock } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useWalletClient } from "wagmi";

function SecurityCheckModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { authenticate } = useAuthenticate();
  const { data: walletClient } = useWalletClient();
  const { generateKeys } = useGenerateKeys();

  const generateKeysAndAuthenticate = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      await generateKeys(walletClient, "fluidpay");
      await authenticate();
      onOpenChange();
    } catch (error) {
      console.error("Error generating keys", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      backdrop={"blur"}
      isOpen={isOpen}
      onClose={onOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="flex flex-col items-center justify-center pt-4 space-y-2">
                <Lock enableBackground={"white"} />
                <h3 className="text-xl font-semibold">Security Check</h3>
              </div>
              <p>
                You need to generate a new pair of keys to continue using
                fluidpay. This maybe annoying, but it&apos;s for your own
                privacy and security.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => generateKeysAndAuthenticate()}
                className="font-semibold"
                isLoading={loading}
              >
                Generate
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function SecurityCheckWrapper(props: { children: ReactNode }) {
  const { isOpen, onOpenChange } = useDisclosure();
  const { user } = useDynamicContext();
  const { isAuthenticated } = useAuthenticate();
  const fluidkeyClient = useFluidkeyClient();
  const keys = fluidkeyClient!.areMetaStealthKeysInitialized();

  useEffect(() => {
    if (!isAuthenticated && !keys && user && !user.newUser) {
      onOpenChange();
    }
  }, [user, isAuthenticated]);

  return (
    <>
      {props.children}
      <SecurityCheckModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default SecurityCheckWrapper;
