import React, { useState } from 'react';
import { Sprout, MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, Youtube, Send, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-forest-950 text-white pt-20 pb-12 border-t border-forest-850 relative overflow-hidden">
      {/* Subtle top organic glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-forest-900/80">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-forest-800 text-amber-400 border border-forest-700 shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Golden<span className="text-amber-400 font-serif italic">Green</span>
              </span>
            </div>

            <p className="text-sm text-emerald-100/75 leading-relaxed mb-6 max-w-sm">
              Cultivating the future of ethical agriculture in Sri Lanka. 100% pasture-raised poultry, zero-chemical regenerative soils, and closed-loop sustainability rooted in Kaduwela.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Join our Harvest Circle
              </span>
              <p className="text-xs text-emerald-200/70 mb-3">
                Receive weekly seasonal harvest lists, organic egg availability, and farm recipes.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 bg-forest-900/80 border border-forest-700 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Subscribed! Welcome to GoldenGreen Harvest alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-forest-900/80 border border-forest-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-400 w-full"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-forest-950 font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Explore Farm
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/70">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home Showcase</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">Our Story & Pillars</a>
              </li>
              <li>
                <a href="#poultry" className="hover:text-amber-400 transition-colors">Pasture Poultry</a>
              </li>
              <li>
                <a href="#agriculture" className="hover:text-amber-400 transition-colors">Eco Agriculture</a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-amber-400 transition-colors">Sustainability Model</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Pricing & Products</a>
              </li>
            </ul>
          </div>

          {/* Farm Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Fresh Harvest
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/70">
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Whole Free-Range Chicken</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Pastured Golden Egg Packs</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Tender Chicken Breasts</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Weekly Harvest Baskets</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Hydroponic Salad Greens</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Organic Poultry Compost</a>
              </li>
            </ul>
          </div>

          {/* Physical Location & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Farm & Hub
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-emerald-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>GoldenGreen Agro Estate, Malabe Road, Kaduwela, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+94 (11) 234-5678 / +94 (77) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>orders@goldengreen.lk</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Farm Dispatch: Daily 6:00 AM – 7:00 PM</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3 text-emerald-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center hover:bg-amber-500 hover:text-forest-950 transition-colors"
                aria-label="GoldenGreen on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center hover:bg-amber-500 hover:text-forest-950 transition-colors"
                aria-label="GoldenGreen on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center hover:bg-amber-500 hover:text-forest-950 transition-colors"
                aria-label="GoldenGreen on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center hover:bg-amber-500 hover:text-forest-950 transition-colors"
                aria-label="GoldenGreen on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>© {new Date().getFullYear()} GoldenGreen Farm Ltd. Kaduwela, Sri Lanka. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Ethically Raised • Free Range • 100% Sustainable</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-emerald-200/80">
              Nurtured with <Heart className="w-3 h-3 text-red-400 fill-current inline" /> in Sri Lanka
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
