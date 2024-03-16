export const getUsers = async (username: string) => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.DYNAMIC_API_TOKEN}` },
  };

  const filterObject = {
    filterColumn: "username",
    filterValue: username,
  };

  const url = new URL(
    `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID}/users`
  );
  const res = await fetch(url, options);

  const data = await res.json();

  return data?.users || [];
};
