export const formatBigInt = (
  value: string | number | bigint,
  units: number
) => {
  return parseFloat(
    (BigInt(value) / BigInt(10 ** units)).toLocaleString()
  ).toFixed(2);
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
