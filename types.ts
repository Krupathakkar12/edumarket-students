
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: 'New' | 'Good' | 'Used';
  university: string;
  location: string;
  image: string;
  rating: number;
  sellerName: string;
}

export interface Note {
  id: string;
  subject: string;
  semester: string;
  university: string;
  pages: number;
  price: number;
  rating: number;
  isTopperVerified: boolean;
  topperRank?: string;
  aiQualityScore: number;
  author: string;
  authorImage: string;
  previewImage: string;
}

export interface Topper {
  id: string;
  name: string;
  university: string;
  rank: string;
  cgpa: string;
  expertise: string[];
  notesSold: number;
  rating: number;
  image: string;
}

export type Theme = 'light' | 'dark';
