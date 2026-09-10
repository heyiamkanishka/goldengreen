import React from 'react';
import { Feather, Sprout, CheckCircle, ArrowRight, HeartHandshake, MapPin } from 'lucide-react';

interface AboutSectionProps {
  onExplorePoultry: () => void;
  onExploreAgri: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExplorePoultry, onExploreAgri }) => {

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background soft botanical watermarks */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-forest-50/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-gold-50/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sprout className="w-4 h-4 text-forest-600" />
            <span>Rooted in Kaduwela, Sri Lanka</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight mb-5">
            Two Harmonious Disciplines. <br />
            <span className="text-forest-700 font-serif italic font-normal">One Living Ecosystem.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Founded with a conviction that food should heal the land that produces it, <strong>GoldenGreen</strong> bridges ethical free-range poultry farming with chemical-free regenerative agriculture. By closing the loop between animals and soil, we produce the cleanest nourishment for your family.
          </p>
        </div>

        {/* Dual Pillar Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pillar 1: Ethical Poultry Farming */}
          <div id="poultry" className="group rounded-3xl bg-[#fafcf9] border border-forest-100 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-sm">
                  <Feather className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100/80 text-amber-800 text-xs font-bold uppercase tracking-wide">
                  Ethical Poultry
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-forest-950 mb-3">
                Pasture-Raised & Cage-Free
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                Our birds spend their days basking in warm Sri Lankan sunlight, roaming grassy green pastures, and feeding on organic grains, seeds, and natural foraging. No prophylactic antibiotics, zero synthetic growth hormones, and never confined to cramped battery cages.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  '100% Cage-free with daily outdoor rotational foraging',
                  'Diet enriched with organic farm greens & whole grains',
                  'Air-chilled processing preserving pure taste & texture',
                  'Humanely certified with high animal welfare standards'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-forest-100/80 flex items-center justify-between">
              <div className="text-xs text-forest-800 font-medium">
                Fresh Chicken • Golden Yolks • Broths
              </div>
              <button
                onClick={onExplorePoultry}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-amber-600 transition-colors"
              >
                <span>Browse Poultry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Eco-Friendly Agriculture */}
          <div id="agriculture" className="group rounded-3xl bg-[#fafcf9] border border-forest-100 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-forest-100/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-forest-600/10 border border-forest-600/20 flex items-center justify-center text-forest-700 shadow-sm">
                  <Sprout className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wide">
                  Eco Agriculture
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-forest-950 mb-3">
                Chemical-Free Regenerative Soil
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                We revitalize local soils through our proprietary poultry manure compost and organic green mulches. Every tomato, bunch of greens, and sweet corn ear is cultivated without synthetic chemical sprays or neurotoxic pesticides, yielding pristine nutrient density.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  '100% Pesticide & chemical fertilizer free',
                  'Compost-powered living soil rich in biodiversity',
                  'Rainwater harvesting and drip micro-irrigation',
                  'Harvested at peak morning dawn & delivered in 24h'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-forest-100/80 flex items-center justify-between">
              <div className="text-xs text-forest-800 font-medium">
                Heirloom Veggies • Salad Greens • Organic Compost
              </div>
              <button
                onClick={onExploreAgri}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-amber-600 transition-colors"
              >
                <span>Browse Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Integrated Closed Loop Spotlight Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-850 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>The GoldenGreen Symbiosis</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                How Poultry & Fields Feed Each Other
              </h3>
              <p className="text-emerald-100/85 text-sm sm:text-base leading-relaxed mb-4">
                Our pasture poultry naturally aerate and fertilize the earth. In return, our organic fields yield high-protein alfalfa, insects, and vegetable trimmings that enrich our birds’ daily forage. This closed loop creates resilience, zero chemical runoff, and superior flavor.
              </p>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Kaduwela Farm Hub
                </span>
                <span>•</span>
                <span>Certified Sustainable Sri Lanka</span>
              </div>
            </div>

            <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-6 text-center backdrop-blur-md">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-1">
                Zero
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Synthetic Inputs
              </div>
              <p className="text-xs text-emerald-200/80">
                No antibiotics, no synthetic growth hormones, and zero artificial chemical pesticides across 100% of our farm operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
