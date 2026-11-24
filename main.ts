// One Sentence for a Traveler from 1800.
//
// Writes a single sentence (at most 200 characters) explaining the modern
// internet to a time traveler from 1800, using only words that plausibly
// existed in 1800 — no modern vocabulary. The sentence builds on things a
// person from 1800 already knows (a market square, books, letters, songs)
// and paints one picture: more to read and hear than a lifetime holds, and
// anything asked for arrives in the blink of an eye.
//
// The field is flooded with library / post-office / road sentences, so this
// entry takes a fresh angle instead: a great market square, where every
// stall holds something to take home at once. One image, no list of
// features, nothing a reader from 1800 could not picture.
import { mkdirSync, writeFileSync } from "node:fs";

// The gate: the sealed scorer accepts UTF-8 text of 1 to 200 characters,
// not only white space. The entry is one sentence with no trailing newline.
const MAX_ENTRY_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// The entry itself. Kept as one literal so the sentence is exactly what
// was written and judged — no joining, templating, or transformation that
// could change a character.
const ENTRY =
  "Think of a great market square where more books, letters, and songs wait on the stalls than any man could read in a lifetime, and any man may take what he asks for in the blink of an eye.";

// Count the sentence-ending stops in the text. A single sentence ends
// with exactly one full stop and contains no other.
function countFullStops(text: string): number {
  return (text.match(/\./g) ?? []).length;
}

// Check the entry against the gate before writing anything: length,
// no surrounding whitespace, and exactly one sentence.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_ENTRY_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim() !== text) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (countFullStops(text) !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

// Write the validated entry to the output path, creating the output
// directory first. The file holds the sentence alone — no newline.
function writeEntry(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

function main(): void {
  validateEntry(ENTRY);
  writeEntry(ENTRY);
}

main();
