
import { nanoid } from 'nanoid';

// Product categories
export const productCategories = [
  'Fruits',
  'Vegetables',
  'Bakery',
  'Dairy & Eggs',
  'Meat & Poultry',
  'Seafood',
  'Pantry',
  'Beverages',
  'Snacks',
  'Electronics',
  'Home Appliances',
  'Kitchen Essentials',
  'Personal Care',
  'Cleaning Supplies',
  'Baby Products'
];

// Product image URLs by category
const categoryImageUrls: Record<string, string[]> = {
  'Fruits': [
    'https://images.unsplash.com/photo-1546750670-725a588310bc?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578120369722-62c8bd1ac737?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1561924563-d9001f95aaae?q=80&w=1000&auto=format&fit=crop'
  ],
  'Vegetables': [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596107712049-9ae30043a130?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587334497702-dc94549c6940?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536304575268-dbcf8dce2adc?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563642421748-5047b6585a4a?q=80&w=1000&auto=format&fit=crop'
  ],
  'Bakery': [
    'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585478259715-7c86af5e6f65?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1000&auto=format&fit=crop'
  ],
  'Dairy & Eggs': [
    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584771145729-0bd9fda6529b?q=80&w=1000&auto=format&fit=crop'
  ],
  'Pantry': [
    'https://images.unsplash.com/photo-1619021897626-dd7cdb333ba3?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583946099390-4cb6027fe18e?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621494547431-47d25222ba13?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?q=80&w=1000&auto=format&fit=crop'
  ],
  'Beverages': [
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544603941-5c9b324b92d5?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1629179213057-ac7aab092cd6?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568031813264-d394c5d474b9?q=80&w=1000&auto=format&fit=crop'
  ],
  'Electronics': [
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1625480860249-9fb8b2b13dac?q=80&w=1000&auto=format&fit=crop'
  ],
  'Home Appliances': [
    'https://images.unsplash.com/photo-1594995846645-d58328c3ffa4?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621153159600-5c4e6d65d7ba?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1619449860031-7f9499952e0c?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565330502541-4937be8552e3?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574269906528-7e888dd7001d?q=80&w=1000&auto=format&fit=crop'
  ]
};

// Default images for categories that don't have specific images
const defaultImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop'
];

// Product name generators by category
const generateProductName = (category: string): string => {
  const prefixes: Record<string, string[]> = {
    'Fruits': ['Fresh', 'Organic', 'Ripe', 'Sweet', 'Juicy'],
    'Vegetables': ['Farm-Fresh', 'Organic', 'Local', 'Seasonal', 'Premium'],
    'Bakery': ['Freshly Baked', 'Artisanal', 'Homemade', 'Traditional', 'Gourmet'],
    'Dairy & Eggs': ['Farm Fresh', 'Organic', 'Free-Range', 'Pasteurized', 'Premium'],
    'Meat & Poultry': ['Grass-Fed', 'Free-Range', 'Organic', 'Premium Cut', 'Fresh'],
    'Seafood': ['Wild-Caught', 'Fresh', 'Premium', 'Atlantic', 'Pacific'],
    'Pantry': ['Gourmet', 'Organic', 'Premium', 'Traditional', 'Imported'],
    'Beverages': ['Fresh', 'Organic', 'Premium', 'Natural', 'Cold-Pressed'],
    'Snacks': ['Crunchy', 'Savory', 'Sweet', 'Organic', 'Homemade'],
    'Electronics': ['Smart', 'Wireless', 'HD', 'Digital', 'Portable'],
    'Home Appliances': ['Smart', 'Energy-Efficient', 'Premium', 'Compact', 'High-Performance'],
    'Kitchen Essentials': ['Premium', 'Stainless Steel', 'Non-Stick', 'Professional', 'Durable'],
    'Personal Care': ['Organic', 'Natural', 'Hydrating', 'Gentle', 'Premium'],
    'Cleaning Supplies': ['Eco-Friendly', 'Powerful', 'All-Purpose', 'Natural', 'Professional'],
    'Baby Products': ['Gentle', 'Organic', 'Hypoallergenic', 'Safe', 'Natural']
  };
  
  const items: Record<string, string[]> = {
    'Fruits': ['Apples', 'Bananas', 'Oranges', 'Strawberries', 'Grapes', 'Watermelon', 'Pineapple', 'Mango', 'Kiwi', 'Peaches'],
    'Vegetables': ['Tomatoes', 'Carrots', 'Broccoli', 'Spinach', 'Peppers', 'Onions', 'Potatoes', 'Cucumber', 'Lettuce', 'Cabbage'],
    'Bakery': ['Bread', 'Croissants', 'Muffins', 'Cakes', 'Cookies', 'Pastries', 'Donuts', 'Bagels', 'Baguettes', 'Rolls'],
    'Dairy & Eggs': ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Eggs', 'Cream', 'Ice Cream', 'Sour Cream', 'Cottage Cheese', 'Kefir'],
    'Meat & Poultry': ['Chicken', 'Beef', 'Pork', 'Turkey', 'Lamb', 'Sausages', 'Ground Beef', 'Steak', 'Bacon', 'Ham'],
    'Seafood': ['Salmon', 'Tuna', 'Shrimp', 'Cod', 'Tilapia', 'Crab', 'Lobster', 'Clams', 'Mussels', 'Scallops'],
    'Pantry': ['Rice', 'Pasta', 'Flour', 'Sugar', 'Olive Oil', 'Spices', 'Canned Beans', 'Cereal', 'Honey', 'Peanut Butter'],
    'Beverages': ['Coffee', 'Tea', 'Juice', 'Soda', 'Water', 'Wine', 'Beer', 'Smoothies', 'Milk', 'Energy Drinks'],
    'Snacks': ['Chips', 'Cookies', 'Crackers', 'Nuts', 'Popcorn', 'Granola Bars', 'Pretzels', 'Trail Mix', 'Chocolate', 'Candy'],
    'Electronics': ['Smartphone', 'Tablet', 'Laptop', 'Headphones', 'Bluetooth Speaker', 'Smart Watch', 'Camera', 'TV', 'Gaming Console', 'Power Bank'],
    'Home Appliances': ['Blender', 'Toaster', 'Coffee Maker', 'Vacuum Cleaner', 'Microwave', 'Air Fryer', 'Fan', 'Iron', 'Kettle', 'Hair Dryer'],
    'Kitchen Essentials': ['Knife Set', 'Cutting Board', 'Pots & Pans', 'Measuring Cups', 'Utensils', 'Storage Containers', 'Mixing Bowls', 'Bakeware', 'Grater', 'Colander'],
    'Personal Care': ['Shampoo', 'Conditioner', 'Body Wash', 'Lotion', 'Toothpaste', 'Facial Cleanser', 'Deodorant', 'Sunscreen', 'Hand Soap', 'Razor'],
    'Cleaning Supplies': ['All-Purpose Cleaner', 'Laundry Detergent', 'Dish Soap', 'Glass Cleaner', 'Bathroom Cleaner', 'Floor Cleaner', 'Wipes', 'Sponges', 'Bleach', 'Air Freshener'],
    'Baby Products': ['Diapers', 'Baby Wipes', 'Formula', 'Baby Food', 'Baby Shampoo', 'Baby Lotion', 'Pacifiers', 'Bottles', 'Bibs', 'Baby Powder']
  };
  
  // Use default if category doesn't have specific items
  const categoryPrefixes = prefixes[category] || ['Premium', 'Quality', 'Select', 'Choice', 'Best'];
  const categoryItems = items[category] || ['Product', 'Item', 'Good', 'Merchandise', 'Article'];
  
  const prefix = categoryPrefixes[Math.floor(Math.random() * categoryPrefixes.length)];
  const item = categoryItems[Math.floor(Math.random() * categoryItems.length)];
  
  return `${prefix} ${item}`;
};

// Generate a price within a reasonable range based on category
const generatePrice = (category: string): number => {
  const priceRanges: Record<string, [number, number]> = {
    'Fruits': [1, 10],
    'Vegetables': [1, 8],
    'Bakery': [2, 15],
    'Dairy & Eggs': [2, 12],
    'Meat & Poultry': [5, 30],
    'Seafood': [8, 40],
    'Pantry': [2, 20],
    'Beverages': [1, 15],
    'Snacks': [2, 10],
    'Electronics': [20, 1000],
    'Home Appliances': [30, 500],
    'Kitchen Essentials': [10, 200],
    'Personal Care': [3, 25],
    'Cleaning Supplies': [2, 20],
    'Baby Products': [5, 50]
  };
  
  const [min, max] = priceRanges[category] || [5, 50];
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Generate a description based on the product name and category
const generateDescription = (name: string, category: string): string => {
  const descriptions: Record<string, string[]> = {
    'Fruits': [
      'Sweet and juicy, perfect for snacking or adding to your favorite recipes.',
      'Freshly picked and bursting with flavor. Rich in vitamins and antioxidants.',
      'Locally sourced from sustainable farms. Enjoy nature\'s candy at its best.',
      'Organic and pesticide-free. A healthy choice for you and your family.',
      'Ripe and ready to eat. Adds natural sweetness to any meal.'
    ],
    'Vegetables': [
      'Farm-fresh and packed with nutrients. Adds color and flavor to any dish.',
      'Locally grown and harvested at peak freshness. Perfect for healthy cooking.',
      'Crisp and flavorful. An essential ingredient for your favorite recipes.',
      'Organic and sustainably farmed. A nutritious addition to your meals.',
      'Fresh from our farms to your table. Enjoy the taste of nature.'
    ],
    'Bakery': [
      'Freshly baked with premium ingredients. A delightful treat for any time of day.',
      'Made from scratch using traditional recipes. The perfect balance of texture and flavor.',
      'Artisanal baking at its finest. A taste of homemade goodness.',
      'Baked fresh daily. No preservatives or artificial ingredients.',
      'Crafted with care using the finest flour and ingredients. Simply delicious.'
    ]
  };
  
  // Use default descriptions if category-specific ones aren't available
  const categoryDescriptions = descriptions[category] || [
    'Premium quality product. A great addition to your home.',
    'Carefully selected for its quality and value. Customer favorite.',
    'High-quality item that exceeds expectations. Satisfaction guaranteed.',
    'Top-rated product in its category. Excellent choice for discerning customers.',
    'Exceptional quality and performance. One of our most popular items.'
  ];
  
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
};

// Get a random image URL for the product based on its category
const getProductImage = (category: string): string => {
  const categoryImages = categoryImageUrls[category] || defaultImages;
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
};

// Generate a single product
export const generateProduct = (id?: number): any => {
  const category = productCategories[Math.floor(Math.random() * productCategories.length)];
  const name = generateProductName(category);
  const price = generatePrice(category);
  
  return {
    id: id || Math.floor(Math.random() * 10000) + 1,
    name,
    category,
    price,
    image: getProductImage(category),
    description: generateDescription(name, category),
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Rating between 3.0 and 5.0
    discount: Math.random() < 0.3 ? Math.floor(Math.random() * 30) + 5 : null // 30% chance of having a discount
  };
};

// Generate a specified number of products
export const generateProducts = (count: number): any[] => {
  return Array.from({ length: count }, (_, i) => generateProduct(i + 1));
};

// Export a default set of 100 products for initial loading
export const initialProducts = generateProducts(100);
