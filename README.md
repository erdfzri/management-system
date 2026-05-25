# 🏖️ TourismHub - Integrated Tourism & Business Management System

Modern, premium dashboard untuk monitoring dan manajemen kawasan wisata terpadu dengan multiple unit bisnis.

## ✨ Features

### 📊 Main Dashboard
- Real-time visitor statistics
- Revenue tracking
- Ticket sales monitoring
- Active visitor count
- Area distribution analytics
- Top attractions performance
- Recent transactions
- Interactive charts (Line, Bar, Pie)

### 🎫 Ticketing Management
- Multiple ticket categories (Single, Bundle, All Access, VIP)
- Sales statistics
- Revenue analytics
- QR code ticket system
- Recent purchases tracking

### 👥 Visitor Tracking
- Live visitor monitoring
- Area heatmap
- Visitor flow analytics
- Activity timeline
- Location tracking
- Peak hours analysis

### 🚪 Checkpoint Management
- Real-time checkpoint status
- Scan activity monitoring
- Valid/rejected ticket tracking
- Scanner simulation
- Success rate analytics

### 🛒 POS Management
- Transaction monitoring
- Multiple payment methods (QRIS, Cash, Card)
- Top selling products
- Hourly sales tracking
- Payment distribution analytics

### 📦 Inventory Management
- Stock level monitoring
- Low stock alerts
- Critical item tracking
- Supplier management
- Stock movement trends

### 📈 Analytics Dashboard
- Revenue analytics
- Visitor analytics
- Conversion rate tracking
- Peak hours analysis
- Repeat customer statistics
- Business insights & recommendations

### 🏢 Branch Management
- Multi-location monitoring
- Performance comparison
- Branch rankings
- Revenue per branch
- Visitor count per branch

### 👨‍💼 Staff Management
- Role-based access control
- Permission matrix
- Staff directory
- Role overview
- User management

## 🎨 Design Features

- **Modern UI/UX**: Clean, elegant, premium design
- **Color Scheme**: Purple gradient, white, soft lavender, orange highlights
- **Dark Mode**: Full dark mode support
- **Responsive**: Desktop-first responsive design
- **Animations**: Smooth transitions with Framer Motion
- **Charts**: Beautiful charts with Recharts
- **Icons**: Lucide React icons
- **Typography**: Inter font family

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Charts & data visualization
- **Lucide React** - Icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to project directory:
```bash
cd tourism-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
tourism-management-system/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── StatCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Ticketing.jsx
│   │   ├── Visitors.jsx
│   │   ├── Checkpoints.jsx
│   │   ├── POS.jsx
│   │   ├── Inventory.jsx
│   │   ├── Analytics.jsx
│   │   ├── Branches.jsx
│   │   └── Staff.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎯 Key Features Implementation

### Dark Mode
Toggle dark mode using the moon/sun icon in the header. Persists across all pages.

### Navigation
Use the sidebar to navigate between different modules. Active page is highlighted with gradient background.

### Real-time Data
All data is currently mock/static. Ready to be integrated with backend API.

### Responsive Design
Optimized for desktop viewing with responsive breakpoints for tablets and mobile.

### Animations
Smooth page transitions and element animations using Framer Motion.

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time WebSocket updates
- [ ] Advanced filtering and search
- [ ] Export reports (PDF, Excel)
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Advanced analytics with AI insights

## 📝 Notes

- All data is currently static/mock data from `src/data/mockData.js`
- Ready for backend integration
- Follows React best practices
- Component-based architecture
- Reusable components
- Clean code structure

## 🎨 Color Palette

- **Primary Purple**: `#a855f7` to `#7e22ce`
- **Lavender**: `#f3e8ff` to `#d8b4fe`
- **Orange Accent**: `#f97316`
- **Green Success**: `#10b981`
- **Red Alert**: `#ef4444`
- **Blue Info**: `#3b82f6`

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Developer

Built with ❤️ using React, TailwindCSS, and modern web technologies.
