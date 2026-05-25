import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, CreditCard, Smartphone, Banknote, TrendingUp, PackageSearch, Receipt, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function POS() {
  const { paymentMethods, recentTransactions } = useGlobal();
  console.log("POS Component rendered with StatCards");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const totalTransactions = paymentMethods.reduce((sum, pm) => sum + pm.transactions, 0);
  const totalAmount = paymentMethods.reduce((sum, pm) => sum + pm.amount, 0);

  const topProducts = [
    { name: 'Paket Bundling Keluarga', sold: 234, revenue: 35100000, trend: '+12%' },
    { name: 'Tiket VIP Akses Cepat', sold: 456, revenue: 9120000, trend: '+5%' },
    { name: 'Souvenir T-Shirt Eksklusif', sold: 189, revenue: 9450000, trend: '-2%' },
    { name: 'Voucher Restoran Premium', sold: 312, revenue: 15600000, trend: '+18%' },
    { name: 'Kopi Susu Gula Aren', sold: 267, revenue: 13350000, trend: '+8%' },
  ];

  const hourlyData = [
    { hour: '08:00', sales: 1200000 },
    { hour: '09:00', sales: 2800000 },
    { hour: '10:00', sales: 4500000 },
    { hour: '11:00', sales: 6200000 },
    { hour: '12:00', sales: 8900000 },
    { hour: '13:00', sales: 7600000 },
    { hour: '14:00', sales: 9400000 },
    { hour: '15:00', sales: 10800000 },
    { hour: '16:00', sales: 8700000 },
    { hour: '17:00', sales: 6500000 },
  ];

  const paymentColors = ['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Dashboard Kasir</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Ringkasan transaksi Point of Sale dan analitik penjualan</p>
        </div>
        <button 
          onClick={() => window.location.href = '#/pos/transaction'}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Buka Terminal POS
          </div>
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Transaksi"
          value={totalTransactions.toLocaleString()}
          icon={Receipt}
          trend="up"
          trendValue="+12.5%"
          color="blue"
          delay={0}
        />

        <StatCard
          title="Total Pendapatan"
          value={formatCurrency(totalAmount)}
          icon={DollarSign}
          subtitle="Sangat baik"
          color="green"
          delay={0.1}
        />

        <StatCard
          title="Rata-rata Transaksi"
          value={formatCurrency(totalAmount / (totalTransactions || 1))}
          icon={CreditCard}
          trend="up"
          trendValue="+5.2%"
          color="purple"
          delay={0.2}
        />

        <StatCard
          title="Dominasi QRIS"
          value={`${paymentMethods.find(p => p.method === 'QRIS')?.percentage || 0}%`}
          icon={Smartphone}
          subtitle="Dari seluruh pembayaran"
          color="orange"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tren Pendapatan Harian</h3>
              <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold rounded-xl px-4 py-2 outline-none">
                <option>Hari Ini</option>
                <option>Kemarin</option>
                <option>7 Hari Terakhir</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    dx={-10}
                    tickFormatter={(value) => `Rp ${value / 1000000}M`}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Products Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <PackageSearch className="w-5 h-5 text-primary-500" />
                Produk Terlaris
              </h3>
            </div>
            <div className="space-y-5">
              {topProducts.map((product, index) => {
                const maxRevenue = Math.max(...topProducts.map(p => p.revenue));
                const percentage = (product.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                          index === 0 ? 'bg-amber-100 text-amber-600' :
                          index === 1 ? 'bg-gray-200 text-gray-600' :
                          index === 2 ? 'bg-orange-100 text-orange-600' :
                          'bg-primary-50 text-primary-600'
                        }`}>
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{product.name}</h4>
                          <p className="text-xs font-semibold text-gray-500">{product.sold} terjual</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(product.revenue)}</p>
                        <p className={`text-xs font-bold flex items-center justify-end gap-0.5 ${
                          product.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                          {product.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {product.trend}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                        className={`h-full rounded-full ${
                          index === 0 ? 'bg-amber-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-500' :
                          'bg-primary-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Metode Pembayaran</h3>
            
            {/* Donut Chart */}
            <div className="h-48 mb-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="amount"
                    stroke="none"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={paymentColors[index % paymentColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-gray-900 dark:text-white">
                  {paymentMethods.length}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Metode</span>
              </div>
            </div>

            {/* Methods List */}
            <div className="space-y-3">
              {paymentMethods.map((method, index) => {
                const icons = {
                  'QRIS': Smartphone,
                  'Cash': Banknote,
                  'Debit Card': CreditCard,
                  'Credit Card': CreditCard,
                };
                const Icon = icons[method.method] || CreditCard;
                
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${paymentColors[index]}20`, color: paymentColors[index] }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{method.method}</h4>
                      <p className="text-xs font-semibold text-gray-500">{method.percentage}% • {method.transactions} trx</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Orders - Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transaksi Terbaru</h3>
              <button className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg transition-colors">
                Lihat Semua
              </button>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{transaction.id}</h4>
                      <p className="text-xs font-medium text-gray-500">{transaction.time}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      transaction.status === 'completed' || transaction.status === 'selesai'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 line-clamp-1 flex-1 pr-2">
                      {transaction.type}
                    </p>
                    <p className="text-sm font-black text-gray-900 dark:text-white shrink-0">
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
