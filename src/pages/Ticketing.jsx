import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, TrendingUp, QrCode, DollarSign, Plus, X, Tag, Info, Check, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function Ticketing() {
  const { ticketCategories, setTicketCategories, recentTransactions } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    name: '',
    price: '',
    description: '',
    color: 'bg-gradient-to-br from-blue-500 to-blue-700'
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const totalRevenue = ticketCategories.reduce((sum, cat) => sum + cat.revenue, 0);
  const totalSold = ticketCategories.reduce((sum, cat) => sum + cat.sold, 0);

  const salesData = [
    { month: 'Jan', sales: 450 },
    { month: 'Feb', sales: 520 },
    { month: 'Mar', sales: 680 },
    { month: 'Apr', sales: 590 },
    { month: 'May', sales: 750 },
    { month: 'Jun', sales: 820 },
  ];

  const colorOptions = [
    { label: 'Blue', value: 'bg-gradient-to-br from-blue-500 to-blue-700', hex: 'bg-blue-500' },
    { label: 'Purple', value: 'bg-gradient-to-br from-purple-500 to-purple-700', hex: 'bg-purple-500' },
    { label: 'Orange', value: 'bg-gradient-to-br from-orange-500 to-orange-700', hex: 'bg-orange-500' },
    { label: 'Emerald', value: 'bg-gradient-to-br from-emerald-500 to-emerald-700', hex: 'bg-emerald-500' },
    { label: 'Rose', value: 'bg-gradient-to-br from-rose-500 to-rose-700', hex: 'bg-rose-500' },
  ];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.name || !newTicket.price) return;

    const newCategory = {
      id: `new-${Date.now()}`,
      name: newTicket.name,
      description: newTicket.description || 'Kategori tiket baru',
      price: parseInt(newTicket.price.replace(/\D/g, '') || 0),
      sold: 0,
      revenue: 0,
      color: newTicket.color
    };

    setTicketCategories([...ticketCategories, newCategory]);
    setIsModalOpen(false);
    setNewTicket({ name: '', price: '', description: '', color: colorOptions[0].value });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Manajemen Tiket</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Kelola kategori tiket dan pantau penjualan secara real-time</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Buat Tiket Baru
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Tiket Terjual"
          value={totalSold.toLocaleString()}
          icon={Ticket}
          trend="up"
          trendValue="+15.3%"
          color="purple"
          delay={0}
        />

        <StatCard
          title="Total Pendapatan"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          trend="up"
          trendValue="+22.5%"
          color="green"
          delay={0.1}
        />

        <StatCard
          title="Tiket Sedang Aktif"
          value="1,842"
          icon={QrCode}
          subtitle="Digunakan hari ini"
          color="orange"
          delay={0.2}
        />
      </div>

      {/* Ticket Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Katalog Tiket</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ticketCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="relative p-6 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-transparent bg-white dark:bg-gray-900 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${category.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Ticket className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{category.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px] leading-relaxed">{category.description}</p>
              
              <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">Harga</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(category.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">Terjual</span>
                  <span className="font-bold text-gray-900 dark:text-white">{category.sold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-semibold text-gray-500">Total Pendapatan</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(category.revenue)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tren Penjualan (Ribu)</h3>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 rounded-lg text-xs font-bold">Q1 - Q2 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performa per Kategori</h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-xs font-bold">Terjual</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={ticketCategories}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="sold" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Purchases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transaksi Terbaru</h3>
          <button className="text-sm font-bold text-primary-600 hover:text-primary-700 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-xl transition-colors">
            Lihat Semua
          </button>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Jenis Tiket</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Nominal</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Waktu</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-white">{transaction.id}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">{transaction.customer}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">{transaction.type}</td>
                  <td className="py-4 px-6 text-sm font-bold text-emerald-600">{formatCurrency(transaction.amount)}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500">{transaction.time}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      transaction.status === 'selesai' || transaction.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'selesai' || transaction.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal Buat Tiket */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Buat Tiket Baru</h2>
                    <p className="text-xs text-gray-500">Tambahkan kategori tiket ke sistem</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    Nama Kategori Tiket
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newTicket.name}
                    onChange={(e) => setNewTicket({...newTicket, name: e.target.value})}
                    placeholder="Contoh: Tiket Weekend, Tiket Promo..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    Harga (IDR)
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newTicket.price}
                    onChange={(e) => setNewTicket({...newTicket, price: e.target.value})}
                    placeholder="Contoh: 150000"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Info className="w-4 h-4 text-gray-400" />
                    Deskripsi Singkat
                  </label>
                  <textarea 
                    rows={2}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Fasilitas yang didapat..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Pilih Tema Warna
                  </label>
                  <div className="flex gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.label}
                        type="button"
                        onClick={() => setNewTicket({...newTicket, color: color.value})}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color.hex} ${newTicket.color === color.value ? 'ring-4 ring-offset-2 ring-gray-200 dark:ring-gray-700 ring-offset-white dark:ring-offset-gray-900 scale-110' : ''}`}
                      >
                        {newTicket.color === color.value && <Check className="w-5 h-5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all active:scale-95"
                  >
                    Simpan Tiket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
