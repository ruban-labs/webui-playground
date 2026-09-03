# Transaction Workbench

A browser-only EVM transaction-intent playground built with React, Vite,
Tailwind, and source-owned [shadcn/ui](https://ui.shadcn.com/) primitives.
It uses `@ruban-labs/web3-tx-parser` directly in the browser; it makes no RPC
requests and does not transmit the transaction text anywhere.

## Develop

```bash
npm install
npm run dev
```

Paste a JSON `TransactionInput` into the workbench. Use
`contract.tokenStandard` only when it comes from a trusted contract-indexing
layer. Without that context, standard ERC-20/ERC-721/ERC-1155 selectors remain
an ABI-decoded contract-call fallback instead of being guessed.

## Examples

The on-page library groups 18 complete `eth_sendTransaction` inputs into
transfers, permissions, NFTs, swaps, and fallbacks. The mainnet-labelled
entries are fixed successful Ethereum transactions; the controlled entries
make edge cases reproducible. All parsing remains local to the browser. The
Uniswap V3 example is specialized only because this application configures the
canonical mainnet SwapRouter address at startup; it does not discover routers
over the network.

## Deploy

Pushing `main` runs the GitHub Pages workflow. The Vite base remains `/` for
the custom domain. `public/CNAME` declares `play.ruban-labs.work`; configure an
Aliyun DNS `CNAME` record for `play` to `ruban-labs.github.io` after GitHub
Pages has accepted the custom domain.
