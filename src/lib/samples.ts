import type {
  CelerCbridgeBridge,
  CircleCctpV1TokenMessenger,
  LayerZeroV2Oft,
  TransactionInput,
  UniswapUniversalRouter,
  UniswapV3Router,
} from "@ruban-labs/web3-tx-parser";

export type SampleGroupId = "transfers" | "permissions" | "nfts" | "swaps" | "bridges" | "fallbacks";

export interface TransactionSample {
  id: string;
  group: SampleGroupId;
  label: string;
  summary: string;
  source: "confirmed mainnet" | "controlled input";
  transaction: TransactionInput;
}

export interface SampleGroup {
  id: SampleGroupId;
  title: string;
  description: string;
}

const alice = "0x1000000000000000000000000000000000000001";
const erc20 = "0x3000000000000000000000000000000000000003";
const erc721 = "0x4000000000000000000000000000000000000004";
const erc1155 = "0x5000000000000000000000000000000000000005";
const knownAbiContract = "0x8000000000000000000000000000000000000008";
const unknownContract = "0x9000000000000000000000000000000000000009";
const zero = "0x0000000000000000000000000000000000000000";

export const uniswapV3Routers: readonly UniswapV3Router[] = [
  { chainId: 1, address: "0xE592427A0AEce92De3Edee1F18E0157C05861564" },
];

export const uniswapUniversalRouters: readonly UniswapUniversalRouter[] = [
  {
    chainId: 1,
    address: "0x66a9893cc07d91d95644aedd05d03f95e1dba8af",
    wrappedNativeToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
];

export const celerCbridgeBridges: readonly CelerCbridgeBridge[] = [
  {
    chainId: 1,
    address: "0x5427fefa711eff984124bfbb1ab6fbf5e3da1820",
    // cBridge destination ids are not assumed to be EVM chain ids.
    destinations: [{ cbridgeChainId: "42161", chainId: 42161 }],
  },
];

export const circleCctpV1TokenMessengers: readonly CircleCctpV1TokenMessenger[] = [
  {
    chainId: 1,
    address: "0xbd3fa81b58ba92a82136038b25adec7066af3155",
    // Circle domains are an independent namespace and must be bound explicitly.
    destinations: [{ domain: 3, chainId: 42161 }],
  },
];

export const layerZeroV2Ofts: readonly LayerZeroV2Oft[] = [
  {
    chainId: 1,
    address: "0x19cfce47ed54a88614648dc3f19a5980097007dd",
    // Endpoint ids are distinct from EVM chain ids.
    destinations: [{ endpointId: 30102, chainId: 56 }],
  },
];

export const sampleGroups: readonly SampleGroup[] = [
  { id: "transfers", title: "Transfers", description: "Native value and fungible-token movement." },
  { id: "permissions", title: "Permissions", description: "Allowance and operator changes." },
  { id: "nfts", title: "NFTs", description: "Single-token and ERC-1155 movement." },
  { id: "swaps", title: "Swaps", description: "Trusted router routes and fully proven settlement." },
  { id: "bridges", title: "Bridges", description: "Trusted cross-chain intents with explicit destination bindings." },
  { id: "fallbacks", title: "Fallbacks", description: "Useful outcomes when intent is not specialized." },
];

/**
 * Every entry is an eth_sendTransaction-shaped input. "Confirmed mainnet"
 * samples are fixed successful Ethereum transactions; controlled inputs make
 * edge cases legible without implying token metadata or risk information.
 */
export const transactionSamples: readonly TransactionSample[] = [
  {
    id: "mainnet-native-transfer",
    group: "transfers",
    label: "Native transfer",
    summary: "Confirmed mainnet value transfer, block 25,898,045.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x47eea90be503301c615f8f06fd17380e8dcb0162",
      to: "0x1d6d074c711ec1a4d79456eaf7822c8e6c1801e5",
      data: "0x",
      value: "67961409073699000",
    },
  },
  {
    id: "mainnet-usdt-transfer",
    group: "transfers",
    label: "USDT transfer",
    summary: "Confirmed mainnet ERC-20 transfer with trusted ERC-20 context.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xf759ab9f3a6e62a9d589b8944c0250cf95861aa6",
      to: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      data: "0xa9059cbb0000000000000000000000000fd8e578f658e2925fd27d37a251f0df8c2acc34000000000000000000000000000000000000000000000000000000000135b966",
      value: "0",
      contract: { tokenStandard: "erc20" },
    },
  },
  {
    id: "erc20-transfer-from",
    group: "transfers",
    label: "ERC-20 transferFrom",
    summary: "The token owner comes from calldata, not the transaction sender.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc20,
      data: "0x23b872dd00000000000000000000000060000000000000000000000000000000000000060000000000000000000000002000000000000000000000000000000000000002000000000000000000000000000000000000000000000000ab54a98ceb1f0ad2",
      value: "0",
      contract: { tokenStandard: "erc20" },
    },
  },
  {
    id: "mainnet-celer-cbridge-native-transfer",
    group: "bridges",
    label: "Celer cBridge native transfer",
    summary: "Confirmed Ethereum request; destination binding is supplied explicitly, not inferred from Celer's id.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x43f619e97a2729f78489bd14b9d38abc11f25cd7",
      to: "0x5427fefa711eff984124bfbb1ab6fbf5e3da1820",
      data: "0x3f2e5fc300000000000000000000000043f619e97a2729f78489bd14b9d38abc11f25cd7000000000000000000000000000000000000000000000000000aa87bee538000000000000000000000000000000000000000000000000000000000000000a4b10000000000000000000000000000000000000000000000000000019e12416b550000000000000000000000000000000000000000000000000000000000003faf",
      value: "3000000000000000",
    },
  },
  {
    id: "mainnet-circle-cctp-v1-standard-burn",
    group: "bridges",
    label: "Circle CCTP V1 USDC burn",
    summary: "Confirmed Ethereum → Arbitrum burn; the bytes32 recipient is shown as an address only because it is canonical EVM encoding.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xa875890465da20062bcf3b024bf7d54e69c725a8",
      to: "0xbd3fa81b58ba92a82136038b25adec7066af3155",
      data: "0x6fd3504e00000000000000000000000000000000000000000000000000000000e8d4a5100000000000000000000000000000000000000000000000000000000000000003000000000000000000000000a875890465da20062bcf3b024bf7d54e69c725a8000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      value: "0",
    },
  },
  {
    id: "mainnet-layerzero-v2-oft-direct-send",
    group: "bridges",
    label: "LayerZero V2 OFT send",
    summary: "Confirmed Ethereum → BSC direct send. Compose messages and OFT commands are intentionally excluded from this transfer-only route.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xdb160d42c58a75d7be2709fa0b4d1049b630735b",
      to: "0x19cfce47ed54a88614648dc3f19a5980097007dd",
      data: "0xc7c7f5b300000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000119a61cb32ba0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000db160d42c58a75d7be2709fa0b4d1049b630735b0000000000000000000000000000000000000000000000000000000000007596000000000000000000000000db160d42c58a75d7be2709fa0b4d1049b630735b00000000000000000000000000000000000000000000000000000000020238a00000000000000000000000000000000000000000000000000000000001ffa66c00000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      value: "19354763342522",
    },
  },
  {
    id: "mainnet-finite-approval",
    group: "permissions",
    label: "Finite approval",
    summary: "Confirmed mainnet allowance set to a finite raw amount.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x4d43f511f397fa42e08f22d59db6a4c69fa84b0a",
      to: "0x216b3643ff8b7bb30d8a48e9f1bd550126202add",
      data: "0x095ea7b30000000000000000000000000439e60f02a8900a951603950d8d4527f400c3f100000000000000000000000000000000000000000000000000025cd060c69000",
      value: "0",
      contract: { tokenStandard: "erc20" },
    },
  },
  {
    id: "mainnet-unlimited-approval",
    group: "permissions",
    label: "Unlimited approval",
    summary: "Confirmed mainnet MaxUint256 allowance; amount remains a string.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x3c1981c427862470cce38e91ea5833bf7d7acf22",
      to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      data: "0x095ea7b30000000000000000000000001e0049783f008a0085193e00003d00cd54003c71ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      value: "0",
      contract: { tokenStandard: "erc20" },
    },
  },
  {
    id: "erc20-revoke",
    group: "permissions",
    label: "ERC-20 revoke",
    summary: "An explicit zero allowance is classified as a revoke.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc20,
      data: "0x095ea7b30000000000000000000000006000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000",
      value: "0",
      contract: { tokenStandard: "erc20" },
    },
  },
  {
    id: "erc721-approve",
    group: "permissions",
    label: "ERC-721 approval",
    summary: "A token-level approval needs trusted ERC-721 metadata.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc721,
      data: "0x095ea7b3000000000000000000000000600000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000002a",
      value: "0",
      contract: { tokenStandard: "erc721" },
    },
  },
  {
    id: "erc721-revoke",
    group: "permissions",
    label: "ERC-721 revoke",
    summary: "The zero-address operator revokes a token-level approval.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc721,
      data: `0x095ea7b3000000000000000000000000${zero.slice(2).padStart(64, "0")}000000000000000000000000000000000000000000000000000000000000002a`,
      value: "0",
      contract: { tokenStandard: "erc721" },
    },
  },
  {
    id: "mainnet-collection-approval",
    group: "permissions",
    label: "Collection approval",
    summary: "Confirmed mainnet setApprovalForAll on an ERC-721 collection.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x5d8d277eb3d552edc661e5a8073e40eb128454fb",
      to: "0x974ad1d02bbb05d809f137e644c86a1dd7e28afc",
      data: "0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001",
      value: "0",
      contract: { tokenStandard: "erc721" },
    },
  },
  {
    id: "collection-revoke",
    group: "permissions",
    label: "Collection revoke",
    summary: "setApprovalForAll(false) retains the collection-standard context.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc1155,
      data: "0xa22cb46500000000000000000000000060000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000",
      value: "0",
      contract: { tokenStandard: "erc1155" },
    },
  },
  {
    id: "erc721-transfer",
    group: "nfts",
    label: "ERC-721 transfer",
    summary: "A single NFT transfer with raw token ID preserved as text.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc721,
      data: "0x23b872dd00000000000000000000000010000000000000000000000000000000000000010000000000000000000000002000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002a",
      value: "0",
      contract: { tokenStandard: "erc721" },
    },
  },
  {
    id: "mainnet-erc1155-transfer",
    group: "nfts",
    label: "ERC-1155 transfer",
    summary: "Confirmed mainnet ERC-1155 transfer with a large token ID.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xa430bfa5fa659ec625252bd383b20911a3b357ac",
      to: "0xfbae39320aa6e4aee6829489aed6eb2cc32a6459",
      data: "0xf242432a000000000000000000000000a430bfa5fa659ec625252bd383b20911a3b357ac0000000000000000000000001f506420452797db2579b7329d342b0e466bf6f44f125e835bbc9bbb77607c66de6d0d32339b936c000000000000000000000019000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000",
      value: "0",
      contract: { tokenStandard: "erc1155" },
    },
  },
  {
    id: "erc1155-batch-transfer",
    group: "nfts",
    label: "ERC-1155 batch",
    summary: "Parallel token-ID and amount arrays remain lossless strings.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: erc1155,
      data: "0x2eb2c2d60000000000000000000000001000000000000000000000000000000000000001000000000000000000000000200000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000",
      value: "0",
      contract: { tokenStandard: "erc1155" },
    },
  },
  {
    id: "mainnet-uniswap-v3-exact-input",
    group: "swaps",
    label: "Uniswap V3 exact input",
    summary: "Confirmed USDC → USDT router call, block 25,898,028.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x1abaac10d18714d006a1b58badd9367aa198ec81",
      to: "0xe592427a0aece92de3edee1f18e0157c05861564",
      data: "0x414bf389000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000000000640000000000000000000000001abaac10d18714d006a1b58badd9367aa198ec81000000000000000000000000000000000000000000000000000000006a99a3860000000000000000000000000000000000000000000000000000000000006c300000000000000000000000000000000000000000000000000000000000006ba50000000000000000000000000000000000000000000000000000000000000000",
      value: "0",
    },
  },
  {
    id: "mainnet-uniswap-universal-router-native-input",
    group: "swaps",
    label: "Universal Router native input",
    summary: "Finalized mainnet WRAP_ETH → V3 exact-input swap, block 25,898,793.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x08b00ceee2fb66029b53d76110b19eeaabfd1e65",
      to: "0x66a9893cc07d91d95644aedd05d03f95e1dba8af",
      data: "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006a99cd9800000000000000000000000000000000000000000000000000000000000000020b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000002e947e37b3a38000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000a33608c15d3b6b17c0de81f446c9e9cfd94e1ca000000000000000000000000000000000000000000000000002e947e37b3a3800000000000000000000000000000000000000000000000000000000001ea95c3300000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000064a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000064dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000000000000000000000000000000000000000756e6978000001a068afa34e8000943675c58f640100",
      value: "209777900000000000",
    },
  },
  {
    id: "uniswap-universal-router-native-output",
    group: "swaps",
    label: "Universal Router native output",
    summary: "Controlled V3 exact-input route settles WETH with UNWRAP_WETH; recipient and minimum are proven from calldata.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: "0x66a9893cc07d91d95644aedd05d03f95e1dba8af",
      data: "0x24856bc3000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000f1b3000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002b3333333333333333333333333333333333333333000bb8C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000222222222222222222222222222222222222222200000000000000000000000000000000000000000000000000000000000f2eb8",
      value: "0",
    },
  },
  {
    id: "known-abi-contract-call",
    group: "fallbacks",
    label: "Known ABI fallback",
    summary: "Decoded ABI with no specialized route stays a contract call.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: knownAbiContract,
      data: "0x6e553f6500000000000000000000000000000000000000000000000000000000000000070000000000000000000000002000000000000000000000000000000000000002",
      value: "0",
    },
  },
  {
    id: "unknown-calldata",
    group: "fallbacks",
    label: "Unknown calldata",
    summary: "No registered ABI means the parser makes no intent claim.",
    source: "controlled input",
    transaction: { chainId: 1, from: alice, to: unknownContract, data: "0xdeadbeef00000000", value: "0" },
  },
  {
    id: "contract-deploy",
    group: "fallbacks",
    label: "Contract deployment",
    summary: "Creation transaction: init code and no recipient address.",
    source: "controlled input",
    transaction: { chainId: 1, from: alice, data: "0x600060005560016000f3", value: "0" },
  },
  {
    id: "cancel-transaction",
    group: "fallbacks",
    label: "Nonce cancellation",
    summary: "Self-send with empty calldata is a cancellation pattern.",
    source: "controlled input",
    transaction: { chainId: 1, from: alice, to: alice, data: "0x", value: "0" },
  },
];

export function samplesInGroup(groupId: SampleGroupId) {
  return transactionSamples.filter((sample) => sample.group === groupId);
}

export function formatSample(sample: TransactionSample) {
  return JSON.stringify(sample.transaction, null, 2);
}
