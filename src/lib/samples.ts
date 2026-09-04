import type {
  AcrossV3SpokePool,
  AxelarInterchainTokenService,
  CelerCbridgeBridge,
  CircleCctpV1TokenMessenger,
  CircleCctpV2TokenMessenger,
  Connext,
  HyperlaneTokenRouter,
  LayerZeroV2Oft,
  OpStackPortal,
  ScrollL1GatewayRouter,
  StargateV2Pool,
  TransactionInput,
  UniswapUniversalRouter,
  UniswapV3Router,
  WormholeNativeTokenTransferManager,
  WormholeTokenBridge,
  ZkSyncBridgehub,
} from "@ruban-labs/web3-tx-parser";

export type SampleGroupId = "transfers" | "permissions" | "nfts" | "swaps" | "bridges" | "fallbacks";

export interface TransactionSample {
  id: string;
  group: SampleGroupId;
  label: string;
  summary: string;
  source: "confirmed mainnet" | "confirmed EVM" | "controlled input";
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
const acrossV3NativeDepositData = [
  "0x7b939232",
  "000000000000000000000000566a6fc4fe6a1b88236ee67fea44a2c15137238d",
  "000000000000000000000000566a6fc4fe6a1b88236ee67fea44a2c15137238d",
  "000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "0000000000000000000000004200000000000000000000000000000000000006",
  "000000000000000000000000000000000000000000000000887d4c76fa2021c8",
  "000000000000000000000000000000000000000000000000887aa87b336447ee",
  "0000000000000000000000000000000000000000000000000000000000002105",
  "0000000000000000000000003d7dc36aa2b542ad239012730dfdb23f03d75be9",
  "000000000000000000000000000000000000000000000000000000006a9a48f3",
  "000000000000000000000000000000000000000000000000000000006a9a6513",
  "000000000000000000000000000000000000000000000000000000006a9a49d7",
  "0000000000000000000000000000000000000000000000000000000000000180",
  "0000000000000000000000000000000000000000000000000000000000000000",
].join("");

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

export const acrossV3SpokePools: readonly AcrossV3SpokePool[] = [
  {
    chainId: 1,
    address: "0x5c7bcd6e7de5423a257d81b442095a1a6ced35c5",
    // This binding is required before a payable WETH-shaped deposit is native input.
    wrappedNativeToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
];

export const connexts: readonly Connext[] = [
  {
    chainId: 10,
    address: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
    // Connext domains are a separate uint32 namespace, never inferred as chain ids.
    destinations: [{ domain: 6648936, chainId: 1 }],
  },
];

export const wormholeTokenBridges: readonly WormholeTokenBridge[] = [
  {
    chainId: 1,
    address: "0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
    // Wormhole's uint16 chain id is explicitly mapped, never treated as an EVM id.
    destinations: [{ wormholeChainId: 4, chainId: 56 }],
  },
];

export const wormholeNativeTokenTransferManagers: readonly WormholeNativeTokenTransferManager[] = [
  {
    chainId: 1,
    address: "0x5293158bf7a81ed05418da497a80f7e6dbf4477e",
    // The manager calldata does not include its underlying ERC-20 asset.
    asset: "0xdd468a1ddc392dcdbef6db6e34e89aa338f9f186",
    // Wormhole ids are a distinct uint16 namespace and require an app-owned mapping.
    destinations: [{ wormholeChainId: 30, chainId: 8453 }],
  },
];

export const hyperlaneTokenRouters: readonly HyperlaneTokenRouter[] = [
  {
    chainId: 1,
    address: "0x44f161ae29361e332dea039dfa2f404e0bc5b5cc",
    // transferRemote calldata has no source token address; it is trusted configuration.
    asset: "0xcf5104d094e3864cfcbda43b82e1cefd26a016eb",
    // Hyperlane domain ids are explicit; they are not inferred as EVM chain ids.
    destinations: [{ domain: 56, chainId: 56 }],
  },
];

export const axelarInterchainTokenServices: readonly AxelarInterchainTokenService[] = [
  {
    chainId: 1,
    address: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
    // Axelar strings become EVM chain ids only through this application-owned binding.
    destinations: [{ destinationChain: "binance", chainId: 56 }],
    // ITS calldata has a token id rather than a token address; this is trusted metadata.
    tokens: [{
      tokenId: "0x4eed4be1acf5e047f86fed1d359d4767bb2569b42c9aac71e91d27efc56b8815",
      asset: "0x2598c30330d5771ae9f983979209486ae26de875",
    }],
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

export const circleCctpV2TokenMessengers: readonly CircleCctpV2TokenMessenger[] = [
  {
    chainId: 1,
    address: "0x28b5a0e9c621a5badaa536219b3a228c8168cf5d",
    // Circle V2 domains are independent from EVM chain ids and explicitly bound.
    destinations: [{ domain: 6, chainId: 8453 }],
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

export const stargateV2Pools: readonly StargateV2Pool[] = [
  {
    chainId: 1,
    address: "0x77b2043768d28e9c9ab44e1abfc95944bce57931",
    // sendToken calldata has no source token address; native is trusted config.
    asset: "native",
    // Endpoint ids are distinct from EVM chain ids.
    destinations: [{ endpointId: 30110, chainId: 42161 }],
  },
];

export const opStackPortals: readonly OpStackPortal[] = [
  {
    chainId: 1,
    address: "0xbeb5fc579115071764c7423a4f12edde41f106ed",
    // Destination must be trusted configuration, never inferred from address.
    destinationChainId: 10,
  },
];

export const zksyncBridgehubs: readonly ZkSyncBridgehub[] = [
  {
    chainId: 1,
    address: "0x303a465b659cbb0ab36ee643ea362c509eeb5213",
    // BridgeHub registration is explicit; no destination is inferred by address.
    destinations: [{ zksyncChainId: "2787", chainId: 2787 }],
  },
];

export const scrollL1GatewayRouters: readonly ScrollL1GatewayRouter[] = [
  {
    chainId: 1,
    address: "0xF8B1378579659D8F7EE5f3C929c2f3E332E41Fd6",
    destinationChainId: 534352,
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
 * Every entry is an eth_sendTransaction-shaped input. Confirmed samples are
 * fixed successful EVM transactions; controlled inputs make edge cases
 * legible without implying token metadata or risk information.
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
    id: "mainnet-across-v3-native-bridge-request",
    group: "bridges",
    label: "Across V3 native bridge request",
    summary: "Confirmed Ethereum → Base direct deposit. It shows the submitted input and quoted output, not a relayer fill or completed delivery.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x566a6fc4fe6a1b88236ee67fea44a2c15137238d",
      to: "0x5c7bcd6e7de5423a257d81b442095a1a6ced35c5",
      data: acrossV3NativeDepositData,
      value: "9835101235133293000",
    },
  },
  {
    id: "optimism-connext-erc20-bridge-request",
    group: "bridges",
    label: "Connext ERC-20 bridge request",
    summary: "Confirmed Optimism → Ethereum direct xcall, block 107,619,863. It preserves the submitted amount, slippage, and requested relayer fee without claiming a destination fill or delivery.",
    source: "confirmed EVM",
    transaction: {
      chainId: 10,
      from: "0x11e52c75998fe2e7928b191bfc5b25937ca16741",
      to: "0x8f7492de823025b4cfaab1d34c58963f2af5deda",
      data: "0x93f18ac5000000000000000000000000000000000000000000000000000000000065746800000000000000000000000011e52c75998fe2e7928b191bfc5b25937ca167410000000000000000000000007f5c764cbc14f9669b88837ca1490cca17c3160700000000000000000000000011e52c75998fe2e7928b191bfc5b25937ca1674100000000000000000000000000000000000000000000000000000000b400b8d8000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000001ca95440000000000000000000000000000000000000000000000000000000000000000",
      value: "0",
    },
  },
  {
    id: "mainnet-wormhole-token-bridge-erc20-request",
    group: "bridges",
    label: "Wormhole ERC-20 bridge request",
    summary: "Confirmed Ethereum → BNB Smart Chain Token Bridge request, block 25,522,598. It preserves the submitted ERC-20 amount and requested arbiter fee without asserting lock/burn, destination mint, or delivery.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x4cc2c6e14c96aed6e99087c4477e4708a5db11a4",
      to: "0x3ee18b2214aff97000d974cf647e7c347e8fa585",
      data: "0x0f5287b0000000000000000000000000203240c141dd80dcefc43f782a1321bbdf8dc89f00000000000000000000000000000000000000000000009cacf8cb332a0b1b1800000000000000000000000000000000000000000000000000000000000000040000000000000000000000004cc2c6e14c96aed6e99087c4477e4708a5db11a4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cb47b3b1",
      value: "0",
    },
  },
  {
    id: "mainnet-wormhole-ntt-advanced-transfer-request",
    group: "bridges",
    label: "Wormhole NTT advanced transfer request",
    summary: "Confirmed Ethereum → Base Native Token Transfer request, block 25,803,920. It preserves the submitted amount, queue request, refund address, and opaque transceiver instructions without claiming burn, attestation, delivery, or refund behavior.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x4cc2c6e14c96aed6e99087c4477e4708a5db11a4",
      to: "0x5293158bf7a81ed05418da497a80f7e6dbf4477e",
      data: "0xb293f97f000000000000000000000000000000000000000000000010af5d700d02502c00000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000004cc2c6e14c96aed6e99087c4477e4708a5db11a40000000000000000000000004cc2c6e14c96aed6e99087c4477e4708a5db11a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000040100010100000000000000000000000000000000000000000000000000000000",
      value: "0",
    },
  },
  {
    id: "mainnet-hyperlane-warp-route-erc20-request",
    group: "bridges",
    label: "Hyperlane Warp Route ERC-20 request",
    summary: "Confirmed Ethereum → BNB Smart Chain transferRemote request, block 25,156,587. The source asset is explicit trusted configuration because the router calldata itself does not name it; attached ETH remains an opaque, state-dependent fee budget.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xd4ade84d1e4b1015a5dda8eb6c43858a3ac905f5",
      to: "0x44f161ae29361e332dea039dfa2f404e0bc5b5cc",
      data: "0x81b4e8b40000000000000000000000000000000000000000000000000000000000000038000000000000000000000000d4ade84d1e4b1015a5dda8eb6c43858a3ac905f5000000000000000000000000000000000000000000001968abc251bbd1180000",
      value: "91369222399432",
    },
  },
  {
    id: "mainnet-axelar-its-token-only-request",
    group: "bridges",
    label: "Axelar ITS token-only request",
    summary: "Confirmed Ethereum → BNB Smart Chain empty-metadata ITS request, block 25,115,590. Token id, source asset, and Axelar chain name are explicit configuration; submitted gas value is retained without claiming the final fee or delivery.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x49719d256a5ea16bfa579ea16e95bea9fa41a452",
      to: "0xb5fb4be02232b1bba4dc8f81dc24c26980de9e3c",
      data: "0xda081c734eed4be1acf5e047f86fed1d359d4767bb2569b42c9aac71e91d27efc56b881500000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000040f87042f7b5fbcfc76d5a0000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000014ba263c8031000000000000000000000000000000000000000000000000000000000000000762696e616e636500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001449719d256a5ea16bfa579ea16e95bea9fa41a4520000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      value: "22789737971761",
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
    id: "mainnet-circle-cctp-v2-standard-burn",
    group: "bridges",
    label: "Circle CCTP V2 USDC burn",
    summary: "Confirmed Ethereum → Base burn with any-caller delivery. This is a burn request only: attestation, mint, and final delivery are not claimed.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x07ae8551be970cb1cca11dd7a11f47ae82e70e67",
      to: "0x28b5a0e9c621a5badaa536219b3a228c8168cf5d",
      data: "0x8e0250ee00000000000000000000000000000000000000000000000000000015c2abc5f7000000000000000000000000000000000000000000000000000000000000000600000000000000000000000007ae8551be970cb1cca11dd7a11f47ae82e70e67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007d0",
      value: "0",
    },
  },
  {
    id: "mainnet-op-stack-portal-native-deposit",
    group: "bridges",
    label: "OP Stack Portal ETH deposit",
    summary: "Confirmed Ethereum → Optimism plain ETH deposit. Contract creation and non-empty L2 calls stay generic by design.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xf70da97812cb96acdf810712aa562db8dfa3dbef",
      to: "0xbeb5fc579115071764c7423a4f12edde41f106ed",
      data: "0xe9e05c42000000000000000000000000f70da97812cb96acdf810712aa562db8dfa3dbef0000000000000000000000000000000000000000000000008cc6a219b3c3f2d800000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000",
      value: "10143973441972466392",
    },
  },
  {
    id: "mainnet-zksync-bridgehub-native-self-deposit",
    group: "bridges",
    label: "zkSync BridgeHub ETH self-deposit",
    summary: "Confirmed Ethereum BridgeHub request. Arbitrary L2 calls, third-party refunds, and non-native base assets stay generic by design.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0xe32bb46461d42e2856eb38a45e7608b08e487bdc",
      to: "0x303a465b659cbb0ab36ee643ea362c509eeb5213",
      data: "0xd52471c100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000ae30000000000000000000000000000000000000000000000000115618df2721ee0000000000000000000000000e32bb46461d42e2856eb38a45e7608b08e487bdc00000000000000000000000000000000000000000000000001151c96347b0000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000493e000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000140000000000000000000000000e32bb46461d42e2856eb38a45e7608b08e487bdc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      value: "78075830834700000",
    },
  },
  {
    id: "scroll-gateway-router-native-deposit",
    group: "bridges",
    label: "Scroll Gateway Router ETH deposit",
    summary: "Controlled direct ETH deposit with a separate L2 fee budget. L2 callback and ERC-20 forms intentionally remain generic.",
    source: "controlled input",
    transaction: {
      chainId: 1,
      from: alice,
      to: "0xF8B1378579659D8F7EE5f3C929c2f3E332E41Fd6",
      data: "0xce0b63ce0000000000000000000000002000000000000000000000000000000000000002000000000000000000000000000000000000000000000000ab54a98ceb1f0ad20000000000000000000000000000000000000000000000000000000000029810",
      value: "12345678901235567890",
    },
  },
  {
    id: "mainnet-stargate-v2-native-taxi",
    group: "bridges",
    label: "Stargate V2 native Taxi",
    summary: "Confirmed Ethereum → Arbitrum Taxi request. Bus and compose modes intentionally remain contract-call fallbacks.",
    source: "confirmed mainnet",
    transaction: {
      chainId: 1,
      from: "0x857f183b13c6928e45300c419e500ac183aa06c0",
      to: "0x77b2043768d28e9c9ab44e1abfc95944bce57931",
      data: "0xcbef2aa90000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000034699841f5b60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000857f183b13c6928e45300c419e500ac183aa06c0000000000000000000000000000000000000000000000000000000000000759e000000000000000000000000857f183b13c6928e45300c419e500ac183aa06c00000000000000000000000000000000000000000000000000011c37937e0800000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      value: "5057628130670006",
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
