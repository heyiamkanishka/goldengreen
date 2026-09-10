import React from 'react';
import { Recycle, SunMedium, Feather, PackageCheck, Droplets, CheckCircle2, ArrowRight } from 'lucide-react';
import { SUSTAINABILITY_PILLARS } from '../data/farmData';

export const SustainabilitySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'recycle':
        return <Recycle className="w-6 h-6 text-forest-700" />;
      case 'feather':
        return <Feather className="w-6 h-6 text-amber-600" />;
      case 'sun':
        return <SunMedium className="w-6 h-6 text-amber-500" />;
      case 'shield':
        return <PackageCheck className="w-6 h-6 text-forest-700" />;
      default:
        return <Droplets className="w-6 h-6 text-forest-700" />;
    }
  };

  const loopSteps = [
    { step: '01', title: 'Pasture Poultry', desc: 'Hens roam open fields and forage naturally' },
    { step: '02', title: 'Bio-Composting', desc: 'Manure is aged with organic mulches on site' },
    { step: '03', title: 'Living Soil', desc: 'Microbiome-rich compost restores our fields' },
    { step: '04', title: 'Fresh Harvest', desc: 'Pure chemical-free vegetables & organic feed' },
  ];

  return (
    <section id="sustainability" className="py-24 sm:py-32 bg-[#f4f8f5] relative overflow-hidden">
      {/* Decorative foliage accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Recycle className="w-4 h-4 text-forest-600 animate-spin-slow" />
            <span>Ecological Stewardship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight mb-5">
            Farming as a Climate Solution, <br />
            <span className="text-forest-700 font-serif italic font-normal">Not an Environmental Problem</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Industrial agriculture depletes topsoil and pollutes waterways. At GoldenGreen, every system is designed around closed cycles, clean energy, biodegradable packaging, and genuine animal respect.
          </p>
        </div>

        {/* Circular Closed-Loop Flowchart Banner */}
        <div className="mb-16 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-600">The Closed-Loop Method</span>
              <h3 className="text-xl sm:text-2xl font-bold text-forest-950">
                100% Zero-Waste Regenerative Cycle
              </h3>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              Waste from one process is the lifeblood of the next. Our circular model ensures zero synthetic runoff reaches Kaduwela groundwater.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {loopSteps.map((step, idx) => (
              <div
                key={step.step}
                className="relative bg-forest-50/60 rounded-2xl p-6 border border-forest-100 flex flex-col justify-between group hover:bg-forest-100/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-forest-700 text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                      {step.step}
                    </span>
                    {idx < 3 && (
                      <div className="hidden lg:flex items-center text-forest-400">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-forest-950 mb-1.5">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUSTAINABILITY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-forest-100/90 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Metric chip & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(pillar.iconName)}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-forest-900 tracking-tight">
                      {pillar.metric}
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                      {pillar.metricLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-forest-950 mb-3 group-hover:text-forest-800 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Bullet highlights */}
                <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                  {pillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-forest-700">
                <span>Verified Metric</span>
                <span className="w-2 h-2 rounded-full bg-forest-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
