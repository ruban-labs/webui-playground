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
layer: `approve(address,uint256)` is otherwise ambiguous between ERC-20 and
ERC-721.

## Deploy

Pushing `main` runs the GitHub Pages workflow. The Vite base remains `/` for
the custom domain. `public/CNAME` declares `play.ruban-labs.work`; configure an
Aliyun DNS `CNAME` record for `play` to `ruban-labs.github.io` after GitHub
Pages has accepted the custom domain.
