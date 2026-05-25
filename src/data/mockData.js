// Data untuk aplikasi Tourism Management System

// ============================================================
// SUMBER DATA UTAMA: Fasilitas Grand Oasis
// Data ini adalah single source of truth yang digunakan oleh
// Landing Page dan Dashboard secara bersamaan.
// ============================================================
export const facilitiesData = [
  {
    id: 'waterpark',
    title: 'Water Park',
    desc: 'Wahana air seru dengan ombak buatan dan seluncuran raksasa.',
    img: '/waterpark.jpg',
    icon: '🌊',
    hours: '08:00 - 18:00',
    visitors: 756,
    revenue: 113400000,
    rating: 4.8,
    color: '#3b82f6',
    checkpointId: 'CP-002',
    location: 'Area Utara'
  },
  {
    id: 'kolam-ombak',
    title: 'Kolam Ombak',
    desc: 'Rasakan sensasi deburan ombak seperti di pantai sungguhan.',
    img: '/kolam-ombak.png',
    icon: '🏄‍♂️',
    hours: '08:00 - 18:00',
    visitors: 892,
    revenue: 133800000,
    rating: 4.7,
    color: '#a855f7',
    checkpointId: 'CP-003',
    location: 'Area Barat'
  },
  {
    id: 'lapangan-golf',
    title: 'Lapangan Golf',
    desc: 'Tantang diri Anda di lapangan golf 18 hole berstandar PGA.',
    img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
    icon: '⛳',
    hours: '06:00 - 18:00',
    visitors: 423,
    revenue: 84600000,
    rating: 4.5,
    color: '#22c55e',
    checkpointId: 'CP-004',
    location: 'Area Selatan'
  },
  {
    id: 'area-bermain',
    title: 'Area Bermain Anak',
    desc: 'Zona aman dan edukatif untuk keceriaan si kecil.',
    img: '/taman-bermain.jpg',
    icon: '🎠',
    hours: '08:00 - 20:00',
    visitors: 589,
    revenue: 58900000,
    rating: 4.9,
    color: '#f97316',
    checkpointId: 'CP-005',
    location: 'Area Tengah'
  },
  {
    id: 'restoran',
    title: 'Restoran',
    desc: 'Nikmati sajian spesial dengan hidangan dari koki profesional kami.',
    img: '/restoran.jpg',
    icon: '🍽️',
    hours: '10:00 - 22:00',
    visitors: 634,
    revenue: 95100000,
    rating: 4.6,
    color: '#ec4899',
    checkpointId: 'CP-006',
    location: 'Area Tengah'
  }
];

export const dashboardStats = {
  totalVisitors: 3294,
  revenueToday: 485800000,
  ticketsSold: 1523,
  activeVisitors: 1842,
  mostCrowdedArea: "Kolam Ombak",
  inventoryAlerts: 5,
  activeCheckpoints: 5
};

export const visitorTrend = [
  { time: '08:00', visitors: 120, revenue: 8500000 },
  { time: '09:00', visitors: 280, revenue: 15200000 },
  { time: '10:00', visitors: 450, revenue: 24800000 },
  { time: '11:00', visitors: 620, revenue: 32400000 },
  { time: '12:00', visitors: 780, revenue: 41200000 },
  { time: '13:00', visitors: 920, revenue: 48600000 },
  { time: '14:00', visitors: 1150, revenue: 58400000 },
  { time: '15:00', visitors: 1380, revenue: 68200000 },
  { time: '16:00', visitors: 1520, revenue: 75800000 },
  { time: '17:00', visitors: 1680, revenue: 84200000 },
];

// Area distribution menggunakan data dari facilitiesData
export const areaDistribution = [
  { name: 'Water Park', value: 756, color: '#3b82f6' },
  { name: 'Kolam Ombak', value: 892, color: '#a855f7' },
  { name: 'Lapangan Golf', value: 423, color: '#22c55e' },
  { name: 'Area Bermain Anak', value: 589, color: '#f97316' },
  { name: 'Restoran', value: 634, color: '#ec4899' },
];

export const recentTransactions = [
  { id: 'TRX-164074', customer: 'Walk-in Customer', type: 'Tiket Masuk', amount: 550000, time: '2 menit lalu', status: 'selesai' },
  { id: 'TRX-164075', customer: 'Walk-in Customer', type: 'POS F&B', amount: 125000, time: '5 menit lalu', status: 'selesai' },
  { id: 'TRX-164076', customer: 'Walk-in Customer', type: 'Tiket Masuk', amount: 150000, time: '8 menit lalu', status: 'selesai' },
  { id: 'TRX-164077', customer: 'Walk-in Customer', type: 'POS F&B', amount: 45000, time: '12 menit lalu', status: 'selesai' },
  { id: 'TRX-164078', customer: 'Walk-in Customer', type: 'Tiket Masuk', amount: 350000, time: '15 menit lalu', status: 'selesai' },
];

// Checkpoint per fasilitas (+ Gerbang Utama)
export const checkpointStatus = [
  { id: 'CP-001', name: 'Gerbang Utama', facilityId: null, status: 'online', scans: 3294, valid: 3210, rejected: 84 },
  { id: 'CP-002', name: 'Water Park', facilityId: 'waterpark', status: 'online', scans: 756, valid: 740, rejected: 16 },
  { id: 'CP-003', name: 'Kolam Ombak', facilityId: 'kolam-ombak', status: 'online', scans: 892, valid: 875, rejected: 17 },
  { id: 'CP-004', name: 'Lapangan Golf', facilityId: 'lapangan-golf', status: 'online', scans: 423, valid: 420, rejected: 3 },
  { id: 'CP-005', name: 'Area Bermain Anak', facilityId: 'area-bermain', status: 'online', scans: 589, valid: 572, rejected: 17 },
  { id: 'CP-006', name: 'Restoran', facilityId: 'restoran', status: 'online', scans: 634, valid: 628, rejected: 6 },
];

export const ticketCategories = [
  {
    id: 1,
    name: 'Tiket Reguler',
    price: 150000,
    description: 'Akses ke 1 wahana pilihan',
    sold: 450,
    revenue: 67500000,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Paket Bundle',
    price: 350000,
    description: 'Akses ke 3 wahana pilihan',
    sold: 320,
    revenue: 112000000,
    color: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Tiket All Access',
    price: 450000,
    description: 'Akses unlimited seharian',
    sold: 580,
    revenue: 261000000,
    color: 'bg-pink-500'
  },
  {
    id: 4,
    name: 'Tiket VIP',
    price: 500000,
    description: 'Akses premium + fasilitas VIP',
    sold: 173,
    revenue: 86500000,
    color: 'bg-orange-500'
  },
];

export const inventoryItems = [
  { id: 1, name: 'Air Mineral Botol', stock: 450, minStock: 500, status: 'low', category: 'Minuman', supplier: 'Aqua Fresh' },
  { id: 2, name: 'Paket Snack', stock: 1200, minStock: 800, status: 'good', category: 'Makanan', supplier: 'Snack Co' },
  { id: 3, name: 'Sunscreen', stock: 89, minStock: 200, status: 'critical', category: 'Perawatan', supplier: 'Sun Safe' },
  { id: 4, name: 'Handuk', stock: 350, minStock: 300, status: 'good', category: 'Perlengkapan', supplier: 'Textile Plus' },
  { id: 5, name: 'Pelampung', stock: 180, minStock: 150, status: 'good', category: 'Keamanan', supplier: 'Safety First' },
  { id: 6, name: 'Alat Kebersihan', stock: 45, minStock: 100, status: 'low', category: 'Maintenance', supplier: 'Clean Pro' },
  { id: 7, name: 'Kotak P3K', stock: 25, minStock: 50, status: 'critical', category: 'Medis', supplier: 'Med Supply' },
  { id: 8, name: 'Bola Golf', stock: 890, minStock: 500, status: 'good', category: 'Olahraga', supplier: 'Golf Pro' },
];

// Branches menggunakan nama fasilitas dari landing page
export const branches = [
  {
    id: 1,
    name: 'Water Park',
    location: 'Area Utara',
    visitors: 756,
    revenue: 113400000,
    status: 'active',
    manager: 'Andi Pratama'
  },
  {
    id: 2,
    name: 'Kolam Ombak',
    location: 'Area Barat',
    visitors: 892,
    revenue: 133800000,
    status: 'active',
    manager: 'Sari Dewi'
  },
  {
    id: 3,
    name: 'Lapangan Golf',
    location: 'Area Selatan',
    visitors: 423,
    revenue: 84600000,
    status: 'active',
    manager: 'Budi Santoso'
  },
  {
    id: 4,
    name: 'Area Bermain Anak',
    location: 'Area Tengah',
    visitors: 589,
    revenue: 58900000,
    status: 'active',
    manager: 'Rina Susanti'
  },
  {
    id: 5,
    name: 'Restoran',
    location: 'Area Tengah',
    visitors: 634,
    revenue: 95100000,
    status: 'active',
    manager: 'Hendra Wijaya'
  },
];

export const staffRoles = [
  { role: 'Super Admin', count: 2, permissions: ['all'] },
  { role: 'Owner', count: 1, permissions: ['view_all', 'reports', 'analytics'] },
  { role: 'Area Manager', count: 8, permissions: ['manage_area', 'view_reports', 'manage_staff'] },
  { role: 'Cashier', count: 24, permissions: ['pos', 'transactions'] },
  { role: 'Warehouse Staff', count: 12, permissions: ['inventory', 'stock_management'] },
  { role: 'Gate Officer', count: 16, permissions: ['checkpoint', 'scan_tickets'] },
];

// topAttractions diambil dari facilitiesData, diurutkan berdasarkan visitors terbanyak
export const topAttractions = [
  { name: 'Kolam Ombak', visitors: 892, rating: 4.7, revenue: 133800000 },
  { name: 'Water Park', visitors: 756, rating: 4.8, revenue: 113400000 },
  { name: 'Restoran', visitors: 634, rating: 4.6, revenue: 95100000 },
  { name: 'Area Bermain Anak', visitors: 589, rating: 4.9, revenue: 58900000 },
  { name: 'Lapangan Golf', visitors: 423, rating: 4.5, revenue: 84600000 },
];

export const peakHours = [
  { hour: '08:00', visitors: 120 },
  { hour: '09:00', visitors: 280 },
  { hour: '10:00', visitors: 450 },
  { hour: '11:00', visitors: 620 },
  { hour: '12:00', visitors: 780 },
  { hour: '13:00', visitors: 920 },
  { hour: '14:00', visitors: 1150 },
  { hour: '15:00', visitors: 1380 },
  { hour: '16:00', visitors: 1520 },
  { hour: '17:00', visitors: 1680 },
];

export const paymentMethods = [
  { method: 'QRIS', transactions: 456, amount: 68400000, percentage: 47 },
  { method: 'Cash', transactions: 234, amount: 35100000, percentage: 24 },
  { method: 'Debit Card', transactions: 189, amount: 28350000, percentage: 19 },
  { method: 'Credit Card', transactions: 145, amount: 21750000, percentage: 10 },
];

export const notifications = [
  { id: 1, type: 'alert', title: 'Stok Menipis', message: 'Stok sunscreen hampir habis', time: '5 menit lalu', read: false },
  { id: 2, type: 'info', title: 'Pembelian Baru', message: 'Tiket VIP dibeli oleh Budi Santoso', time: '12 menit lalu', read: false },
  { id: 3, type: 'warning', title: 'Checkpoint Offline', message: 'Checkpoint Lapangan Golf sedang offline', time: '25 menit lalu', read: true },
  { id: 4, type: 'success', title: 'Target Tercapai', message: 'Target pendapatan hari ini sudah tercapai', time: '1 jam lalu', read: true },
  { id: 5, type: 'info', title: 'Absensi Staff', message: '24 staff sudah check-in', time: '2 jam lalu', read: true },
];

export const activityTimeline = [
  { time: '17:45', action: 'Pembelian Tiket', user: 'Dewi Lestari', details: 'Tiket VIP - Rp 500.000' },
  { time: '17:42', action: 'Scan Checkpoint', user: 'Petugas Gate #3', details: 'Gerbang Utama - Tiket valid' },
  { time: '17:38', action: 'Update Stok', user: 'Staff Gudang', details: 'Restock air mineral' },
  { time: '17:35', action: 'Transaksi POS', user: 'Kasir #5', details: 'Restoran - Rp 250.000' },
  { time: '17:30', action: 'Check-out Staff', user: 'Budi Santoso', details: 'Shift selesai' },
];
