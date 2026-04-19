import { AlignmentResult, BenchmarkData } from '../types';

/**
 * Performs a linear scan to find all occurrences of a subject in a template.
 */
export function alignDNA(template: string, subject: string): AlignmentResult {
  const start = performance.now();
  const indices: number[] = [];
  
  if (subject.length === 0) {
    return { indices: [], count: 0, timeTaken: 0, templateSize: template.length, template };
  }

  for (let i = 0; i <= template.length - subject.length; i++) {
    let match = true;
    for (let j = 0; j < subject.length; j++) {
      if (template[i + j] !== subject[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      indices.push(i);
    }
  }

  const end = performance.now();
  return {
    indices,
    count: indices.length,
    timeTaken: end - start,
    templateSize: template.length,
    template
  };
}

/**
 * Generates a random DNA sequence of a given length.
 */
export function generateRandomDNA(length: number): string {
  const nucleotides = ['A', 'C', 'G', 'T'];
  let result = '';
  for (let i = 0; i < length; i++) {
    result += nucleotides[Math.floor(Math.random() * nucleotides.length)];
  }
  return result;
}

/**
 * Runs a benchmark for Version 3.
 * Template size doubles 10 times, aligning the same subject.
 */
export function runBenchmark(initialSize: number, subject: string): BenchmarkData[] {
  const data: BenchmarkData[] = [];
  let currentSize = initialSize;

  for (let i = 0; i < 10; i++) {
    const template = generateRandomDNA(currentSize);
    const result = alignDNA(template, subject);
    data.push({
      size: currentSize,
      time: result.timeTaken
    });
    currentSize *= 2;
  }

  return data;
}
