"use client";
import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { Avatar, Button, Input } from "@nextui-org/react";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SendPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const jwt = getAuthToken();

  useEffect(() => {
    if (!username) setUsers([]);
    if (username.length > 0) fetchUsers(username);
  }, [username]);

  const fetchUsers = async (username: string) => {
    const res = await fetch(`/api/users?username=${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const usersRes = await res.json();
    setUsers(usersRes);
  };

  return (
    <div className="flex flex-col p-4 bg-[#000] space-y-4 h-full">
      <div className="flex flex-row space-x-2">
        <Button
          variant="light"
          className="w-min"
          radius="full"
          isIconOnly
          onPress={() => {
            router.push("/home");
          }}
        >
          <ArrowLeft />
        </Button>
        <Input
          startContent={<Search />}
          placeholder="Search.."
          isClearable
          value={username}
          onValueChange={(val) => setUsername(val)}
        />
      </div>
      {users.length === 0 && username.length > 0 && <p>No users found!</p>}
      <div className="flex flex-col space-y-1">
        {users.map((user) => (
          <div
            className="flex flex-row space-x-4 items-center justify-between cursor-pointer hover:bg-white/10 rounded-lg p-2 group"
            key={user.id}
            onClick={() => router.push(`/pay/${user.username}`)}
          >
            <div className="flex flex-row space-x-2 items-center">
              <Avatar name={user.username.substring(0, 1).toUpperCase()} />
              <p className="font-semibold">{user.username}</p>
            </div>
            <ChevronRight size={12} className="text-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SendPage;
