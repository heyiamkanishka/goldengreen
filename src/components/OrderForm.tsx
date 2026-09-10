import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Truck, Clock, Shield, MapPin, User, Mail, Phone, RefreshCw } from 'lucide-react';
import { Product, OrderFormData } from '../types';
import { PRODUCTS } from '../data/farmData';

interface OrderFormProps {
  selectedProduct: Product | null;
  onClearSelectedProduct: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  selectedProduct,
  onClearSelectedProduct,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    email: '',
    phone: '',
    orderType: 'retail',
    productId: selectedProduct ? selectedProduct.id : PRODUCTS[0].id,
    quantity: 1,
    deliveryAddress: '',
    city: 'Kaduwela / Colombo Suburbs',
    preferredDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedOrderRef, setSubmittedOrderRef] = useState<string>('');

  // Synchronize when a product is clicked from the catalog
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productId: selectedProduct.id,
      }));
    }
  }, [selectedProduct]);

  const activeProduct = PRODUCTS.find((p) => p.id === formData.productId) || PRODUCTS[0];
  const estimatedTotal = activeProduct.price * formData.quantity;

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (!/^[0-9+\s\-()]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Please provide a valid phone number';
    }

    if (!formData.deliveryAddress.trim()) {
      errs.deliveryAddress = 'Delivery street address or landmark is required';
    }

    if (formData.quantity < 1) {
      errs.quantity = 'Quantity must be at least 1';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate farm dispatch network processing
    setTimeout(() => {
      const randomRef = `GG-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedOrderRef(randomRef);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      orderType: 'retail',
      productId: PRODUCTS[0].id,
      quantity: 1,
      deliveryAddress: '',
      city: 'Kaduwela / Colombo Suburbs',
      preferredDate: '',
      notes: '',
    });
    setErrors({});
    onClearSelectedProduct();
  };

  return (
    <section id="order" className="py-24 sm:py-32 bg-[#fafbf9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 border border-forest-200 text-forest-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-4 h-4 text-forest-700" />
            <span>Farm-to-Door Delivery & Bulk Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight mb-4">
            Place Your Order or Inquire
          </h2>
          <p className="text-base text-gray-600">
            Freshly prepared orders are packed at dawn in our Kaduwela facility and dispatched under chilled temperature control directly to your address.
          </p>
        </div>

        {/* Order Container */}
        <div className="max-w-4xl mx-auto">
          {isSuccess ? (
            <div className="rounded-3xl bg-white border border-forest-200 p-8 sm:p-12 shadow-xl text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <span className="px-3.5 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold uppercase tracking-wide">
                Order Received Successfully
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-forest-950 mt-3 mb-2">
                Thank You, {formData.fullName}!
              </h3>

              <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base mb-6">
                Your order reference is <strong className="text-forest-800 font-mono text-lg">{submittedOrderRef}</strong>. Our farm logistics coordinator in Kaduwela will call or WhatsApp you within 30 minutes to confirm delivery timing.
              </p>

              {/* Order Summary Box */}
              <div className="max-w-md mx-auto bg-forest-50/70 border border-forest-100 rounded-2xl p-6 text-left mb-8 text-sm">
                <div className="font-bold text-forest-950 mb-3 border-b border-forest-200/60 pb-2">
                  Order Summary
                </div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Item:</span>
                    <span className="font-semibold text-forest-900">{activeProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-semibold">{formData.quantity} × {activeProduct.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order Tier:</span>
                    <span className="capitalize font-semibold">{formData.orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery To:</span>
                    <span className="font-semibold truncate max-w-[200px]">{formData.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-forest-200/60 text-base font-bold text-forest-950">
                    <span>Estimated Total:</span>
                    <span className="text-forest-800">${estimatedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Submit Another Order</span>
                </button>
                <a
                  href="#home"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm transition-all"
                >
                  Return to Home
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-forest-100 shadow-xl overflow-hidden">
              {/* Form Tab Header (Retail vs Wholesale) */}
              <div className="bg-forest-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Customer Order & Inquiry Form</h3>
                  <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
                    Select your items, adjust quantities, and enter delivery information.
                  </p>
                </div>

                <div className="inline-flex p-1 rounded-xl bg-forest-900 border border-forest-800 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, orderType: 'retail' })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      formData.orderType === 'retail'
                        ? 'bg-amber-500 text-forest-950'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Household / Retail
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, orderType: 'wholesale' })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      formData.orderType === 'wholesale'
                        ? 'bg-amber-500 text-forest-950'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Wholesale / Commercial
                  </button>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8" noValidate>
                {/* 1. Product Selection & Quantity Row */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-forest-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs">1</span>
                    <span>Product Selection & Volume</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Product Dropdown */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Selected Farm Item
                      </label>
                      <select
                        id="order-product-select"
                        value={formData.productId}
                        onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest-600 focus:border-forest-600 text-sm font-medium bg-white shadow-sm"
                      >
                        <optgroup label="Pasture Poultry">
                          {PRODUCTS.filter((p) => p.category === 'poultry').map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} — ${p.price.toFixed(2)} {p.unit}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Eco Agriculture">
                          {PRODUCTS.filter((p) => p.category === 'agriculture').map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} — ${p.price.toFixed(2)} {p.unit}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Quantity Selector */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Quantity ({activeProduct.unit})
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                          className="px-3.5 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          id="order-quantity-input"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                          className="w-full text-center py-3 border-y border-gray-300 text-sm font-bold focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                          className="px-3.5 py-3 border border-l-0 border-gray-300 rounded-r-xl bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      {errors.quantity && (
                        <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
                      )}
                    </div>
                  </div>

                  {/* Selected Item Quick Snapshot Preview */}
                  <div className="mt-4 p-4 rounded-2xl bg-forest-50/80 border border-forest-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        className="w-12 h-12 rounded-xl object-cover border border-forest-200"
                      />
                      <div>
                        <div className="text-sm font-bold text-forest-950">{activeProduct.name}</div>
                        <div className="text-xs text-gray-500">
                          Unit: ${activeProduct.price.toFixed(2)} {activeProduct.unit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Estimated Item Total
                      </span>
                      <span className="text-xl font-black text-forest-900">
                        ${estimatedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Customer Contact Details */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-forest-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs">2</span>
                    <span>Recipient Information</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          id="order-fullname-input"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Priyantha Silva"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                            errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                          } focus:ring-2 focus:ring-forest-600 focus:border-forest-600`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          id="order-email-input"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="priyantha@example.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                            errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                          } focus:ring-2 focus:ring-forest-600 focus:border-forest-600`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          id="order-phone-input"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="077 123 4567"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                            errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                          } focus:ring-2 focus:ring-forest-600 focus:border-forest-600`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Delivery Address & Scheduling */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-forest-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs">3</span>
                    <span>Delivery Location & Logistics</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {/* Street Address */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Delivery Address *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          id="order-address-input"
                          value={formData.deliveryAddress}
                          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                          placeholder="No. 45, Temple Road, Kaduwela / Battaramulla"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                            errors.deliveryAddress ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                          } focus:ring-2 focus:ring-forest-600 focus:border-forest-600`}
                        />
                      </div>
                      {errors.deliveryAddress && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.deliveryAddress}</span>
                        </p>
                      )}
                    </div>

                    {/* Region / District */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        District / Hub
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-forest-600"
                      >
                        <option value="Kaduwela / Malabe">Kaduwela / Malabe</option>
                        <option value="Colombo 1 - 15">Colombo 1 - 15</option>
                        <option value="Rajagiriya / Battaramulla">Rajagiriya / Battaramulla</option>
                        <option value="Nugegoda / Maharagama">Nugegoda / Maharagama</option>
                        <option value="Gampaha District">Gampaha District</option>
                        <option value="Island-wide Wholesale Cargo">Other / Wholesale Cargo</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Notes & Custom Requests */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Special Handling Notes or Cutting Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      id="order-notes-input"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Please cut chicken into curry pieces, leave package at gate, or request specific delivery morning slot..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                </div>

                {/* Submit Row & Delivery Guarantees */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1 text-forest-700 font-semibold">
                      <Shield className="w-4 h-4 text-amber-500" />
                      100% Quality Guarantee
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-forest-600" />
                      Fast 24-hr Chilled Dispatch
                    </span>
                  </div>

                  <button
                    type="submit"
                    id="submit-order-form-btn"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-forest-800 hover:bg-forest-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Confirming Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Submit Order (${estimatedTotal.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
