import { useEffect, useMemo, useState } from "react";
import {
  Braces,
  Check,
  ChevronRight,
  Clipboard,
  DatabaseZap,
  Moon,
  Play,
  ShieldCheck,
  Sun,
  TriangleAlert,
} from "lucide-react";
import {
  createDefaultParser,
  parseAbi,
  TransactionParseError,
  type JsonValue,
  type ParseResult,
  type TransactionInput,
} from "@ruban-labs/web3-tx-parser";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  formatSample,
  sampleGroups,
  samplesInGroup,
  transactionSamples,
  uniswapUniversalRouters,
  uniswapV3Routers,
} from "@/lib/samples";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type ParseState = { result?: ParseResult; error?: string };

const parser = createDefaultParser({ uniswapV3Routers, uniswapUniversalRouters });
parser.registerAbi({
  signature: "deposit(uint256,address)",
  abi: parseAbi(["function deposit(uint256 assets,address receiver)"]),
});
const actionLabels: Record<string, string> = {
  native_transfer: "Native transfer",
  deploy_contract: "Contract deployment",
  cancel_transaction: "Nonce cancellation",
  token_transfer: "Token transfer",
  token_approval: "Token approval",
  token_revoke: "Token revoke",
  nft_transfer: "NFT transfer",
  nft_approval: "NFT approval",
  nft_revoke: "NFT revoke",
  collection_approval: "Collection approval",
  collection_revoke: "Collection revoke",
  swap: "Swap",
  contract_call: "Contract call",
  unknown: "Unknown intent",
};

function parseTransactionText(text: string): ParseState {
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Transaction input must be a JSON object.");
    }
    return { result: parser.parse(value as TransactionInput) };
  } catch (error) {
    const message = error instanceof TransactionParseError || error instanceof Error ? error.message : "Could not parse input.";
    return { error: message };
  }
}

function valueToText(value: JsonValue): string {
  if (typeof value === "string") return value;
  if (value === null) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

function truncateAddress(value: string) {
  return value.length > 18 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;
}

export default function App() {
  const initialSample = transactionSamples[0]!;
  const [theme, setTheme] = useState<Theme>("dark");
  const [source, setSource] = useState(() => formatSample(initialSample));
  const [parseState, setParseState] = useState<ParseState>(() => parseTransactionText(formatSample(initialSample)));
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(initialSample.id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const actionData = useMemo(
    () => (parseState.result?.action.data ? Object.entries(parseState.result.action.data) : []),
    [parseState.result],
  );
  const selectedSample = useMemo(
    () => transactionSamples.find((item) => item.id === selectedSampleId),
    [selectedSampleId],
  );

  function selectSample(sampleId: string) {
    const sample = transactionSamples.find((item) => item.id === sampleId);
    if (!sample) return;
    const nextSource = formatSample(sample);
    setSource(nextSource);
    setParseState(parseTransactionText(nextSource));
    setSelectedSampleId(sample.id);
  }

  function copySource() {
    void navigator.clipboard.writeText(source).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a className="flex items-center gap-2 text-sm font-semibold tracking-tight" href="/" aria-label="Transaction Workbench home">
            <span className="grid size-6 place-items-center rounded-md bg-primary text-[11px] font-black text-primary-foreground">R</span>
            <span>Transaction Workbench</span>
          </a>
          <div className="flex items-center gap-1.5">
            <span className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground sm:flex">
              <ShieldCheck className="size-3.5 text-accent" />
              Browser local
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-7 flex flex-col gap-3 border-l-2 border-primary pl-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">EVM intent parser</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Inspect the transaction, not just the calldata.</h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Paste a transaction object. Parsing stays in this browser; no RPC calls, accounts, or network simulation.
          </p>
        </div>

        <section className="mb-5" aria-labelledby="examples-title">
          <Card>
            <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle id="examples-title">Example library</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">Browse transferable intent patterns before editing the JSON yourself.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <DatabaseZap className="size-3.5 text-primary" /> {transactionSamples.length} inspectable inputs
              </span>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {sampleGroups.map((group) => (
                <div key={group.id} className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{group.title}</p>
                  <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">{group.description}</p>
                  <div className="mt-2 space-y-1.5">
                    {samplesInGroup(group.id).map((sample) => (
                      <Button
                        key={sample.id}
                        variant={sample.id === selectedSampleId ? "default" : "secondary"}
                        size="sm"
                        className="h-auto w-full justify-between gap-2 border border-border px-2.5 py-2 text-left"
                        onClick={() => selectSample(sample.id)}
                      >
                        <span className="min-w-0 truncate">{sample.label}</span>
                        <span className="shrink-0 rounded-full border border-current/20 px-1.5 py-0.5 text-[10px] font-normal opacity-75">
                          {sample.source === "confirmed mainnet" ? "mainnet" : "input"}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
          <Card aria-labelledby="source-title">
            <CardHeader className="flex-row items-center justify-between gap-4">
              <div>
                <CardTitle id="source-title">Transaction source</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">A `TransactionInput` JSON object.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={copySource} aria-label="Copy transaction source">
                {copied ? <Check className="size-3.5 text-accent" /> : <Clipboard className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedSample && (
                <div className="rounded-lg border border-border bg-secondary/35 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-foreground">{selectedSample.label}</p>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{selectedSample.source}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{selectedSample.summary}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="transaction-source">Transaction JSON</Label>
                <Textarea
                  id="transaction-source"
                  value={source}
                  onChange={(event) => {
                    setSource(event.target.value);
                    setSelectedSampleId(undefined);
                  }}
                  spellCheck={false}
                  aria-describedby="source-hint"
                />
                <p id="source-hint" className="text-xs leading-5 text-muted-foreground">
                  Token-standard context is explicit: provide `contract.tokenStandard` only from a trusted indexing source.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Braces className="size-3.5" /> Deterministic local result
                </span>
                <Button onClick={() => setParseState(parseTransactionText(source))}>
                  <Play className="size-3.5" /> Parse transaction
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card aria-labelledby="intent-title" className="overflow-hidden">
            <CardHeader className="flex-row items-center justify-between gap-4 bg-secondary/35">
              <div>
                <CardTitle id="intent-title">Decoded intent</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">Parser output is structured and inspectable.</p>
              </div>
              {parseState.result && (
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {parseState.result.action.type.replaceAll("_", " ")}
                </span>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {parseState.error ? (
                <div className="m-5 flex gap-3 rounded-lg border border-destructive/35 bg-destructive/8 p-4" role="alert">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <div>
                    <p className="text-sm font-medium">Could not parse this transaction</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{parseState.error}</p>
                  </div>
                </div>
              ) : parseState.result ? (
                <>
                  <div className="border-b border-border px-5 py-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Intent</p>
                    <div className="mt-2 flex items-center gap-2">
                      <ChevronRight className="size-4 text-primary" />
                      <p className="text-xl font-semibold tracking-tight">{actionLabels[parseState.result.action.type]}</p>
                    </div>
                    {parseState.result.action.description && (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{parseState.result.action.description}</p>
                    )}
                  </div>

                  <div className="divide-y divide-border">
                    {actionData.length > 0 ? (
                      actionData.map(([key, value]) => (
                        <div key={key} className="grid grid-cols-[minmax(7rem,0.38fr)_minmax(0,1fr)] gap-4 px-5 py-3.5">
                          <span className="text-xs font-medium text-muted-foreground">{key}</span>
                          <code
                            className={cn("min-w-0 break-all text-right font-mono text-xs leading-5 text-foreground", key === "to" || key === "from" ? "text-primary" : "")}
                            title={typeof value === "string" && value.startsWith("0x") ? value : undefined}
                          >
                            {typeof value === "string" && value.startsWith("0x") ? truncateAddress(value) : valueToText(value)}
                          </code>
                        </div>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-sm text-muted-foreground">No structured fields were returned for this call.</div>
                    )}
                  </div>

                  {parseState.result.contractCall && (
                    <div className="border-t border-border bg-canvas px-5 py-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Calldata</p>
                      <p className="font-mono text-xs text-foreground">{parseState.result.contractCall.signature}</p>
                    </div>
                  )}

                  {parseState.result.route && (
                    <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
                      <span>Matched route</span>
                      <code>{parseState.result.route.id}</code>
                    </div>
                  )}

                  <div className="border-t border-border bg-canvas px-5 py-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">ParseResult JSON</p>
                    <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background p-3 font-mono text-[11px] leading-5 text-foreground">
                      {JSON.stringify(parseState.result, null, 2)}
                    </pre>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <section className="mt-5 grid gap-5 md:grid-cols-3" aria-label="Parser boundaries">
          <Boundary title="Local by design" text="The workbench does not broadcast, simulate, or fetch contract data." />
          <Boundary title="Context is required" text="Standard token actions require trusted contract-standard metadata; otherwise the ABI fallback remains visible." />
          <Boundary title="Trusted router route" text="The Uniswap V3 examples are enabled only because this app configures that known router address." />
        </section>
      </main>
    </div>
  );
}

function Boundary({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-t border-border pt-3">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
