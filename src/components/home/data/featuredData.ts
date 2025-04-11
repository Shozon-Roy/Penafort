
// Sample product data
export const products = [
  {
    id: 1,
    name: 'Fresh Organic Vegetables',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    rating: 4.8,
    discount: 10
  },
  {
    id: 2,
    name: 'Premium Kitchen Essentials',
    price: '₦12,999',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Home Goods',
    rating: 4.5
  },
  {
    id: 3,
    name: 'Imported Dairy Products',
    price: '₦4,750',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    rating: 4.7,
    discount: 15
  },
  {
    id: 4,
    name: 'Artisanal Bread Collection',
    price: '₦2,800',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Bakery',
    rating: 4.9,
    discount: 5
  }
];

// Sample categories with more detailed information
export const categories = [
  {
    id: 1,
    name: 'Fresh Produce',
    icon: '🥕',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Fresh fruits and vegetables sourced from local farmers',
    items: ['Tomatoes', 'Peppers', 'Oranges', 'Apples', 'Greens']
  },
  {
    id: 2,
    name: 'Dairy & Eggs',
    icon: '🥚',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Premium dairy products and farm-fresh eggs',
    items: ['Milk', 'Cheese', 'Yogurt', 'Eggs', 'Butter']
  },
  {
    id: 3,
    name: 'Bakery',
    icon: '🍞',
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Freshly baked bread, pastries, and cakes',
    items: ['Bread', 'Cakes', 'Pastries', 'Cookies', 'Doughnuts']
  },
  {
    id: 4,
    name: 'Cooking Oils',
    icon: '🧴',
    image: 'https://images.unsplash.com/photo-1583946099390-4cb6027fe18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Variety of cooking oils for all your culinary needs',
    items: ['Palm Oil', 'Groundnut Oil', 'Olive Oil', 'Vegetable Oil', 'Coconut Oil']
  },
  {
    id: 5,
    name: 'Beverages',
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Refreshing drinks and beverages',
    items: ['Soft Drinks', 'Juices', 'Water', 'Energy Drinks', 'Tea & Coffee']
  },
  {
    id: 6,
    name: 'Local Market Items',
    icon: '🍲',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Traditional local food items and ingredients',
    items: ['Yam', 'Plantain', 'Garri', 'Beans', 'Local Spices']
  }
];

// Special offers data
export const specialOffers = [
  {
    id: 1,
    title: "Weekend Sale - 25% OFF",
    description: "Get 25% off on all fresh produce this weekend!",
    expiryDate: "2023-06-30T23:59:59",
    backgroundColor: "bg-gradient-to-r from-orange-500 to-amber-500"
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "On all bakery items - limited time offer!",
    expiryDate: "2023-07-15T23:59:59",
    backgroundColor: "bg-gradient-to-r from-cyan-500 to-blue-500"
  },
  {
    id: 3,
    title: "New Customers - 10% Discount",
    description: "Use code WELCOME10 at checkout",
    expiryDate: "2023-08-01T23:59:59",
    backgroundColor: "bg-gradient-to-r from-pink-500 to-purple-500"
  },
];

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Aisha Mohammed",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "Penafort Supermarket has the freshest produce in Lagos. Their delivery is always on time and the staff is very friendly!",
    rating: 5
  },
  {
    id: 2,
    name: "Emeka Okafor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've been shopping here for 3 years now. The quality is consistent and prices are very reasonable compared to other stores.",
    rating: 4
  },
  {
    id: 3,
    name: "Funmi Adeyemi",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    text: "Their bakery section is amazing! I always get compliments when I bring their bread and cakes to family gatherings.",
    rating: 5
  }
];
