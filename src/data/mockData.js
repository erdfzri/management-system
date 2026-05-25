// Data untuk aplikasi Tourism Management System

export const dashboardStats = {
  totalVisitors: 2847,
  revenueToday: 145680000,
  ticketsSold: 1523,
  activeVisitors: 1842,
  mostCrowdedArea: "Kolam Ombak",
  inventoryAlerts: 12,
  activeCheckpoints: 8
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

export const areaDistribution = [
  { name: 'Kolam Ombak', value: 450, color: '#a855f7' },
  { name: 'Restoran', value: 320, color: '#c084fc' },
  { name: 'Lapangan Golf', value: 180, color: '#d8b4fe' },
  { name: 'Taman Bermain', value: 280, color: '#f97316' },
  { name: 'Hotel', value: 220, color: '#fb923c' },
  { name: 'Kafe', value: 392, color: '#9333ea' },
];

export const recentTransactions = [
  { id: 'TRX-164074', customer: 'Walk-in Customer', type: 'Tiket Masuk', amount: 550000, time: '2 menit lalu', status: 'selesai' },
  { id: 'TRX-164075', customer: 'Walk-in Customer', type: 'POS F&B', amount: 125000, time: '5 menit lalu', status: 'selesai' },
  { id: 'TRX-164076', customer: 'Walk-in Customer', type: 'Tiket Masuk', amount: 150000, time: '8 menit lalu', status: 'selesai' },
  { id: 'TRX-164077', customer: 'Walk-in Customer', type: 'POS F&B', amount: 45000, time: '12 menit lalu', status: 'selesai' },
  { id: 'TRX-164078', customer: 'Walk-in Customer', type: 'Tiket Masuk', amount: 350000, time: '15 menit lalu', status: 'selesai' },
];

export const checkpointStatus = [
  { id: 'CP-001', name: 'Gerbang Utama', status: 'online', scans: 1247, valid: 1198, rejected: 49 },
  { id: 'CP-002', name: 'Pintu Masuk Kolam', status: 'online', scans: 892, valid: 875, rejected: 17 },
  { id: 'CP-003', name: 'Area Restoran', status: 'online', scans: 654, valid: 648, rejected: 6 },
  { id: 'CP-004', name: 'Lapangan Golf', status: 'offline', scans: 0, valid: 0, rejected: 0 },
  { id: 'CP-005', name: 'Lobi Hotel', status: 'online', scans: 423, valid: 420, rejected: 3 },
  { id: 'CP-006', name: 'Taman Bermain', status: 'online', scans: 567, valid: 552, rejected: 15 },
  { id: 'CP-007', name: 'Area Kafe', status: 'online', scans: 789, valid: 781, rejected: 8 },
  { id: 'CP-008', name: 'Gedung Acara', status: 'online', scans: 345, valid: 340, rejected: 5 },
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

export const branches = [
  {
    id: 1,
    name: 'Main Complex',
    location: 'Jakarta',
    visitors: 2847,
    revenue: 145680000,
    status: 'active',
    manager: 'John Manager'
  },
  {
    id: 2,
    name: 'Beach Resort',
    location: 'Bali',
    visitors: 1923,
    revenue: 98450000,
    status: 'active',
    manager: 'Sarah Beach'
  },
  {
    id: 3,
    name: 'Mountain Lodge',
    location: 'Bandung',
    visitors: 1456,
    revenue: 72340000,
    status: 'active',
    manager: 'Mike Hill'
  },
  {
    id: 4,
    name: 'City Park',
    location: 'Surabaya',
    visitors: 3124,
    revenue: 156780000,
    status: 'active',
    manager: 'Lisa Park'
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

export const topAttractions = [
  { name: 'Seluncuran Air Ekstrim', visitors: 892, rating: 4.8, revenue: 44600000 },
  { name: 'Kolam Ombak', visitors: 756, rating: 4.7, revenue: 37800000 },
  { name: 'Mini Golf', visitors: 634, rating: 4.5, revenue: 31700000 },
  { name: 'Taman Bermain Anak', visitors: 589, rating: 4.9, revenue: 29450000 },
  { name: 'Sungai Santai', visitors: 523, rating: 4.6, revenue: 26150000 },
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
