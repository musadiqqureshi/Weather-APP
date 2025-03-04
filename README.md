# Twin Cities Explorer

A modern web application for exploring UK cities and their international twin cities, featuring interactive maps, weather information, and community engagement.

![Twin Cities Explorer](https://raw.githubusercontent.com/musadiqqureshi/Weather-APP/main/generated-icon.png)

## Features

- 🌍 **City Exploration**: Search and discover UK cities and their twin cities worldwide
- 🗺️ **Interactive Maps**: Visual representation of cities and their points of interest
- ⛅ **Weather Information**: Current weather conditions for each city
- 🏛️ **Places of Interest**: Discover landmarks, museums, and other attractions
- 💬 **Community Comments**: Share and read experiences about different cities
- 📱 **Responsive Design**: Beautiful experience across all devices

## Tech Stack

- **Frontend**: React, TailwindCSS, shadcn/ui, Framer Motion
- **Backend**: Express.js
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Data Storage**: In-memory storage (ready for PostgreSQL integration)
- **Type Safety**: TypeScript, Zod

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and helpers
│   │   └── App.tsx       # Main application component
├── server/
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage implementation
└── shared/
    └── schema.ts         # Shared types and schemas
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type-check TypeScript

## License

This project is open source and available under the [MIT License](LICENSE).