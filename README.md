# 🧱 ThStave Block Skeleton

A modern WordPress block-based theme starter powered by:

- 🧩 Custom React blocks
- 💨 Tailwind CSS (v4)
- ⚡ Vite-based block bundling
- 🔄 Live reload support
- 🔐 Security-aware and scalable

---

## 🚀 Getting Started

```
git clone https://github.com/your-org/thstave-theme.git
cd thstave-theme
npm install
npm run build
```

This will:

- Build WordPress assets via @wordpress/scripts
- Bundle React blocks with Vite
- Generate Tailwind CSS output

---

## 🛠 Development


Start the development environment with live rebuilding:

```
npm run start
```

This will:
- 🔁 Watch blocks/ for new or changed files and rebuild using vite
- 💅 Watch src/style.css and recompile Tailwind output
- ⚙️ Optionally run wp-scripts for WP core assets (if modified)

You can now edit or add blocks and see them immediately inside the block editor.

---


## 🧪 Production Build


To create a production-ready version of the theme:

```
npm run build
```

This performs the following in sequence:

- Builds WordPress scripts
- Compiles all React blocks with Vite
- Builds and minifies Tailwind CSS

Resulting assets are placed in:

- dist/ (JS bundles)
- assets/css/tailwind.css (CSS output)

---


## 🧱 Adding a New Block


You can quickly scaffold a new block using the CLI helper:

```
npm run make:block your-block-name
```

This will:

- Create a new folder under blocks/your-block-name/
- Add boilerplate files:
  - block.json
  - editor.jsx
  - frontend.jsx
  - YourBlockName.jsx
- Automatically rebuild your block assets

💡 Afterward, run npm run start and begin editing the block in Gutenberg.

---

##  🏗 Project Structure
Here’s how this theme is organized:

```
thstave-theme/
├── assets/
│   └── css/
│       └── tailwind.css              # Output from Tailwind
├── blocks/
│   └── hero/
│       ├── block.json                # Block metadata
│       ├── editor.jsx                # Editor logic
│       ├── frontend.jsx              # React hydration
│       └── HeroBlock.jsx             # Component
├── dist/                             # Compiled block bundles
├── scripts/
│   ├── build-blocks.js               # Vite bundler for blocks
│   ├── make-block.js                 # CLI generator
│   └── templates/block/              # New block templates
├── src/
│   └── style.css                     # Tailwind entry
├── functions.php                     # WP theme entry
├── register-blocks.php               # Auto-registers all blocks
├── tailwind.config.js                # Tailwind config
├── postcss.config.js                 # PostCSS config
├── package.json                      # NPM scripts and dependencies
└── README.md                         # This file
```

---

## 🔒 Security Tips

- Escape all attribute output in PHP render callbacks
- Use esc_html(), esc_attr(), esc_url()
- Sanitize media inputs and validate image URLs
- Avoid dangerouslySetInnerHTML unless absolutely required
- Use block.json to define and lock attribute types


