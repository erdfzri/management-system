import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  Ticket,
  UserCheck,
  MapPin,
  AlertTriangle,
  ScanLine,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import StatCard from '../components/StatCard';
import { useGlobal } from '../context/GlobalContext';

export default function Dashboard() {
  const {
    dashboardStats,
    visitorTrend,
    areaDistribution,
    recentTransactions,
    checkpointStatus,
    topAttractions
  } = useGlobal();
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const activeCheckpoints = checkpointStatus.filter(cp => cp.status === 'online').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ringkasan Hari Ini</h1>
        <p className="text-gray-600 dark:text-gray-400">Selamat datang kembali! Ini yang terjadi hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pengunjung Hari Ini"
          value={dashboardStats.totalVisitors.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="+12.5%"
          color="purple"
          delay={0}
        />
        <StatCard
          title="Pendapatan Hari Ini"
          value={formatCurrency(dashboardStats.revenueToday)}
          icon={DollarSign}
          trend="up"
          trendValue="+8.2%"
          color="green"
          delay={0.1}
        />
        <StatCard
          title="Tiket Terjual"
          value={dashboardStats.ticketsSold.toLocaleString()}
          icon={Ticket}
          trend="up"
          trendValue="+15.3%"
          color="blue"
          delay={0.2}
        />
        <StatCard
          title="Pengunjung Aktif"
          value={dashboardStats.activeVisitors.toLocaleString()}
          icon={UserCheck}
          trend="down"
          trendValue="-3.1%"
          color="orange"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Grafik Pengunjung</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alur pengunjung hari ini</p>
            </div>
            <Activity className="w-5 h-5 text-primary-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Area Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sebaran Area</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pengunjung per lokasi</p>
            </div>
            <MapPin className="w-5 h-5 text-primary-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={areaDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {areaDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Attractions & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Attractions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wahana Terpopuler</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Paling banyak dikunjungi hari ini</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary-500" />
          </div>
          <div className="space-y-4">
            {topAttractions.map((attraction, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{attraction.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {attraction.visitors} pengunjung
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ⭐ {attraction.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{formatCurrency(attraction.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          {/* Most Crowded Area */}
          <div className="card bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <MapPin className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Area Paling Ramai</p>
            <h3 className="text-2xl font-bold">{dashboardStats.mostCrowdedArea}</h3>
            <p className="text-sm opacity-80 mt-2">450 pengunjung aktif</p>
          </div>

          {/* Inventory Alerts */}
          <div className="card bg-gradient-to-br from-orange-500 to-orange-700 text-white">
            <AlertTriangle className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Peringatan Stok</p>
            <h3 className="text-2xl font-bold">{dashboardStats.inventoryAlerts}</h3>
            <p className="text-sm opacity-80 mt-2">Barang perlu perhatian</p>
          </div>

          {/* Active Checkpoints */}
          <div className="card bg-gradient-to-br from-green-500 to-green-700 text-white">
            <ScanLine className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Checkpoint Aktif</p>
            <h3 className="text-2xl font-bold">{activeCheckpoints}/{checkpointStatus.length}</h3>
            <p className="text-sm opacity-80 mt-2">Semua sistem operasional</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pembelian tiket terakhir</p>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Lihat Semua
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">ID Transaksi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Pelanggan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Jenis</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Jumlah</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Waktu</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{transaction.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{transaction.customer}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{transaction.type}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(transaction.amount)}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{transaction.time}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'selesai'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
