# Personal Finance App 🚀

## Overview
Modern, responsive personal finance dashboard built with React, Vite, Material-UI, and Recharts. Features role-based access, real-time analytics, and full CRUD operations for financial entries.

## Features
- 📊 Interactive charts (trend analysis, spending breakdown)
- 🔄 Role system (Owner: full CRUD | Guest: read-only)
- 📱 Fully responsive design
- 💾 Local storage persistence
- 📈 Smart insights & analytics
- 🔍 Advanced filtering & sorting
- 📤 CSV export
- 🌙 Dark/light mode toggle
- ⚡ Smooth animations (Framer Motion)

## Tech Stack
```
Frontend: React 18 + Vite
UI: Material-UI 5
Charts: Recharts
State: React Context API
Animations: Framer Motion
Icons: Material Icons
```

## Quick Setup
```bash
cd personal-finance-app
npm install
npm run dev
```

## Project Structure
```
src/
├── views/           # Main pages
├── components/      # Reusable UI components
│   ├── overview/    # Dashboard components
│   ├── entries/     # Transaction management
│   ├── navigation/  # Layout components  
│   ├── shared/      # Common utilities
│   └── primitives/  # Low-level UI
├── context/         # Global state management
└── utils/           # Helper functions
```

## Usage
1. **Owner Mode**: Full access - Add, edit, delete entries
2. **Guest Mode**: Read-only - View analytics & data only
3. Switch roles using sidebar toggle
4. Use filters for advanced data analysis
5. Export data as CSV

## Key Components
- `FinanceContext` - Central state management
- `EntryList` - Full-featured data table
- `TrendChart` & `SpendBreakdown` - Visual analytics
- `Analytics` - AI-powered insights
- `AccessToggle` - Role switching

Built for optimal performance and scalability. Enjoy tracking your finances! 💰
