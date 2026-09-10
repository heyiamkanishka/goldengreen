import { Product, HeroSlide, SustainabilityPillar } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tagline: "100% Ethical & Certified Organic",
    title: "Pure Farming in Harmony with Nature",
    highlight: "Sustainably Nurtured",
    description: "At GoldenGreen, we pioneer closed-loop agriculture and humane poultry husbandry in Kaduwela. Pure nutrition, zero synthetic chemicals, and absolute respect for our soil and livestock.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85",
    categoryBadge: "Dual Ecosystem Farming",
    primaryCta: { text: "Explore Products", link: "#products" },
    secondaryCta: { text: "Our Sustainability", link: "#sustainability" }
  },
  {
    id: 2,
    tagline: "Sunlit Pastures • Humane Care",
    title: "Pasture-Raised Poultry, Naturally Healthier",
    highlight: "Free-Range Living",
    description: "Our birds roam freely across verdant green paddocks, foraging natural grasses and insects under warm sunshine without routine antibiotics or synthetic growth hormones.",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=2000&q=85",
    categoryBadge: "Pasture Poultry",
    primaryCta: { text: "Order Poultry", link: "#products" },
    secondaryCta: { text: "Ethical Standards", link: "#about" }
  },
  {
    id: 3,
    tagline: "Hand-Picked Daily • Farm to Fork",
    title: "Crisp, Chemical-Free Agricultural Produce",
    highlight: "Living Soil Produce",
    description: "Cultivated using our own organic poultry-compost, our vegetables and fruits burst with authentic flavor, superior micronutrients, and vibrant freshness delivered within 24 hours.",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=2000&q=85",
    categoryBadge: "Eco Agriculture",
    primaryCta: { text: "View Fresh Harvest", link: "#products" },
    secondaryCta: { text: "Bulk Orders", link: "#order" }
  },
  {
    id: 4,
    tagline: "Circular Economy in Action",
    title: "Zero Waste, 100% Renewable Agro-System",
    highlight: "Regenerative Cycle",
    description: "Poultry enrich our soils, farm crops nourish our flocks, and solar power drives our cold chain. Experience agriculture where nothing is wasted and nature thrives.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=2000&q=85",
    categoryBadge: "Zero-Waste Farm",
    primaryCta: { text: "Place an Order", link: "#order" },
    secondaryCta: { text: "Learn About Us", link: "#about" }
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "poultry-1",
    name: "Pasture-Raised Whole Free-Range Chicken",
    category: "poultry",
    price: 8.50,
    unit: "per kg",
    description: "Slow-grown on open green pastures. Remarkably tender, rich in natural omega-3s, with zero antibiotics or hormones.",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 142,
    features: ["Cage-free & pasture fed", "No growth promoters", "Air-chilled freshness"],
    inStock: true
  },
  {
    id: "poultry-2",
    name: "Golden Yolk Pastured Eggs (Pack of 12)",
    category: "poultry",
    price: 4.80,
    unit: "per pack of 12",
    description: "Vibrant deep amber yolks produced by hens foraging fresh grass, seeds, and sunshine every single day.",
    badge: "Organic Certified",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 218,
    features: ["Rich in Vitamin D & E", "Strong natural shells", "Gathered this morning"],
    inStock: true
  },
  {
    id: "poultry-3",
    name: "Tender Boneless Chicken Breast Fillets",
    category: "poultry",
    price: 11.20,
    unit: "per kg",
    description: "Lean, succulent cuts trimmed fresh. High protein content with unmatched pure clean poultry flavor.",
    badge: "High Protein",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 96,
    features: ["100% Trimmed & clean", "Never frozen", "Biodegradable tray pack"],
    inStock: true
  },
  {
    id: "poultry-4",
    name: "Slow-Simmered Golden Bone Broth (1L)",
    category: "poultry",
    price: 6.50,
    unit: "per 1L bottle",
    description: "Simmered for 24 hours with organic mirepoix and pasture poultry bones. Rich in collagen and gut-healing minerals.",
    badge: "Nutrient Rich",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 74,
    features: ["24-Hour slow simmer", "Zero preservatives", "High natural collagen"],
    inStock: true
  },
  {
    id: "poultry-5",
    name: "Traditional Heritage Village Rooster",
    category: "poultry",
    price: 13.50,
    unit: "per kg",
    description: "Indigenous hearty breed renowned for authentic rustic curries, deep savory depth, and robust texture.",
    badge: "Farm Specialty",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 52,
    features: ["Slow-matured heritage stock", "Ideal for authentic curries", "100% free foraging"],
    inStock: true
  },
  {
    id: "agri-1",
    name: "Seasonal Organic Farm Harvest Basket",
    category: "agriculture",
    price: 18.00,
    unit: "per 5kg basket",
    description: "A hand-curated weekly box of 7-8 seasonal crisp vegetables harvested early dawn from our Kaduwela garden beds.",
    badge: "Chef's Choice",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 164,
    features: ["7-8 seasonal varieties", "Zero synthetic pesticides", "Eco-friendly wicker packaging"],
    inStock: true
  },
  {
    id: "agri-2",
    name: "Crisp Hydroponic & Garden Salad Greens",
    category: "agriculture",
    price: 3.20,
    unit: "per 250g pack",
    description: "Tender butterhead lettuce, wild rocket, and baby spinach washed with natural spring water and packed fresh.",
    badge: "Harvested Daily",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 88,
    features: ["Washed & ready to eat", "Crisp peppery crunch", "Pesticide free"],
    inStock: true
  },
  {
    id: "agri-3",
    name: "Sun-Ripened Heirloom Cherry Tomatoes",
    category: "agriculture",
    price: 4.50,
    unit: "per 500g punnet",
    description: "Naturally pollinated and sun-kissed on the vine. Bursting with candy-sweet acidity and intense tomato aroma.",
    badge: "Sweet & Juicy",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 112,
    features: ["Vine-ripened", "Heirloom non-GMO seeds", "High lycopene content"],
    inStock: true
  },
  {
    id: "agri-4",
    name: "Enriched Organic Poultry Compost Fertilizer",
    category: "agriculture",
    price: 7.50,
    unit: "per 10kg sack",
    description: "Composted, pathogen-free aged poultry manure blended with organic mulch. Supercharges soil microbiome and crop yields.",
    badge: "Soil Superfood",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 135,
    features: ["NPK balanced", "100% weed-seed free", "Restores damaged soils"],
    inStock: true
  },
  {
    id: "agri-5",
    name: "Farm-Grown Sweet Baby Corn & Grain Box",
    category: "agriculture",
    price: 5.80,
    unit: "per kg",
    description: "Tender, crunchy baby sweet corn ears harvested at peak tenderness, ideal for stir-fries, steaming, and salads.",
    badge: "Naturally Sweet",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 63,
    features: ["Sweet & tender crunch", "Grown in nutrient compost", "Harvested same-day"],
    inStock: true
  }
];

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    id: "circular",
    title: "Closed-Loop Circular Farming",
    description: "Poultry manure is collected, aerated, and transformed into rich microbial compost that nourishes our crops, while non-marketable vegetable greens enrich poultry foraging.",
    metric: "0% Waste",
    metricLabel: "Landfill diverted biomass",
    iconName: "recycle",
    highlights: [
      "100% on-site compost conversion",
      "Zero chemical fertilizers or synthetic inputs",
      "Living soil microbial enrichment"
    ]
  },
  {
    id: "ethical",
    title: "Ethical Pasture-Raised Welfare",
    description: "Every flock enjoys open sky, natural dust-bathing paddocks, fresh herbal forage, and clean water. We believe stress-free animals produce vastly healthier food.",
    metric: "12+ Hours",
    metricLabel: "Daily open pasture access",
    iconName: "feather",
    highlights: [
      "Strict cage-free certified facility",
      "Zero preventive antibiotics or hormonal boosters",
      "Humane handling verified by certified veterinarians"
    ]
  },
  {
    id: "solar",
    title: "Solar-Powered Operations",
    description: "Our barn ventilation, cold storage, egg cleaning, and irrigation systems are powered by a rooftop solar photovoltaic array capturing Sri Lanka's bountiful sun.",
    metric: "85 MWh",
    metricLabel: "Clean energy generated annually",
    iconName: "sun",
    highlights: [
      "Rooftop solar offsetting farm electricity",
      "Low-emission electric farm logistics vehicles",
      "Gravity-fed rainwater catchment ponds"
    ]
  },
  {
    id: "packaging",
    title: "Eco-Friendly Biodegradable Packaging",
    description: "We eliminate single-use plastics from farm to doorstep. Our poultry trays use sugarcane bagasse, egg cartons use molded recycled paper pulp, and deliveries use reusable crates.",
    metric: "98%",
    metricLabel: "Plastic-free packaging materials",
    iconName: "shield",
    highlights: [
      "100% compostable molded pulp egg cartons",
      "Sugarcane bagasse bio-trays for meats",
      "Deposit-and-return reusable delivery crates"
    ]
  }
];

export const QUICK_STATS = [
  { value: "100%", label: "Organic & Chemical-Free", sub: "Certified Sri Lankan standard" },
  { value: "0%", label: "Antibiotics & Hormones", sub: "Pure natural development" },
  { value: "24h", label: "Farm-to-Door Delivery", sub: "Peak morning freshness" },
  { value: "4,500+", label: "Happy Local Families", sub: "Across Colombo & Western Province" }
];
