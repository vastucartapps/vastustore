# Milestone 15 — Admin: Bookings & Consultations

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend (Medusa v2 APIs + Supabase)
- Implement loading, error, and empty states
- Every touch point must be functional — no dead buttons, no hardcoded data

The components are props-based — they accept data and fire callbacks. Wire them to Medusa v2 APIs, Supabase auth, and your state management.

---

## Overview

Admin interface for managing Vastu consultation bookings. Features a calendar/list view toggle for upcoming bookings, time slot configuration (day-of-week toggles, time pickers, duration, buffer, max per day), date blocking, booking detail with customer info and meeting links, status workflow (pending -> confirmed -> completed / cancelled), and auto-generated Zoom/Google Meet links.

## Key Functionality

- Toggle between Calendar View and List View for bookings
- Calendar shows monthly view with booking count dots on dates; click a date to see that day's bookings
- List view shows a table with date/time, customer, type, duration, status, meeting link, actions
- View booking detail: customer name/email/phone, consultation type, scheduled date/time, duration, meeting link (copyable), admin notes, status dropdown
- Update booking status through the workflow: pending -> confirmed -> completed, or cancel at any point
- Auto-generate or manually paste Zoom/Google Meet links for confirmed bookings
- Send confirmation or reminder emails to customers
- Configure available time slots: day-of-week toggles, start/end time, slot duration (30/45/60 min), buffer between slots, max bookings per day
- Block specific dates with a reason

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminBookings` | Root component with calendar/list views, booking detail, slot config, date blocking |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `bookings` | `BookingRow[]` | Array of booking records |
| `calendarDays` | `CalendarDay[]` | Calendar grid data with booking counts and blocked status |
| `slotConfig` | `TimeSlotConfig` | Current time slot configuration |
| `blockedDates` | `BlockedDate[]` | List of blocked dates |
| `selectedDate` | `string \| null` | Currently selected date on calendar |
| `viewMode` | `'calendar' \| 'list'` | Current view mode |

### Key Types

```ts
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
type ConsultationType = 'vastu_home' | 'vastu_office' | 'vastu_plot' | 'general'
type SlotDuration = 30 | 45 | 60
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

interface BookingRow {
  id: string; customerName: string; customerEmail: string; customerPhone: string
  consultationType: ConsultationType; date: string; startTime: string; endTime: string
  duration: SlotDuration; status: BookingStatus; meetingLink: string | null; notes: string
}

interface CalendarDay {
  date: string; bookingCount: number; isBlocked: boolean; isToday: boolean
}

interface TimeSlotConfig {
  enabledDays: DayOfWeek[]; startTime: string; endTime: string
  slotDuration: SlotDuration; bufferMinutes: number; maxBookingsPerDay: number
}

interface BlockedDate { id: string; date: string; reason: string }
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeViewMode` | `(mode) => void` | Local state toggle |
| `onSelectDate` | `(date) => void` | Filter bookings for selected date, update calendar |
| `onViewBooking` | `(bookingId) => void` | Fetch booking detail from Supabase |
| `onUpdateStatus` | `(bookingId, status) => void` | Update booking status in Supabase, trigger email if confirming |
| `onSetMeetingLink` | `(bookingId, link) => void` | Save meeting link; if empty, auto-generate via Zoom/Google Meet API |
| `onAddNotes` | `(bookingId, notes) => void` | Save admin notes to Supabase |
| `onSendEmail` | `(bookingId, type) => void` | Trigger confirmation/reminder email via notification service |
| `onUpdateSlotConfig` | `(config) => void` | Save slot configuration to Supabase |
| `onBlockDate` | `(date, reason) => void` | Add blocked date to Supabase |
| `onUnblockDate` | `(blockedDateId) => void` | Remove blocked date from Supabase |

## User Flows

### Flow 1: Review and Confirm a Booking

1. Admin opens Bookings page in Calendar View
2. Sees dots on dates with pending bookings; clicks a date with 2 bookings
3. Day's bookings appear below the calendar
4. Clicks on a pending booking to see detail: customer info, consultation type (Vastu Home), scheduled time
5. Clicks "Generate Meeting Link" — system creates a Zoom/Google Meet link and saves it
6. Updates status from "pending" to "confirmed"
7. Clicks "Send Confirmation Email"
8. **Outcome:** Booking confirmed, meeting link generated, customer notified via email

### Flow 2: Configure Available Time Slots

1. Admin opens the Time Slot Configuration panel
2. Toggles on Monday through Friday, disables Saturday and Sunday
3. Sets start time to 10:00, end time to 18:00
4. Selects 45-minute slot duration with 15-minute buffer
5. Sets max 6 bookings per day
6. Clicks Save
7. **Outcome:** Configuration saved to Supabase, customer-facing booking calendar reflects new availability

### Flow 3: Block a Holiday Date

1. Admin opens the Block Dates section
2. Selects a date (e.g., Diwali) from the date picker
3. Enters reason: "Diwali Holiday"
4. Clicks Block
5. **Outcome:** Date marked as blocked in calendar view (visually distinct), no bookings accepted for that date

### Flow 4: Complete a Consultation

1. Admin switches to List View to see all bookings
2. Filters to see confirmed bookings
3. After consultation is done, clicks on the booking and changes status to "completed"
4. Adds notes: "Recommended NE corner corrections for kitchen placement"
5. **Outcome:** Booking archived as completed with consultation notes for future reference

## Empty States

| State | Message |
|-------|---------|
| No bookings | "No consultations booked yet. Bookings will appear here once customers schedule consultations." |
| No bookings on selected date | "No bookings scheduled for this date." |
| No blocked dates | "No dates are currently blocked." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-bookings-and-consultations/spec.md` |
| Types | `product/sections/admin-bookings-and-consultations/types.ts` |
| Sample Data | `product/sections/admin-bookings-and-consultations/data.json` |
| Components | `src/sections/admin-bookings-and-consultations/components/` |

## Done When

- [ ] Calendar view renders months with booking count dots on dates from Supabase
- [ ] Clicking a date filters and shows that day's bookings
- [ ] List view shows all bookings in a sortable/filterable table
- [ ] Booking detail displays customer info, consultation type, time, meeting link, notes
- [ ] Status updates (pending -> confirmed -> completed / cancelled) persist to Supabase
- [ ] Meeting link generation integrates with Zoom or Google Meet API (or manual paste works)
- [ ] Copy-to-clipboard works on meeting links
- [ ] Send email triggers real confirmation/reminder emails
- [ ] Time slot configuration saves and is used by the customer-facing booking flow
- [ ] Block/unblock dates persists to Supabase and prevents customer bookings
- [ ] Status badges use correct colors: pending=warning, confirmed=primary, completed=success, cancelled=error
- [ ] Loading states shown while fetching bookings
- [ ] Error handling for failed API calls
- [ ] Empty states render appropriately
- [ ] Calendar simplifies on mobile; cards stack responsively
- [ ] Dark mode renders correctly
