import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import { HERO_SLIDES, QUICK_STATS } from '../data/farmData';

interface HeroSliderProps {
  onExploreProducts: () => void;
  onPlaceOrder: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onExploreProducts, onPlaceOrder }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slideCount]);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="home"
      className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[780px] flex items-center overflow-hidden bg-forest-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="GoldenGreen Hero Showcase"
    >
      {/* Background Image Carousel with crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              } transform transition-transform duration-10000`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center brightness-[0.78]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Subtle multi-layer gradient overlays for impeccable text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/60" />
            </div>
          );
        })}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:py-32 w-full">
        <div className="max-w-3xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-forest-600/50 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold mb-5 animate-fade-in shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{HERO_SLIDES[currentSlide].tagline}</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-300 font-medium">{HERO_SLIDES[currentSlide].categoryBadge}</span>
          </div>

          {/* Heading with Highlight */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight mb-4 font-sans">
            {HERO_SLIDES[currentSlide].title}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-300 font-serif italic font-normal">
              {HERO_SLIDES[currentSlide].highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl font-light">
            {HERO_SLIDES[currentSlide].description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreProducts}
              id="hero-explore-products-btn"
              className="px-6 sm:px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold bg-amber-500 hover:bg-amber-400 text-forest-950 flex items-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{HERO_SLIDES[currentSlide].primaryCta.text}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPlaceOrder}
              id="hero-place-order-btn"
              className="px-6 sm:px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md flex items-center gap-2 transition-all duration-300"
            >
              <span>{HERO_SLIDES[currentSlide].secondaryCta.text}</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-emerald-200/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free-range & antibiotic-free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Chemical-free soils</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Same-day farm fresh delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Left/Right Carousel Controls */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        <button
          onClick={goToPrev}
          aria-label="Previous Slide"
          id="hero-slider-prev-btn"
          className="p-3 rounded-full bg-forest-900/60 hover:bg-forest-800 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          aria-label="Next Slide"
          id="hero-slider-next-btn"
          className="p-3 rounded-full bg-forest-900/60 hover:bg-forest-800 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Slider Indicator Dots & Slider Progress */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  id={`hero-slide-dot-${index}`}
                  aria-label={`Jump to slide ${index + 1}: ${slide.title}`}
                  className={`group relative py-2 focus:outline-none transition-all duration-300`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-10 bg-amber-400 shadow-md shadow-amber-400/50'
                        : 'w-2.5 bg-white/35 hover:bg-white/70'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Slide counter & pause note */}
          <div className="hidden sm:flex items-center gap-3 text-xs text-white/70 font-medium">
            <span className="tracking-widest">
              <strong className="text-amber-400 font-bold">0{currentSlide + 1}</strong> / 0{slideCount}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white/50 text-[11px]">
              {isPaused ? 'Paused (hovering)' : 'Autoplaying'}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Ribbon / Stats Banner */}
      <div className="absolute -bottom-1 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-forest-900/90 backdrop-blur-md border-t border-l border-r border-forest-700/50 rounded-t-2xl shadow-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-forest-800">
            {QUICK_STATS.map((stat, i) => (
              <div key={i} className="p-4 sm:p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-forest-800/80 border border-forest-600/40 flex items-center justify-center text-amber-400 shrink-0">
                  {i === 0 && <ShieldCheck className="w-5 h-5" />}
                  {i === 1 && <Award className="w-5 h-5" />}
                  {i === 2 && <ArrowRight className="w-5 h-5" />}
                  {i === 3 && <Heart className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-emerald-200">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-emerald-300/70 hidden sm:block">
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
