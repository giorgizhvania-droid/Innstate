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

export type Deal = {
  slug: string;
  hotelName: string;
  destinationSlug: string;
  location: string;
  image: string;
  description: string;
};
