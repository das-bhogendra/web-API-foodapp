# FoodWorld API Endpoints Reference

## Server Configuration
- **Base URL**: `http://localhost:5005`
- **API Prefix**: `/api`
- **Full API URL**: `http://localhost:5005/api`

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```http
GET /api/auth/whoami
Authorization: Bearer YOUR_TOKEN

Response 200:
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2024-02-22T10:00:00Z"
  }
}
```

### Update Profile
```http
POST /api/auth/update-profile
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

FormData:
- firstName: "John"
- lastName: "Doe"
- image: <file>

Response 200:
{
  "success": true,
  "message": "Profile updated",
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## 🍽️ Food Endpoints

### Get All Foods
```http
GET /api/foods
Optional Query Params:
- type=veg
- page=1
- limit=10

Response 200:
{
  "success": true,
  "data": [
    {
      "_id": "food1",
      "name": "Pizza Margherita",
      "description": "Fresh mozzarella...",
      "price": 12.99,
      "type": "veg",
      "imageUrl": "https://...",
      "isAvailable": true,
      "isBestSeller": true,
      "isDiscounted": false,
      "discountPercentage": 0
    },
    ...
  ],
  "pagination": {
    "total": 50,
    "pages": 5,
    "currentPage": 1
  }
}
```

### Get Food by Type
```http
GET /api/foods/type/{type}
Example: GET /api/foods/type/veg

Response 200:
{
  "success": true,
  "data": [...]
}
```

### Get Best Sellers
```http
GET /api/foods/best-sellers

Response 200:
{
  "success": true,
  "data": [...]
}
```

### Get Discounted Foods
```http
GET /api/foods/discounted

Response 200:
{
  "success": true,
  "data": [...]
}
```

### Get Food by ID
```http
GET /api/foods/{id}

Response 200:
{
  "success": true,
  "data": {
    "_id": "food1",
    "name": "Pizza Margherita",
    ...
  }
}
```

### Create Food (Admin)
```http
POST /api/foods
Authorization: Bearer ADMIN_TOKEN
Content-Type: multipart/form-data

FormData:
- name: "New Pizza"
- description: "Fresh pizza"
- price: 14.99
- type: "veg"
- available: true (or false)
- bestSeller: true (or false)
- image: <file>

Response 201:
{
  "success": true,
  "message": "Food created successfully",
  "data": {
    "_id": "newfood",
    "name": "New Pizza",
    ...
  }
}
```

### Update Food (Admin)
```http
PUT /api/foods/{id}
Authorization: Bearer ADMIN_TOKEN
Content-Type: multipart/form-data

FormData:
- name: "Updated Pizza"
- price: 15.99
- ... (other fields)
- image: <file> (optional)

Response 200:
{
  "success": true,
  "message": "Food updated successfully",
  "data": {...}
}
```

### Delete Food (Admin)
```http
DELETE /api/foods/{id}
Authorization: Bearer ADMIN_TOKEN

Response 200:
{
  "success": true,
  "message": "Food deleted successfully"
}
```

---

## 📂 Category Endpoints

### Get All Categories
```http
GET /api/categories

Response 200:
{
  "success": true,
  "data": [
    {
      "_id": "cat1",
      "name": "Pizzas",
      "description": "All pizza options",
      "createdBy": "admin123"
    },
    ...
  ]
}
```

### Get Category by ID
```http
GET /api/categories/{id}

Response 200:
{
  "success": true,
  "data": {...}
}
```

### Get Categories by User
```http
GET /api/categories/user/{userId}

Response 200:
{
  "success": true,
  "data": [...]
}
```

### Create Category (Admin)
```http
POST /api/categories
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Burgers",
  "description": "Delicious burgers"
}

Response 201:
{
  "success": true,
  "data": {
    "_id": "cat2",
    "name": "Burgers",
    ...
  }
}
```

### Update Category (Admin)
```http
PUT /api/categories/{id}
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}

Response 200:
{
  "success": true,
  "data": {...}
}
```

### Delete Category (Admin)
```http
DELETE /api/categories/{id}
Authorization: Bearer ADMIN_TOKEN

Response 200:
{
  "success": true,
  "message": "Category deleted"
}
```

---

## 👥 User Endpoints

### Get All Users (Admin)
```http
GET /api/admin/users/
Authorization: Bearer ADMIN_TOKEN
Optional Query Params:
- page=1
- limit=10
- search=email

Response 200:
{
  "success": true,
  "data": [
    {
      "_id": "user1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-02-22T10:00:00Z"
    },
    ...
  ],
  "pagination": {...}
}
```

### Get User by ID (Admin)
```http
GET /api/admin/users/{id}
Authorization: Bearer ADMIN_TOKEN

Response 200:
{
  "success": true,
  "data": {...}
}
```

### Create User (Admin)
```http
POST /api/admin/users/
Authorization: Bearer ADMIN_TOKEN
Content-Type: multipart/form-data

FormData:
- firstName: "Jane"
- lastName: "Doe"
- email: "jane@example.com"
- username: "janedoe"
- password: "password123"
- confirmPassword: "password123"
- image: <file> (optional)

Response 201:
{
  "success": true,
  "data": {
    "_id": "newuser",
    "name": "Jane Doe",
    "email": "jane@example.com",
    ...
  }
}
```

### Update User (Admin)
```http
PUT /api/admin/users/{id}
Authorization: Bearer ADMIN_TOKEN
Content-Type: multipart/form-data

FormData:
- firstName: "Jane"
- lastName: "Smith"
- email: "jane.smith@example.com"
- username: "janesmith"
- password: (optional)
- image: <file> (optional)

Response 200:
{
  "success": true,
  "data": {...}
}
```

### Delete User (Admin)
```http
DELETE /api/admin/users/{id}
Authorization: Bearer ADMIN_TOKEN

Response 200:
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 📦 Order Endpoints

### Get All Orders
```http
GET /api/orders/
Authorization: Bearer YOUR_TOKEN (Admin sees all, User sees own)
Optional Query Params:
- userId=user123
- status=pending
- page=1
- limit=10
- sortBy=createdAt
- sortOrder=desc

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "order1",
      "userId": "user123",
      "items": [
        {
          "name": "Pizza",
          "foodId": "food1",
          "quantity": 2,
          "price": 12.99
        }
      ],
      "totalAmount": 25.98,
      "notes": "Extra cheese please",
      "status": "pending",
      "createdAt": "2024-02-22T10:00:00Z",
      "updatedAt": "2024-02-22T10:00:00Z"
    },
    ...
  ],
  "pagination": {...}
}
```

### Get User Orders
```http
GET /api/orders/user/{userId}
Authorization: Bearer ADMIN_TOKEN

Response 200:
{
  "success": true,
  "data": [...]
}
```

### Get Order by ID
```http
GET /api/orders/{id}
Authorization: Bearer YOUR_TOKEN

Response 200:
{
  "success": true,
  "data": {
    "id": "order1",
    ...
  }
}
```

### Create Order
```http
POST /api/orders
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "foodId": "food1",
      "name": "Pizza",
      "quantity": 2,
      "price": 12.99
    }
  ],
  "totalAmount": 25.98,
  "notes": "Extra cheese please"
}

Response 201:
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "order1",
    ...
  }
}
```

### Update Order (Especially Status)
```http
PUT /api/orders/{id}
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Updated notes"
}

Response 200:
{
  "success": true,
  "message": "Order updated successfully",
  "data": {...}
}
```

### Delete/Cancel Order
```http
DELETE /api/orders/{id}
Authorization: Bearer YOUR_TOKEN

Response 200:
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

## 📋 Order Status Values

Valid status values for orders:
- `pending` - Order received, waiting for confirmation
- `confirmed` - Order confirmed by admin
- `preparing` - Food is being prepared
- `ready` - Food is ready for pickup/delivery
- `delivered` - Order delivered to customer
- `cancelled` - Order was cancelled

---

## 🔑 Authentication

All protected endpoints require an Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The token is obtained from the login endpoint and should be stored in localStorage on the frontend.

---

## 📊 Response Format

All endpoints follow this standard response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...},
  "pagination": {
    "total": 100,
    "pages": 10,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Error Response:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [...],
  "statusCode": 400
}
```

---

## ⚠️ HTTP Status Codes

- `200` - OK, request successful
- `201` - Created, resource created successfully
- `400` - Bad Request, invalid input
- `401` - Unauthorized, authentication required
- `403` - Forbidden, insufficient permissions
- `404` - Not Found, resource doesn't exist
- `500` - Internal Server Error

---

## 🧪 Testing with cURL

### Example: Create an Order

```bash
curl -X POST http://localhost:5005/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"foodId": "food1", "name": "Pizza", "quantity": 2, "price": 12.99}],
    "totalAmount": 25.98,
    "notes": "Extra cheese"
  }'
```

### Example: Update Order Status

```bash
curl -X PUT http://localhost:5005/api/orders/order1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "delivered"}'
```

---

## 📝 Notes

- All dates are returned in ISO 8601 format (2024-02-22T10:00:00Z)
- Prices are decimal numbers (10.99)
- IDs are string format (ObjectIDs for MongoDB)
- File uploads use multipart/form-data
- Paginated endpoints include `page` and `limit` query parameters
- Admin operations require admin role in JWT token

---

## ✅ Common Implementation Patterns

### Using in React Component

```typescript
// Fetch all foods
const fetchFoods = async () => {
  try {
    const response = await axios.get('/api/foods');
    setFoods(response.data.data);
  } catch (error) {
    console.error(error.response.data.message);
  }
};

// Create order
const createOrder = async (orderData) => {
  try {
    const response = await axios.post('/api/orders', orderData);
    toast.success('Order placed successfully');
    return response.data.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
```

---

Ready to integrate with your frontend! 🚀
