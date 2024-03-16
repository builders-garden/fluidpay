"use client";

import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { Button, Input } from "@nextui-org/react";
import { ArrowLeft, Search } from "lucide-react";
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
    console.log(usersRes);
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
    </div>
  );
}

export default SendPage;
