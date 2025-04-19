import { ProductCategory } from '../types/products';

export const productCategories: ProductCategory[] = [
  {
    id: 'home_kitchen',
    name: 'Home & Kitchen',
    products: [
      // Kitchen Appliances
      { id: 'hk_001', name: 'Air Fryer', category: 'Home & Kitchen' },
      { id: 'hk_002', name: 'Stand Mixer', category: 'Home & Kitchen' },
      { id: 'hk_003', name: 'Food Processor', category: 'Home & Kitchen' },
      { id: 'hk_004', name: 'Electric Kettle', category: 'Home & Kitchen' },
      { id: 'hk_005', name: 'Coffee Maker', category: 'Home & Kitchen' },
      { id: 'hk_006', name: 'Blender', category: 'Home & Kitchen' },
      { id: 'hk_007', name: 'Rice Cooker', category: 'Home & Kitchen' },
      { id: 'hk_008', name: 'Slow Cooker', category: 'Home & Kitchen' },
      { id: 'hk_009', name: 'Toaster Oven', category: 'Home & Kitchen' },
      { id: 'hk_010', name: 'Microwave', category: 'Home & Kitchen' },
      // Kitchen Utensils & Gadgets
      { id: 'hk_011', name: 'Measuring Cups Set', category: 'Home & Kitchen' },
      { id: 'hk_012', name: 'Cutting Board Set', category: 'Home & Kitchen' },
      { id: 'hk_013', name: 'Kitchen Knife Set', category: 'Home & Kitchen' },
      { id: 'hk_014', name: 'Can Opener', category: 'Home & Kitchen' },
      { id: 'hk_015', name: 'Vegetable Peeler', category: 'Home & Kitchen' },
      { id: 'hk_016', name: 'Food Storage Container', category: 'Home & Kitchen' },
      { id: 'hk_017', name: 'Water Filter Pitcher', category: 'Home & Kitchen' },
      { id: 'hk_018', name: 'Kitchen Scale', category: 'Home & Kitchen' },
      { id: 'hk_019', name: 'Dish Drying Rack', category: 'Home & Kitchen' },
      { id: 'hk_020', name: 'Kitchen Timer', category: 'Home & Kitchen' },
      // Home Organization
      { id: 'hk_021', name: 'Storage Bins', category: 'Home & Kitchen' },
      { id: 'hk_022', name: 'Drawer Organizer', category: 'Home & Kitchen' },
      { id: 'hk_023', name: 'Shelf Organizer', category: 'Home & Kitchen' },
      { id: 'hk_024', name: 'Vacuum Storage Bags', category: 'Home & Kitchen' },
      { id: 'hk_025', name: 'Closet Organizer', category: 'Home & Kitchen' }
    ]
  },
  {
    id: 'personal_care',
    name: 'Personal Care',
    products: [
      // Hair Care
      { id: 'pc_001', name: 'Shampoo', category: 'Personal Care' },
      { id: 'pc_002', name: 'Conditioner', category: 'Personal Care' },
      { id: 'pc_003', name: 'Hair Mask', category: 'Personal Care' },
      { id: 'pc_004', name: 'Dry Shampoo', category: 'Personal Care' },
      { id: 'pc_005', name: 'Hair Oil', category: 'Personal Care' },
      // Skin Care
      { id: 'pc_006', name: 'Face Moisturizer', category: 'Personal Care' },
      { id: 'pc_007', name: 'Face Cleanser', category: 'Personal Care' },
      { id: 'pc_008', name: 'Face Serum', category: 'Personal Care' },
      { id: 'pc_009', name: 'Eye Cream', category: 'Personal Care' },
      { id: 'pc_010', name: 'Face Mask', category: 'Personal Care' },
      { id: 'pc_011', name: 'Sunscreen', category: 'Personal Care' },
      { id: 'pc_012', name: 'Body Lotion', category: 'Personal Care' },
      { id: 'pc_013', name: 'Hand Cream', category: 'Personal Care' },
      // Oral Care
      { id: 'pc_014', name: 'Toothpaste', category: 'Personal Care' },
      { id: 'pc_015', name: 'Mouthwash', category: 'Personal Care' }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics & Accessories',
    products: [
      // Charging & Power
      { id: 'el_001', name: 'USB Wall Charger', category: 'Electronics & Accessories' },
      { id: 'el_002', name: 'Power Bank', category: 'Electronics & Accessories' },
      { id: 'el_003', name: 'Charging Cable', category: 'Electronics & Accessories' },
      { id: 'el_004', name: 'Wireless Charger', category: 'Electronics & Accessories' },
      // Audio
      { id: 'el_005', name: 'Wireless Earbuds', category: 'Electronics & Accessories' },
      { id: 'el_006', name: 'Bluetooth Speaker', category: 'Electronics & Accessories' },
      { id: 'el_007', name: 'Headphones', category: 'Electronics & Accessories' },
      // Accessories
      { id: 'el_008', name: 'Phone Case', category: 'Electronics & Accessories' },
      { id: 'el_009', name: 'Screen Protector', category: 'Electronics & Accessories' },
      { id: 'el_010', name: 'Laptop Stand', category: 'Electronics & Accessories' }
    ]
  },
  {
    id: 'cleaning_supplies',
    name: 'Cleaning Supplies',
    products: [
      { id: 'cs_001', name: 'All-Purpose Cleaner', category: 'Cleaning Supplies' },
      { id: 'cs_002', name: 'Glass Cleaner', category: 'Cleaning Supplies' },
      { id: 'cs_003', name: 'Floor Cleaner', category: 'Cleaning Supplies' },
      { id: 'cs_004', name: 'Bathroom Cleaner', category: 'Cleaning Supplies' },
      { id: 'cs_005', name: 'Dish Soap', category: 'Cleaning Supplies' },
      { id: 'cs_006', name: 'Laundry Detergent', category: 'Cleaning Supplies' },
      { id: 'cs_007', name: 'Fabric Softener', category: 'Cleaning Supplies' },
      { id: 'cs_008', name: 'Disinfectant Spray', category: 'Cleaning Supplies' },
      { id: 'cs_009', name: 'Cleaning Wipes', category: 'Cleaning Supplies' },
      { id: 'cs_010', name: 'Toilet Bowl Cleaner', category: 'Cleaning Supplies' }
    ]
  },
  {
    id: 'office_supplies',
    name: 'Office Supplies',
    products: [
      { id: 'os_001', name: 'Notebook', category: 'Office Supplies' },
      { id: 'os_002', name: 'Sticky Notes', category: 'Office Supplies' },
      { id: 'os_003', name: 'Ballpoint Pens', category: 'Office Supplies' },
      { id: 'os_004', name: 'Pencils', category: 'Office Supplies' },
      { id: 'os_005', name: 'Highlighters', category: 'Office Supplies' },
      { id: 'os_006', name: 'Paper Clips', category: 'Office Supplies' },
      { id: 'os_007', name: 'Stapler', category: 'Office Supplies' },
      { id: 'os_008', name: 'File Folders', category: 'Office Supplies' },
      { id: 'os_009', name: 'Desk Organizer', category: 'Office Supplies' },
      { id: 'os_010', name: 'Printer Paper', category: 'Office Supplies' }
    ]
  },
  {
    id: 'pet_supplies',
    name: 'Pet Supplies',
    products: [
      { id: 'ps_001', name: 'Pet Food Bowl', category: 'Pet Supplies' },
      { id: 'ps_002', name: 'Pet Bed', category: 'Pet Supplies' },
      { id: 'ps_003', name: 'Pet Brush', category: 'Pet Supplies' },
      { id: 'ps_004', name: 'Pet Shampoo', category: 'Pet Supplies' },
      { id: 'ps_005', name: 'Pet Toys', category: 'Pet Supplies' },
      { id: 'ps_006', name: 'Pet Carrier', category: 'Pet Supplies' },
      { id: 'ps_007', name: 'Pet Leash', category: 'Pet Supplies' },
      { id: 'ps_008', name: 'Pet Collar', category: 'Pet Supplies' },
      { id: 'ps_009', name: 'Litter Box', category: 'Pet Supplies' },
      { id: 'ps_010', name: 'Pet Training Pads', category: 'Pet Supplies' }
    ]
  },
  {
    id: 'health_wellness',
    name: 'Health & Wellness',
    products: [
      { id: 'hw_001', name: 'First Aid Kit', category: 'Health & Wellness' },
      { id: 'hw_002', name: 'Digital Thermometer', category: 'Health & Wellness' },
      { id: 'hw_003', name: 'Pain Relief Patches', category: 'Health & Wellness' },
      { id: 'hw_004', name: 'Hot Water Bottle', category: 'Health & Wellness' },
      { id: 'hw_005', name: 'Heating Pad', category: 'Health & Wellness' },
      { id: 'hw_006', name: 'Compression Socks', category: 'Health & Wellness' },
      { id: 'hw_007', name: 'Sleep Mask', category: 'Health & Wellness' },
      { id: 'hw_008', name: 'Pill Organizer', category: 'Health & Wellness' },
      { id: 'hw_009', name: 'Blood Pressure Monitor', category: 'Health & Wellness' },
      { id: 'hw_010', name: 'Fitness Tracker', category: 'Health & Wellness' }
    ]
  },
  {
    id: 'baby_care',
    name: 'Baby Care',
    products: [
      { id: 'bc_001', name: 'Baby Wipes', category: 'Baby Care' },
      { id: 'bc_002', name: 'Baby Diapers', category: 'Baby Care' },
      { id: 'bc_003', name: 'Baby Shampoo', category: 'Baby Care' },
      { id: 'bc_004', name: 'Baby Lotion', category: 'Baby Care' },
      { id: 'bc_005', name: 'Baby Powder', category: 'Baby Care' },
      { id: 'bc_006', name: 'Baby Bottle', category: 'Baby Care' },
      { id: 'bc_007', name: 'Baby Monitor', category: 'Baby Care' },
      { id: 'bc_008', name: 'Baby Pacifier', category: 'Baby Care' },
      { id: 'bc_009', name: 'Baby Teether', category: 'Baby Care' },
      { id: 'bc_010', name: 'Baby Carrier', category: 'Baby Care' }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    products: [
      { id: 'au_001', name: 'Car Air Freshener', category: 'Automotive' },
      { id: 'au_002', name: 'Car Phone Mount', category: 'Automotive' },
      { id: 'au_003', name: 'Car Charger', category: 'Automotive' },
      { id: 'au_004', name: 'Car Vacuum', category: 'Automotive' },
      { id: 'au_005', name: 'Windshield Cover', category: 'Automotive' },
      { id: 'au_006', name: 'Car Wash Mitt', category: 'Automotive' },
      { id: 'au_007', name: 'Tire Pressure Gauge', category: 'Automotive' },
      { id: 'au_008', name: 'Jump Starter', category: 'Automotive' },
      { id: 'au_009', name: 'Car Trunk Organizer', category: 'Automotive' },
      { id: 'au_010', name: 'Car First Aid Kit', category: 'Automotive' }
    ]
  },
  {
    id: 'outdoor_garden',
    name: 'Outdoor & Garden',
    products: [
      { id: 'og_001', name: 'Garden Hose', category: 'Outdoor & Garden' },
      { id: 'og_002', name: 'Plant Pots', category: 'Outdoor & Garden' },
      { id: 'og_003', name: 'Garden Tools Set', category: 'Outdoor & Garden' },
      { id: 'og_004', name: 'Watering Can', category: 'Outdoor & Garden' },
      { id: 'og_005', name: 'Garden Gloves', category: 'Outdoor & Garden' },
      { id: 'og_006', name: 'Plant Food', category: 'Outdoor & Garden' },
      { id: 'og_007', name: 'Bird Feeder', category: 'Outdoor & Garden' },
      { id: 'og_008', name: 'Solar Lights', category: 'Outdoor & Garden' },
      { id: 'og_009', name: 'Lawn Sprinkler', category: 'Outdoor & Garden' },
      { id: 'og_010', name: 'Composting Bin', category: 'Outdoor & Garden' }
    ]
  },
  {
    id: 'fitness_exercise',
    name: 'Fitness & Exercise',
    products: [
      { id: 'fe_001', name: 'Yoga Mat', category: 'Fitness & Exercise' },
      { id: 'fe_002', name: 'Resistance Bands', category: 'Fitness & Exercise' },
      { id: 'fe_003', name: 'Exercise Ball', category: 'Fitness & Exercise' },
      { id: 'fe_004', name: 'Foam Roller', category: 'Fitness & Exercise' },
      { id: 'fe_005', name: 'Jump Rope', category: 'Fitness & Exercise' },
      { id: 'fe_006', name: 'Hand Weights', category: 'Fitness & Exercise' },
      { id: 'fe_007', name: 'Exercise Blocks', category: 'Fitness & Exercise' },
      { id: 'fe_008', name: 'Workout Gloves', category: 'Fitness & Exercise' },
      { id: 'fe_009', name: 'Exercise Mat', category: 'Fitness & Exercise' },
      { id: 'fe_010', name: 'Fitness Bands', category: 'Fitness & Exercise' }
    ]
  },
  {
    id: 'travel_accessories',
    name: 'Travel Accessories',
    products: [
      { id: 'ta_001', name: 'Travel Pillow', category: 'Travel Accessories' },
      { id: 'ta_002', name: 'Luggage Scale', category: 'Travel Accessories' },
      { id: 'ta_003', name: 'Travel Bottles', category: 'Travel Accessories' },
      { id: 'ta_004', name: 'Passport Holder', category: 'Travel Accessories' },
      { id: 'ta_005', name: 'Travel Adapter', category: 'Travel Accessories' },
      { id: 'ta_006', name: 'Toiletry Bag', category: 'Travel Accessories' },
      { id: 'ta_007', name: 'Packing Cubes', category: 'Travel Accessories' },
      { id: 'ta_008', name: 'Travel Lock', category: 'Travel Accessories' },
      { id: 'ta_009', name: 'Travel Wallet', category: 'Travel Accessories' },
      { id: 'ta_010', name: 'Luggage Tags', category: 'Travel Accessories' }
    ]
  },
  {
    id: 'storage_organization',
    name: 'Storage & Organization',
    products: [
      { id: 'so_001', name: 'Storage Boxes', category: 'Storage & Organization' },
      { id: 'so_002', name: 'Hanging Organizer', category: 'Storage & Organization' },
      { id: 'so_003', name: 'Under-bed Storage', category: 'Storage & Organization' },
      { id: 'so_004', name: 'Shoe Rack', category: 'Storage & Organization' },
      { id: 'so_005', name: 'Jewelry Box', category: 'Storage & Organization' },
      { id: 'so_006', name: 'Coat Rack', category: 'Storage & Organization' },
      { id: 'so_007', name: 'Magazine Holder', category: 'Storage & Organization' },
      { id: 'so_008', name: 'Cable Organizer', category: 'Storage & Organization' },
      { id: 'so_009', name: 'Drawer Dividers', category: 'Storage & Organization' },
      { id: 'so_010', name: 'Storage Ottoman', category: 'Storage & Organization' }
    ]
  },
  {
    id: 'bathroom_accessories',
    name: 'Bathroom Accessories',
    products: [
      { id: 'ba_001', name: 'Shower Caddy', category: 'Bathroom Accessories' },
      { id: 'ba_002', name: 'Toilet Brush', category: 'Bathroom Accessories' },
      { id: 'ba_003', name: 'Bath Mat', category: 'Bathroom Accessories' },
      { id: 'ba_004', name: 'Shower Curtain', category: 'Bathroom Accessories' },
      { id: 'ba_005', name: 'Soap Dispenser', category: 'Bathroom Accessories' },
      { id: 'ba_006', name: 'Toothbrush Holder', category: 'Bathroom Accessories' },
      { id: 'ba_007', name: 'Towel Rack', category: 'Bathroom Accessories' },
      { id: 'ba_008', name: 'Bathroom Scale', category: 'Bathroom Accessories' },
      { id: 'ba_009', name: 'Toilet Paper Holder', category: 'Bathroom Accessories' },
      { id: 'ba_010', name: 'Shower Mirror', category: 'Bathroom Accessories' }
    ]
  }
];

// Create a flattened list of all products for easy searching
export const allProductSuggestions = productCategories
  .flatMap(category => category.products)
  .sort((a, b) => a.name.localeCompare(b.name));

// Export the categories as is, without variations
export const expandedProductCategories = productCategories; 