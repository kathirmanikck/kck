import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Type, 
  Settings2, 
  Play, 
  History, 
  Dna,
  Binary,
  Zap,
  Timer,
  Search,
  ChevronDown,
  Edit2,
  FlaskConical,
  Microscope,
  Cpu
} from 'lucide-react';
import { TEMPLATE_DATABASE } from '../constants';
import { alignDNA, generateRandomDNA, runBenchmark } from '../lib/alignment';
import { AlignmentVersion, AlignmentResult, BenchmarkData } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { DNAString } from './DNAString';

function DNAStats({ sequence }: { sequence: string }) {
  if (!sequence) return null;
  const len = sequence.length;
  const counts = { A: 0, T: 0, G: 0, C: 0 };
  for (const char of sequence) {
    if (char in counts) (counts as any)[char]++;
  }
  const gc = len > 0 ? (((counts.G + counts.C) / len) * 100).toFixed(1) : '0.0';

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <div className="px-3 py-1 bg-brand-bg border border-brand-border rounded-lg text-[10px] font-mono">
        <span className="text-brand-muted uppercase mr-2">Length:</span>
        <span className="text-brand-accent">{len}</span>
      </div>
      <div className="px-3 py-1 bg-brand-bg border border-brand-border rounded-lg text-[10px] font-mono">
        <span className="text-brand-muted uppercase mr-2">GC:</span>
        <span className="text-brand-accent">{gc}%</span>
      </div>
      <div className="px-3 py-1 bg-brand-bg border border-brand-border rounded-lg text-[10px] font-mono">
        <span className="text-brand-muted uppercase mr-2">Bases:</span>
        <span className="text-brand-accent">A:{counts.A} T:{counts.T} G:{counts.G} C:{counts.C}</span>
      </div>
    </div>
  );
}

export default function HomeView() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_DATABASE[0]);
  const [templateSearch, setTemplateSearch] = useState('');
  const [useCustomTemplate, setUseCustomTemplate] = useState(false);
  const [customTemplateSequence, setCustomTemplateSequence] = useState('');
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
  
  const [activePanel, setActivePanel] = useState<'template' | 'subject' | null>(null);
  const [subjectDNA, setSubjectDNA] = useState('');
  const [version, setVersion] = useState<AlignmentVersion>('v1');
  const [randomLength, setRandomLength] = useState(100);
  const [result, setResult] = useState<AlignmentResult | null>(null);
  const [benchmark, setBenchmark] = useState<BenchmarkData[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateDNA = (seq: string) => {
    return /^[ATGC]*$/.test(seq.toUpperCase());
  };

  const handleRun = async () => {
    setError(null);
    
    // Validate Step 1 & 2
    if (!subjectDNA) {
      setError("Please provide a subject DNA strand.");
      return;
    }
    if (!validateDNA(subjectDNA)) {
      setError("Subject contains invalid characters. Only A, T, G, C are allowed.");
      return;
    }

    let templateToUse = '';
    if (version === 'v1') {
      templateToUse = useCustomTemplate ? customTemplateSequence : selectedTemplate.sequence;
      if (!templateToUse) {
        setError("Please ensure a template sequence is provided for V1.");
        return;
      }
      if (!validateDNA(templateToUse)) {
        setError("Template contains invalid characters. Only A, T, G, C are allowed.");
        return;
      }
    }

    setIsProcessing(true);
    setResult(null);
    setBenchmark(null);
    
    // Simulate processing
    await new Promise(r => setTimeout(r, 800));

    try {
      if (version === 'v1') {
        const res = alignDNA(templateToUse, subjectDNA);
        setResult(res);
      } else if (version === 'v2') {
        const template = generateRandomDNA(randomLength);
        const res = alignDNA(template, subjectDNA);
        setResult(res);
      } else if (version === 'v3') {
        const data = runBenchmark(randomLength, subjectDNA);
        setBenchmark(data);
      }
    } catch (err) {
      setError("An error occurred during alignment processing.");
      console.error(err);
    }

    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <header className="space-y-2 mb-10">
        <h2 className="text-4xl font-mono font-bold tracking-tight text-brand-text">
          DNA<span className="text-brand-accent">Align _</span>
        </h2>
        <p className="text-brand-muted max-w-lg text-base font-sans leading-relaxed">Choose your template, input your subject strand, pick a version, and run the alignment algorithm.</p>
      </header>

      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-brand-danger/10 border border-brand-danger/30 rounded-xl text-brand-danger font-mono text-xs flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-brand-danger animate-pulse" />
          {error}
        </motion.div>
      )}

      {/* 01 - Algorithm Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.2em]">01 — Algorithm Version</div>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setVersion('v1')}
            className={`version-card p-6 border rounded-xl cursor-pointer transition-all bg-brand-bg2/50 relative ${version === 'v1' ? 'border-brand-accent bg-brand-accent/[0.05] ring-1 ring-brand-accent' : 'border-brand-border hover:border-brand-accent/50'}`}
          >
            <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-3 bg-brand-accent/10 px-2 py-0.5 rounded inline-block">v1 · Linear Scan</div>
            <h4 className="text-sm font-medium text-brand-text mb-2 tracking-tight uppercase">Basic Index Search</h4>
            <p className="text-xs text-brand-muted leading-relaxed">Linear scan with indexing. Reports position and repetition count of subject in template.</p>
          </div>

          <div 
            onClick={() => setVersion('v2')}
            className={`version-card p-6 border rounded-xl cursor-pointer transition-all bg-brand-bg2/50 relative ${version === 'v2' ? 'border-brand-accent bg-brand-accent/[0.05] ring-1 ring-brand-accent' : 'border-brand-border hover:border-brand-accent/50'}`}
          >
            <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-3 bg-brand-accent/10 px-2 py-0.5 rounded inline-block">v2 · Randomised</div>
            <h4 className="text-sm font-medium text-brand-text mb-2 tracking-tight uppercase">Random Gen + Search</h4>
            <p className="text-xs text-brand-muted leading-relaxed">Generates a random template from N nucleotides, then aligns your subject against it.</p>
          </div>

          <div 
            onClick={() => setVersion('v3')}
            className={`version-card p-6 border rounded-xl cursor-pointer transition-all bg-brand-bg2/50 relative ${version === 'v3' ? 'border-brand-accent bg-brand-accent/[0.05] ring-1 ring-brand-accent' : 'border-brand-border hover:border-brand-accent/50'}`}
          >
            <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-3 bg-brand-accent/10 px-2 py-0.5 rounded inline-block">v3 · Benchmark</div>
            <h4 className="text-sm font-medium text-brand-text mb-2 tracking-tight uppercase">10-Run Doubling Test</h4>
            <p className="text-xs text-brand-muted leading-relaxed">Runs alignment 10 times. Template doubles each run. Plots time vs template size graph.</p>
          </div>

          <div className="version-card p-6 border border-brand-border rounded-xl bg-brand-bg2/30 opacity-60 cursor-not-allowed relative">
            <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-3 bg-brand-accent/10 px-2 py-0.5 rounded inline-block">v4 · Advanced</div>
            <h4 className="text-sm font-medium text-brand-text mb-2 tracking-tight uppercase">Coming Soon</h4>
            <p className="text-xs text-brand-muted leading-relaxed">Advanced alignment algorithm. Add yours from the menu → Add Version.</p>
            <div className="absolute top-4 right-4 text-[9px] font-mono bg-brand-warning/10 text-brand-warning border border-brand-warning/30 px-2 py-0.5 rounded uppercase tracking-tighter">SOON</div>
          </div>
        </div>
      </section>

      {/* 02 - Conditional Input (Template or Config) */}
      <AnimatePresence mode="wait">
        {version === 'v1' ? (
          <motion.section 
            key="v1-template"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
                <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 02 — Template Sequence
              </span>
              <div className="flex-1 h-px bg-brand-border"></div>
            </div>
            
            <div 
              onClick={() => setActivePanel(activePanel === 'template' ? null : 'template')}
              className={`action-card ${activePanel === 'template' ? 'border-brand-accent bg-brand-accent/[0.08]' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="card-icon w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-xl">🧬</div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-brand-text">Template DNA</h3>
                  <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider font-mono">
                    {useCustomTemplate ? 'Custom Sequence' : `Library: ${selectedTemplate.code}`}
                  </p>
                  {!activePanel && <DNAStats sequence={useCustomTemplate ? customTemplateSequence : selectedTemplate.sequence} />}
                </div>
                <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-brand-accent border border-brand-accent/30 px-2 py-0.5 rounded bg-brand-accent/10">
                  {activePanel === 'template' ? 'OPEN' : 'SELECT'}
                </div>
              </div>

              <AnimatePresence>
                {activePanel === 'template' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="pt-8 cursor-default"
                  >
                    <div className="space-y-6">
                      <div className="flex gap-2 p-1 bg-brand-bg border border-brand-border rounded-xl">
                        <button 
                          onClick={() => setUseCustomTemplate(false)}
                          className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${!useCustomTemplate ? 'bg-brand-card text-brand-accent border border-brand-border' : 'text-brand-muted'}`}
                        >
                          Organism Library
                        </button>
                        <button 
                          onClick={() => setUseCustomTemplate(true)}
                          className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${useCustomTemplate ? 'bg-brand-card text-brand-accent border border-brand-border' : 'text-brand-muted'}`}
                        >
                          Custom Paste
                        </button>
                      </div>

                      {!useCustomTemplate ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-border">
                          {TEMPLATE_DATABASE.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => {
                                setSelectedTemplate(t);
                                setActivePanel(null);
                              }}
                              className={`p-4 text-left border rounded-xl transition-all ${
                                selectedTemplate.id === t.id 
                                  ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent' 
                                  : 'border-brand-border bg-brand-bg/50 hover:border-brand-muted'
                              }`}
                            >
                              <p className={`text-sm font-bold ${selectedTemplate.id === t.id ? 'text-brand-accent' : 'text-brand-text'}`}>{t.name}</p>
                              <p className="text-[10px] font-mono text-brand-muted mt-1">{t.code}</p>
                              <p className="text-[9px] font-mono text-brand-accent/50 mt-2 uppercase tracking-widest">{t.type}</p>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative">
                            <textarea 
                              value={customTemplateSequence}
                              onChange={(e) => {
                                const val = e.target.value.toUpperCase();
                                setCustomTemplateSequence(val);
                                if (!validateDNA(val)) {
                                  setError("Invalid characters detected in template. Alignment will fail unless corrected.");
                                } else {
                                  setError(null);
                                }
                              }}
                              placeholder="Paste your template DNA here (A, T, G, C only)..."
                              className={`w-full h-32 px-4 py-3 bg-brand-bg border rounded-xl font-mono text-xs text-brand-accent focus:outline-none transition-all resize-none ${!validateDNA(customTemplateSequence) ? 'border-brand-danger/50' : 'border-brand-border focus:border-brand-accent'}`}
                            />
                            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-brand-muted opacity-40">
                              {customTemplateSequence.length}nt
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mr-2">Quick_Gen:</span>
                            {[20, 50, 100].map(n => (
                              <button 
                                key={n}
                                onClick={() => {
                                  setCustomTemplateSequence(generateRandomDNA(n));
                                  setError(null);
                                }}
                                className="px-3 py-1 bg-brand-bg2 border border-brand-border rounded-full text-[10px] font-mono text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all"
                              >
                                RANDOM_{n}nt
                              </button>
                            ))}
                            <button 
                              onClick={() => {
                                if (validateDNA(customTemplateSequence) && customTemplateSequence.length > 0) {
                                  setActivePanel(null);
                                  setError(null);
                                }
                              }}
                              disabled={!validateDNA(customTemplateSequence) || customTemplateSequence.length === 0}
                              className="ml-auto px-4 py-1.5 bg-brand-accent disabled:opacity-30 text-brand-bg rounded-lg text-xs font-mono font-bold hover:scale-105 transition-transform"
                            >
                              USE_THIS ✓
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="v2-v3-config"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
                <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 02 — Configuration
              </span>
              <div className="flex-1 h-px bg-brand-border"></div>
            </div>

            <div className="p-8 bg-brand-bg2/50 border border-brand-border rounded-2xl space-y-6 relative overflow-hidden group">
              <div className="scanning-bar opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="flex justify-between items-center relative z-10">
                <h4 className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.2em]">
                  {version === 'v2' ? 'Template Size Configuration' : 'Base Template Complexity'}
                </h4>
                <span className="text-brand-accent font-mono text-xl">{randomLength}nt</span>
              </div>
              <input 
                type="range"
                min="20"
                max={version === 'v2' ? 1000 : 500}
                value={randomLength}
                onChange={(e) => setRandomLength(parseInt(e.target.value))}
                className="w-full accent-brand-accent relative z-10"
              />
              {version === 'v3' && (
                <p className="text-[10px] text-brand-muted font-mono leading-relaxed relative z-10">
                  WILL RUN 10 ITERATIONS: <span className="text-brand-accent">{randomLength}nt</span> → <span className="text-brand-accent">{(randomLength * Math.pow(2, 9)).toLocaleString()}nt</span> TEMPLATE SIZES
                </p>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 03 - Subject Input */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
            <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 03 — Subject Strand
          </span>
          <div className="flex-1 h-px bg-brand-border"></div>
        </div>

        <div 
          onClick={() => setActivePanel(activePanel === 'subject' ? null : 'subject')}
          className={`action-card ${activePanel === 'subject' ? 'border-brand-accent bg-brand-accent/[0.08]' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className="card-icon w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-xl">🔬</div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-brand-text">Subject Strand</h3>
              <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider font-mono">
                {subjectDNA ? `${subjectDNA.length}nt Sequence Target` : 'INPUT_REQUIRED'}
              </p>
              {!activePanel && subjectDNA && <DNAStats sequence={subjectDNA} />}
            </div>
            <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-brand-accent border border-brand-accent/30 px-2 py-0.5 rounded bg-brand-accent/10">
              {activePanel === 'subject' ? 'OPEN' : 'INPUT'}
            </div>
          </div>

          <AnimatePresence>
            {activePanel === 'subject' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="pt-8 cursor-default"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={subjectDNA}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setSubjectDNA(val);
                        if (!validateDNA(val)) {
                          setError("Invalid characters detected in subject strand. Use only A, T, G, C.");
                        } else {
                          setError(null);
                        }
                      }}
                      placeholder="ENTER_SUBJECT_STRAND_FOR_ALIGNMENT..."
                      className={`w-full h-32 px-4 py-3 bg-brand-bg border rounded-xl font-mono text-xs text-brand-accent focus:outline-none transition-all resize-none ${!validateDNA(subjectDNA) ? 'border-brand-danger/50' : 'border-brand-border focus:border-brand-accent'}`}
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-brand-muted opacity-40">
                      {subjectDNA.length}nt
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mr-2">Samples:</span>
                    {['ATGC', 'GCTA'].map(s => (
                      <button 
                        key={s} 
                        onClick={() => {
                          setSubjectDNA(s);
                          setError(null);
                        }}
                        className="px-3 py-1 bg-brand-bg2 border border-brand-border rounded-full text-[10px] font-mono text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all"
                      >
                        {s}
                      </button>
                    ))}
                    <div className="w-px h-4 bg-brand-border mx-2" />
                    <button 
                      onClick={() => {
                        setSubjectDNA(generateRandomDNA(8));
                        setError(null);
                      }}
                      className="px-3 py-1 bg-brand-bg2 border border-brand-border rounded text-[10px] font-mono text-brand-accent hover:bg-brand-accent/10 transition-all flex items-center gap-2"
                    >
                      <Zap size={10} />
                      Random 8nt
                    </button>
                    <button 
                      onClick={() => {
                        setSubjectDNA(generateRandomDNA(12));
                        setError(null);
                      }}
                      className="px-3 py-1 bg-brand-bg2 border border-brand-border rounded text-[10px] font-mono text-brand-accent hover:bg-brand-accent/10 transition-all flex items-center gap-2"
                    >
                      <Zap size={10} />
                      Random 12nt
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Run Alignment */}
      <button
        onClick={handleRun}
        disabled={isProcessing}
        className={`w-full h-14 rounded-xl flex items-center justify-center gap-3 font-mono font-bold tracking-[0.2em] transition-all relative overflow-hidden group ${
          isProcessing 
            ? 'bg-brand-accent/20 text-brand-accent cursor-wait' 
            : 'bg-brand-accent text-brand-bg hover:bg-brand-accent2 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(61,220,110,0.2)]'
        }`}
      >
        <div className="scanning-bar group-hover:opacity-40 transition-opacity" />
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            PROCESSING_ALIGNMENT
          </>
        ) : (
          <>
            <Play size={20} fill="currentColor" />
            RUN ALIGNMENT
          </>
        )}
      </button>

      {/* Analysis Results Area */}
      <AnimatePresence>
        {(result || benchmark) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 pt-8">
              <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
                <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 04 — Output Analysis
              </span>
              <div className="flex-1 h-px bg-brand-border"></div>
            </div>

            <div className="glass-card overflow-hidden border-brand-accent/30 shadow-[0_0_30px_rgba(61,220,110,0.05)] relative">
              <div className="scanning-bar opacity-10" />
              <div className="bg-brand-accent/10 p-6 flex items-center justify-between border-b border-brand-border relative z-10">
                <div className="flex items-center gap-3">
                  <History className="text-brand-accent" size={20} />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-brand-accent italic">Analysis_Report_</h3>
                </div>
                <div className="text-[10px] font-mono text-brand-muted bg-brand-bg/50 px-3 py-1 rounded border border-brand-border uppercase tracking-widest">
                  STABLE_BUILD_V1.4
                </div>
              </div>

              <div className="p-8 relative z-10">
                {result && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-brand-bg border border-brand-border p-5 rounded-2xl">
                        <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">Occurrences</p>
                        <p className={`text-4xl font-mono mt-1 ${result.count > 0 ? 'text-brand-accent' : 'text-brand-muted'}`}>{result.count}</p>
                      </div>
                      <div className="bg-brand-bg border border-brand-border p-5 rounded-2xl">
                        <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">Processing Time</p>
                        <p className="text-3xl font-mono mt-1 text-brand-text">{result.timeTaken.toFixed(4)}<span className="text-xs ml-1 opacity-50">ms</span></p>
                      </div>
                      <div className="bg-brand-bg border border-brand-border p-5 rounded-2xl">
                        <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">Status</p>
                        <p className={`text-xl font-mono mt-2 uppercase tracking-tighter ${result.count > 0 ? 'text-brand-accent' : 'text-red-500'}`}>
                          {result.count > 0 ? '✓ Match_Identified' : '✗ No_Matches'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">// Alignment_Visual</p>
                        <div className="p-6 bg-brand-bg border border-brand-border rounded-xl font-mono text-xs overflow-x-auto space-y-4 relative">
                           {result.count > 0 ? (
                             <>
                                <div className="flex items-center gap-4">
                                  <span className="w-16 text-brand-muted opacity-50 uppercase tracking-widest text-[9px]">Template</span>
                                  <DNAString sequence={result.template.slice(Math.max(0, result.indices[0]-10), result.indices[0] + subjectDNA.length + 10)} />
                                </div>
                                <div className="flex items-center gap-4 translate-y-[-12px]">
                                   <span className="w-16"></span>
                                   <span className="text-brand-accent font-bold opacity-30 tracking-[0.2em]">{Array(Math.min(10, result.indices[0])).fill(' ').join('')}{Array(subjectDNA.length).fill('|').join('')}</span>
                                </div>
                                <div className="flex items-center gap-4 translate-y-[-24px]">
                                  <span className="w-16 text-brand-muted opacity-50 uppercase tracking-widest text-[9px]">Subject</span>
                                  <span className="tracking-widest">{Array(Math.min(10, result.indices[0])).fill(' ').join('')}<DNAString sequence={subjectDNA} /></span>
                                </div>
                             </>
                           ) : (
                             <div className="space-y-3">
                               <p className="text-brand-muted italic uppercase text-[10px] tracking-widest opacity-50">// NO_CLUSTERS_IDENTIFIED</p>
                               <div className="p-3 bg-brand-bg/50 border border-brand-border rounded-lg">
                                 <p className="text-[9px] text-brand-muted uppercase mb-2 font-mono tracking-widest">Full_Template_Snapshot:</p>
                                 <DNAString sequence={result.template.slice(0, 200)} className="text-[10px]" />
                                 {result.template.length > 200 && <span className="text-brand-muted">...</span>}
                               </div>
                               <DNAStats sequence={result.template} />
                             </div>
                           )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">// Index_Locators</p>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2">
                          {result.indices.length > 0 ? result.indices.map((idx, i) => (
                            <span key={i} className="px-3 py-1.5 bg-brand-bg border border-brand-border rounded text-[10px] font-mono text-brand-accent shadow-[0_2px_10px_rgba(61,220,110,0.02)]">
                              INDEX_{idx.toString().padStart(4, '0')}
                            </span>
                          )) : <p className="text-sm text-brand-muted italic opacity-50">Empty dataset.</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {benchmark && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-brand-bg border border-brand-border rounded-xl">
                        <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">Scaling Log</p>
                        <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-2 font-mono text-[10px]">
                          {benchmark.map((d, i) => (
                            <div key={i} className="flex justify-between border-b border-brand-border pb-1 last:border-0 opacity-80">
                              <span className="text-brand-muted tracking-wider">RUN_{i+1} : {d.size.toLocaleString()}nt</span>
                              <span className="text-brand-accent font-bold">{d.time.toFixed(4)}ms</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 bg-brand-bg border border-brand-border rounded-xl flex items-center justify-center text-center">
                        <div className="space-y-2">
                          <Zap size={32} className="text-brand-accent mx-auto animate-pulse" />
                          <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest mt-4">Benchmark Status</p>
                          <p className="text-brand-accent font-bold font-mono">STRESS_TEST_COMPLETE</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-80 w-full bg-brand-bg rounded-xl p-6 border border-brand-border">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={benchmark}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a3a2a" />
                          <XAxis 
                            dataKey="size" 
                            fontSize={10} 
                            tick={{ fill: '#7a9a7a' }}
                            tickFormatter={(val) => val > 1000 ? `${(val/1000).toFixed(0)}k` : val}
                            stroke="#2a3a2a"
                          />
                          <YAxis 
                            fontSize={10} 
                            tick={{ fill: '#7a9a7a' }} 
                            stroke="#2a3a2a"
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0a0f0a', border: '1px solid #2a3a2a', borderRadius: '12px', color: '#e8f5e8', fontSize: '10px', fontFamily: 'Space Mono' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="time" 
                            stroke="#3ddc6e" 
                            strokeWidth={3} 
                            dot={{ r: 4, fill: '#3ddc6e', strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
