export interface DNASequence {
  id: string;
  name: string;
  code: string;
  sequence: string;
  type?: string;
}

export interface AlignmentResult {
  indices: number[];
  count: number;
  timeTaken: number; // in ms
  templateSize: number;
  template: string;
}

export interface BenchmarkData {
  size: number;
  time: number;
}

export interface CustomVersion {
  tag: string;
  name: string;
  desc: string;
  complex: string;
}

export type AlignmentVersion = 'v1' | 'v2' | 'v3' | 'v4' | string;
