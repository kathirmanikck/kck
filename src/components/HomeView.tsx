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

  const handleRun = async () => {
    setIsProcessing(true);
    setResult(null);
    setBenchmark(null);
    
    await new Promise(r => setTimeout(r, 800));

    if (version === 'v1') {
      const templateToUse = useCustomTemplate ? customTemplateSequence : selectedTemplate.sequence;
      if (!templateToUse) {
        setIsProcessing(false);
        return;
      }
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

    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <header className="space-y-2">
        <h2 className="text-3xl font-mono font-bold tracking-tight text-brand-text">
          DNA<span className="text-brand-accent">Align _</span>
        </h2>
        <p className="text-brand-muted max-w-lg text-sm font-sans">Choose your template, input your subject strand, pick a version, and run the alignment algorithm.</p>
      </header>

      {/* 01 - Template Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
            <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 01 — Template Sequence
          </span>
          <div className="flex-1 h-px bg-brand-border"></div>
        </div>
        
        <div 
          onClick={() => setActivePanel(activePanel === 'template' ? null : 'template')}
          className={`glass-card p-6 cursor-pointer group transition-all relative overflow-hidden ${activePanel === 'template' ? 'border-brand-accent bg-brand-accent/[0.03]' : 'hover:border-brand-accent/50'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-colors ${activePanel === 'template' ? 'bg-brand-accent text-brand-bg' : 'bg-brand-accent/10 text-brand-accent'}`}>
              <FlaskConical size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-brand-text group-hover:text-brand-accent transition-colors">Template DNA</h3>
              <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider font-mono">
                {useCustomTemplate ? 'Custom Sequence' : `Library: ${selectedTemplate.code}`}
              </p>
              {!activePanel && <DNAStats sequence={useCustomTemplate ? customTemplateSequence : selectedTemplate.sequence} />}
            </div>
            <div className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-all ${activePanel === 'template' ? 'border-brand-accent text-brand-accent bg-brand-accent/10' : 'border-brand-border text-brand-muted'}`}>
              SELECT
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
                          onClick={() => setSelectedTemplate(t)}
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
                      <textarea 
                        value={customTemplateSequence}
                        onChange={(e) => setCustomTemplateSequence(e.target.value.toUpperCase().replace(/[^ACGT]/g, ''))}
                        placeholder="Paste your template DNA here (A, T, G, C only)..."
                        className="w-full h-32 px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-mono text-xs text-brand-accent focus:outline-none focus:border-brand-accent resize-none transition-all"
                      />
                      {customTemplateSequence && (
                        <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                          <p className="text-[10px] font-mono text-brand-muted mb-2 uppercase tracking-widest">// Preview ({customTemplateSequence.length}nt)</p>
                          <DNAString sequence={customTemplateSequence.slice(0, 100)} className="text-[10px]" />
                          {customTemplateSequence.length > 100 && <span className="text-brand-muted text-[10px]">...</span>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 02 - Subject Input */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
            <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 02 — Subject Strand
          </span>
          <div className="flex-1 h-px bg-brand-border"></div>
        </div>

        <div 
          onClick={() => setActivePanel(activePanel === 'subject' ? null : 'subject')}
          className={`glass-card p-6 cursor-pointer group transition-all relative overflow-hidden ${activePanel === 'subject' ? 'border-brand-accent bg-brand-accent/[0.03]' : 'hover:border-brand-accent/50'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-colors ${activePanel === 'subject' ? 'bg-brand-accent text-brand-bg' : 'bg-brand-accent/10 text-brand-accent'}`}>
              <Microscope size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-brand-text group-hover:text-brand-accent transition-colors">Subject DNA</h3>
              <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider font-mono">
                {subjectDNA ? `${subjectDNA.length}nt Sequence Target` : 'INPUT_REQUIRED'}
              </p>
              {!activePanel && subjectDNA && <DNAStats sequence={subjectDNA} />}
            </div>
            <div className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-all ${activePanel === 'subject' ? 'border-brand-accent text-brand-accent bg-brand-accent/10' : 'border-brand-border text-brand-muted'}`}>
              INPUT
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
                  <textarea
                    value={subjectDNA}
                    onChange={(e) => setSubjectDNA(e.target.value.toUpperCase().replace(/[^ACGT]/g, ''))}
                    placeholder="Enter subject DNA strand (e.g. ATGCTAGC)..."
                    className="w-full h-32 px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-mono text-xs text-brand-accent focus:outline-none focus:border-brand-accent resize-none transition-all"
                  />
                  <div className="flex flex-wrap gap-2">
                    {['ATGC', 'GCTA'].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setSubjectDNA(s)}
                        className="px-3 py-1 bg-brand-bg border border-brand-border rounded text-[10px] font-mono text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all"
                      >
                        Sample: {s}
                      </button>
                    ))}
                    <button 
                      onClick={() => setSubjectDNA(generateRandomDNA(8))}
                      className="px-3 py-1 bg-brand-bg border border-brand-border rounded text-[10px] font-mono text-brand-accent hover:bg-brand-accent/10 transition-all flex items-center gap-2"
                    >
                      <Zap size={10} />
                      Random 8nt
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 03 - Algorithm Choices */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
            <span className="italic font-serif normal-case text-brand-accent mr-1">Step</span> 03 — Algorithm Version
          </span>
          <div className="flex-1 h-px bg-brand-border"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'v1', name: 'Linear Scan', tag: 'v1 · Linear Scan', desc: 'Basic Index search with linear repetition scan.' },
            { id: 'v2', name: 'Randomised', tag: 'v2 · Random Template', desc: 'Generates random template from N nucleotides.' },
            { id: 'v3', name: 'Benchmark', tag: 'v3 · Scaling Benchmark', desc: '10 doubling runs with performance analytics.' },
            { id: 'v4', name: 'Coming Soon', tag: 'v4 · Advanced', desc: 'Register your own version via settings.', disabled: true },
          ].map((v) => (
            <button
              key={v.id}
              disabled={v.disabled}
              onClick={() => setVersion(v.id as AlignmentVersion)}
              className={`p-6 text-left border rounded-2xl transition-all relative group ${
                v.disabled ? 'opacity-40 cursor-not-allowed border-dashed bg-brand-bg/20' : 
                version === v.id 
                  ? 'border-brand-accent bg-brand-accent/[0.04] ring-1 ring-brand-accent' 
                  : 'border-brand-border glass-card hover:border-brand-muted'
              }`}
            >
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <div className={`text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded inline-block ${version === v.id ? 'bg-brand-accent text-brand-bg' : 'bg-brand-accent/10 text-brand-accent'}`}>
                    {v.tag}
                  </div>
                  <h4 className="font-bold text-lg mt-3 text-brand-text group-hover:text-brand-accent transition-colors">{v.name}</h4>
                  <p className="text-xs text-brand-muted mt-2 font-sans leading-relaxed">{v.desc}</p>
                </div>
                {v.disabled && <div className="absolute top-4 right-4 text-[9px] font-mono bg-orange-500/10 text-orange-500 border border-orange-500/30 px-2 py-0.5 rounded tracking-widest uppercase">Soon</div>}
              </div>
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={handleRun}
        disabled={isProcessing || !subjectDNA || (!useCustomTemplate && !selectedTemplate.sequence && version === 'v1')}
        className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-30 text-brand-bg font-mono font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-[0_4px_20px_rgba(61,220,110,0.2)] tracking-widest uppercase text-sm"
      >
        {isProcessing ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-brand-bg/30 border-t-brand-bg rounded-full animate-spin"></div>
            <span>Processing_Algorithm...</span>
          </div>
        ) : (
          <>
            <Play size={18} fill="currentColor" />
            <span>▶ Run_Alignment</span>
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
