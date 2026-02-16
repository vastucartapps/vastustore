# Admin Category Management

## Overview
Admin interface for managing the product category hierarchy. Features a two-panel layout with an expandable/collapsible tree on the left and category details on the right. Category editing opens a full-page form with image upload, SEO fields, parent selection, and display order controls.

## Components
| Component | Description |
|-----------|-------------|
| `AdminCategoryManagement.tsx` | Root two-panel layout with tree and detail |
| `CategoryTree.tsx` | Left panel expandable/collapsible category tree |
| `CategoryDetail.tsx` | Right panel showing selected category info |
| `CategoryForm.tsx` | Full-page form for adding/editing categories |

## Data Shapes
| Type | Description |
|------|-------------|
| `Category` | Tree node with name, slug, image, parent, children, SEO, product count |
| `CategoryOption` | Flat option for parent dropdown with depth |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onSelectCategory` | Admin clicks a category in the tree |
| `onAddCategory` | Admin clicks "Add Category" |
| `onEditCategory` | Admin clicks edit on a category |
| `onDeleteCategory` | Admin deletes a category (with reassignment) |
| `onToggleStatus` | Admin toggles active/inactive from tree |
| `onReorder` | Admin reorders categories within same level |
| `onSaveCategory` | Admin saves category form |
| `onImageUpload` | Admin uploads a category image |
