import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Database, Cpu, Globe } from 'lucide-react';
import { CREDITS } from '../constants';

export default function CreditsView() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto space-y-12 py-8 px-4"
    >
      <header className="space-y-4">
        <h2 className="text-4xl font-mono font-bold tracking-tight text-brand-accent uppercase tracking-tighter">System_Credits // ❂</h2>
        <p className="text-brand-muted font-sans font-medium">BioAlign is built upon a foundation of open-source data, modern hosting, and advanced AI assistance.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Templates */}
        <section className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-lg border border-brand-accent/20">
              <Database size={20} />
            </div>
            <h3 className="font-mono font-bold uppercase text-[10px] tracking-[0.2em] text-brand-muted">Sequence_Repositories</h3>
          </div>
          <div className="space-y-4">
            {CREDITS.sources.map((source, i) => (
              <a 
                key={i}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-brand-bg/50 border border-brand-border rounded-xl hover:border-brand-accent group transition-all"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-brand-text group-hover:text-brand-accent transition-colors">{source.name}</span>
                  <span className="text-[10px] text-brand-muted font-mono truncate max-w-[200px] sm:max-w-md">{source.url}</span>
                </div>
                <ExternalLink size={16} className="text-brand-border group-hover:text-brand-accent transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* AI & Hosting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-lg border border-brand-accent/20">
                <Cpu size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase text-[10px] tracking-[0.2em] text-brand-muted">AI_Architect</h3>
            </div>
            <p className="font-semibold text-xl text-brand-accent font-mono">[CLAUDE_AI + GEMINI]</p>
            <p className="text-sm text-brand-muted mt-2">Assisted in engineering the structure, styling, and algorithmic logic of this platform.</p>
          </section>

          <section className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-lg border border-brand-accent/20">
                <Globe size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase text-[10px] tracking-[0.2em] text-brand-muted">Cloud_Host</h3>
            </div>
            <p className="font-semibold text-brand-text uppercase font-mono">Google Cloud Platform</p>
            <p className="text-sm text-brand-muted mt-2 font-sans">Providing a high-availability environment for real-time biological sequence analysis.</p>
          </section>
        </div>
      </div>

      <footer className="text-center pt-8 border-t border-brand-border">
        <p className="text-[10px] text-brand-muted font-mono tracking-[0.2em] uppercase mb-2">Developed with 💚 for Biotechnology Excellence</p>
        <p className="text-[9px] text-brand-muted opacity-50 uppercase tracking-widest font-mono">© 2026 BioAlign // Dept of Computing in Biology</p>
      </footer>
    </motion.div>
  );
}
