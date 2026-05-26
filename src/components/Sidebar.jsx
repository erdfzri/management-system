import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Ticket,
  Users,
  ScanLine,
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  Building2,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Compass,
  X,
  LogOut
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Beranda', path: '/dashboard' },
  { icon: Ticket, label: 'Tiket', path: '/ticketing' },
  { icon: Users, label: 'Pengunjung', path: '/visitors' },
  { icon: ScanLine, label: 'Checkpoint', path: '/checkpoints' },
  {
    icon: ShoppingCart,
    label: 'Kasir',
    path: '/pos-group',
    submenu: [
      { label: 'Dashboard POS', path: '/pos' },
      { label: 'Buat Transaksi F&B', path: '/pos/transaction' },
      { label: 'Jual Tiket Masuk', path: '/pos/ticket' }
    ]
  },
  { icon: Package, label: 'Gudang', path: '/inventory' },
  { icon: BarChart3, label: 'Analitik', path: '/analytics' },
  { icon: FileText, label: 'Laporan', path: '/reports' },
  { icon: Building2, label: 'Kelola Fasilitas', path: '/branches' },
  { icon: UserCog, label: 'Kelola Staff', path: '/staff' },
  { icon: Settings, label: 'Pengaturan', path: '/settings' },
];

export default function Sidebar({ currentPage, onNavigate, mobileSidebarOpen, setMobileSidebarOpen, collapsed, setCollapsed }) {
  // ✅ Perbaikan: State awal diubah menjadi array kosong []
  // sehingga menu Kasir tidak terbuka secara default saat aplikasi dimuat atau di-refresh
  const [expandedMenus, setExpandedMenus] = useState([]);

  const toggleSubmenu = (path) => {
    setExpandedMenus(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? '5rem' : '15rem' }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 shadow-2xl md:shadow-lg transition-transform duration-300 ${!mobileSidebarOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-6 h-6 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden p-0.5">
                  <img src="/logo.svg" alt="Grand Oasis Logo" className="w-full h-full object-contain relative z-10 drop-shadow-sm transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Grand Oasis
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 opacity-80 mt-[-2px]">
                    Enterprise
                  </p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isSubmenuActive = hasSubmenu && item.submenu.some(sub => sub.path === currentPage);
                const isActive = currentPage === item.path || isSubmenuActive;
                const isExpanded = expandedMenus.includes(item.path);

                return (
                  <div key={item.path} className="space-y-1">
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        if (hasSubmenu && !collapsed) {
                          toggleSubmenu(item.path);
                        } else {
                          if (hasSubmenu && collapsed) setCollapsed(false);
                          onNavigate(hasSubmenu ? item.submenu[0].path : item.path);
                        }
                      }}
                      className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive
                          ? 'bg-gradient-purple text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                      )}
                      {!collapsed && hasSubmenu && (
                        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      )}
                      {isActive && !collapsed && !hasSubmenu && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>

                    {/* Submenu */}
                    {!collapsed && hasSubmenu && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-11 pr-2 space-y-1 overflow-hidden"
                      >
                        {item.submenu.map(subItem => (
                          <button
                            key={subItem.path}
                            onClick={() => onNavigate(subItem.path)}
                            className={`
                            w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
                            ${currentPage === subItem.path
                                ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
                              }
                          `}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* User Profile & Logout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2"
          >
            {!collapsed && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-primary-50 to-lavender-100 dark:from-primary-900/20 dark:to-primary-800/20">
                <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center text-white font-semibold flex-shrink-0">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Pengguna Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Super Admin</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => onNavigate('/')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ${collapsed ? 'justify-center' : ''}`}
              title="Logout"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium text-sm flex-1 text-left">Keluar</span>
              )}
            </button>
          </motion.div>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

      </motion.aside>
    </>
  );
}
