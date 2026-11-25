// The Funniest Honest Appliance Error — washing machine, deadpan.
// Writes one honest error line to /output/entry.txt (gate: 1-200 chars).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const MAX_CHARS = 200;

// The machine reports what it did, what went wrong, and what it knows.
// Four short flat statements; the joke is the last one refusing to help.
const STATEMENTS: string[] = [
  "I finished the wash.",
  "One sock is missing.",
  "I know where it is.",
  "I am not telling you.",
];

function buildLine(parts: string[]): string {
  return parts.map((p) => p.trim()).join(" ");
}

function validateLine(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} chars, over the ${MAX_CHARS} limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No control characters: the gate reads the file as plain UTF-8 text.
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      throw new Error(`entry contains a control character U+${ch.charCodeAt(0).toString(16)}`);
    }
  }
  // The line must end on a full stop and never double one up.
  if (!line.endsWith(".")) {
    throw new Error("entry line must end with a full stop");
  }
  if (line.includes("..")) {
    throw new Error("entry line contains a doubled full stop");
  }
}

function main(): void {
  const line = buildLine(STATEMENTS);
  validateLine(line);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  // Read back what was written: the file the gate scores must match the line.
  const written = readFileSync(outPath, "utf8");
  if (written !== line) {
    throw new Error(`round-trip mismatch: file holds ${JSON.stringify(written)}`);
  }
  console.log(`wrote ${line.length} chars to ${outPath}`);
}

main();
