export interface TransactionSample {
  id: "native" | "erc20" | "erc721";
  label: string;
  transaction: Record<string, unknown>;
}

export const transactionSamples: TransactionSample[] = [
  {
    id: "native",
    label: "Native transfer",
    transaction: {
      chainId: 1,
      from: "0x1111111111111111111111111111111111111111",
      to: "0x2222222222222222222222222222222222222222",
      value: "10000000000000000",
      data: "0x",
    },
  },
  {
    id: "erc20",
    label: "ERC-20 approval",
    transaction: {
      chainId: 1,
      from: "0x1111111111111111111111111111111111111111",
      to: "0x3333333333333333333333333333333333333333",
      value: "0",
      data: "0x095ea7b3000000000000000000000000444444444444444444444444444444444444444400000000000000000000000000000000000000000000000000000000000f4240",
      contract: { tokenStandard: "erc20" },
    },
  },
  {
    id: "erc721",
    label: "ERC-721 transfer",
    transaction: {
      chainId: 1,
      from: "0x1111111111111111111111111111111111111111",
      to: "0x5555555555555555555555555555555555555555",
      value: "0",
      data: "0x23b872dd00000000000000000000000011111111111111111111111111111111111111110000000000000000000000002222222222222222222222222222222222222222000000000000000000000000000000000000000000000000000000000000002a",
      contract: { tokenStandard: "erc721" },
    },
  },
];

export function formatSample(sample: TransactionSample) {
  return JSON.stringify(sample.transaction, null, 2);
}
