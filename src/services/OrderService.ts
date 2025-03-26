import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Order {
  id: string;
  userId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ORDERS_COLLECTION = 'orders';

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    if (!userId) {
      console.error('[OrderService] Error: userId is empty or undefined');
      throw new Error('User ID is required');
    }
    
    console.log('[OrderService] Getting orders for user ID:', userId);
    console.log('[OrderService] Using collection:', ORDERS_COLLECTION);
    
    // Check Firestore db connection
    if (!db) {
      console.error('[OrderService] Error: Firestore db is undefined');
      throw new Error('Firestore database is not initialized');
    }
    
    console.log('[OrderService] Creating query...');
    const ordersQuery = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    console.log('[OrderService] Query created, fetching documents...');
    const querySnapshot = await getDocs(ordersQuery);
    console.log('[OrderService] Query returned:', querySnapshot.docs.length, 'documents');
    
    const orders: Order[] = [];
    
    querySnapshot.forEach(doc => {
      try {
        const data = doc.data();
        console.log('[OrderService] Processing document:', doc.id);
        console.log('[OrderService] Document data:', JSON.stringify(data, null, 2));
        
        // Check if all required fields exist
        if (!data.createdAt || !data.updatedAt) {
          console.error('[OrderService] Missing timestamp fields in document:', doc.id);
          return; // Skip this document
        }
        
        const order: Order = {
          id: doc.id,
          userId: data.userId,
          items: data.items || [],
          total: data.total || 0,
          status: data.status || 'Processing',
          paymentMethod: data.paymentMethod || '',
          paymentStatus: data.paymentStatus || 'Pending',
          shippingAddress: data.shippingAddress || {},
          createdAt: data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
        };
        
        orders.push(order);
      } catch (err) {
        console.error('[OrderService] Error processing document:', doc.id, err);
      }
    });
    
    console.log('[OrderService] Successfully processed orders:', orders.length);
    return orders;
  } catch (error: any) {
    console.error('[OrderService] Error fetching orders:', error);
    console.error('[OrderService] Error message:', error.message);
    console.error('[OrderService] Error stack:', error.stack);
    throw error;
  }
};

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  try {
    console.log('[OrderService] Creating order with data:', JSON.stringify(orderData, null, 2));
    console.log('[OrderService] Using collection:', ORDERS_COLLECTION);
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    console.log('[OrderService] Order created with ID:', docRef.id);
    
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('[OrderService] Document does not exist after creation');
    }
    
    const data = docSnap.data();
    console.log('[OrderService] Retrieved order data:', JSON.stringify(data, null, 2));
    
    return {
      id: docRef.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Order;
  } catch (error) {
    console.error('[OrderService] Error creating order:', error);
    throw error;
  }
};
