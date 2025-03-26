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
  reviewCount?: number;
  specifications?: Record<string, string>;
  featured?: boolean;
  discount?: number;
  brand?: string;
}

export interface Review {
  id?: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

const PRODUCTS_COLLECTION = 'products';
const REVIEWS_COLLECTION = 'reviews';

// Seed sample products
export const seedProducts = async (forceReseed: boolean = false) => {
  // Check if we should skip seeding based on environment variable
  const skipSeed = process.env.REACT_APP_SKIP_SEED === 'true';
  if (skipSeed && !forceReseed) {
    console.log('Seeding skipped due to environment configuration');
    return;
  }

  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));

  // Only seed if there are no products or if forced
  if (!querySnapshot.empty && !forceReseed) {
    console.log('Products already exist, skipping seed');
    return;
  }

  // If force reseed, clear existing products first
  if (forceReseed && !querySnapshot.empty) {
    console.log('Force reseeding products...');
    for (const docSnapshot of querySnapshot.docs) {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, docSnapshot.id));
    }
  }

  const sampleProducts = [
    {
      name: 'Windows 10 Home Activation Key',
      price: 139.99,
      description: 'Genuine Microsoft Windows 10 Home activation key. Digital delivery within 24 hours of purchase.',
      category: 'Software',
      imageUrl: 'https://images.unsplash.com/photo-1551430872-6f475ef24290?auto=format&fit=crop&q=80&w=1470',
      stock: 500,
      rating: 4.8,
      reviewCount: 124,
      specifications: {
        'Type': 'Digital License',
        'Version': 'Windows 10 Home',
        'Language': 'All Languages',
        'Activation': 'Online Activation',
        'Users': '1 PC'
      },
      featured: true,
      brand: 'Microsoft'
    },
    {
      name: 'Windows 11 Home Digital License',
      price: 169.99,
      description: 'Official Windows 11 Home license key with instant delivery. Includes free upgrade from Windows 10.',
      category: 'Software',
      imageUrl: 'https://images.unsplash.com/photo-1633227220797-5550677c4c42?auto=format&fit=crop&q=80&w=1288',
      stock: 500,
      rating: 4.9,
      reviewCount: 86,
      specifications: {
        'Type': 'Digital License',
        'Version': 'Windows 11 Home',
        'Language': 'All Languages',
        'Activation': 'Online Activation',
        'Users': '1 PC'
      },
      featured: true,
      brand: 'Microsoft'
    },
    {
      name: 'Gaming Laptop Pro',
      price: 1299.99,
      description: 'High-performance gaming laptop with RGB keyboard and ray tracing support.',
      category: 'Laptops',
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80',
      stock: 15,
      rating: 4.8,
      reviewCount: 32,
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

// Get reviews for a product
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  try {
    const reviewsQuery = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(reviewsQuery);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    } as Review));
  } catch (error) {
    console.error('Error getting product reviews: ', error);
    throw error;
  }
};

// Add a review for a product
export const addProductReview = async (review: Review): Promise<string> => {
  try {
    // Add the review
    const reviewDocRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
      ...review,
      date: new Date()
    });
    
    // Get all reviews for this product to calculate new average
    const reviews = await getProductReviews(review.productId);
    
    // Calculate new average rating
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    // Update product with new rating and review count
    const productRef = doc(db, PRODUCTS_COLLECTION, review.productId);
    await updateDoc(productRef, {
      rating: averageRating,
      reviewCount: reviews.length
    });
    
    return reviewDocRef.id;
  } catch (error) {
    console.error('Error adding product review: ', error);
    throw error;
  }
}; 