export interface Product {
  name: string;
  price: number;
  image: string;
  qty?: number;
}

/* ================= PLACE MODEL ================= */
export interface Place {
  name: string;
  country: string;
  image: string;

  // ratings
  rating: number;
  review?: string;
  days: number;

  // categories
  trending?: boolean;
  destination?: boolean;
  adventure?: boolean;
  nature?: boolean;
  beach?: boolean;
  luxury?: boolean;
  culture?: boolean;

  // user interactions
  liked?: boolean;
  disliked?: boolean;

  clicks?: number;
  addedToCart?: number;
  score?: number;
}

// ─────────────────────────────────────────────
// INTERFACE
// ─────────────────────────────────────────────
export interface FeatureCard {
  icon:        string;
  title:       string;
  description: string;
  cta?:        string;   // optional, so @if can handle missing CTA
  route:       string;
}

/* ================= CART ================= */
export interface CartItem extends Place {
  qty: number;
}

/* ================= BASE PLACES ================= */
export const BASE_PLACES: Place[] = [
  {
    name: 'Tokyo',
    country: 'Japan',
    rating: 4.8,
    review: 'Modern city with amazing culture and food.',
    image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70',
    days: 7,
    trending: true,
    destination: true
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    rating: 4.7,
    review: 'Beautiful mountains and ocean views.',
    image: 'https://images.unsplash.com/photo-1576485375217-d6a95e34d043',
    days: 5,
    adventure: true,
    nature: true
  },
  {
    name: 'New York',
    country: 'USA',
    rating: 4.6,
    review: 'The city that never sleeps.',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee',
    days: 6,
    trending: true
  },
  {
    name: 'Paris',
    country: 'France',
    rating: 4.7,
    review: 'City of love, fashion and art.',
    image: 'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d',
    days: 4,
    destination: true,
    culture: true
  },
  {
    name: 'Dubai',
    country: 'UAE',
    rating: 4.5,
    review: 'Luxury skyscrapers and desert adventures.',
    image: 'https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757',
    days: 5,
    trending: true,
    luxury: true
  },
  {
    name: 'Gjirokastër',
    country: 'Albania',
    rating: 4.8,
    review: 'A stunning stone city and UNESCO site with Ottoman-era architecture.',
    image: 'https://images.unsplash.com/photo-1595156372583-b78f0d5718a2',
    days: 3,
    culture: true,
    trending: false
  },
  {
    name: 'Socotra Island',
    country: 'Yemen',
    rating: 4.9,
    review: 'An alien-like landscape with Dragon Blood trees found nowhere else on Earth.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0',
    days: 7,
    trending: false,
    adventure: true
  },
  {
    name: 'Svaneti',
    country: 'Georgia',
    rating: 4.7,
    review: 'High-altitude mountain villages featuring ancient defensive stone towers.',
    image: 'https://images.unsplash.com/photo-1626084930364-850d53c7c2b5',
    days: 5,
    adventure: true,
    culture: true
  },
  {
    name: 'Chefchaouen',
    country: 'Morocco',
    rating: 4.6,
    review: 'The famous Blue City nestled in the Rif Mountains.',
    image: 'https://images.unsplash.com/photo-1563297157-1960133d13b4',
    days: 3,
    trending: false,
    culture: true
  },
  {
    name: 'Luang Prabang',
    country: 'Laos',
    rating: 4.8,
    review: 'A peaceful riverside town known for golden temples and morning alms.',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c03ffefd',
    days: 4,
    trending: false,
    culture: true
  },
  {
    name: 'Faroe Islands',
    country: 'Denmark',
    rating: 4.9,
    review: 'Dramatic cliffs, grass-roofed houses, and untouched Atlantic scenery.',
    image: 'https://images.unsplash.com/photo-1527333604033-9128f7311738',
    days: 5,
    adventure: true,
    trending: false
  }

];

/* ================= DATA SOURCES ================= */
const cities = [
  'Barcelona', 'Rome', 'Berlin', 'Sydney', 'Bangkok',
  'Istanbul', 'Amsterdam', 'Toronto', 'Singapore', 'Bali'
];

const countries = [
  'Spain', 'Italy', 'Germany', 'Australia', 'Thailand',
  'Turkey', 'Netherlands', 'Canada', 'Singapore', 'Indonesia'
];

/* ================= GENERATED PLACES (2000+) ================= */
// 1. Define Category logic to keep the generation loop clean
const getCategoriesForIndex = (i: number) => ({
  trending:    i % 2 === 0,
  destination: i % 3 === 0,
  adventure:   i % 4 === 0,
  nature:      i % 5 === 0,
  beach:       i % 7 === 0,
  culture:     i % 6 === 0,
  luxury:      i % 9 === 0
});

// 2. Generate the array
export const PLACES: Place[] = [
  ...BASE_PLACES,
  ...Array.from({ length: 2000 }, (_, i) => {
    const cityIndex = i % cities.length;
    const city = cities[cityIndex];

    return {
      name: `${city} Trip ${i + 1}`,
      country: countries[cityIndex],
      rating: +(4 + (i % 10) * 0.1).toFixed(1),
      review: `Explore the beauty of ${city}`,
      image: `https://picsum.photos/seed/place${i}/400/300`,
      days: 3 + (i % 10),
      ...getCategoriesForIndex(i) // Spreading the category flags
    };
  })
];
