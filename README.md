# Clothing Store SPA
> A Single Page Application for a modern clothing storefront written with HTML, Tailwind CSS, and JS

**Live demo:** https://abois526.github.io/clothing-site-spa

<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#description">Description</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#repo-structure">Repo Structure</a></li>
    <li><a href="#skills-highlighted">Skills Highlighted</a></li>
    <li><a href="#credits">Credits</a></li>
  </ol>
</details>

## Description
This site is a client-side Single Page Application that simulates a modern clothing storefront. The project has been built with HTML, Tailwind CSS, and JavaScript. The scripting has been completed without relying on any external libraries or frameworks. 

## Features
- Dynamic content rendering using HTML `<template>` elements
- SPA navigation via router using `data-route` attributes
- Category landing pages for Men’s and Women’s collections
- Browse view with live filters (gender, category, size, color) and sorting options
- Single Product view product details and related products section
- Interactive shopping cart that simulates order calculations
- Fetch API used to retrieve product info and imagery from external APIs, then cached within LocalStorage for faster subsequent loading when revisiting the site.
- Animations (cart badge, hero images, header text, snackbar, loading state)

## Repo Structure
- `assets/` - images, videos, and favicon
- `css/` - Tailwind output and styling
- `js/` - JavaScript modules
  - `components/` - reusable UI components for rendering
  - `services/` - handles data fetching, caching, cart functionality 
  - `utils/` - helper functions for DOM manipulation, sorting, rendering, animations
  - `views/` - logic for rendering each top-level page of the SPA
  - `app.js` - bootstraps the app by loading cached data or fetching and persisting when needed, mapping images to the product data, and initializing the router
  - `router.js` - lightweight SPA router
- `index.html` - base layout, hidden views, templates for cloning for content rendering

## Skills Highlighted
- Modular JavaScript architecture and ES module usage
- Client‑side routing and view rendering
- Dynamic DOM creation with HTML templates
- State management and persistence with LocalStorage
- Asynchronous data fetching with `fetch` and `Promise.all`
- UI/UX design (loading states, animations, visual feedback)
- Tailwind CSS styling
- Data transformation and filtering logic