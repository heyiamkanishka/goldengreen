import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { ProductsSection } from './components/ProductsSection';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { Product } from './types';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductForOrder = (product: Product) => {
    setSelectedProduct(product);
    setCartCount((prev) => prev + 1);
    scrollToSection('order');
  };

  const handlePlaceOrderClick = () => {
    scrollToSection('order');
  };

  const handleExploreProductsClick = () => {
    scrollToSection('products');
  };

  return (
    <div className="min-h-screen bg-[#fafbf9] text-gray-800 flex flex-col font-sans selection:bg-forest-600 selection:text-white">
      {/* Sticky Responsive Header */}
      <Navbar
        onOrderClick={handlePlaceOrderClick}
        cartCount={cartCount}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero & Dynamic Carousel */}
        <HeroSlider
          onExploreProducts={handleExploreProductsClick}
          onPlaceOrder={handlePlaceOrderClick}
        />

        {/* 2. About & Core Dual Pillars */}
        <AboutSection
          onExplorePoultry={handleExploreProductsClick}
          onExploreAgri={handleExploreProductsClick}
        />

        {/* 3. Sustainability & Eco-Friendliness */}
        <SustainabilitySection />

        {/* 4. Products Catalog & Transparent Pricing */}
        <ProductsSection
          onSelectProductForOrder={handleSelectProductForOrder}
        />

        {/* 5. Orders & Inquiry Form */}
        <OrderForm
          selectedProduct={selectedProduct}
          onClearSelectedProduct={() => setSelectedProduct(null)}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
