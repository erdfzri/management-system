import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCog, Users, Shield, Key, Search, Plus, Filter, MoreVertical, X, Mail, Phone, Lock, Check } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function Staff() {
  const { staffRoles } = useGlobal();

  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'John Manager', role: 'Area Manager', email: 'john@tourism.com', phone: '+62 812-3456-7890', status: 'active', avatar: 'JM' },
    { id: 2, name: 'Sarah Beach', role: 'Area Manager', email: 'sarah@tourism.com', phone: '+62 812-3456-7891', status: 'active', avatar: 'SB' },
    { id: 3, name: 'Mike Hill', role: 'Area Manager', email: 'mike@tourism.com', phone: '+62 812-3456-7892', status: 'active', avatar: 'MH' },
    { id: 4, name: 'Lisa Park', role: 'Area Manager', email: 'lisa@tourism.com', phone: '+62 812-3456-7893', status: 'active', avatar: 'LP' },
    { id: 5, name: 'Tom Cashier', role: 'Cashier', email: 'tom@tourism.com', phone: '+62 812-3456-7894', status: 'active', avatar: 'TC' },
    { id: 6, name: 'Emma Store', role: 'Warehouse Staff', email: 'emma@tourism.com', phone: '+62 812-3456-7895', status: 'active', avatar: 'ES' },
    { id: 7, name: 'David Gate', role: 'Gate Officer', email: 'david@tourism.com', phone: '+62 812-3456-7896', status: 'active', avatar: 'DG' },
    { id: 8, name: 'Anna Admin', role: 'Super Admin', email: 'anna@tourism.com', phone: '+62 812-3456-7897', status: 'active', avatar: 'AA' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Cashier'
  });

  const totalStaff = staffRoles.reduce((sum, role) => sum + role.count, 0);

  const permissions = {
    'Super Admin': ['All Access', 'User Management', 'System Settings', 'Reports', 'Analytics', 'Financial Data'],
    'Owner': ['View All', 'Reports', 'Analytics', 'Financial Data', 'Branch Management'],
    'Area Manager': ['Manage Area', 'View Reports', 'Manage Staff', 'Inventory', 'POS Access'],
    'Cashier': ['POS', 'Transactions', 'View Products', 'Process Payments'],
    'Warehouse Staff': ['Inventory', 'Stock Management', 'Supplier Management', 'Receive Goods'],
    'Gate Officer': ['Checkpoint', 'Scan Tickets', 'Visitor Tracking', 'Access Control'],
  };

  const filteredStaff = staffMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    const initials = newStaff.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newStaffObj = {
      id: Date.now(),
      name: newStaff.name,
      role: newStaff.role,
      email: newStaff.email,
      phone: newStaff.phone || '-',
      status: 'active',
      avatar: initials
    };

    setStaffMembers([newStaffObj, ...staffMembers]);
    setIsModalOpen(false);
    setNewStaff({ name: '', email: '', phone: '', role: 'Cashier' });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Kelola Staff</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Manajemen pengguna, peran, dan hak akses sistem</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tambah Staff Baru
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Staff"
          value={`${totalStaff + (staffMembers.length - 8)} Orang`}
          icon={Users}
          color="blue"
          delay={0}
        />

        <StatCard
          title="Peran (Roles)"
          value={`${staffRoles.length} Grup`}
          icon={Shield}
          color="purple"
          delay={0.1}
        />

        <StatCard
          title="Hadir Hari Ini"
          value={`${Math.max(0, totalStaff - 5 + (staffMembers.length - 8))} Aktif`}
          icon={UserCog}
          color="green"
          delay={0.2}
        />

        <StatCard
          title="Hak Akses"
          value="24 Modul"
          icon={Key}
          color="orange"
          delay={0.3}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Staff Table */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/30">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                Daftar Pegawai
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari nama, email, atau peran..."
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

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Profil Pegawai</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Kontak</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm ${
                            member.role === 'Super Admin' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                            member.role === 'Area Manager' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                            'bg-gradient-to-br from-blue-400 to-cyan-500'
                          }`}>
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{member.name}</p>
                            <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {member.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          member.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                          {member.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold transition-colors">
                            Edit
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar - Role Overview & Permissions */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-500" />
              Komposisi Peran
            </h3>
            <div className="space-y-4">
              {staffRoles.map((role, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-primary-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900 dark:text-white">{role.role}</h4>
                    <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center font-bold text-sm">
                      {role.count}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.slice(0, 3).map((perm, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
                        {perm}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="text-[10px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-500 px-2 py-1 rounded-md">
                        +{role.permissions.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Staff Modal */}
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
                    <UserCog className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tambah Staff Baru</h2>
                    <p className="text-xs text-gray-500">Berikan akses sistem kepada pegawai baru</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateStaff} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    Nama Lengkap
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email
                    </label>
                    <input 
                      type="email" 
                      required
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      placeholder="budi@contoh.com"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      No. Telepon
                    </label>
                    <input 
                      type="text" 
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                      placeholder="+62 8..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    Pilih Peran (Role)
                  </label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-shadow appearance-none cursor-pointer"
                  >
                    {Object.keys(permissions).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                    Sandi sementara akan dikirimkan otomatis ke alamat email yang terdaftar. Karyawan harus mengubah sandi saat pertama kali login.
                  </p>
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
                    className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all active:scale-95 flex justify-center items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Simpan Staff
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
