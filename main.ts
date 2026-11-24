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

const ENTRY =
  "Think of a great market square where more books, letters, and songs wait on the stalls than any man could read in a lifetime, and any man may take what he asks for in the blink of an eye.";

// Gate guard: the sealed scorer accepts UTF-8 text of 1 to 200 characters,
// not only white space; the entry is one sentence with no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
