import React, { useState } from 'react';
import { Star, ShoppingCart, Check, Feather, Sprout, Layers, ArrowRight } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/farmData';

interface ProductsSectionProps {
  onSelectProductForOrder: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProductForOrder }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  const poultryCount = PRODUCTS.filter((p) => p.category === 'poultry').length;
  const agriCount = PRODUCTS.filter((p) => p.category === 'agriculture').length;

  const handleOrderProduct = (product: Product) => {
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
    onSelectProductForOrder(product);
  };

  return (
    <section id="products" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Farm Fresh Catalog & Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
              Ethical Harvest, <br />
              <span className="text-forest-700 font-serif italic font-normal">Direct from Pasture to Plate</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Select items from our certified free-range poultry flocks and chemical-free agriculture beds. Order individually or inquire for wholesale restaurant and retail distribution.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-forest-50/80 border border-forest-100 self-start md:self-auto">
            <button
              onClick={() => setActiveCategory('all')}
              id="filter-all-btn"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-forest-800 text-white shadow-md shadow-forest-900/20'
                  : 'text-forest-900 hover:text-forest-800 hover:bg-white/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Products</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === 'all' ? 'bg-forest-700 text-amber-300' : 'bg-forest-100 text-forest-800'
              }`}>
                {PRODUCTS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('poultry')}
              id="filter-poultry-btn"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === 'poultry'
                  ? 'bg-forest-800 text-white shadow-md shadow-forest-900/20'
                  : 'text-forest-900 hover:text-forest-800 hover:bg-white/60'
              }`}
            >
              <Feather className="w-4 h-4" />
              <span>Poultry Farm</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === 'poultry' ? 'bg-forest-700 text-amber-300' : 'bg-forest-100 text-forest-800'
              }`}>
                {poultryCount}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('agriculture')}
              id="filter-agri-btn"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === 'agriculture'
                  ? 'bg-forest-800 text-white shadow-md shadow-forest-900/20'
                  : 'text-forest-900 hover:text-forest-800 hover:bg-white/60'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>Eco Agriculture</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === 'agriculture' ? 'bg-forest-700 text-amber-300' : 'bg-forest-100 text-forest-800'
              }`}>
                {agriCount}
              </span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedAnimationId === product.id;
            const isPoultry = product.category === 'poultry';

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group rounded-3xl bg-[#fafbf9] border border-forest-100/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badge top-left */}
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md backdrop-blur-md ${
                          isPoultry
                            ? 'bg-amber-500 text-forest-950 border border-amber-300/40'
                            : 'bg-forest-700 text-white border border-forest-500/40'
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Category icon pill top-right */}
                    <div className="absolute top-3 right-3">
                      <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-forest-800 shadow-sm">
                        {isPoultry ? <Feather className="w-4 h-4" /> : <Sprout className="w-4 h-4" />}
                      </span>
                    </div>

                    {/* Live stock indicator bottom-right */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-md bg-white/90 text-forest-800 text-[10px] font-bold backdrop-blur-md">
                        ● In Stock
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Rating row */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        ({product.reviewsCount} reviews)
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-forest-950 mb-2 group-hover:text-forest-800 transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Bullet features */}
                    <div className="space-y-1.5 mb-6">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-600" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer: Price & Add CTA */}
                <div className="p-6 pt-0 border-t border-forest-50 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block tracking-wider">
                      Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-forest-950">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        / {product.unit.replace(/^per\s+/i, '')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrderProduct(product)}
                    id={`add-to-order-${product.id}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white scale-105'
                        : 'bg-forest-800 hover:bg-forest-900 text-white hover:shadow-md'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-amber-400" />
                        <span>Order This</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wholesale & Custom Supply Banner */}
        <div className="mt-16 rounded-3xl bg-forest-50 border border-forest-200/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-forest-200/80 text-forest-900 text-xs font-bold uppercase tracking-wide inline-block mb-2">
              Hotels, Restaurants & Bulk Grocers
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-forest-950">
              Need Weekly Wholesale or Commercial Supply?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              We supply top boutique hotels, farm-to-table restaurants, and organic markets across Colombo and Gampaha districts with tailored morning deliveries.
            </p>
          </div>

          <a
            href="#order"
            className="shrink-0 px-6 py-3.5 rounded-xl text-sm font-bold bg-forest-800 hover:bg-forest-900 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <span>Request Wholesale Ratecard</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
