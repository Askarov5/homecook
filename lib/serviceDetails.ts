import { ChefHat, Users, GraduationCap, Clipboard, ShoppingCart, Utensils } from 'lucide-react'

export const serviceIcons = {
  inHomeCooking: ChefHat,
  privateEvents: Users,
  cookingLessons: GraduationCap,
  dietaryPlanning: Clipboard,
  groceryShopping: ShoppingCart,
  catering: Utensils,
}

export const serviceDetails = {
  inHomeCooking: {
    title: "In-Home Cooking & Meal Prep",
    description: "Enjoy fresh, personalized meals cooked right in your kitchen or pre-prepared for later consumption.",
    details: [
      "Cook using your groceries or chef-provided ingredients",
      "Prepare and package meals tailored to your dietary needs"
    ],
    conditions: "Minimum 3-hour booking",
    pricing: "Starting at $50/hour",
    availability: "Available 7 days a week",
  },
  privateEvents: {
    title: "Private Events & Dinner Parties",
    description: "Elevate your gatherings with personalized culinary experiences for special occasions.",
    details: [
      "Customized menu planning for your event",
      "On-site cooking and serving",
      "Clean-up services included"
    ],
    conditions: "Minimum 6 guests",
    pricing: "Starting at $75 per person",
    availability: "Booking required 2 weeks in advance",
  },
  cookingLessons: {
    title: "Cooking Lessons",
    description: "Learn to cook like a pro with personalized instruction in your own kitchen.",
    details: [
      "Hands-on sessions for specific dishes or cuisines",
      "Ingredient selection guidance",
      "Techniques and tips from a professional chef"
    ],
    conditions: "1-4 students per class",
    pricing: "$100 per hour for private lessons",
    availability: "Flexible scheduling, subject to chef's availability",
  },
  dietaryPlanning: {
    title: "Dietary Planning & Custom Menus",
    description: "Get expert help in creating meal plans that cater to your specific dietary needs and preferences.",
    details: [
      "Personalized meal planning",
      "Nutritional consultation",
      "Recipe customization for dietary restrictions"
    ],
    conditions: "Initial consultation required",
    pricing: "$150 for initial consultation and meal plan",
    availability: "Virtual consultations available",
  },
  groceryShopping: {
    title: "Grocery Shopping & Ingredients Management",
    description: "Let us handle the shopping and prep for your culinary needs, ensuring you have the best ingredients on hand.",
    details: [
      "Sourcing high-quality, fresh ingredients",
      "Pantry organization and inventory management",
      "Meal kit preparation for easy cooking"
    ],
    conditions: "Minimum order value of $100",
    pricing: "Service fee of 15% of total grocery bill",
    availability: "24-hour notice required",
  },
  catering: {
    title: "Catering Services",
    description: "Professional catering for events of all sizes, from intimate gatherings to large celebrations.",
    details: [
      "Customized menu creation",
      "Full-service catering including setup and cleanup",
      "Dietary accommodations available"
    ],
    conditions: "Minimum 10 guests",
    pricing: "Starting at $40 per person",
    availability: "Booking required 3 weeks in advance for large events",
  },
}

