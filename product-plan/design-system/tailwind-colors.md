# Tailwind Color Configuration

## Custom Color Palette

VastuCart uses a custom color palette — NOT standard Tailwind colors. Configure your Tailwind theme:

### Primary — Deep Teal
- `primary-50`: #e8f5f3
- `primary-100`: #c5e8e2
- `primary-200`: #71c1ae
- `primary-300`: #4a9a8d
- `primary-400`: #2a7a72
- `primary-500`: #013f47 (main)
- `primary-600`: #054348
- `primary-700`: #084b49

### Secondary — Burnt Saffron
- `secondary-50`: #fff5ed
- `secondary-100`: #ffc187
- `secondary-300`: #fd8630
- `secondary-500`: #c85103 (main)

### Background
- `bg-primary`: #fffbf5 (cream)
- `bg-card`: #ffffff
- `bg-subtle`: #f5dfbb

### Earth Neutrals (warm browns for text/borders)
- `earth-300`: #a39585
- `earth-400`: #75615a
- `earth-500`: #71685b
- `earth-600`: #5a4f47
- `earth-700`: #433b35

## Forbidden Colors

NEVER use: indigo, blue, purple, violet, fuchsia, sky, cyan

## Signature Pattern

Gradient accent border on cards:
```css
background: linear-gradient(white, white) padding-box, linear-gradient(90deg, #013f47, #2a7a72, #c85103) border-box;
border-top: 4px solid transparent;
```
