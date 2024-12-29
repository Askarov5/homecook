export type OrderStatus = 'received' | 'in_progress' | 'ready' | 'paid' | 'completed' | 'cancelled';

export interface Chef {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  banner?: string;
  bio: string;
  rating: number;
  reviews: number;
  location: string;
  minPreorderDays: number;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    whatsapp?: string;
    telegram?: string;
  };
  portfolio: string[];
  menu: MenuItem[];
  readyMeals: MenuItem[];
  cateringServices: string;
  customerReviews: Review[];
  subscribed?: boolean;
  cuisines: string[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  prepTime: number;
  minPortions: number;
  ingredients: string[];
  image: string;
  category: string;
  discount?: number;
  available: boolean;
  cuisineType: string;
  dietaryRestrictions?: string[];
  notes: string;
}

export interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
  location?: string;
  dietaryPreferences?: string[];
  ratingBreakdown?: {
    food: number;
    service: number;
    value: number;
  };
  flagged?: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  dietaryRestrictions?: string[];
  removedIngredients?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profilePicture: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Order {
  id: string;
  customerName: string;
  customerImage: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    removedIngredients?: string[];
  }[];
  totalPrice: number;
  orderDate: Date;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Unpaid' | 'Cancelled';
  dietaryComments?: string;
  cancellationReason?: string;
  estimatedReadyDateTime: Date; // Added this field
}

export interface FilterPanelProps {
  filters: {
    status: string;
    paymentStatus: string;
    searchTerm: string;
    startDate: string;
    endDate: string;
    cuisine: string;
  };
}

