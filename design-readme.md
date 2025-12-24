# Lumière Café - Design System Quick Reference

> **Quick-start guide for designers and developers**  
> For the complete design specification, see [`design.txt`](./design.txt)

---

## 🎨 Brand Identity

**Theme:** Warm, welcoming café aesthetic with amber/gold accents and calm neutrals.

---

## 🎯 Core Color Tokens

### Primary Colors (Amber/Gold)
| Token | Value | Usage |
|-------|-------|-------|
| `primary-500` | `#f59e0b` | Main accent, highlights |
| `primary-600` | `#d97706` | Hover states |
| `primary-700` | `#b45309` | Buttons, CTA elements |
| `primary-800` | `#92400e` | Active states |

### Secondary Colors (Teal)
| Token | Value | Usage |
|-------|-------|-------|
| `secondary-500` | `#14b8a6` | Secondary accents |
| `secondary-600` | `#0d9488` | Secondary hover |
| `secondary-700` | `#0f766e` | Secondary emphasis |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#16a34a` | Success messages, confirmations |
| `danger` | `#dc2626` | Errors, destructive actions |
| `warning` | `#f59e0b` | Warning states |
| `muted` | `#6b7280` | Subtle text, placeholders |

### Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| `bg-light` | `#fff7ed` | Warm cream background |
| `bg-card` | `#ffffff` | Card backgrounds |
| `bg-dark` | `#1f2937` | Dark mode background |

---

## 📝 Typography

### Font Families
```css
/* Headings */
font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;

/* Body */
font-family: 'Montserrat', 'Inter', system-ui, sans-serif;
```

### Type Scale
| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Small text, metadata |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Lead paragraphs |
| `text-xl` | 20px | Subheadings |
| `text-2xl` | 24px | Section headers |
| `text-3xl` | 30px | Page titles |
| `text-4xl` | 36px | Hero text |

---

## 📐 Spacing Scale

Use Tailwind's spacing system. Preferred multiples:

| Class | Value | Usage |
|-------|-------|-------|
| `p-2` | 0.5rem | Tight padding |
| `p-4` | 1rem | Standard padding |
| `p-6` | 1.5rem | Comfortable padding |
| `p-8` | 2rem | Generous padding |
| `gap-4` | 1rem | Standard grid gap |
| `gap-6` | 1.5rem | Comfortable grid gap |

---

## 🔲 Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 0.125rem | Subtle rounding |
| `rounded` | 0.25rem | Default buttons |
| `rounded-md` | 0.375rem | Cards |
| `rounded-lg` | 0.5rem | Large cards, modals |
| `rounded-full` | 9999px | Avatars, pills |

---

## 🌫️ Shadows

| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle cards |
| `shadow` | Default elevation |
| `shadow-md` | Elevated components |
| `shadow-lg` | Modals, dropdowns |
| `shadow-xl` | Prominent overlays |

---

## 🔘 Button Classes

```html
<!-- Primary Button -->
<button class="btn-primary">Order Now</button>

<!-- Secondary Button -->
<button class="btn-secondary">Learn More</button>

<!-- Outline Button -->
<button class="btn-outline">Cancel</button>

<!-- Ghost Button -->
<button class="btn-ghost">View Details</button>
```

### Button Sizes
```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Default</button>
<button class="btn-primary btn-lg">Large</button>
```

---

## 🃏 Card Component

```html
<div class="card">
  <img class="w-full h-40 object-cover rounded-md" 
       src="/assets/image.webp" 
       alt="Description" 
       loading="lazy" />
  <div class="p-4">
    <h3 class="font-semibold">Card Title</h3>
    <p class="text-sm text-muted">Card description text.</p>
  </div>
</div>
```

---

## 📱 Breakpoints

| Prefix | Width | Usage |
|--------|-------|-------|
| (none) | < 640px | Mobile |
| `sm:` | ≥ 640px | Large mobile |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Large desktop |
| `2xl:` | ≥ 1536px | Extra large |

### Responsive Example
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Cards -->
</div>
```

---

## 🌙 Dark Mode

Enable with the `dark` class on a parent element:

```html
<html class="dark">
  <!-- Dark mode enabled -->
</html>
```

### Dark Mode Utilities
```html
<div class="bg-white dark:bg-gray-800">
  <p class="text-gray-900 dark:text-gray-100">
    Adaptive content
  </p>
</div>
```

---

## ♿ Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Form inputs have visible labels
- [ ] Focus states are clearly visible
- [ ] Use semantic HTML elements
- [ ] ARIA labels on icon-only buttons

---

## 🖼️ Image Guidelines

| Type | Format | Max Size |
|------|--------|----------|
| Photos | WebP | 200KB |
| Icons | SVG | 10KB |
| Hero Images | WebP | 500KB |

### Responsive Images
```html
<img 
  src="/assets/menu/latte.webp" 
  alt="Caffe Latte with latte art"
  loading="lazy"
  class="w-full h-auto object-cover"
/>
```

---

## 🚀 Quick Start

1. **Colors:** Use `primary-*`, `secondary-*`, `accent-*` tokens
2. **Typography:** Headings use serif, body uses sans-serif
3. **Spacing:** Prefer multiples of 4 (`p-4`, `gap-4`, etc.)
4. **Components:** Use `.btn-*` and `.card` classes
5. **Responsive:** Mobile-first, then add `sm:`, `md:`, `lg:` prefixes

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| [`tailwind.config.js`](./client/tailwind.config.js) | Tailwind theme customization |
| [`src/index.css`](./client/src/index.css) | Global styles & CSS variables |
| [`design.txt`](./design.txt) | Complete design specification |
| [`details.txt`](./details.txt) | Technical feature reference |

---

*Generated: December 2025*  
*Lumière Café CMS Design System v1.0*
