import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, GraduationCap } from 'lucide-react';

export default function AboutView() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto space-y-12 py-8"
    >
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-brand-accent/10 border border-brand-accent/30 rounded-2xl mx-auto flex items-center justify-center text-brand-accent shadow-[0_0_20px_rgba(61,220,110,0.1)] rotate-3">
          <GraduationCap size={40} />
        </div>
        <h2 className="text-4xl font-mono font-bold tracking-tight text-brand-accent">ABOUT_US_</h2>
        <p className="text-brand-muted max-w-lg mx-auto font-sans">
          BioAlign — a student project on DNA sequence alignment, developed for demonstrating bioinformatics algorithms in-browser.
        </p>
      </header>

      <section className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full translate-x-12 -translate-y-12"></div>
        
        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-accent mb-8 border-b border-brand-border pb-2 inline-block">SYSTEM_CREATOR</h3>
        
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-bg border border-brand-border rounded-full flex items-center justify-center text-brand-accent">
              <User size={32} />
            </div>
            <div>
              <p className="text-2xl font-bold">Kathirmani</p>
              <p className="text-brand-accent font-mono text-sm leading-relaxed tracking-wider">MOD_ID: 25BCB0017</p>
              <p className="text-brand-muted text-xs mt-1 uppercase tracking-widest">B.Sc Bioinformatics Student</p>
            </div>
          </div>

          <p className="text-brand-muted leading-relaxed font-sans text-lg border-l-2 border-brand-border pl-6 py-2 italic">
            "BioAlign is built to demonstrate DNA sequence alignment techniques using simple logic running directly in the browser. It covers linear scanning, random sequence generation, and performance benchmarking."
          </p>

          <div className="flex gap-4 pt-4">
            <a href="mailto:kathirmani.kck@gmail.com" className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-accent transition-colors font-mono">
              <Mail size={16} />
              <span>[CONTACT_LINK]</span>
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 glass-card">
          <h4 className="font-mono font-bold text-brand-accent mb-2 uppercase tracking-wider text-xs">// Academic_Context</h4>
          <p className="text-sm text-brand-muted">Developed as part of the Bioinformatics course curriculum, focusing on string matching algorithms in genomic sequences.</p>
        </div>
        <div className="p-6 glass-card">
          <h4 className="font-mono font-bold text-brand-accent mb-2 uppercase tracking-wider text-xs">// Build_Hash</h4>
          <p className="text-[10px] text-brand-muted font-mono break-all opacity-50">REACT_19.0.0_TAILWIND_4.0_VITE_6.0_TYPESCRIPT_5.1</p>
        </div>
      </div>
    </motion.div>
  );
}
