import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  Ticket,
  Package,
  Building2,
  BarChart3,
  Printer,
  Loader2,
  CheckCircle2,
  Settings,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGlobal } from '../context/GlobalContext';

const reportTypes = [
  { id: 'daily', name: 'Laporan Harian', icon: Calendar, color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/30' },
  { id: 'weekly', name: 'Laporan Mingguan', icon: BarChart3, color: 'from-indigo-400 to-indigo-600', shadow: 'shadow-indigo-500/30' },
  { id: 'monthly', name: 'Laporan Bulanan', icon: TrendingUp, color: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-500/30' },
  { id: 'visitor', name: 'Laporan Pengunjung', icon: Users, color: 'from-pink-400 to-pink-600', shadow: 'shadow-pink-500/30' },
  { id: 'revenue', name: 'Laporan Pendapatan', icon: DollarSign, color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/30' },
  { id: 'ticket', name: 'Laporan Tiket', icon: Ticket, color: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/30' },
  { id: 'inventory', name: 'Laporan Stok', icon: Package, color: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/30' },
  { id: 'branch', name: 'Laporan Fasilitas', icon: Building2, color: 'from-cyan-400 to-cyan-600', shadow: 'shadow-cyan-500/30' },
];

const initialReports = [
  { id: 1, name: 'Laporan Harian - 25 Mei 2026', type: 'Laporan Harian', date: '25 Mei 2026', size: '2.4 MB', status: 'ready' },
  { id: 2, name: 'Laporan Mingguan - Minggu 21', type: 'Laporan Mingguan', date: '19-25 Mei 2026', size: '5.8 MB', status: 'ready' },
  { id: 3, name: 'Laporan Bulanan - Mei 2026', type: 'Laporan Bulanan', date: 'Mei 2026', size: '12.3 MB', status: 'ready' },
  { id: 4, name: 'Laporan Pengunjung - Q2 2026', type: 'Laporan Pengunjung', date: 'Apr-Jun 2026', size: '8.7 MB', status: 'ready' },
  { id: 5, name: 'Laporan Pendapatan - Mei 2026', type: 'Laporan Pendapatan', date: 'Mei 2026', size: '4.2 MB', status: 'processing' },
];

export default function Reports() {
  const { visitorTrend } = useGlobal();
  const [selectedType, setSelectedType] = useState('daily');
  const [dateRange, setDateRange] = useState({ start: '2026-05-01', end: '2026-05-25' });
  const [reportsList, setReportsList] = useState(initialReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dynamic data for the charts based on selected type
  const previewDataMap = {
    daily: [
      { label: '08:00', chart1: 12, chart2: 45 },
      { label: '10:00', chart1: 25, chart2: 89 },
      { label: '12:00', chart1: 45, chart2: 156 },
      { label: '14:00', chart1: 58, chart2: 198 },
      { label: '16:00', chart1: 42, chart2: 134 },
      { label: '18:00', chart1: 28, chart2: 76 },
    ],
    weekly: [
      { label: 'Senin', chart1: 45, chart2: 120 },
      { label: 'Selasa', chart1: 52, chart2: 142 },
      { label: 'Rabu', chart1: 48, chart2: 135 },
      { label: 'Kamis', chart1: 61, chart2: 168 },
      { label: 'Jumat', chart1: 75, chart2: 210 },
      { label: 'Sabtu', chart1: 125, chart2: 380 },
      { label: 'Minggu', chart1: 142, chart2: 420 },
    ],
    monthly: [
      { label: 'Jan', chart1: 450, chart2: 12500 },
      { label: 'Feb', chart1: 520, chart2: 14200 },
      { label: 'Mar', chart1: 680, chart2: 18900 },
      { label: 'Apr', chart1: 590, chart2: 16400 },
      { label: 'Mei', chart1: 750, chart2: 21200 },
      { label: 'Jun', chart1: 820, chart2: 24800 },
    ],
    visitor: [
      { label: 'Water Park', chart1: 120, chart2: 4500 },
      { label: 'Theme Park', chart1: 150, chart2: 6200 },
      { label: 'Zoo', chart1: 80, chart2: 3800 },
      { label: 'Museum', chart1: 30, chart2: 1200 },
      { label: 'Food Court', chart1: 110, chart2: 5500 },
    ],
    revenue: [
      { label: 'Tiket', chart1: 650, chart2: 18000 },
      { label: 'F&B', chart1: 280, chart2: 12000 },
      { label: 'Souvenir', chart1: 120, chart2: 3500 },
      { label: 'Parkir', chart1: 45, chart2: 2000 },
      { label: 'Sewa', chart1: 35, chart2: 800 },
    ],
    ticket: [
      { label: 'Reguler', chart1: 350, chart2: 12500 },
      { label: 'VIP', chart1: 120, chart2: 3200 },
      { label: 'Family', chart1: 210, chart2: 4800 },
      { label: 'Group', chart1: 80, chart2: 1500 },
      { label: 'Promo', chart1: 95, chart2: 2800 },
    ],
    inventory: [
      { label: 'T-Shirt', chart1: 15, chart2: 150 },
      { label: 'Topi', chart1: 8, chart2: 85 },
      { label: 'Mug', chart1: 5, chart2: 45 },
      { label: 'Gantungan', chart1: 2, chart2: 320 },
      { label: 'Snack', chart1: 25, chart2: 450 },
    ],
    branch: [
      { label: 'Main Cmplx', chart1: 450, chart2: 12500 },
      { label: 'Resort', chart1: 280, chart2: 8400 },
      { label: 'Lodge', chart1: 150, chart2: 4200 },
      { label: 'City Park', chart1: 95, chart2: 3100 },
    ]
  };

  const currentPreviewData = previewDataMap[selectedType];

  const getChartTitles = () => {
    switch(selectedType) {
      case 'visitor': return { top: 'Pendapatan Area (Juta)', bottom: 'Pengunjung Area', fmt: true };
      case 'revenue': return { top: 'Distribusi Pendapatan (Juta)', bottom: 'Transaksi Kategori', fmt: true };
      case 'ticket': return { top: 'Pendapatan Tiket (Juta)', bottom: 'Tiket Terjual', fmt: true };
      case 'inventory': return { top: 'Nilai Stok (Juta)', bottom: 'Jumlah Item', fmt: true };
      case 'branch': return { top: 'Pendapatan Fasilitas (Juta)', bottom: 'Pengunjung Fasilitas', fmt: true };
      default: return { top: 'Tren Pendapatan', bottom: 'Tren Pengunjung', fmt: false };
    }
  };
  const chartTitles = getChartTitles();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value * 1000000);
  };

  const handleGenerateReport = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    // Simulate API call and report generation
    setTimeout(() => {
      const typeObj = reportTypes.find(t => t.id === selectedType);
      const newReport = {
        id: Date.now(),
        name: `${typeObj.name} - ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
        type: typeObj.name,
        date: `${dateRange.start} s/d ${dateRange.end}`,
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        status: 'ready'
      };
      
      setReportsList([newReport, ...reportsList]);
      setIsGenerating(false);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleDownload = (report) => {
    // Generate CSV data based on the report type
    // Since we don't have the exact data for past reports, we'll use the current preview data as a demo
    const typeMap = {
      'Laporan Harian': 'daily',
      'Laporan Mingguan': 'weekly',
      'Laporan Bulanan': 'monthly',
      'Laporan Pengunjung': 'visitor',
      'Laporan Pendapatan': 'revenue',
      'Laporan Tiket': 'ticket',
      'Laporan Stok': 'inventory',
      'Laporan Fasilitas': 'branch'
    };
    
    const dataKey = typeMap[report.type] || 'daily';
    const data = previewDataMap[dataKey];
    
    if (!data || data.length === 0) return;
    
    // Create CSV header
    const headers = Object.keys(data[0]).join(',');
    
    // Create CSV rows
    const rows = data.map(row => {
      return Object.values(row).map(value => `"${value}"`).join(',');
    });
    
    // Combine header and rows
    const csvContent = [headers, ...rows].join('\n');
    
    // Create Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Pusat Laporan</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Analisis mendalam dan pembuatan laporan otomatis</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
            {isGenerating ? 'Memproses...' : 'Buat Laporan Baru'}
          </div>
        </button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Laporan berhasil dibuat dan siap diunduh!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Report Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pilih Jenis Laporan</h3>
              <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-600">
                <Settings className="w-5 h-5" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {reportTypes.map((type, index) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                
                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`relative p-4 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-3 h-32 ${
                      isSelected
                        ? 'bg-white dark:bg-gray-800 shadow-xl ring-2 ring-primary-500 scale-105 z-10'
                        : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${type.color} ${isSelected ? 'shadow-lg ' + type.shadow : ''}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-sm font-semibold text-center leading-tight ${
                      isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {type.name}
                    </p>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Date Range & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Parameter Laporan</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Dari Tanggal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all font-medium text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Sampai Tanggal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all font-medium text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Lokasi Fasilitas
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all font-medium text-gray-700 dark:text-gray-200 appearance-none">
                  <option>Semua Fasilitas</option>
                  <option>Restoran Utama</option>
                  <option>Lapangan Golf</option>
                  <option>Water Park</option>
                  <option>Kafe \u0026 Lounge</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Recent Reports List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Riwayat Laporan</h3>
              <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama Laporan</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Periode</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                  <AnimatePresence>
                    {reportsList.map((report) => (
                      <motion.tr 
                        key={report.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 dark:text-white block">{report.name}</span>
                              <span className="text-xs text-gray-500">{report.size} • CSV / Spreadsheet</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{report.date}</span>
                        </td>
                        <td className="py-4 px-6">
                          {report.status === 'ready' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Selesai
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Proses
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleDownload(report)}
                              disabled={report.status !== 'ready'}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 transition-colors disabled:opacity-50"
                              title="Unduh Data (Excel/CSV)"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              disabled={report.status !== 'ready'}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 transition-colors disabled:opacity-50"
                              title="Cetak"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar Charts & Actions */}
        <div className="space-y-8">
          {/* Summary Charts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Pratinjau Data</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-500">{chartTitles.top}</h4>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">+12.5%</span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentPreviewData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="chart1" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-500">{chartTitles.bottom}</h4>
                  <span className="text-xs font-bold text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-md">+8.2%</span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentPreviewData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <Tooltip
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="chart2" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Insights / Executive Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-400" />
              Ringkasan Eksekutif
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-1">Pertumbuhan Tertinggi</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">Kategori F&B</p>
                  <span className="text-sm font-black text-emerald-400">+24.5%</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-1">Kontribusi Terbesar</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">Main Complex</p>
                  <span className="text-sm font-black text-blue-400">45% Total</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 border-l-4 border-l-amber-500">
                <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-1">Peringatan</p>
                <p className="text-sm font-medium mt-1">Stok suvenir payung hampir habis menjelang musim hujan.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
