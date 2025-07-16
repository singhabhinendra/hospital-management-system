# Hospital Management System

A comprehensive Next.js-based Hospital Management System for efficient healthcare operations.

## Features

- 🏥 **Dashboard**: Real-time overview of hospital operations
- 👥 **Patient Management**: Complete patient records and history
- 👨‍⚕️ **Doctor Management**: Staff scheduling and information
- 📅 **Appointment Scheduling**: Efficient booking system
- 📦 **Inventory Management**: Medical supplies tracking
- 💰 **Billing System**: Financial management and invoicing

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Charts**: Recharts

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.17 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Install Node.js**: 
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
└── components/
    ├── Dashboard.tsx      # Main dashboard
    ├── Header.tsx         # Navigation header
    └── Sidebar.tsx        # Side navigation
```

## Getting Started

1. **Install Node.js** first if you haven't already
2. Open terminal in the project directory
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Visit `http://localhost:3000` to see the application

## Key Components

### Dashboard
- Real-time statistics and metrics
- Recent patients overview
- Today's appointments
- Quick action buttons

### Sidebar Navigation
- Dashboard overview
- Patient management
- Doctor management
- Appointment scheduling
- Inventory tracking
- Billing system

### Header
- Application title
- User profile
- Logout functionality

## Customization

The application uses Tailwind CSS for styling with custom color schemes:
- Primary colors (blue theme)
- Medical colors (green theme)

You can modify the color palette in `tailwind.config.js`.

## Future Enhancements

- [ ] Database integration
- [ ] User authentication
- [ ] Real-time notifications
- [ ] Advanced reporting
- [ ] Mobile responsiveness
- [ ] Print functionality
- [ ] Export capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
