import React from 'react';

interface DNAStringProps {
  sequence: string;
  className?: string;
}

export const DNAString: React.FC<DNAStringProps> = ({ sequence, className = "" }) => {
  const getCharClass = (char: string) => {
    switch (char.toUpperCase()) {
      case 'A': return 'nt-A';
      case 'T': return 'nt-T';
      case 'G': return 'nt-G';
      case 'C': return 'nt-C';
      default: return 'text-brand-muted';
    }
  };

  return (
    <span className={`font-mono break-all ${className}`}>
      {sequence.split('').map((char, index) => (
        <span key={index} className={getCharClass(char)}>
          {char}
        </span>
      ))}
    </span>
  );
};
