import { supabase, supabaseAdmin } from "../supabase";

export interface Record {
  id: string;
  owner: string;
  name: string;
  contenthash: string;
  addresses?: string[];
  text: string;
}

export const getRecord = async (id: string) => {
  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

export const upsertRecord = async (record: Omit<Record, "id">) => {
  const { data, error } = await supabaseAdmin.from("records").upsert(record, {
    onConflict: "name",
  });
  if (error) {
    throw error;
  }
  return data;
};
