import fs from "fs";
import { parse } from "csv-parse";

export function extractJson(outputText: string): string | null {
  let jsonPart: string;

  // Look for JSON in markdown code blocks
  const jsonBlockMatch = outputText.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    jsonPart = jsonBlockMatch[1].trim();
  } else {
    jsonPart = outputText.trim();
  }

  try {
    JSON.parse(jsonPart);
    return jsonPart;
  } catch {
    return null;
  }
}

export function readCsv(path: string): Promise<Record<string, unknown>[]> {
  return new Promise((res, rej) => {
    const rows: Record<string, unknown>[] = [];
    fs.createReadStream(path)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row: Record<string, unknown>) => rows.push(row))
      .on("end", () => res(rows))
      .on("error", (err: Error) => rej(err));
  });
}
