import { supabase } from "../supabase";

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

export const createRecord = async (record: Omit<Record, "id">) => {
  const { data, error } = await supabase.from("records").upsert(record, {
    onConflict: "id",
  });
  if (error) {
    throw error;
  }
  return data;
};
