# Test Specs: Admin Customer Management

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Customer List
**Success Path:**
- Table renders: Avatar+Name, Email, Phone, Orders, Lifetime Value, Segment badge, Joined
- Search by name, email, or phone filters results
- Segment pills filter (All, New, Repeat, Inactive, High Value)
- Sort by name, total orders, lifetime value, or join date

### Flow 2: Customer Detail
**Success Path:**
- Back button returns to list
- Profile header shows avatar, name, email (verified badge), phone
- Stats row: Total Orders, Lifetime Value, Avg Order, Loyalty Points
- Recent orders table (last 5) with status badges
- Click order triggers `onViewOrder`
- Addresses shown as compact cards
- Reviews list with star rating, product name, excerpt

### Flow 3: Admin Notes
**Success Path:**
- Notes section shows existing notes with author and timestamp
- Add note input and submit triggers `onAddNote`

## Empty State Tests
- No customers: table shows empty state
- No orders for customer: orders section shows message
- No reviews for customer: reviews section hidden or empty
- No notes: notes section shows "No notes yet"

## Edge Cases
- Customer with multiple segments shows all badges
- High lifetime value formatting with currency symbol
- Customer with no avatar shows initials placeholder
- Detail sections stack on mobile
- Sort direction toggles between asc and desc
