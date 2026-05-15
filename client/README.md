# aldex Energies - Full-Stack Admin Dashboard

A comprehensive MERN stack admin dashboard application for energy sector business management with Indian market data and analytics.

## Overview

aldex Energies is a modern, responsive admin dashboard built with React, Node.js, Express, and MongoDB. The application provides comprehensive business analytics, customer management, product tracking, and sales insights specifically tailored for the Indian energy market.

## Features

### Dashboard
- **Real-time Analytics**: Daily, monthly, and yearly sales metrics
- **Customer Insights**: Total customers, sales trends, and performance indicators
- **Interactive Charts**: Nivo.js powered visualizations for data representation
- **Indian Market Data**: Pre-populated with realistic Indian business data

### Core Modules
- **Products Management**: 21 Indian energy products with statistics
- **Customer Management**: Indian customer database with detailed profiles
- **Transaction Tracking**: Complete transaction history and analytics
- **Sales Analytics**: Overview, monthly, and breakdown views
- **Admin Panel**: User management and system administration

### Technical Features
- **Light Theme**: Modern, clean interface with consistent color scheme
- **Responsive Design**: Mobile-friendly layout
- **Data Grids**: Advanced filtering, sorting, and search capabilities
- **API Integration**: RESTful API with Redux Toolkit Query
- **Database**: MongoDB with Mongoose ODM

## Technology Stack

### Frontend
- **React 18.2.0**: Modern React with hooks
- **Material-UI 5.10.15**: Component library and theming
- **Redux Toolkit**: State management and API queries
- **React Router**: Client-side routing
- **Nivo.js**: Data visualization and charts
- **React Date Picker**: Date selection components

### Backend
- **Node.js**: JavaScript runtime
- **Express 4.18.2**: Web framework
- **MongoDB 6.7.3**: NoSQL database
- **Mongoose**: Object Document Mapper
- **Dotenv**: Environment variable management
- **Morgan**: HTTP request logger
- **Helmet**: Security middleware

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Environment Setup
1. Clone the repository
2. Navigate to the server directory
3. Create `.env` file in server folder:
   ```
   MONGO_URL=your_mongodb_connection_string
   PORT=9000
   ```

### Installation Commands

#### Server Setup
```bash
# Navigate to server directory
cd server

# Install server dependencies
npm install

# Start server in development mode
npm run dev

# Or start in production mode
npm start
```

#### Client Setup
```bash
# Navigate to client directory
cd client

# Install client dependencies
npm install

# Start client in development mode
npm start

# Build for production
npm run build
```

### Quick Start Guide

**Step 1: Start the Backend Server**
```bash
# Terminal 1
cd server
npm run dev
```
Server will start on http://localhost:9000

**Step 2: Start the Frontend Client**
```bash
# Terminal 2
cd client
npm start
```
Client will start on http://localhost:3000

**Step 3: Access the Application**
- Open http://localhost:3000 in your browser
- The application will automatically seed with Indian business data

## Application Structure

### Frontend Structure
```
client/src/
|-- components/          # Reusable UI components
|   |-- Sidebar.jsx     # Navigation sidebar
|   |-- Navbar.jsx       # Top navigation bar
|   |-- Header.jsx       # Page headers
|   |-- DataGridCustomToolbar.jsx
|   |-- FlexBetween.jsx
|-- scenes/              # Page components
|   |-- dashboard/       # Main dashboard
|   |-- products/        # Product management
|   |-- customers/       # Customer management
|   |-- transactions/    # Transaction tracking
|   |-- overview/        # Sales overview
|   |-- monthly/         # Monthly analytics
|   |-- breakdown/       # Sales breakdown
|   |-- admin/           # Admin panel
|   |-- performance/     # Performance metrics
|-- state/               # Redux store and API
|   |-- api.js           # API definitions
|   |-- index.js         # Store configuration
|-- theme.js             # Material-UI theme configuration
|-- App.js               # Main application component
```

### Backend Structure
```
server/
|-- controllers/         # Route controllers
|   |-- client.js        # Client data endpoints
|   |-- general.js       # General endpoints
|   |-- management.js    # Management endpoints
|   |-- sales.js         # Sales endpoints
|-- data/               # Sample data and seeding
|   |-- index.js         # Default data
|   |-- indian-data.js   # Indian market data
|-- models/             # MongoDB models
|   |-- Product.js
|   |-- ProductStat.js
|   |-- Transaction.js
|   |-- User.js
|   |-- OverallStat.js
|   |-- AffiliateStat.js
|-- routes/             # API routes
|   |-- client.js
|   |-- general.js
|   |-- management.js
|   |-- sales.js
|-- index.js            # Server entry point
|-- .env                # Environment variables
```

## API Endpoints

### General
- `GET /general/dashboard` - Dashboard statistics
- `GET /general/products` - Product data

### Client Data
- `GET /client/customers` - Customer information
- `GET /client/transactions` - Transaction data
- `GET /client/products` - Product catalog

### Management
- `GET /management/admins` - Admin users
- `GET /management/performance/:id` - User performance

### Sales
- `GET /sales/sales` - Sales analytics

## Data Features

### Pre-populated Indian Data
- **10 Indian Customers** with realistic profiles
- **21 Energy Products** with categories (clothing, food, sports, home, accessories)
- **Complete Transaction History** with Indian pricing
- **Sales Statistics** for 2024 with monthly breakdowns
- **Product Performance Metrics** with yearly and monthly data

### Currency & Localization
- USD currency display ($)
- Indian city names and customer data
- Localized product descriptions
- Indian business context throughout

## Available Scripts

### Client Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Server Scripts
```bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
```

## Access URLs

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:9000
- **Database**: MongoDB (configured in .env)

## Development Notes

### Database Seeding
The application automatically seeds with Indian business data on server startup. This includes:
- Customer profiles with Indian names and cities
- Energy sector products with realistic pricing
- Transaction history and sales statistics
- Performance metrics and analytics

### Theme Customization
The application uses a light theme with:
- Material-UI color palette
- Consistent styling across components
- Responsive design principles
- Professional energy sector branding

### API Features
- RESTful endpoints with proper error handling
- Redux Toolkit Query for data fetching
- Automatic data refreshing and caching
- Server-side pagination and filtering

## Troubleshooting

### Common Issues
1. **Port Conflicts**: Ensure ports 3000 and 9000 are available
2. **MongoDB Connection**: Verify MongoDB is running and .env is configured
3. **Data Loading**: Check server logs for successful data seeding
4. **API Errors**: Verify backend is running before starting frontend

### Development Tips
- Use `npm run dev` for both client and server during development
- Check browser console for any frontend errors
- Monitor server logs for backend issues
- Database automatically seeds on first run

## Production Deployment

### Environment Variables
Ensure proper environment variables are set:
- `MONGO_URL`: Production MongoDB connection
- `PORT`: Server port (default: 9000)

### Build Process
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

---

**aldex Energies Admin Dashboard** - Modern energy sector management solution with comprehensive analytics and Indian market integration.](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






