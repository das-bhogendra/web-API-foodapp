# FoodWorld Frontend - Developer Documentation

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend server running on http://localhost:5005

### Installation & Setup

```bash
# Clone the repository
cd my-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# Open browser to http://localhost:3001
```

---

## 📂 Directory Structure Explained

### `/app`
The main Next.js app directory containing all pages and components.

#### `/public`
Static assets (images, fonts, etc.)

#### `/context`
React Context providers for global state management:
- **AuthContext.tsx**: Manages user authentication and profile
- **CartContext.tsx**: Manages shopping cart state
- **FoodContext.tsx**: Manages food items fetched from backend
- **CategoryContext.tsx**: Manages categories
- **OrderContext.tsx**: Manages orders operations

#### `/lib`
Utility functions and API configurations:
- **api/axios.ts**: Axios instance with JWT interceptor
- **api/endpoints.ts**: All API endpoints centralized
- **api/admin/user.ts**: Admin user CRUD operations
- **foodApi.ts**: Food item API calls
- **categoryApi.ts**: Category API calls
- **orderApi.ts**: Order API calls
- **auth.ts**: Authentication utilities
- **actions/**: Server-side actions

#### `/components`
Reusable React components:
- **UserNavbar.tsx**: Navigation for logged-in users
- **ProtectedRoute.tsx**: Route protection for authenticated users
- **Header.tsx**: Main header component
- **ThemeToggle.tsx**: Dark/light mode toggle

#### `/admin`
Admin panel pages and components:
- `/admin/dashboard/food`: Food management (CRUD)
- `/admin/dashboard/categories`: Category management
- `/admin/dashboard/users`: User management
- `/admin/orders`: Order management

#### `/user`
User-facing pages and components:
- `/user/dashboard/food`: Browse menu
- `/user/dashboard/cart`: Shopping cart
- `/user/dashboard/orders`: Order history
- `/user/dashboard/profile`: User profile

#### `/auth`
Authentication pages:
- `/auth/login`: Login page
- `/auth/register`: Registration page

---

## 🔐 Authentication Flow

### Login Process

```typescript
// app/context/AuthContext.tsx
const login = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', { email, password });
  const { user, token } = response.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  setUser(user);
};
```

### Protected Routes

```typescript
// app/components/ProtectedRoute.tsx
// Automatically redirects to login if not authenticated
// Redirects to appropriate dashboard based on user role
```

### JWT Token Injection

```typescript
// app/lib/api/axios.ts
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🛒 Cart Management

### Adding to Cart

```typescript
// app/context/CartContext.tsx
const addToCart = (item: FoodItem, quantity = 1) => {
  // Checks if item already exists
  // Updates quantity if exists, adds new if not
  // Automatically persists to localStorage
};
```

### Cart Persistence

```typescript
useEffect(() => {
  // Load cart from localStorage on mount
  const savedCart = localStorage.getItem('cart');
  if (savedCart) setCartItems(JSON.parse(savedCart));
}, []);

useEffect(() => {
  // Save cart to localStorage on change
  localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems]);
```

---

## 📦 Order Management

### Creating an Order

```typescript
// app/context/OrderContext.tsx
const addOrder = async (dto: CreateOrderDto) => {
  const newOrder = await createOrder(dto);
  setOrders(prev => [newOrder, ...prev]);
};

// Usage in CartPage
const handleCheckout = async () => {
  const orderData = {
    items: cartItems.map(item => ({
      foodId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    totalAmount,
    notes,
  };
  await addOrder(orderData);
};
```

### Order Status Updates (Admin)

```typescript
// app/admin/orders/page.tsx
const handleStatusUpdate = async (orderId: string, newStatus: string) => {
  await editOrder(orderId, { status: newStatus });
};
```

---

## 🍽️ Food Management (Admin)

### Creating a Food Item

```typescript
// app/admin/dashboard/food/components/CreateFoodForm.tsx
const handleSubmit = async (data: FoodData) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price', data.price);
  formData.append('type', data.type);
  formData.append('image', data.image);
  
  const token = localStorage.getItem('token');
  await foodApi.create(formData, token);
};
```

### Updating a Food Item

```typescript
// app/admin/dashboard/food/edit/[id].tsx
const handleSubmit = async (data: FoodData) => {
  const formData = new FormData();
  // ... populate formData
  await foodApi.update(id, formData, token);
};
```

---

## 👥 User Management (Admin)

### Get All Users

```typescript
// app/lib/api/admin/user.ts
export const getAllUsers = async () => {
  const response = await axios.get(API.ADMIN.USER.GET_ALL);
  return response.data;
};

// Usage
const { response } = await getAllUsers();
const users = response.data;
```

### Create User

```typescript
const createUser = async (userData: FormData) => {
  const response = await axios.post(
    API.ADMIN.USER.CREATE,
    userData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};
```

---

## 🎨 Styling & Tailwind

### Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Extend with custom colors
      }
    }
  }
}
```

### Color Scheme
- **Primary**: Orange (#FF6B35)
- **Secondary**: Red (#D62828)
- **Success**: Green (#06A77D)
- **Warning**: Yellow (#FDB833)
- **Error**: Red (#C1121F)

---

## 🔌 API Integration Examples

### Making API Calls

```typescript
import axios from '@/app/lib/api/axios';

// GET request
const { data } = await axios.get('/api/foods');

// POST request
const { data } = await axios.post('/api/orders', orderData);

// PUT request
await axios.put(`/api/orders/${id}`, updateData);

// DELETE request
await axios.delete(`/api/orders/${id}`);
```

### Error Handling

```typescript
try {
  const response = await axios.get('/api/foods');
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  setData(response.data.data);
} catch (error) {
  console.error(error.message);
  setError(error.message);
  toast.error(`Error: ${error.message}`);
}
```

---

## 🧪 Testing Endpoints

### Admin Endpoints

```bash
# Get all food items
curl http://localhost:5005/api/foods

# Create food item (requires token)
curl -X POST http://localhost:5005/api/foods \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Pizza" \
  -F "price=10.99" \
  -F "image=@image.jpg"

# Get all users
curl http://localhost:5005/api/admin/users/ \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get all orders
curl http://localhost:5005/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### User Endpoints

```bash
# Get user orders
curl http://localhost:5005/api/orders/user/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create order
curl -X POST http://localhost:5005/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items": [...], "totalAmount": 25.99}'

# Update order status
curl -X PUT http://localhost:5005/api/orders/ORDER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "delivered"}'
```

---

## 🐛 Debugging Tips

### Check Network Requests

```typescript
// Enable request logging in axios
axios.interceptors.request.use((config) => {
  console.log('API Request:', config);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);
```

### Check localStorage

```javascript
// In browser console
console.log(localStorage.getItem('user'));
console.log(JSON.parse(localStorage.getItem('cart')));
console.log(localStorage.getItem('token'));
```

### React DevTools

```typescript
// Install React DevTools browser extension
// Inspect component state in Components tab
// Check hooks and context values in Components tab
```

---

## 📋 Common Tasks

### Add a New Admin Page

1. Create folder: `app/admin/dashboard/newfeature/`
2. Create page component: `page.tsx`
3. Add navigation link in `app/admin/dashboard/_components/Sidebar.tsx`
4. Create any needed API functions in `app/lib/api/`
5. Use Context providers for state management

### Add a New User Feature

1. Create folder: `app/user/dashboard/newfeature/`
2. Create page component: `page.tsx`
3. Add navigation link in `app/components/UserNavbar.tsx`
4. Wrap with ProtectedRoute if needed
5. Use AuthContext and CartContext as needed

### Add Error Handling to API Call

```typescript
async function fetchData() {
  try {
    setLoading(true);
    const response = await axios.get('/api/endpoint');
    setData(response.data.data);
  } catch (error) {
    setError(error.message);
    toast.error(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://your-backend-url:5005
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Traditional Server

```bash
npm run build
npm start
```

---

## 📊 Performance Optimization

### Code Splitting

Next.js automatically code-splits at route level.

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/food.jpg"
  alt="Food"
  width={300}
  height={300}
  priority={false}
/>;
```

### Lazy Loading

```typescript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
});
```

---

## 🔒 Security Best Practices

### JWT Token Storage
- ✅ Store in localStorage (acceptable for this SPA)
- ❌ Never store in URL or cookies (vulnerable to XSS)

### CORS Handling
- Backend should allow requests from frontend origin
- Axios configured with withCredentials if needed

### Input Validation
- Uses zod schema validation
- React Hook Form handles client-side validation

### XSS Protection
- React automatically escapes content
- Trust only sanitized HTML

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios](https://axios-http.com)
- [React Hook Form](https://react-hook-form.com)

---

## 💬 Support

For issues or questions:
1. Check the error message in browser console
2. Review API response in Network tab
3. Check backend logs
4. Verify environment variables
5. Restart development server

---

## ✅ Ready to Deploy!

Your FoodWorld frontend is production-ready. all features are implemented, tested, and documented. Good luck! 🚀
