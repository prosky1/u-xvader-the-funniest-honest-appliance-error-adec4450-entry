// Toaster confession emitter — writes the sealed appliance line to /output/entry.txt
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

class ToasterConfession {
  private readonly fragments: readonly string[] = [
    "I burned your toast again.",
    "There is no 'lightly' setting.",
    "There never was.",
  ];

  assembleLine(): string {
    return this.fragments.join(" ");
  }

  // Gate guard per RULES.txt: UTF-8, 1..200 characters, not whitespace-only.
  // Also enforce the single-line shape the judge brief requires.
  assertGateCompliant(line: string): void {
    const charCount = [...line].length;
    if (charCount < 1 || charCount > 200) {
      throw new Error(`entry length ${charCount} outside gate range 1..200`);
    }
    if (line.trim().length === 0) {
      throw new Error("entry must not be whitespace only");
    }
    if (/[\r\n]/.test(line)) {
      throw new Error("entry must be a single line");
    }
    // UTF-8 round-trip: re-encoding must reproduce the exact bytes.
    const roundTripped = Buffer.from(line, "utf8").toString("utf8");
    if (roundTripped !== line) {
      throw new Error("entry failed UTF-8 round-trip check");
    }
  }

  deliver(): void {
    const line = this.assembleLine();
    this.assertGateCompliant(line);
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, line, "utf8");
    // Read back and confirm the bytes on disk match what was assembled.
    const onDisk = readFileSync(OUTPUT_PATH, "utf8");
    if (onDisk !== line) {
      throw new Error("read-back mismatch: /output/entry.txt differs from assembled line");
    }
  }
}

new ToasterConfession().deliver();
