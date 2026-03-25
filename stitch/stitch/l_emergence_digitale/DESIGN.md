# Design System Documentation: Institutional Intelligence

## 1. Overview & Creative North Star
**Creative North Star: "The Sovereign Monolith"**

This design system moves beyond the generic "SaaS dashboard" aesthetic to establish a visual language of digital sovereignty, trust, and Gabonese institutional pride. The "Sovereign Monolith" represents a system that is stable and authoritative yet transparent and accessible. 

To break the "template" look, we utilize **Intentional Asymmetry** and **Editorial Spacing**. Large `display-lg` typography is often offset against generous white space (using `spacing-24`), creating an interface that feels like a high-end government periodical rather than a cluttered app. We replace rigid structural lines with layered tonal depth, ensuring the UI feels "built" rather than "drawn."

---

## 2. Colors & Surface Philosophy

The palette is rooted in a professional `surface` base, with the Gabon flag colors acting as sophisticated accents rather than dominant blocks.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   **The Method:** Define boundaries through background shifts. A `surface-container-low` section should sit directly on a `surface` background. The transition between these two hex codes is the "line."
*   **The Goal:** To create a seamless, high-end "editorial" flow that feels cohesive and expansive.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Base:** `surface` (#f8fafb)
*   **Secondary Content:** `surface-container-low` (#f2f4f5)
*   **Elevated Cards:** `surface-container-lowest` (#ffffff)
*   **Interactive Inputs:** `surface-container-high` (#e6e8e9)

### The "Glass & Gradient" Rule
To add "soul" to the institutional sobriety:
*   **Hero Areas:** Use a subtle linear gradient from `primary` (#165ca9) to `primary-container` (#3a75c4) at a 135-degree angle.
*   **Floating Navigation:** Utilize Glassmorphism. Apply `surface` with 80% opacity and a `backdrop-blur` of 20px. This ensures the Gabon-inspired accents bleed through the chrome, softening the interface.

---

## 3. Typography: The Voice of Authority

We pair **Manrope** (Display/Headline) for institutional strength with **Inter** (Body/Labels) for technical clarity.

| Role | Token | Font | Size | Weight/Style |
| :--- | :--- | :--- | :--- | :--- |
| **Institutional Statement** | `display-lg` | Manrope | 3.5rem | Bold, Tight Tracking (-0.02em) |
| **Section Header** | `headline-md` | Manrope | 1.75rem | Medium |
| **Primary Reading** | `body-lg` | Inter | 1rem | Regular, Leading 1.6 |
| **Technical Metadata** | `label-md` | Inter | 0.75rem | Medium, All Caps (+0.05em tracking) |

**Hierarchy Note:** Use `tertiary` (#715c00) sparingly for `label-sm` elements to highlight "Urgent" or "Official" status markers, echoing the Sun Yellow of the national flag without sacrificing legibility.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are largely replaced by the **Layering Principle**.

*   **Tonal Stacking:** Instead of shadows, place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "soft lift" that is easier on the eyes for long-form administrative tasks.
*   **Ambient Shadows:** For floating elements (Modals/Chat Bubbles), use an extra-diffused shadow: `offset-y: 8px, blur: 32px, color: rgba(25, 28, 29, 0.06)`. This mimics natural Gabonese sunlight—soft and pervasive rather than harsh and artificial.
*   **Ghost Borders:** If accessibility requires a stroke (e.g., High Contrast Mode), use `outline-variant` (#c2c6d3) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Modern Chat Bubbles (The Assistant)
*   **User Bubble:** `primary` background with `on-primary` text. `rounded-xl` (1.5rem) but with the bottom-right corner set to `rounded-sm`.
*   **ASI Response:** `surface-container-highest` background. No border. Use `spacing-4` padding.
*   **Contextual Elevation:** Responses should have a subtle `primary` glow (2% opacity) to signify the AI's active presence.

### Interactive Suggestion Chips
*   **Style:** `surface-container-lowest` with a `Ghost Border`. 
*   **Hover State:** Transition to `secondary-container` (#7bf7b0) to subtly introduce the Forest Green of Gabon, signaling growth and progression.
*   **Shape:** `rounded-full`.

### Institutional Input Fields
*   **Structure:** No bottom-line only inputs. Use a solid `surface-container-high` block with `rounded-md`.
*   **Focus State:** A 2px "Ghost Border" of `primary` (#165ca9) with a 4px outer glow of the same color at 10% opacity.

### Navigation & Lists
*   **The Divider Ban:** Do not use horizontal rules (`<hr>`). Use `spacing-6` (2rem) of vertical whitespace or a background shift to `surface-container-low` to separate list items.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use `spacing-16` or `spacing-20` for page margins to give the content "Institutional Breathing Room."
*   **DO** use `secondary` (#006d40) for success states and "Approved" administrative statuses.
*   **DO** align text to a strict baseline grid to maintain the "Editorial" feel.

### Don’t
*   **DON'T** use pure black (#000000). Always use `on-surface` (#191c1d) to maintain tonal softness.
*   **DON'T** use "Startup" roundedness (e.g., 40px+ on everything). Stick to the `xl` (1.5rem) limit for cards to maintain a sober, professional structure.
*   **DON'T** use high-saturation gradients. Gradients should be "Atmospheric"—barely perceptible transitions between two similar tonal values.