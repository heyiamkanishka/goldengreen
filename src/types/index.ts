export type ProductCategory = 'all' | 'poultry' | 'agriculture';

export interface Product {
  id: string;
  name: string;
  category: 'poultry' | 'agriculture';
  price: number;
  unit: string;
  description: string;
  badge?: string;
  image: string;
  rating: number;
  reviewsCount: number;
  features: string[];
  inStock: boolean;
}

export interface HeroSlide {
  id: number;
  tagline: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  categoryBadge: string;
  primaryCta: { text: string; link: string };
  secondaryCta: { text: string; link: string };
}

export interface SustainabilityPillar {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: 'recycle' | 'sun' | 'feather' | 'sprout' | 'droplets' | 'shield';
  highlights: string[];
}

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  orderType: 'retail' | 'wholesale';
  productId: string;
  quantity: number;
  deliveryAddress: string;
  city: string;
  preferredDate: string;
  notes: string;
}
