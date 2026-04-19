import React from 'react';
import { motion } from 'motion/react';
import { Lock, Construction, Sparkles, Binary } from 'lucide-react';

export default function AddVersionView() {
  const [customVersions, setCustomVersions] = React.useState<any[]>([]);

  const registerVersion = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newVersion = {
      tag: formData.get('tag'),
      name: formData.get('name'),
      desc: formData.get('desc'),
      complex: formData.get('complex'),
    };
    setCustomVersions([...customVersions, newVersion]);
    form.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto py-8 px-4 space-y-12"
    >
      <header className="space-y-4">
        <h2 className="text-4xl font-mono font-bold tracking-tight text-brand-accent">ADD_VERSION_</h2>
        <p className="text-brand-muted font-sans">Register your own alignment algorithm as a new version slot in the system.</p>
      </header>

      <section className="glass-card p-8">
        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-accent mb-8 border-b border-brand-border pb-2 inline-block">// NEW_CONFIGURATION</h3>
        <form onSubmit={registerVersion} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Version Tag</label>
              <input name="tag" required placeholder="e.g. v4 · Smith-Waterman" className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all font-mono text-brand-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Short Name</label>
              <input name="name" required placeholder="e.g. SW Alignment" className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all font-sans" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Description</label>
            <textarea name="desc" required placeholder="Describe what this algorithm does..." className="w-full h-24 bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all font-sans resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Complexity Note</label>
            <input name="complex" placeholder="e.g. O(mn) time, O(mn) space" className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all font-mono text-xs opacity-70" />
          </div>
          <button type="submit" className="w-full py-4 bg-brand-accent text-brand-bg font-mono font-bold rounded-xl hover:bg-brand-accent/90 transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs">
            <div className="p-1 border border-brand-bg/20 rounded">
              <Construction size={14} />
            </div>
            + Register Version
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-muted">// REGISTERED_VERSIONS</h3>
        <div className="grid grid-cols-1 gap-3">
          {customVersions.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-brand-border rounded-2xl flex flex-col items-center gap-3 opacity-30">
              <Construction size={32} />
              <p className="text-xs font-mono tracking-widest uppercase italic">No custom versions registered yet.</p>
            </div>
          ) : (
            customVersions.map((v, i) => (
              <div key={i} className="p-6 glass-card group transition-all hover:border-brand-accent">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20 uppercase tracking-widest">{v.tag}</span>
                    <h4 className="mt-3 font-bold text-brand-text group-hover:text-brand-accent transition-colors">{v.name}</h4>
                  </div>
                  <Sparkles size={16} className="text-brand-muted" />
                </div>
                <p className="text-xs text-brand-muted mt-2 font-sans">{v.desc}</p>
                {v.complex && (
                   <div className="mt-4 pt-4 border-t border-brand-border flex items-center gap-2">
                      <Binary size={12} className="text-brand-muted" />
                      <span className="text-[10px] font-mono text-brand-muted italic uppercase opacity-50">{v.complex}</span>
                   </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
}
