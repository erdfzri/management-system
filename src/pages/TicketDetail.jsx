import { motion } from 'framer-motion';
import { ArrowLeft, Printer, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function TicketDetail({ onBack }) {
  // Mock data for the receipt
  const ticket = {
    id: 'TKT-2026-0892',
    wahana: 'Water Park Grand Oasis',
    date: '26 Mei 2026',
    time: '08:00 - 18:00',
    type: 'Tiket Reguler',
    qty: 2,
    pricePerTicket: 150000,
    status: 'Aktif',
    qr: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=TKT-2026-0892',
    customerName: 'Customer Demo',
    paymentMethod: 'Transfer Bank (BCA)'
  };

  const total = ticket.qty * ticket.pricePerTicket;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 pb-20 print:bg-white print:pb-0">
      {/* Header (Hidden when printing) */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 print:hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Detail Tiket</h1>
          </div>
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> Cetak Struk
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 print:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden print:border-none print:shadow-none print:rounded-none"
        >
          {/* Receipt Header */}
          <div className="p-8 text-center border-b border-gray-100 dark:border-gray-800 border-dashed">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 print:hidden">
               <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black mb-1">Grand Oasis Resort</h2>
            <p className="text-gray-500 text-sm font-medium">E-Ticket & Bukti Pembayaran</p>
          </div>

          {/* QR Code Section */}
          <div className="p-8 flex flex-col items-center justify-center border-b border-gray-100 dark:border-gray-800 border-dashed bg-gray-50 dark:bg-gray-800/20 print:bg-white print:border-b-2 print:border-black">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 mb-4 print:border-black print:shadow-none">
              <img src={ticket.qr} alt="QR Code" className="w-40 h-40 mix-blend-multiply print:w-48 print:h-48" />
            </div>
            <p className="text-lg font-black tracking-widest text-gray-800 dark:text-gray-200">{ticket.id}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 print:text-black">Scan at Gate</p>
          </div>

          {/* Ticket Details */}
          <div className="p-8 space-y-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 print:text-gray-600">Wahana / Aktivitas</p>
              <h3 className="text-xl font-bold">{ticket.wahana}</h3>
              <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase rounded-md border border-emerald-100 print:border-none print:bg-transparent print:p-0">
                <CheckCircle className="w-3 h-3 inline mr-1 -mt-0.5" /> {ticket.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 print:text-gray-600">Tanggal</p>
                <p className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500 print:hidden" /> {ticket.date}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 print:text-gray-600">Waktu</p>
                <p className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500 print:hidden" /> {ticket.time}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 print:border-black">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 print:text-gray-600">Rincian Pembayaran</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium print:text-black">Nama Pelanggan</span>
                  <span className="font-bold">{ticket.customerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium print:text-black">Metode Pembayaran</span>
                  <span className="font-bold">{ticket.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium print:text-black">Tipe Tiket</span>
                  <span className="font-bold">{ticket.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium print:text-black">Harga Satuan</span>
                  <span className="font-bold">Rp {ticket.pricePerTicket.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium print:text-black">Jumlah</span>
                  <span className="font-bold">{ticket.qty} Tiket</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-900 dark:border-gray-100 pt-4 flex justify-between items-center print:border-black">
              <span className="font-bold uppercase tracking-wider">Total Pembayaran</span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 print:text-black">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 text-center print:bg-transparent print:border-t print:border-black print:mt-8">
            <p className="text-xs text-gray-500 font-medium print:text-black">
              Tiket ini sah dan diterbitkan oleh sistem Grand Oasis Resort.<br/>
              Harap tunjukkan QR Code ini kepada petugas di pintu masuk wahana.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
