import { supabase, supabaseAdmin } from "../supabase";

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

export const upsertAccount = async (account: Omit<Account, "id">) => {
  const { data, error } = await supabaseAdmin.from("accounts").upsert(account, {
    onConflict: "address",
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getUserAccounts = async (username: string) => {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("owner_username", username);
  if (error) {
    throw error;
  }
  return data;
};

export const getAccount = async (address: string) => {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("address", address)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const updateAccountName = async (
  address: string,
  ownerUsername: string,
  name: string
) => {
  const { data, error } = await supabase
    .from("accounts")
    .update({ name })
    .eq("owner_username", ownerUsername)
    .eq("address", address);
  if (error) {
    throw error;
  }
  return data;
};
