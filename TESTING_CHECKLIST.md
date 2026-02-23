# FoodWorld Frontend - Testing Checklist

## 🧪 Complete Testing Guide

Use this checklist to verify all features are working correctly.

---

## 🏠 Home Page Testing

### Navigation
- [ ] Home page loads without errors
- [ ] Header displays FoodWorld logo
- [ ] Navigation links are visible
- [ ] "Get Started" button visible for unauthenticated users
- [ ] Features section displays 3 feature cards
- [ ] Footer contains copyright and links

### Authentication Links
- [ ] Login link navigates to `/auth/login`
- [ ] Sign Up link navigates to `/auth/register`
- [ ] Login button shows for logged-out users
- [ ] Dashboard button shows for logged-in users

### Responsive Design
- [ ] Page looks good on mobile (375px)
- [ ] Page looks good on tablet (768px)
- [ ] Page looks good on desktop (1920px)
- [ ] Images scale properly
- [ ] Text is readable on all sizes

---

## 🔐 Authentication Testing

### Registration Flow
- [ ] Navigate to `/auth/register`
- [ ] All form fields display correctly
- [ ] Can enter email
- [ ] Can enter password
- [ ] Can enter confirm password
- [ ] Can enter first name
- [ ] Can enter last name
- [ ] Can enter username
- [ ] Submit button works
- [ ] Validation error shows for empty fields
- [ ] Validation error shows for password mismatch
- [ ] Success message shows after registration
- [ ] Redirected to home or login page

### Login Flow
- [ ] Navigate to `/auth/login`
- [ ] Email field present and functional
- [ ] Password field present and functional
- [ ] Submit button works
- [ ] Invalid credentials show error message
- [ ] Valid credentials show success message
- [ ] Token stored in localStorage
- [ ] User redirected to dashboard
- [ ] User info stored in localStorage

### Token Management
- [ ] Token persists across page refreshes
- [ ] Token includes in API authorization header
- [ ] Token expires appropriately
- [ ] Logout clears token from localStorage
- [ ] Expired token triggers login redirect

---

## 👤 User Dashboard Testing

### Dashboard Navigation
- [ ] User navbar displays
- [ ] FoodWorld logo visible in navbar
- [ ] All navigation links present
- [ ] Current page highlighted
- [ ] Cart count shows in navbar
- [ ] Welcome message shows user name
- [ ] Logout button visible

### Navigation Links
- [ ] Dashboard link works → `/user/dashboard`
- [ ] Menu link works → `/user/dashboard/food`
- [ ] Cart link works → `/user/dashboard/cart`
- [ ] Orders link works → `/user/dashboard/orders`
- [ ] Profile link works → `/user/dashboard/profile`

---

## 🍽️ Food Menu Testing

### Food Display
- [ ] All foods load from backend
- [ ] Foods display in grid layout
- [ ] Each food shows image
- [ ] Food name displayed
- [ ] Food description shown
- [ ] Food price shown
- [ ] Best seller badge shows when applicable
- [ ] Discount badge shows when applicable
- [ ] Out of stock disables add button

### Filtering
- [ ] Category filter dropdown appears
- [ ] Can filter by category/type
- [ ] Filtered foods display correctly
- [ ] "All" option shows all foods
- [ ] Filter persists when applied

### Food Cards
- [ ] Cards have hover effects
- [ ] Cards are responsive
- [ ] "Add to Cart" button visible
- [ ] Button disabled for out of stock items
- [ ] Button enabled for available items

### Add to Cart
- [ ] Clicking "Add to Cart" works
- [ ] Item added to cart
- [ ] Cart count updates in navbar
- [ ] Success toast shows
- [ ] Adding same item increases quantity
- [ ] Can add different items

---

## 🛒 Shopping Cart Testing

### Cart Display
- [ ] Navigate to cart page
- [ ] Empty cart shows message
- [ ] Cart items display as cards
- [ ] Each item shows image
- [ ] Item name displayed
- [ ] Item price shown
- [ ] Item quantity shown
- [ ] Cart summary visible

### Cart Operations
- [ ] Can increase quantity (+ button)
- [ ] Can decrease quantity (- button)
- [ ] Decreasing to 0 removes item
- [ ] Remove button works
- [ ] Item removed from cart
- [ ] Cart count updates
- [ ] Total amount updates correctly

### Order Notes
- [ ] Notes textarea visible
- [ ] Can type in notes
- [ ] Notes text saves
- [ ] Notes persists until order placed

### Cart Summary
- [ ] Shows item count
- [ ] Shows subtotal correctly
- [ ] Shows delivery fee ($2.99)
- [ ] Shows total with fee
- [ ] Place order button enabled
- [ ] Place order button disabled when empty

### Checkout
- [ ] Click "Place Order" works
- [ ] Loading state shows while placing
- [ ] Success message shows
- [ ] Order created in backend
- [ ] Cart cleared after order
- [ ] Redirected to orders page

---

## 📦 Orders Testing

### Order List
- [ ] Navigate to orders page
- [ ] All user orders display
- [ ] Empty state shows when no orders
- [ ] Orders sorted by date (newest first)
- [ ] Order cards display correctly

### Order Details
- [ ] Order ID shown
- [ ] Order date shown
- [ ] Order status shown with color
- [ ] Status badge color changes by status:
  - [ ] Green for delivered
  - [ ] Red for cancelled
  - [ ] Blue for preparing
  - [ ] Yellow for pending/confirmed
- [ ] Order total shown
- [ ] Order notes displayed (if any)
- [ ] Order items listed

### Order Items
- [ ] Each item shows name
- [ ] Item quantity shown
- [ ] Item price shown
- [ ] Item total calculated (price × quantity)
- [ ] All items listed

### Order Actions
- [ ] Can cancel pending orders
- [ ] Cancel button shows for pending/confirmed
- [ ] Cancel button hidden for delivered/ready
- [ ] Confirmation dialog appears
- [ ] Confirmed cancel works
- [ ] Order status updates to cancelled
- [ ] Cancelled text shows

---

## 👤 User Profile Testing

### Profile Tab
- [ ] Navigate to profile page
- [ ] Personal information section shows
- [ ] Name displayed correctly
- [ ] Email displayed
- [ ] Username displayed
- [ ] Member since date shown
- [ ] Account statistics visible

### Statistics
- [ ] Total orders count shown
- [ ] Completed orders count accurate
- [ ] Total spent amount calculated correctly
- [ ] Statistics update in real-time

### Order History Tab
- [ ] Order History tab present
- [ ] Click tab switches view
- [ ] All user orders listed
- [ ] Order count matches statistic
- [ ] Orders can be cancelled from here

### Profile Responsiveness
- [ ] Profile looks good on mobile
- [ ] Statistics cards stack on mobile
- [ ] Tabs work on mobile
- [ ] All content readable

---

## 🔧 Admin Panel Testing

### Admin Access
- [ ] Login with admin account
- [ ] Redirected to `/admin/dashboard`
- [ ] Cannot access user dashboard
- [ ] Cannot access food menu user page

### Admin Navigation
- [ ] Admin sidebar displays
- [ ] Food Items link visible
- [ ] Categories link visible
- [ ] Orders link visible
- [ ] Users link visible
- [ ] Current page highlighted

---

## 🍕 Admin Food Management

### Food List Page
- [ ] Navigate to food management
- [ ] All foods display
- [ ] Foods shown in grid
- [ ] Create food button visible
- [ ] Each food card has edit/delete buttons

### Create Food
- [ ] Click "Create New Food" button
- [ ] Navigate to create form
- [ ] Food name field present
- [ ] Price field present
- [ ] Type dropdown works (veg/non-veg/dessert/drink)
- [ ] Available checkbox present
- [ ] Best Seller checkbox present
- [ ] Image upload works
- [ ] Image preview shows
- [ ] Submit button works
- [ ] Form validates required fields
- [ ] Success message shows
- [ ] New food appears in list

### Edit Food
- [ ] Click edit button on food
- [ ] Navigate to edit form
- [ ] Current values prefill
- [ ] Can change name
- [ ] Can change price
- [ ] Can change type
- [ ] Can change availability
- [ ] Can update image
- [ ] Submit button works
- [ ] Changes saved
- [ ] Food list updates

### Delete Food
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Cancel dialog doesn't delete
- [ ] Confirm dialog deletes
- [ ] Food removed from list
- [ ] Success message shows

---

## 📂 Admin Category Management

### Category List
- [ ] Navigate to categories
- [ ] All categories display
- [ ] Categories in cards and table
- [ ] Create category option visible

### CRUD Operations
- [ ] Can create new category
- [ ] Can edit category
- [ ] Can delete category
- [ ] Form validates inputs
- [ ] Changes persist

---

## 👥 Admin User Management

### User List
- [ ] Navigate to users page
- [ ] All users display in table
- [ ] Table has columns: Name, Email, Role, Status, Created, Actions
- [ ] Create user button visible
- [ ] Edit/Delete buttons visible

### Create User
- [ ] Click create button
- [ ] Form displays correctly
- [ ] Can enter user details
- [ ] Image upload works
- [ ] Submit creates user
- [ ] User appears in list

### Edit User
- [ ] Click edit button
- [ ] Form prefills with current data
- [ ] Can update fields
- [ ] Can change image
- [ ] Submit updates user
- [ ] List reflects changes

### Delete User
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] User removed when confirmed
- [ ] List updates

---

## 📋 Admin Order Management

### Order List
- [ ] Navigate to orders
- [ ] All customer orders display
- [ ] Filter by status dropdown works
- [ ] Can filter by: pending, confirmed, preparing, ready, delivered, cancelled
- [ ] Sort dropdown works
- [ ] Can sort by date or total
- [ ] Sort order dropdown (asc/desc)
- [ ] Filtering works correctly
- [ ] Sorting works correctly

### Order Details
- [ ] Order ID shown
- [ ] Order date shown
- [ ] Order status shown
- [ ] Order total shown
- [ ] Order notes shown
- [ ] Items listed with details

### Order Status Update
- [ ] Status dropdown present on each order
- [ ] Can change status
- [ ] New status saves
- [ ] Status updates immediately
- [ ] Backend receives status change
- [ ] Invalid transitions handled

---

## 🔒 Security & Access Control

### Protected Routes
- [ ] Logout user
- [ ] Cannot access `/user/*` without login
- [ ] Redirects to login page
- [ ] Cannot access `/admin/*` without login
- [ ] Redirects to login page
- [ ] Cannot access user routes as admin
- [ ] Redirects to admin dashboard
- [ ] Cannot access admin routes as user
- [ ] Redirects to user dashboard

### Token Security
- [ ] Token required for API calls
- [ ] Invalid token rejected
- [ ] Expired token triggers logout
- [ ] Token not in URL
- [ ] Token in localStorage (acceptable)

---

## 📱 Responsive Design Testing

### Mobile (375px)
- [ ] All pages load correctly
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Images scale properly
- [ ] Navigation works
- [ ] Forms are usable
- [ ] Cart updates visible
- [ ] Order display clear

### Tablet (768px)
- [ ] Grid layouts adjust
- [ ] Sidebar collapses (if applicable)
- [ ] Tables are readable
- [ ] Cards stack properly
- [ ] All features work

### Desktop (1920px)
- [ ] Full layout displays
- [ ] Multi-column layouts work
- [ ] Spacing looks balanced
- [ ] No horizontal scrolling
- [ ] All features functional

---

## 🎨 UI/UX Testing

### Visual Design
- [ ] Color scheme consistent
- [ ] Orange and red theme applied
- [ ] Font sizes readable
- [ ] Spacing consistent
- [ ] Borders and shadows present
- [ ] Icons display correctly

### User Feedback
- [ ] Success toasts show
- [ ] Error toasts show
- [ ] Loading spinners display
- [ ] Confirmation dialogs appear
- [ ] Messages are clear

### Navigation
- [ ] Links work correctly
- [ ] Active page highlighted
- [ ] Breadcrumbs display (if used)
- [ ] Back buttons work

---

## ⚡ Performance Testing

### Load Time
- [ ] Home page loads < 2 seconds
- [ ] Food menu loads < 1 second
- [ ] Cart loads instantly
- [ ] Orders page loads < 1 second

### API Calls
- [ ] Fetch foods: ~100ms
- [ ] Create order: ~500ms
- [ ] Update status: ~300ms
- [ ] Upload image: < 2 seconds

### State Management
- [ ] Cart updates instantly
- [ ] No duplicate API calls
- [ ] Context updates propagate
- [ ] localStorage writes succeed

---

## 🐛 Error Handling

### Missing Data
- [ ] No image shows placeholder
- [ ] Missing name shows default
- [ ] Invalid food marked unavailable

### API Errors
- [ ] 404 shows appropriate message
- [ ] 401 redirects to login
- [ ] 403 shows access denied
- [ ] 500 shows error message
- [ ] Network error handled

### Form Errors
- [ ] Empty fields validated
- [ ] Invalid email rejected
- [ ] Password mismatch caught
- [ ] File too large caught
- [ ] Error messages clear

---

## 📊 Data Validation

### Forms
- [ ] Email format validated
- [ ] Password strength checked
- [ ] Confirm password matches
- [ ] Required fields mandatory
- [ ] Numbers only for price
- [ ] Positive quantities

### API Responses
- [ ] Response format validated
- [ ] Data types correct
- [ ] Required fields present
- [ ] Arrays handled properly

---

## 🔄 Browser Compatibility

### Chrome
- [ ] All features work
- [ ] Performance good
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Performance good
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] Images load
- [ ] Forms work

### Edge
- [ ] All features work
- [ ] CSS displays correctly
- [ ] JavaScript runs properly

---

## 💾 LocalStorage Testing

### Cart Persistence
- [ ] Add items to cart
- [ ] Refresh page
- [ ] Cart items still there
- [ ] Quantities preserved
- [ ] Total recalculated

### Auth Persistence
- [ ] Login
- [ ] Refresh page
- [ ] Still logged in
- [ ] User info available
- [ ] Token still valid

### Clear Data
- [ ] Logout clears auth
- [ ] Clear cart works
- [ ] localStorage cleared correctly

---

## ✅ Final Sign-Off

### Before Deployment
- [ ] All tests passed
- [ ] No console errors
- [ ] No network errors
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Responsive on all devices
- [ ] Error handling works
- [ ] Features complete

### Ready to Deploy
- [ ] Build completes successfully
- [ ] No build warnings
- [ ] Environment variables set
- [ ] Backend accessible
- [ ] Ready for production

---

## 📝 Test Notes

### Issues Found & Fixed
```
Issue 1: [Describe any issues found during testing]
Status: [Open/Fixed/Won't Fix]
Notes: [Resolution details]

Issue 2: [Describe]
Status: [Status]
Notes: [Resolution details]
```

### Performance Notes
```
Average Load Time: ____ ms
Average API Response: ____ ms
Bundle Size: ____ KB
Mobile Performance Score: ____ 
```

### Browser Issues
```
Chrome: [Notes]
Firefox: [Notes]
Safari: [Notes]
Edge: [Notes]
```

---

## 🎉 Testing Complete!

Once all checkboxes are marked, your FoodWorld application is ready for production deployment!

**Test Date**: _____________  
**Tester Name**: _____________  
**Status**: ✅ **PASS** / ⚠️ **NEEDS FIXES**  

---

**Thank you for thoroughly testing the FoodWorld application!** 🚀
