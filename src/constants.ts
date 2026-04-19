import { DNASequence } from './types';

export const TEMPLATE_DATABASE: DNASequence[] = [
  { 
    id: 'eco-1',
    name: "E. coli LacZ", 
    code: "ECO_LACZ_01", 
    type: "BACTERIA", 
    sequence: "ATGACCATGATTACGCCAAGCTTGCATGCCTGCAGGTCGACGGATCCCCGGGAATTCGAGCTCGGTACCC" 
  },
  { 
    id: 'hum-1',
    name: "Human BRCA1 (Exon 11)", 
    code: "HS_BRCA1_E11", 
    type: "HOMO_SAPIENS", 
    sequence: "ATGGATTTATCTGCTCTTCGCGTTGAAGAAGTACAAAATGTCATTAATGCTATGCAGAAAATCTTAG" 
  },
  { 
    id: 'hum-2',
    name: "Human INS (Insulin)", 
    code: "HS_INS_PRO", 
    type: "HOMO_SAPIENS", 
    sequence: "AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGT" 
  },
  { 
    id: 'mus-1',
    name: "Mouse p53 (Tumor Protein)", 
    code: "MM_TP53_X01", 
    type: "MUS_MUSCULUS", 
    sequence: "ATGTTCAAGACTGGATGGGGCAGACAGAAACCCTGGATTTCCATTTCCATTTCCAGCAAAG" 
  },
  { 
    id: 'ath-1',
    name: "Arabidopsis RBCS-1A", 
    code: "ATH_RBCS_1A", 
    type: "PLANT", 
    sequence: "ATGGCTTCCTCAGTTACTACTTCTTCTTCTCCACCAGCAGCAATGGCTAAACCAGCTG" 
  },
  { 
    id: 'sce-1',
    name: "Yeast ADH1 (Alcohol Dehyd)", 
    code: "SCE_ADH1_PRO", 
    type: "S_CEREVISIAE", 
    sequence: "ATGTCTATCCCAGAAACTCAAAAAGGTATTGGAATCAATGCTACTTTGTTTGAAGATTTCGAAGG" 
  },
  { 
    id: 'cov-2',
    name: "SARS-CoV-2 Spike (Partial)", 
    code: "SARS_COV2_S", 
    type: "VIRUS", 
    sequence: "ATGTTTGTTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACT" 
  },
  { 
    id: 'dr-1',
    name: "Zebrafish MYH9", 
    code: "DR_MYH9_04", 
    type: "D_RERIO", 
    sequence: "ATGGCCGGAGCAATTGCTGCGTATGACAAAGAGAAGATCTCCGTGGAGCTGAAGATCAA" 
  }
];

export const NUCLEOTIDES = ['A', 'C', 'G', 'T'];

export const CREDITS = {
  sources: [
    { name: 'NCBI GenBank', url: 'https://www.ncbi.nlm.nih.gov/genbank/' },
    { name: 'Ensembl Genome Browser', url: 'https://www.ensembl.org/' }
  ],
  hosting: 'Google Cloud Run (via AI Studio)',
  ai: 'Google Gemini 3.5' // The model used to build this
};
