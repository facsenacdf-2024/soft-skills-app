export interface LastResultEntry {
  qID: number | string;
  lastResult: Record<string, number>;
}

export type LastResults = LastResultEntry[];