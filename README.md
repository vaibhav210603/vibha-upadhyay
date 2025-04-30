# Vibha Upadhyay Portfolio Website

A modern, responsive portfolio website for Vibha Upadhyay, featuring her expertise in numerology and astrology.

## Features

- Clean and modern design
- Responsive layout
- Login/Signup functionality
- Appointment booking system
- Photo gallery slider
- Smooth animations and transitions

## Technologies Used

- React
- Material-UI
- React Router
- Framer Motion
- React Slick
- Date-fns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mummy-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── App.jsx        # Main application component
  └── index.css      # Global styles
```

## Adding Photos

To add photos to the slider:
1. Place your images in the `public/photos` directory
2. Update the `photos` array in `src/pages/Home.jsx` with your image paths

## Deployment

The website can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## License

This project is licensed under the MIT License.
