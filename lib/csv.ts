export type CsvParseOptions = {
  /** If true, the first row is treated as headers and used to map columns. Default: true */
  hasHeader?: boolean;
  /** Delimiter character. Default: "," */
  delimiter?: string;
};

/**
 * Parses a single CSV row, respecting quoted fields (commas and newlines inside quotes).
 */
function parseRow(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        current += char;
      }
      continue;
    }

    if (char === delimiter) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

/**
 * Splits CSV content into lines, handling newlines inside quoted fields.
 */
function splitCsvLines(csv: string): string[] {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
      continue;
    }

    if (!inQuotes && (char === "\n" || (char === "\r" && csv[i + 1] === "\n"))) {
      if (char === "\r") i++;
      lines.push(current);
      current = "";
      continue;
    }

    if (!inQuotes && char === "\r") {
      lines.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length > 0) lines.push(current);
  return lines;
}

/**
 * Agnostic CSV parser: takes a list of columns and parses CSV into a list of objects of type T.
 * Each object has the given column names as keys and string values from the CSV.
 *
 * @param csv - Raw CSV string
 * @param columns - Keys for the output object (order matches CSV columns when hasHeader is false)
 * @param options - hasHeader (use first row to map columns), delimiter
 * @returns Array of objects of type T
 *
 * @example
 * type Row = { name: string; age: string; city: string };
 * const data = parseCsv<Row>(csv, ["name", "age", "city"], { hasHeader: true });
 */
export function parseCsv<T extends Record<string, string>>(
  csv: string,
  columns: (keyof T)[],
  options: CsvParseOptions = {}
): T[] {
  const { hasHeader = true, delimiter = "," } = options;
  const lines = splitCsvLines(csv).filter((line) => line.length > 0);

  if (lines.length === 0) return [];

  const columnKeys = columns as string[];
  let headerIndices: number[]; // indices in CSV row -> index into columnKeys

  if (hasHeader) {
    const headerRow = parseRow(lines[0], delimiter);
    headerIndices = columnKeys.map((key) => headerRow.indexOf(key));
    if (headerIndices.some((i) => i === -1)) {
      const missing = columnKeys.filter((_, i) => headerIndices[i] === -1);
      throw new Error(`CSV missing columns: ${missing.join(", ")}`);
    }
    lines.shift(); // drop header
  } else {
    headerIndices = columnKeys.map((_, i) => i);
  }

  const result: T[] = [];

  for (const line of lines) {
    const values = parseRow(line, delimiter);
    const obj = {} as T;

    for (let c = 0; c < columnKeys.length; c++) {
      const key = columnKeys[c];
      const valueIndex = headerIndices[c];
      obj[key as keyof T] = (valueIndex < values.length ? values[valueIndex] : "") as T[keyof T];
    }

    result.push(obj);
  }

  return result;
}
