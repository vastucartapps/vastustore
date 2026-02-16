# Test Specs: Admin Bookings & Consultations

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Calendar View
**Success Path:**
- Monthly calendar renders with booking dots on dates
- Blocked dates visually distinct
- Today highlighted
- Click date shows that day's bookings
- Toggle to list view via `onChangeViewMode`

### Flow 2: List View
**Success Path:**
- Table: Date/Time, Customer, Type, Duration, Status, Meeting Link, Actions
- Status badges: pending=warning, confirmed=primary, completed=success, cancelled=error

### Flow 3: Booking Detail
**Success Path:**
- Customer info: name, email, phone
- Consultation type, date/time, duration
- Meeting link displayed and copyable
- Status update dropdown triggers `onUpdateStatus`
- Add notes triggers `onAddNotes`
- Send confirmation/reminder email triggers `onSendEmail`

### Flow 4: Time Slot Configuration
**Success Path:**
- Day-of-week toggles enable/disable specific days
- Start/end time pickers set availability window
- Slot duration dropdown (30/45/60 min)
- Buffer between slots configurable
- Max bookings per day limit
- Save triggers `onUpdateSlotConfig`

### Flow 5: Block Dates
**Success Path:**
- Date picker to select blocked date
- Reason input required
- Block triggers `onBlockDate`
- Unblock triggers `onUnblockDate`

## Empty State Tests
- No bookings: calendar empty, list shows "No bookings" message
- No blocked dates: blocked dates section empty

## Edge Cases
- Past bookings shown as completed or cancelled
- Meeting link auto-generation for confirmed bookings
- Calendar simplifies on mobile
- Multiple bookings on same day show count
