import { getUsers } from "@/lib/dynamic-api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }
  const users = await getUsers(username);
  // filter users with a username that starts with the "username" query parameter
  const filteredUsers = users
    .filter((user) =>
      user.username?.toLowerCase().startsWith(username?.toLowerCase())
    )
    .map((user) => ({
      username: user.username,
      address: user.walletPublicKey,
    }));

  return NextResponse.json(filteredUsers);
};
