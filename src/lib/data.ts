export const countries: string[] = [
  "Georgia", "United States", "United Kingdom", "France", "Germany", "Italy",
  "Spain", "Turkey", "United Arab Emirates", "Japan", "China", "South Korea",
  "India", "Thailand", "Greece", "Egypt", "Brazil", "Mexico", "Canada",
  "Australia", "Portugal", "Netherlands", "Switzerland", "Austria", "Belgium",
  "Czech Republic", "Poland", "Hungary", "Croatia", "Sweden", "Norway",
  "Denmark", "Finland", "Ireland", "Morocco", "South Africa", "Saudi Arabia",
  "Qatar", "Indonesia", "Malaysia", "Singapore", "Vietnam", "Philippines",
  "Maldives", "Sri Lanka", "Argentina", "Chile", "Colombia", "Peru",
  "New Zealand", "Russia", "Israel", "Jordan", "Cyprus", "Azerbaijan", "Armenia",
];

export const countryToDestination: Record<string, string> = {
  "United Arab Emirates": "dubai",
  "France": "paris",
  "United Kingdom": "london",
  "Turkey": "istanbul",
  "Italy": "rome",
  "Thailand": "bangkok",
  "Maldives": "maldives",
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  image: string;
  dealsCount: number;
};

export const destinations: Destination[] = [
  { slug: "dubai", name: "Dubai", country: "United Arab Emirates", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop", dealsCount: 24 },
  { slug: "paris", name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91131210e7?q=80&w=1200&auto=format&fit=crop", dealsCount: 31 },
  { slug: "london", name: "London", country: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop", dealsCount: 19 },
  { slug: "istanbul", name: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop", dealsCount: 27 },
  { slug: "rome", name: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop", dealsCount: 22 },
  { slug: "bangkok", name: "Bangkok", country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c079365?q=80&w=1200&auto=format&fit=crop", dealsCount: 18 },
  { slug: "maldives", name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop", dealsCount: 15 },
];

export type Deal = {
  slug: string;
  hotelName: string;
  destinationSlug: string;
  location: string;
  image: string;
  description: string;
};

export const deals: Deal[] = [
  { slug: "burj-al-arab-style-dubai", hotelName: "Marina Bay Resort & Spa", destinationSlug: "dubai", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop", description: "A luxurious beachfront resort with skyline views, private pools, and world-class dining." },
  { slug: "le-marais-boutique-paris", hotelName: "Le Marais Boutique Hotel", destinationSlug: "paris", location: "Paris, France", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200&auto=format&fit=crop", description: "Charming boutique stay steps away from iconic landmarks and cozy Parisian cafés." },
  { slug: "the-shard-view-london", hotelName: "Riverside View Hotel", destinationSlug: "london", location: "London, UK", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop", description: "Modern rooms overlooking the Thames, minutes from the city's best attractions." },
  { slug: "bosphorus-palace-istanbul", hotelName: "Bosphorus Palace Hotel", destinationSlug: "istanbul", location: "Istanbul, Turkey", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop", description: "Historic charm meets modern comfort with breathtaking views of the Bosphorus strait." },
  { slug: "trastevere-garden-rome", hotelName: "Trastevere Garden Hotel", destinationSlug: "rome", location: "Rome, Italy", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200&auto=format&fit=crop", description: "A peaceful courtyard retreat in the heart of Rome's most charming neighborhood." },
  { slug: "riverside-retreat-bangkok", hotelName: "Riverside Retreat Bangkok", destinationSlug: "bangkok", location: "Bangkok, Thailand", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200&auto=format&fit=crop", description: "A serene riverside escape with rooftop dining and easy access to vibrant city life." },
  { slug: "overwater-villas-maldives", hotelName: "Overwater Villas & Spa", destinationSlug: "maldives", location: "Maldives", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop", description: "Iconic overwater villas with direct lagoon access and unforgettable sunset views." },
  { slug: "old-town-charm-istanbul", hotelName: "Old Town Charm Hotel", destinationSlug: "istanbul", location: "Istanbul, Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop", description: "Cozy rooms tucked in the historic district, perfect for exploring on foot." },
];
