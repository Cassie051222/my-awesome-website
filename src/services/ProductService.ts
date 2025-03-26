import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, where, orderBy, limit, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  specifications?: Record<string, string>;
  featured?: boolean;
  discount?: number;
  brand?: string;
}

const PRODUCTS_COLLECTION = 'products';

// Seed sample products
export const seedProducts = async () => {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  
  // Only seed if there are no products
  if (!querySnapshot.empty) {
    console.log('Products already exist, skipping seed');
    return;
  }

  const sampleProducts = [
    {
      name: 'Gaming Laptop Pro',
      price: 1299.99,
      description: 'High-performance gaming laptop with RGB keyboard and ray tracing support.',
      category: 'Laptops',
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80',
      stock: 15,
      rating: 4.8,
      specifications: {
        'CPU': 'Intel Core i7-12700H',
        'RAM': '16GB DDR5',
        'Storage': '1TB NVMe SSD',
        'GPU': 'NVIDIA RTX 3070 Ti',
        'Display': '15.6" QHD 165Hz'
      },
      featured: true,
      brand: 'TechMaster'
    },
    {
      name: 'Ultrawide Monitor',
      price: 499.99,
      description: 'Immersive ultrawide curved monitor for productivity and gaming.',
      category: 'Monitors',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      stock: 20,
      rating: 4.6,
      specifications: {
        'Size': '34 inch',
        'Resolution': '3440x1440',
        'Refresh Rate': '144Hz',
        'Response Time': '1ms',
        'Panel Type': 'IPS'
      },
      brand: 'ViewSonic'
    },
    {
      name: 'Wireless Ergonomic Mouse',
      price: 79.99,
      description: 'Comfortable ergonomic mouse with programmable buttons and long battery life.',
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      stock: 50,
      rating: 4.5,
      discount: 15,
      brand: 'Logitech'
    },
    {
      name: 'Mechanical Gaming Keyboard',
      price: 129.99,
      description: 'Tactile mechanical keyboard with customizable RGB lighting and macro keys.',
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80',
      stock: 30,
      rating: 4.7,
      specifications: {
        'Switch Type': 'Cherry MX Blue',
        'Layout': 'Full size',
        'Backlight': 'RGB',
        'Connection': 'USB-C',
        'N-Key Rollover': 'Yes'
      },
      featured: true,
      discount: 10,
      brand: 'Corsair'
    },
    {
      name: 'Premium Headset',
      price: 199.99,
      description: 'Noise-cancelling headset with surround sound and detachable microphone.',
      category: 'Audio',
      imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e736e9ae14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
      stock: 25,
      rating: 4.9,
      featured: true,
      brand: 'SteelSeries'
    },
    {
      name: 'Gaming PC Bundle',
      price: 1999.99,
      description: 'Complete gaming PC setup with tower, monitor, keyboard, and mouse.',
      category: 'Desktops',
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1442&q=80',
      stock: 8,
      rating: 4.9,
      specifications: {
        'CPU': 'AMD Ryzen 9 5900X',
        'RAM': '32GB RGB DDR4',
        'Storage': '2TB NVMe SSD',
        'GPU': 'NVIDIA RTX 3080',
        'Case': 'Tempered Glass RGB'
      },
      featured: true,
      brand: 'CyberPC'
    },
    {
      name: 'External SSD Drive',
      price: 149.99,
      description: 'Fast portable SSD with USB-C connectivity and shock-resistant case.',
      category: 'Storage',
      imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      stock: 40,
      rating: 4.5,
      specifications: {
        'Capacity': '1TB',
        'Interface': 'USB 3.2 Gen 2',
        'Speed': 'Up to 1050MB/s',
        'Dimensions': '4.3 x 2.3 x 0.4 inches',
        'Compatible with': 'Windows, Mac, PS5, Xbox'
      },
      discount: 20,
      brand: 'Samsung'
    },
    {
      name: 'Dual Monitor Stand',
      price: 89.99,
      description: 'Adjustable dual monitor stand with cable management and VESA compatibility.',
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1619953942547-233eab5a70b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      stock: 15,
      rating: 4.3,
      brand: 'VIVO'
    }
  ];

  try {
    for (const product of sampleProducts) {
      await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    }
    console.log('Sample products added successfully');
  } catch (error) {
    console.error('Error adding sample products: ', error);
    throw error;
  }
};

// Get all products with optional filtering
export const getProducts = async (
  categoryFilter?: string,
  searchQuery?: string,
  sortBy: string = 'name',
  sortDirection: 'asc' | 'desc' = 'asc',
  minPrice?: number,
  maxPrice?: number
): Promise<Product[]> => {
  try {
    let productsQuery = query(collection(db, PRODUCTS_COLLECTION));
    
    // Apply filters if provided
    const filters = [];
    
    if (categoryFilter) {
      filters.push(where('category', '==', categoryFilter));
    }
    
    if (minPrice !== undefined) {
      filters.push(where('price', '>=', minPrice));
    }
    
    if (maxPrice !== undefined) {
      filters.push(where('price', '<=', maxPrice));
    }
    
    // Apply filters to query
    if (filters.length > 0) {
      productsQuery = query(collection(db, PRODUCTS_COLLECTION), ...filters);
    }
    
    // Add sorting
    productsQuery = query(productsQuery, orderBy(sortBy, sortDirection));
    
    const querySnapshot = await getDocs(productsQuery);
    
    let products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    
    // Apply search filter on client side if provided
    if (searchQuery && searchQuery.trim() !== '') {
      const search = searchQuery.toLowerCase().trim();
      products = products.filter(product => 
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search)
      );
    }
    
    return products;
  } catch (error) {
    console.error('Error getting products: ', error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async (limitCount: number = 4): Promise<Product[]> => {
  try {
    const productsQuery = query(
      collection(db, PRODUCTS_COLLECTION),
      where('featured', '==', true),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(productsQuery);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting featured products: ', error);
    throw error;
  }
};

// Get product categories
export const getProductCategories = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    
    const categories = new Set<string>();
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error getting product categories: ', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting product: ', error);
    throw error;
  }
}; 