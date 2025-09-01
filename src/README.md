# Anshuman Kansana - Portfolio

An interactive portfolio website showcasing full-stack development skills and professional experience.

## Features

- 🎨 Modern dark theme with interactive elements
- 🚀 Smooth scroll animations and parallax effects
- 📱 Fully responsive design
- ⚡ Built with React, TypeScript, and Tailwind CSS v4
- 🎯 Interactive mouse tracking effects
- 🔄 Animated skill progress bars
- 📧 Contact integration

## Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the portfolio

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: CSS animations with Intersection Observer

## Project Structure

```
├── App.tsx                 # Main portfolio component
├── src/
│   └── main.tsx            # React entry point
├── components/
│   ├── ui/                 # Reusable UI components
│   └── figma/              # Figma-specific components
├── styles/
│   └── globals.css         # Global styles and Tailwind config
└── public/                 # Static assets
```

## Customization

### Updating Personal Information

Edit the data arrays in `App.tsx`:

- `skills` - Add/modify technical skills
- `projects` - Showcase your projects
- `experiences` - Update work experience
- Contact links and personal details

### Styling

The portfolio uses Tailwind CSS v4 with custom CSS variables defined in `styles/globals.css`. You can modify colors, animations, and layout by updating these files.

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contact

- Email: anshumankansana@gmail.com
- GitHub: https://github.com/anshumankansana
- LinkedIn: https://linkedin.com/in/AnshumanKansana

## License

This project is open source and available under the MIT License.