# Items Display App

A React + TypeScript + Redux application for displaying items from a REST API with Material UI components.

## Project Structure

```
src/
├── components/
│   ├── ItemCard.tsx        # Individual item card component
│   ├── ItemDetail.tsx      # Detailed view of selected item
│   └── ItemList.tsx        # Table listing of all items
├── services/
│   └── api.ts              # API service for backend communication
├── store/
│   ├── itemsSlice.ts       # Redux slice for items state
│   └── store.ts            # Redux store configuration
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main application component
├── App.css                 # App-level styles
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Features

- **Redux State Management**: Uses Redux Toolkit for predictable state management
- **Material UI Components**: Responsive UI built with Material-UI
- **Items Table**: Left panel table showing GUID, name, and path with clickable rows
- **Detail Panel with Tabs**: Right panel contains tabs for Properties and Image views
- **Item Details**: View detailed information in an organized layout
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Mobile-friendly layout

## Prerequisites

- Node.js 18+ 
- Java 17+ (for backend)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure the backend is running on `http://localhost:8080`:
```bash
java -jar test-0.0.1-SNAPSHOT.jar
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Building

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

Run unit tests:
```bash
npm run test
```

## API Endpoints

The application expects the backend to provide:

- `GET /items` - Returns array of items with structure:
  ```json
  {
    "guid": "string",
    "name": "string",
    "path": ["segment1","segment2"],
    "properties": {"key":"value", ...}
  }
  ```
- `GET /image/{guid}` - Returns image for the specified item GUID

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Redux Toolkit**: State management
- **Material-UI (MUI)**: Component library
- **Axios**: HTTP client
- **Vite**: Build tool and dev server
- **Vitest**: Unit testing framework

## Key Features Implemented

### Redux Integration
- Centralized state management for items list and selected item
- Actions for loading, error handling, and item selection
- Type-safe reducers using Redux Toolkit

### Component Architecture
- **Separation of Concerns**: Each component has a single responsibility
- **Reusable Components**: ItemCard can be used in both list and detail views
- **Props-based API**: Components accept data through props for flexibility

### UI/UX
- Tab navigation to browse items while preserving state
- Grid layout for responsive display
- Smooth transitions and hover effects
- Error handling with alert messages
- Loading states with spinner

### Styling
- Global styles in `index.css`
- Component-scoped styles in separate CSS files
- Material-UI theming for consistent design
- Responsive breakpoints for mobile/tablet/desktop
