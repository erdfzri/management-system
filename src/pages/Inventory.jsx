import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Search,
  Filter,
  Plus,
  RefreshCw,
  Box,
  Truck,
  MoreVertical,
  X,
  Check,
  Tag,
  Hash
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function Inventory() {
  const { inventoryItems, setInventoryItems, restockInventory } = useGlobal();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    stock: '',
    minStock: '',
    supplier: ''
  });

  const criticalItems = inventoryItems.filter(item => item.status === 'critical').length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low').length;
  const goodStockItems = inventoryItems.filter(item => item.status === 'good').length;
  const totalValue = inventoryItems.reduce((acc, item) => acc + (item.stock * (item.price || 15000)), 0);

  const stockTrend = [
    { month: 'Jan', stock: 8500 },
    { month: 'Feb', stock: 7800 },
    { month: 'Mar', stock: 8200 },
    { month: 'Apr', stock: 7500 },
    { month: 'May', stock: 8900 },
    { month: 'Jun', stock: 9200 },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'critical':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800',
          dot: 'bg-red-500'
        };
      case 'low':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          text: 'text-orange-700 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-800',
          dot: 'bg-orange-500'
        };
      case 'good':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-900/20',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800',
          dot: 'bg-emerald-500'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          text: 'text-gray-700 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-800',
          dot: 'bg-gray-500'
        };
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.stock || !newItem.minStock) return;

    const stockNum = parseInt(newItem.stock);
    const minStockNum = parseInt(newItem.minStock);
    let status = 'good';
    if (stockNum < minStockNum) status = 'critical';
    else if (stockNum < minStockNum * 1.5) status = 'low';

    const newInventoryItem = {
      id: `INV-${Date.now()}`,
      name: newItem.name,
      category: newItem.category || 'Lainnya',
      stock: stockNum,
      minStock: minStockNum,
      status: status,
      supplier: newItem.supplier || 'Internal',
      price: Math.floor(Math.random() * 50000) + 10000 // Mock price
    };

    setInventoryItems([newInventoryItem, ...inventoryItems]);
    setIsModalOpen(false);
    setNewItem({ name: '', category: '', stock: '', minStock: '', supplier: '' });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Manajemen Gudang</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Pantau pergerakan stok, nilai aset, dan peringatan inventaris</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tambah Barang Baru
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jenis Barang"
          value={`${inventoryItems.length} SKU`}
          icon={Box}
          color="blue"
          delay={0}
        />

        <StatCard
          title="Stok Menipis (Low)"
          value={`${lowStockItems} Barang`}
          icon={TrendingDown}
          color="orange"
          delay={0.1}
        />

        <StatCard
          title="Stok Kritis (Kosong)"
          value={`${criticalItems} Darurat`}
          icon={AlertTriangle}
          color="pink"
          delay={0.2}
        />

        <StatCard
          title="Total Nilai Aset"
          value={formatCurrency(totalValue)}
          icon={Package}
          color="green"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Inventory Table */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/30">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-primary-500" />
                Daftar Barang Gudang
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari nama barang/kategori..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                  />
                </div>
                <button className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Info Barang</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Ketersediaan</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Supplier</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                  {filteredItems.map((item) => {
                    const statusStyle = getStatusStyle(item.status);
                    const stockRatio = Math.min((item.stock / (item.minStock * 2)) * 100, 100);
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                              <Package className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</p>
                              <p className="text-xs font-semibold text-gray-500 flex items-center gap-1 mt-0.5">
                                <Tag className="w-3 h-3" /> {item.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="mb-2 flex justify-between items-end">
                            <span className="font-black text-gray-900 dark:text-white">{item.stock} <span className="text-xs font-semibold text-gray-400">unit</span></span>
                            <span className="text-xs font-semibold text-gray-500">Min: {item.minStock}</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${statusStyle.dot}`}
                              style={{ width: `${stockRatio}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                            {item.status === 'critical' ? 'Kritis' : item.status === 'low' ? 'Menipis' : 'Aman'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            <Truck className="w-4 h-4 text-gray-400" />
                            {item.supplier}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => restockInventory(item.id, 50)}
                              className="px-3 py-1.5 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3" /> Restock
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Tren Volume Stok</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={stockTrend}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="stock" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorStock)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Action Required */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Butuh Tindakan</h3>
                <p className="text-xs font-semibold text-gray-500">Stok Kritis / Kosong</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {inventoryItems.filter(item => item.status === 'critical').map(item => (
                <div key={item.id} className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                    <p className="text-xs font-semibold text-red-600 mt-1">Sisa {item.stock} unit (Min: {item.minStock})</p>
                  </div>
                  <button 
                    onClick={() => restockInventory(item.id, 100)}
                    className="p-2 bg-white dark:bg-gray-800 text-red-600 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900/50"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {criticalItems === 0 && (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                  <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-500">Semua stok aman!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add New Item Modal */}
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
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tambah Barang Gudang</h2>
                    <p className="text-xs text-gray-500">Daftarkan SKU baru ke inventaris</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateItem} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    Nama Barang
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Contoh: Botol Minum 600ml"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      Stok Awal
                    </label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                      placeholder="0"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      Batas Minimum
                    </label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                      placeholder="0"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Box className="w-4 h-4 text-gray-400" />
                      Kategori
                    </label>
                    <input 
                      type="text" 
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      placeholder="Contoh: Minuman"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" />
                      Supplier
                    </label>
                    <input 
                      type="text" 
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                      placeholder="Contoh: PT. Aqua"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                    />
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
                    Simpan Barang
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
