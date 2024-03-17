export const formatBigInt = (
  value: string | number | bigint,
  units: number
) => {
  const result = BigInt(value) / BigInt(10 ** (units - 2));
  return (Number(result) / 100).toFixed(2);
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
