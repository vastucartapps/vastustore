# Admin Bookings & Consultations

## Overview
Admin interface for managing Vastu consultation bookings. Features calendar and list views, time slot configuration with day-of-week controls, date blocking, booking detail with customer info and meeting links, status updates, and email sending.

## Components
| Component | Description |
|-----------|-------------|
| `AdminBookings.tsx` | Root component with calendar/list toggle, slot config, booking management |

## Data Shapes
| Type | Description |
|------|-------------|
| `BookingRow` | Booking with customer, type, date/time, status, meeting link |
| `CalendarDay` | Day cell with booking count and blocked status |
| `TimeSlotConfig` | Availability settings (days, times, duration, buffer) |
| `BlockedDate` | Blocked date with reason |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onChangeViewMode` | Admin toggles calendar/list view |
| `onSelectDate` | Admin clicks a date in calendar |
| `onViewBooking` | Admin clicks a booking to view details |
| `onUpdateStatus` | Admin changes booking status |
| `onSetMeetingLink` | Admin sets Zoom/Meet link for booking |
| `onAddNotes` | Admin adds notes to a booking |
| `onSendEmail` | Admin sends confirmation/reminder email |
| `onUpdateSlotConfig` | Admin updates time slot settings |
| `onBlockDate` | Admin blocks a date |
| `onUnblockDate` | Admin unblocks a date |
