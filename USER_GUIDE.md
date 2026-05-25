# 📖 User Guide - TourismHub Management System

## 🚀 Getting Started

### First Time Setup

1. **Install Dependencies**
   ```bash
   cd tourism-management-system
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - Application will load with default dashboard

---

## 🎯 Navigation Guide

### Sidebar Menu

The sidebar is your main navigation tool. Click any menu item to navigate:

- **Dashboard** - Overview dan statistik utama
- **Ticketing** - Manajemen tiket dan penjualan
- **Visitors** - Tracking pengunjung real-time
- **Checkpoints** - Monitoring gate dan validasi
- **POS** - Point of Sale untuk transaksi
- **Inventory** - Manajemen stok dan inventory
- **Analytics** - Business intelligence dan insights
- **Reports** - Laporan dan export data
- **Branch Management** - Multi-location monitoring
- **Staff Management** - Team dan permission management
- **Settings** - Konfigurasi sistem

### Sidebar Controls

- **Collapse/Expand**: Click arrow icon di header sidebar
- **Active Page**: Highlighted dengan gradient purple
- **User Profile**: Di bagian bawah sidebar

---

## 🌓 Dark Mode

### How to Toggle

1. Click **Moon/Sun icon** di header (top right)
2. Mode akan berubah instantly
3. Preference tersimpan di browser

### Benefits
- Reduce eye strain
- Better for low-light environments
- Modern aesthetic

---

## 📊 Dashboard Usage

### Overview Cards

**Total Visitors Today**
- Shows current day visitor count
- Green arrow = increase from yesterday
- Red arrow = decrease from yesterday

**Revenue Today**
- Total revenue in IDR
- Percentage change indicator
- Click for detailed breakdown

**Tickets Sold**
- Number of tickets sold today
- Trend comparison
- Quick access to ticketing module

**Active Visitors**
- Currently inside the complex
- Real-time updates
- Safety capacity monitoring

### Charts

**Visitor Trend (Line Chart)**
- Hourly visitor flow
- Hover for exact numbers
- Identify peak hours

**Area Distribution (Pie Chart)**
- Visitor spread across areas
- Click legend to filter
- Percentage breakdown

**Top Attractions (Bar Chart)**
- Most popular attractions
- Revenue per attraction
- Visitor count

### Recent Transactions Table

- Last 5 transactions
- Status indicators
- Quick actions
- Click row for details

---

## 🎫 Ticketing Module

### Viewing Ticket Categories

1. Navigate to **Ticketing** from sidebar
2. View 4 ticket types with:
   - Price
   - Description
   - Sold count
   - Revenue generated

### Creating New Ticket (UI Ready)

1. Click **Create New Ticket** button
2. Fill in ticket details
3. Set price and validity
4. Save and activate

### Sales Analytics

- **Sales Trend Chart**: Monthly performance
- **Category Performance**: Compare ticket types
- **Recent Purchases**: Latest transactions

---

## 👥 Visitor Tracking

### Live Monitoring

**Active Visitors Card**
- Current count inside complex
- Entry/exit tracking
- Capacity alerts

**Visitor Flow Chart**
- Real-time graph updates
- Hourly breakdown
- Trend analysis

### Area Heatmap

Shows visitor distribution:
- **Red zones**: High density
- **Orange zones**: Medium density
- **Green zones**: Low density

### Activity Timeline

- Recent visitor actions
- Checkpoint scans
- Purchase activities
- Movement logs

---

## 🚪 Checkpoint Management

### Monitoring Checkpoints

**Status Indicators**:
- 🟢 **Online**: Operational
- 🔴 **Offline**: Needs attention

**Metrics per Checkpoint**:
- Total scans today
- Valid tickets
- Rejected tickets
- Success rate percentage

### Scanner Simulation

1. Click **Start Scanner** button
2. Position QR code in frame
3. Instant validation
4. Access granted/denied

### Troubleshooting Offline Checkpoints

1. Check network connection
2. Restart checkpoint device
3. Contact IT support
4. View error logs

---

## 🛒 POS Module

### Processing Transactions

1. Select products
2. Choose payment method:
   - QRIS (Scan QR)
   - Cash (Enter amount)
   - Card (Swipe/Insert)
3. Confirm transaction
4. Print receipt

### Payment Methods

**QRIS** (Recommended)
- Fastest processing
- Auto-reconciliation
- No manual entry

**Cash**
- Manual counting required
- Change calculation
- End-of-day reconciliation

**Cards**
- Debit/Credit accepted
- Installment options
- EDC integration

### Viewing Sales

- **Top Products**: Best sellers
- **Hourly Sales**: Peak times
- **Payment Distribution**: Method breakdown

---

## 📦 Inventory Management

### Stock Monitoring

**Status Colors**:
- 🟢 **Good**: Sufficient stock
- 🟠 **Low**: Below minimum
- 🔴 **Critical**: Urgent restock needed

### Restock Process

1. Identify low stock items
2. Click **Restock** button
3. Enter quantity
4. Select supplier
5. Confirm order

### Alerts

- **Low Stock Alert**: Orange notification
- **Critical Alert**: Red notification
- **Email Notifications**: Auto-sent to managers

---

## 📈 Analytics Module

### KPI Cards

View key metrics:
- Monthly Revenue
- Total Visitors
- Conversion Rate
- Avg Visit Duration
- Repeat Customers
- Revenue per Visitor

### Charts & Insights

**Revenue & Visitor Analytics**
- Dual-axis chart
- Monthly trends
- Growth indicators

**Peak Hours Analysis**
- Identify busy times
- Staff allocation planning
- Dynamic pricing opportunities

**Conversion Rate Trend**
- Weekly tracking
- Improvement monitoring
- Target achievement

### AI Insights

Bottom cards show:
- 💡 **Insights**: Data observations
- 📈 **Opportunities**: Growth areas
- 🎯 **Recommendations**: Action items

---

## 🏢 Branch Management

### Viewing All Branches

Dashboard shows:
- Branch name and location
- Manager assigned
- Visitor count
- Revenue today
- Status (Active/Inactive)

### Performance Comparison

**Comparison Chart**:
- Revenue per branch
- Visitor count per branch
- Side-by-side analysis

**Rankings**:
- 🥇 Top performer
- 🥈 Second place
- 🥉 Third place
- Others

### Branch Details

Click **View Details** to see:
- Detailed analytics
- Staff list
- Inventory status
- Recent activities

---

## 👨‍💼 Staff Management

### Role Overview

View all roles with:
- Staff count per role
- Permission summary
- Quick actions

### Managing Staff

**Add New Staff**:
1. Click **Add Staff Member**
2. Enter details
3. Assign role
4. Set permissions
5. Send invitation

**Edit Staff**:
1. Find staff in table
2. Click **Edit**
3. Update information
4. Save changes

**Remove Staff**:
1. Click **Remove**
2. Confirm action
3. Access revoked immediately

### Permission Matrix

View and edit permissions:
- Check/uncheck permissions
- Role-based templates
- Custom permissions
- Audit trail

---

## 🔔 Notifications

### Notification Center

Click **Bell icon** in header to view:
- Unread count badge
- Notification list
- Mark as read
- View all

### Notification Types

- 🔴 **Alert**: Urgent action needed
- 🟠 **Warning**: Attention required
- 🔵 **Info**: General information
- 🟢 **Success**: Positive updates

---

## 👤 Profile Management

### Accessing Profile

1. Click **Profile dropdown** (top right)
2. Select **Profile**
3. View/edit information

### Available Actions

- **Profile**: View personal info
- **Settings**: Preferences
- **Logout**: End session

---

## ⚙️ Settings (Coming Soon)

Future settings will include:
- System preferences
- Notification settings
- Display options
- Language selection
- Time zone
- Currency format
- Backup & restore

---

## 🆘 Troubleshooting

### Common Issues

**Page Not Loading**
- Check internet connection
- Refresh browser (Ctrl+R)
- Clear cache
- Try different browser

**Data Not Updating**
- Check real-time connection
- Refresh page
- Verify permissions
- Contact support

**Charts Not Displaying**
- Enable JavaScript
- Update browser
- Check console for errors
- Report to IT

**Dark Mode Issues**
- Clear browser cache
- Reset preferences
- Try incognito mode

---

## 💡 Tips & Tricks

### Keyboard Shortcuts (Future)
- `Ctrl + D`: Dashboard
- `Ctrl + T`: Ticketing
- `Ctrl + V`: Visitors
- `Ctrl + /`: Search
- `Esc`: Close modals

### Best Practices

1. **Regular Monitoring**
   - Check dashboard every hour
   - Review alerts immediately
   - Monitor peak hours

2. **Data Management**
   - Export reports daily
   - Backup important data
   - Archive old records

3. **Staff Training**
   - Train on all modules
   - Practice scenarios
   - Regular refreshers

4. **Security**
   - Logout when done
   - Don't share credentials
   - Report suspicious activity

---

## 📞 Support

### Getting Help

**In-App Support** (Coming Soon)
- Help button in header
- Live chat
- Knowledge base
- Video tutorials

**Contact Support**
- Email: support@tourismhub.com
- Phone: +62 xxx xxxx xxxx
- Hours: 24/7

### Reporting Issues

1. Note the error message
2. Take screenshot
3. Describe steps to reproduce
4. Submit support ticket

---

## 🎓 Training Resources

### Video Tutorials (Coming Soon)
- Getting Started (5 min)
- Dashboard Overview (10 min)
- Ticketing Module (15 min)
- POS Operations (20 min)
- Advanced Analytics (30 min)

### Documentation
- User Guide (this document)
- Features Documentation
- API Documentation
- Admin Guide

---

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial release
- All core modules
- Dark mode support
- Responsive design
- Mock data integration

### Upcoming Features
- Backend integration
- Real-time updates
- Export functionality
- Mobile app
- Advanced analytics

---

## ✅ Quick Reference

### Daily Tasks
- [ ] Check dashboard statistics
- [ ] Review alerts and notifications
- [ ] Monitor checkpoint status
- [ ] Check inventory levels
- [ ] Review sales performance
- [ ] Verify staff attendance

### Weekly Tasks
- [ ] Generate weekly reports
- [ ] Review analytics trends
- [ ] Update inventory
- [ ] Staff performance review
- [ ] Branch comparison analysis

### Monthly Tasks
- [ ] Generate monthly reports
- [ ] Financial reconciliation
- [ ] Strategic planning
- [ ] System maintenance
- [ ] Staff training sessions

---

**Need more help?** Contact our support team or refer to the detailed Features Documentation.
