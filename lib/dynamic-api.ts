interface Session {
  id: string;
}

interface Wallet {
  id: string;
  name: string;
  chain: string;
  publicKey: string;
  provider: string;
}

export interface DynamicUser {
  id: string;
  projectEnvironmentId: string;
  email: string;
  username: string;
  firstVisit: string;
  lastVisit: string;
  metadata: Record<string, unknown>;
  walletPublicKey: string;
  wallet: string;
  chain: string;
  createdAt: string;
  updatedAt: string;
  sessions: Session[];
  wallets: Wallet[];
  oauthAccounts: any[];
}

export const getUsers = async (username: string): Promise<DynamicUser[]> => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.DYNAMIC_API_TOKEN}` },
  };

  const url = new URL(
    `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID}/users`
  );
  const res = await fetch(url, options);

  const data = await res.json();

  return data?.users || [];
};
