import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Users, DollarSign, TrendingUp, Plus, X, Check, Activity, Search, Map } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function Branches() {
  const { branches, setBranches } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newBranch, setNewBranch] = useState({
    name: '',
    location: '',
    manager: ''
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const totalRevenue = branches.reduce((sum, branch) => sum + branch.revenue, 0);
  const totalVisitors = branches.reduce((sum, branch) => sum + branch.visitors, 0);
  
  const performanceData = branches.map(branch => ({
    branch: branch.name,
    revenue: branch.revenue / 1000000,
    visitors: branch.visitors,
  }));

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    branch.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBranch = (e) => {
    e.preventDefault();
    if (!newBranch.name || !newBranch.location) return;

    const newBranchObj = {
      id: `BR-${Date.now()}`,
      name: newBranch.name,
      location: newBranch.location,
      manager: newBranch.manager || 'Belum Ditugaskan',
      visitors: 0,
      revenue: 0,
      status: 'active'
    };

    setBranches([...branches, newBranchObj]);
    setIsModalOpen(false);
    setNewBranch({ name: '', location: '', manager: '' });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Kelola Cabang</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Pantau performa, pendapatan, dan manajemen semua cabang</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tambah Cabang Baru
          </div>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cabang Aktif"
          value={`${branches.length} Lokasi`}
          icon={Building2}
          color="blue"
          delay={0}
        />

        <StatCard
          title="Total Pendapatan (Harian)"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          color="green"
          delay={0.1}
        />

        <StatCard
          title="Total Pengunjung"
          value={`${totalVisitors.toLocaleString()} Orang`}
          icon={Users}
          color="orange"
          delay={0.2}
        />

        <StatCard
          title="Rata-Rata Pendapatan Cabang"
          value={formatCurrency(totalRevenue / (branches.length || 1))}
          icon={TrendingUp}
          color="indigo"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branch List */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau lokasi cabang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBranches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity" />
                
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                      <Building2 className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{branch.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 text-primary-500" />
                        {branch.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-bold text-gray-500">Pengunjung</p>
                    </div>
                    <p className="text-xl font-black text-gray-900 dark:text-white">{branch.visitors.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                     <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Pendapatan</p>
                    </div>
                    <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 truncate">{formatCurrency(branch.revenue)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                      {branch.manager.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-gray-900 dark:text-white leading-tight">{branch.manager}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Branch Manager</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    branch.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${branch.status === 'active' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                    {branch.status === 'active' ? 'Beroperasi' : 'Tutup'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Analytics */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-500" />
              Perbandingan Pendapatan
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" opacity={0.5} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis dataKey="branch" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={80} />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`Rp ${value} Juta`, 'Pendapatan']}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Branch Rankings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Peringkat Cabang (Pendapatan)
            </h3>
            <div className="space-y-4">
              {[...branches].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((branch, index) => (
                <div key={branch.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-inner ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    'bg-gradient-to-br from-gray-700 to-gray-900'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate">{branch.name}</h4>
                    <p className="text-xs font-semibold text-gray-500 truncate">{branch.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(branch.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add New Branch Modal */}
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
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tambah Cabang Baru</h2>
                    <p className="text-xs text-gray-500">Daulat cabang wisata/kantor baru</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateBranch} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    Nama Cabang
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                    placeholder="Contoh: VistaOne Bali Resort"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Map className="w-4 h-4 text-gray-400" />
                    Lokasi/Kota
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newBranch.location}
                    onChange={(e) => setNewBranch({...newBranch, location: e.target.value})}
                    placeholder="Contoh: Denpasar, Bali"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    Manajer Cabang (Opsional)
                  </label>
                  <input 
                    type="text" 
                    value={newBranch.manager}
                    onChange={(e) => setNewBranch({...newBranch, manager: e.target.value})}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
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
                    Simpan Cabang
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
