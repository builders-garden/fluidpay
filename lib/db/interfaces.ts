export enum AccountType {
  STANDARD = "standard",
  USDC_CENTRIC = "usdc_centric",
  SAVE_AND_EARN = "save_and_earn",
  GNOSIS_PAY = "gnosis_pay",
}

export interface Account {
  id: string;
  slug: string;
  address: string;
  owner_username: string;
  name: string;
  type: AccountType;
}

export interface Record {
  id: string;
  owner: string;
  name: string;
  contenthash: string;
  addresses?: {
    [key: string]: `0x${string}`;
  };
  texts: string;
}
