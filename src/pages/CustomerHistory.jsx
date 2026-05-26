import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, Calendar, Clock, MapPin, Search, Filter, 
  ChevronRight, CheckCircle, XCircle, ArrowLeft, LogOut
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function CustomerHistory({ onLogout, onBack, onViewDetail }) {
  const { facilitiesData, ticketCategories } = useGlobal();
  const [activeTab, setActiveTab] = useState('active'); // active, history
  
  // Use data from GlobalContext to make it related to Landing Page
  const activeTickets = [
    {
      id: 'TKT-2026-0892',
      wahana: facilitiesData[0]?.title || 'Water Park',
      img: facilitiesData[0]?.img || '/waterpark.jpg',
      date: '26 Mei 2026',
      time: facilitiesData[0]?.hours || '08:00 - 18:00',
      type: ticketCategories[0]?.name || 'Tiket Reguler',
      qty: 2,
      status: 'Aktif',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TKT-2026-0892'
    },
    {
      id: 'TKT-2026-0893',
      wahana: facilitiesData[1]?.title || 'Kolam Ombak',
      img: facilitiesData[1]?.img || '/kolam-ombak.png',
      date: '26 Mei 2026',
      time: facilitiesData[1]?.hours || '08:00 - 18:00',
      type: ticketCategories[1]?.name || 'Paket Bundle',
      qty: 1,
      status: 'Aktif',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TKT-2026-0893'
    }
  ];

  const pastTickets = [
    {
      id: 'TKT-2026-0150',
      wahana: facilitiesData[3]?.title || 'Area Bermain Anak',
      img: facilitiesData[3]?.img || '/taman-bermain.jpg',
      date: '10 Mei 2026',
      time: facilitiesData[3]?.hours || '08:00 - 20:00',
      type: ticketCategories[3]?.name || 'Tiket VIP',
      qty: 3,
      status: 'Digunakan'
    },
    {
      id: 'TKT-2026-0042',
      wahana: facilitiesData[2]?.title || 'Lapangan Golf',
      img: facilitiesData[2]?.img || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
      date: '2 April 2026',
      time: facilitiesData[2]?.hours || '06:00 - 18:00',
      type: ticketCategories[0]?.name || 'Tiket Reguler',
      qty: 1,
      status: 'Kadaluarsa'
    }
  ];

  const displayTickets = activeTab === 'active' ? activeTickets : pastTickets;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Tiket Saya</h1>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">

        {/* Tabs */}
        <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'active' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Tiket Aktif ({activeTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'history' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Riwayat ({pastTickets.length})
          </button>
        </div>

        {/* Ticket List */}
        <div className="space-y-4">
          {displayTickets.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow relative group"
            >
              {/* Ticket Content */}
              <div className="p-5 flex-grow relative bg-white dark:bg-gray-900 flex flex-col sm:flex-row gap-5">
                {/* Thumbnail from Landing Page Data */}
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <img src={ticket.img} alt={ticket.wahana} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md mb-2">
                        {ticket.type}
                      </span>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{ticket.wahana}</h3>
                      <p className="text-xs text-gray-500 font-bold tracking-wide">{ticket.id} • {ticket.qty} Orang</p>
                    </div>
                    {ticket.status === 'Aktif' && (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                        <CheckCircle className="w-3.5 h-3.5" /> Aktif
                      </span>
                    )}
                    {ticket.status === 'Digunakan' && (
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                        <CheckCircle className="w-3.5 h-3.5" /> Selesai
                      </span>
                    )}
                    {ticket.status === 'Kadaluarsa' && (
                      <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-800/30">
                        <XCircle className="w-3.5 h-3.5" /> Kadaluarsa
                      </span>
                    )}
                  </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-blue-500">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Tanggal</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{ticket.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-blue-500">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Waktu</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{ticket.time}</p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* Dashed Separator */}
              <div className="hidden md:block relative w-0 border-r-2 border-dashed border-gray-200 dark:border-gray-700 my-4">
                <div className="absolute -top-6 -left-3 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full border border-gray-200 dark:border-gray-800 border-b-transparent border-l-transparent border-r-transparent transform rotate-45"></div>
                <div className="absolute -bottom-6 -left-3 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full border border-gray-200 dark:border-gray-800 border-t-transparent border-l-transparent border-r-transparent transform rotate-45"></div>
              </div>
              <div className="md:hidden relative h-0 border-b-2 border-dashed border-gray-200 dark:border-gray-700 mx-4">
                <div className="absolute -left-7 -top-3 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full border border-gray-200 dark:border-gray-800 border-t-transparent border-b-transparent border-l-transparent"></div>
                <div className="absolute -right-7 -top-3 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full border border-gray-200 dark:border-gray-800 border-t-transparent border-b-transparent border-r-transparent"></div>
              </div>

              {/* Right Side / QR / Actions */}
              <div className="p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-900 min-w-[200px] gap-3">
                {activeTab === 'active' && ticket.qr && (
                  <div className="flex flex-col items-center mb-1">
                    <div className="bg-white p-2 rounded-xl mb-2 shadow-sm border border-gray-200 group-hover:scale-105 transition-transform">
                      <img src={ticket.qr} alt="QR Code" className="w-20 h-20 mix-blend-multiply" />
                    </div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Scan at Gate</p>
                  </div>
                )}
                
                <button 
                  onClick={() => onViewDetail && onViewDetail(ticket.id)}
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95"
                >
                  Lihat Detail & Cetak
                </button>
              </div>
            </motion.div>
          ))}

          {displayTickets.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Ticket className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Tidak ada tiket di sini.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
