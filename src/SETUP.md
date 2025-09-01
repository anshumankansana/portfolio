# Local Development Setup

Follow these steps to run your portfolio website locally:

## Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Setup Instructions

### 1. Navigate to your project directory
```bash
cd /path/to/your/portfolio
```

### 2. Install dependencies
```bash
npm install
```

This will install all the required packages including:
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS v4
- Lucide React (icons)
- ESLint (code linting)

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in browser
Your portfolio will be available at:
```
http://localhost:5173
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

## File Structure Overview

```
your-portfolio/
├── App.tsx                 # Main portfolio component
├── src/main.tsx           # React app entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── styles/globals.css     # Tailwind CSS and global styles
├── components/            # Reusable components
└── public/                # Static assets
```

## Troubleshooting

### Port already in use
If port 5173 is busy, Vite will automatically try the next available port (5174, 5175, etc.)

### Dependencies not installing
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### TypeScript errors
Make sure all files are saved and try restarting the development server:
```bash
# Stop server with Ctrl+C
npm run dev
```

### Build issues
For production build problems:
```bash
npm run build
npm run preview
```

## Next Steps

Once your portfolio is running locally:

1. **Customize content** - Update personal info, projects, and experience in `App.tsx`
2. **Modify styling** - Edit colors and animations in `styles/globals.css`
3. **Add new features** - Create components in the `components/` directory
4. **Deploy** - Build for production and deploy to Vercel, Netlify, or GitHub Pages

## Need Help?

- Check the console for any error messages
- Ensure all files are saved before testing
- Verify Node.js version: `node --version`
- Make sure you're in the correct directory

The portfolio should load with all animations, responsive design, and interactive elements working perfectly!