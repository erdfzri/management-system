import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, MapPin, Check, CheckCircle2, Image as ImageIcon, X, ChevronLeft, ChevronRight, Compass, ChevronDown, Plus, QrCode } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const aboutImages = [
  "/waterpark.jpg",
  "/kolam-ombak.png",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop",
  "/taman-bermain.jpg",
  "/restoran.jpg"
];

export default function AttractionDetail({ onBack }) {
  const { ticketCategories } = useGlobal();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedTickets, setExpandedTickets] = useState({});
  const [bookingModal, setBookingModal] = useState(null); // stores the selected ticket
  const [bookingQty, setBookingQty] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingStep, setBookingStep] = useState('details'); // details | payment | waiting_payment | success_animation | success
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (bookingStep === 'success_animation') {
      const timer = setTimeout(() => {
        setBookingStep('success');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [bookingStep]);

  const adminFees = {
    'QRIS': 1500,
    'BCA Virtual Account': 4000,
    'Mandiri Virtual Account': 4000,
    'Kartu Kredit': 12000
  };

  const navLinks = [
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Fasilitas', id: 'facilities' },
    { name: 'Tiket', id: 'tickets' },
    { name: 'Testimoni', id: 'testimonials' },
    { name: 'FAQ', id: 'faq' }
  ];

  const wahanaName = useMemo(() => {
    try {
      const hash = window.location.hash;
      const query = hash.split('?')[1];
      const params = new URLSearchParams(query);
      return params.get('wahana') || 'Taman Wahana Utama';
    } catch (e) {
      return 'Taman Wahana Utama';
    }
  }, []);

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const printReceipt = () => {
    const printWindow = window.open('', '', 'width=800,height=900');
    printWindow.document.write(`
      <html>
        <head>
          <title>E-Ticket Grand Oasis - ${wahanaName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #111827; background: #fff; }
            .receipt { border: 2px dashed #e5e7eb; padding: 40px; border-radius: 20px; max-width: 600px; margin: 0 auto; position: relative; background: #fff; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 90px; height: 50px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; }
            h1 { margin: 0; font-size: 24px; font-weight: 900; }
            .subtitle { color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin-top: 8px; }
            .ticket-info { background: #f9fafb; padding: 25px; border-radius: 16px; margin-bottom: 30px; border: 1px solid #f3f4f6; }
            .row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 15px; }
            .row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
            .label { color: #6b7280; font-size: 14px; font-weight: 600; }
            .value { font-weight: bold; font-size: 15px; text-align: right; }
            .barcode { text-align: center; margin-top: 20px; padding-top: 30px; border-top: 2px dashed #e5e7eb; }
            .barcode img { width: 150px; height: 150px; margin: 0 auto; display: block; border-radius: 8px; border: 4px solid #f3f4f6; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 0; }
              .receipt { border: none; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="logo">
                <img src="${window.location.origin}/logo.svg" alt="Grand Oasis Logo" style="width:100%; height:100%; object-fit:contain;" />
              </div>
              <h1>Grand Oasis Resort & Park</h1>
              <div class="subtitle">E-Ticket Resmi</div>
            </div>
            
            <div class="ticket-info">
              <div class="row">
                <div class="label">Nama Wahana</div>
                <div class="value">${wahanaName}</div>
              </div>
              <div class="row">
                <div class="label">Jenis Tiket</div>
                <div class="value">${bookingModal?.name || '-'}</div>
              </div>
              <div class="row">
                <div class="label">Tanggal Kunjungan</div>
                <div class="value">${bookingDate}</div>
              </div>
              <div class="row">
                <div class="label">Jumlah Pax</div>
                <div class="value">${bookingQty} Orang</div>
              </div>
              <div class="row">
                <div class="label">Metode Pembayaran</div>
                <div class="value">${paymentMethod}</div>
              </div>
              <div class="row">
                <div class="label">Total Pembayaran</div>
                <div class="value" style="color: #2563eb; font-size: 20px;">Rp ${new Intl.NumberFormat('id-ID').format(((bookingModal?.price || 0) * bookingQty) + (adminFees[paymentMethod] || 0))}</div>
              </div>
            </div>

            <div class="barcode">
              <div style="font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 12px;">Scan QR Code ini di Pintu Masuk</div>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=VO-${orderId}" alt="Ticket QR Code" />
              <div style="margin-top: 15px; font-family: monospace; font-size: 16px; font-weight: bold; letter-spacing: 2px; color: #374151;">VO-${orderId}</div>
            </div>
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? aboutImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24">
      {/* Modern Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-3 group">
            <div className="w-[70px] h-[40px] flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden rounded-2xl">
              <img src="/logo.svg" alt="Grand Oasis Logo" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-extrabold tracking-tight transition-colors leading-none text-gray-900 dark:text-white">
                Grand Oasis
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors text-gray-500 dark:text-gray-400">
                Resort &amp; Park
              </p>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="text-sm font-bold transition-colors hover:text-primary-500 text-gray-600 dark:text-gray-300"
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.location.hash = '#/dashboard'}
            className="px-6 py-2.5 font-bold rounded-full transition-all active:scale-95 flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-md"
          >
            Login <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* Gallery */}
        <div className="relative grid grid-cols-4 grid-rows-2 gap-2 h-[400px] mb-8 rounded-2xl overflow-hidden cursor-pointer group" onClick={() => openGallery(0)}>
          <div className="col-span-4 md:col-span-2 row-span-2 h-full relative overflow-hidden">
            <img src={aboutImages[0]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full relative overflow-hidden">
            <img src={aboutImages[1]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full relative overflow-hidden">
            <img src={aboutImages[2]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
          </div>
          <div className="hidden md:block col-span-2 row-span-1 h-full relative overflow-hidden">
            <img src={aboutImages[3]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>

            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-lg font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2 shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors">
              <ImageIcon className="w-4 h-4" />
              Lihat Semua Foto
            </div>
          </div>
        </div>

        {/* Title & Header Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6 border border-gray-200/60 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
                Taman Hiburan & Wahana
              </div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Tiket {wahanaName} - Grand Oasis Resort</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Area Utama, Bogor</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span>4.8/5 (12,450 Review)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Refundable</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Bisa Reschedule</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Konfirmasi Instan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Tersedia Parkir</span>
            </div>
          </div>
        </div>

        {/* Ticket Selection Area */}
        <div className="mt-8 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pilihan Tiket</h2>

          <div className="flex flex-col gap-6">
            {ticketCategories.map((ticket) => {
              const isPopular = ticket.name === 'Tiket All Access';
              return (
                <div
                  key={ticket.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 border transition-all hover:shadow-md ${isPopular ? 'border-primary-500' : 'border-gray-200/60 dark:border-gray-700'
                    }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ticket.name}</h3>
                      {isPopular && (
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                          Rekomendasi
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {ticket.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {ticket.name === 'Tiket Reguler' && [`Akses Khusus ${wahanaName}`, 'Bebas Akses Area Publik'].map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {ticket.name === 'Paket Bundle' && [`Akses ${wahanaName} + 2 Wahana Lain`, 'Bebas Akses Area Publik', 'Harga Lebih Hemat'].map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {ticket.name === 'Tiket All Access' && ['Akses Semua Wahana', 'Berlaku Unlimited Seharian', 'Bebas Akses Area Publik'].map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {ticket.name === 'Tiket VIP' && ['Akses Semua Wahana & VIP', 'Jalur Cepat (Fast Track)', 'Lounge & Welcome Drink'].map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedTickets(prev => ({ ...prev, [ticket.id]: !prev[ticket.id] }))}
                      className="text-primary-600 dark:text-primary-400 text-sm font-bold flex items-center gap-1 hover:underline outline-none"
                    >
                      {expandedTickets[ticket.id] ? 'Sembunyikan Detail' : 'Lihat Detail Paket'}
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedTickets[ticket.id] ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedTickets[ticket.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Wahana & Fasilitas Termasuk:</h4>
                            <ul className="space-y-2">
                              {ticket.name === 'Tiket Reguler' && (
                                <>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> Akses penuh untuk wahana {wahanaName}</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Akses Kolam Renang Umum & Water Park Standar</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Taman Bermain Anak (Playground)</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Area Piknik & Taman Bersantai</li>
                                </>
                              )}
                              {ticket.name === 'Paket Bundle' && (
                                <>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> Akses wahana {wahanaName} dan bebas pilih 2 wahana lainnya</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> Semua fasilitas area publik (Kolam, Taman, Piknik)</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Cocok untuk mencoba beberapa wahana favorit</li>
                                </>
                              )}
                              {ticket.name === 'Tiket All Access' && (
                                <>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> Akses SEPUASNYA ke SEMUA wahana tanpa batasan</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Termasuk wahana premium: Seluncuran Ekstrim, Ombak Buatan, dll.</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Akses Area Mini Golf sepuasnya</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Berlaku seharian penuh dari jam buka hingga tutup</li>
                                </>
                              )}
                              {ticket.name === 'Tiket VIP' && (
                                <>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> Semua *benefit* Tiket All Access</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> JALUR CEPAT (Fast Track) di semua wahana utama, bebas antre panjang!</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Akses ke VIP Lounge yang nyaman dan tenang</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Gratis Welcome Drink & Snacks di Lounge</li>
                                  <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Kereta Gantung Eksklusif & Layanan antar-jemput Golf Cart</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="w-full md:w-64 shrink-0 flex flex-col justify-end pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 md:pl-6 text-right">
                    <div className="mb-4">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Harga per pax</div>
                      {isPopular && (
                        <div className="text-sm text-gray-400 line-through mb-0.5">
                          Rp {new Intl.NumberFormat('id-ID').format(ticket.price * 1.2)}
                        </div>
                      )}
                      <div className="text-2xl font-black text-gray-900 dark:text-white">
                        Rp {new Intl.NumberFormat('id-ID').format(ticket.price)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setBookingModal(ticket);
                        setBookingQty(1);
                        setBookingDate('');
                        setBookingStep('details');
                        setPaymentMethod('');
                        setOrderId(Math.floor(100000 + Math.random() * 900000).toString());
                      }}
                      className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
                    >
                      Pilih Tiket
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setBookingModal(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!bookingStep || bookingStep === 'details' ? (
                <>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Detail Pesanan</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{bookingModal.name} - {wahanaName}</p>

                  <div className="space-y-5 mb-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tanggal Kunjungan</label>
                      <input
                        type="date"
                        value={bookingDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jumlah Tiket</label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setBookingQty(Math.max(1, bookingQty - 1))}
                          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                        >-</button>
                        <span className="text-xl font-bold text-gray-900 dark:text-white w-8 text-center">{bookingQty}</span>
                        <button
                          onClick={() => setBookingQty(bookingQty + 1)}
                          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                        >+</button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Total Pembayaran</span>
                      <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                        Rp {new Intl.NumberFormat('id-ID').format(bookingModal.price * bookingQty)}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={!bookingDate}
                    onClick={() => setBookingStep('payment')}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Pilih Metode Pembayaran
                  </button>
                </>
              ) : bookingStep === 'payment' ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setBookingStep('details')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">Pembayaran</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Pilih metode pembayaran</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { id: 'QRIS', name: 'QRIS / E-Wallet', desc: 'Gopay, OVO, Dana, LinkAja' },
                      { id: 'BCA Virtual Account', name: 'BCA Virtual Account', desc: 'Verifikasi Otomatis' },
                      { id: 'Mandiri Virtual Account', name: 'Mandiri Virtual Account', desc: 'Verifikasi Otomatis' },
                      { id: 'Kartu Kredit', name: 'Kartu Kredit / Debit', desc: 'Visa, Mastercard, JCB' }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all text-left ${paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                          }`}
                      >
                        <div>
                          <div className={`font-bold ${paymentMethod === method.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                            {method.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{method.desc}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary-500' : 'border-gray-300 dark:border-gray-600'
                          }`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(bookingModal.price * bookingQty)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Biaya Admin</span>
                      <span className="font-medium text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(paymentMethod ? adminFees[paymentMethod] : 0)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-white font-bold">Total Pembayaran</span>
                      <span className="text-xl font-black text-primary-600 dark:text-primary-400">
                        Rp {new Intl.NumberFormat('id-ID').format((bookingModal.price * bookingQty) + (paymentMethod ? adminFees[paymentMethod] : 0))}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={!paymentMethod}
                    onClick={() => setBookingStep('waiting_payment')}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Bayar Sekarang
                  </button>
                </>
              ) : bookingStep === 'waiting_payment' ? (
                <div className="text-center py-6">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Selesaikan Pembayaran</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                    Selesaikan pembayaran sebelum batas waktu berakhir.
                  </p>

                  {paymentMethod === 'QRIS' ? (
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6 inline-block w-full max-w-[250px]">
                      <div className="font-bold text-gray-900 dark:text-white mb-4">Scan QR Code</div>
                      <div className="w-full aspect-square bg-white border-4 border-gray-100 rounded-xl flex items-center justify-center p-4">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Grand Oasis_Booking" alt="QRIS" className="w-full h-full object-contain" />
                      </div>
                      <div className="text-xs text-gray-500 mt-4 font-medium tracking-wider">NMID: ID1029384756</div>
                    </div>
                  ) : paymentMethod.includes('Virtual Account') ? (
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nomor {paymentMethod}</div>
                      <div className="text-2xl font-black text-primary-600 tracking-wider mb-2">8902 1120 3345 8899</div>
                      <div className="text-xs text-gray-500">A/N: Grand Oasis Resort</div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Arahkan ke Payment Gateway Kartu Kredit</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Menunggu Proses...</div>
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="text-sm text-gray-500 mb-1">Total yang harus dibayar</div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                      Rp {new Intl.NumberFormat('id-ID').format((bookingModal.price * bookingQty) + (adminFees[paymentMethod] || 0))}
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep('success_animation')}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
                  >
                    Saya Sudah Bayar
                  </button>
                  <button
                    onClick={() => setBookingStep('payment')}
                    className="w-full py-3 text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold transition-colors mt-2"
                  >
                    Ganti Metode Pembayaran
                  </button>
                </div>
              ) : bookingStep === 'success_animation' ? (
                <div className="text-center py-16 flex flex-col items-center justify-center min-h-[400px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 relative"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.polyline
                        points="20 6 9 17 4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                      />
                    </motion.svg>
                    <motion.div
                      className="absolute inset-0 border-4 border-emerald-500 rounded-full"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="text-2xl font-black text-gray-900 dark:text-white mb-2"
                  >
                    Pembayaran Berhasil!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Menyiapkan E-Ticket Anda...
                  </motion.p>
                </div>
              ) : (
                <div className="py-2">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white">E-Ticket Anda</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Order ID: VO-{orderId}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nama Wahana</div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{wahanaName}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Jenis Tiket</div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{bookingModal.name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tanggal Kunjungan</div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{bookingDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Jumlah Orang</div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{bookingQty} Pax</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl border border-primary-100 dark:border-primary-800/50 mb-8">
                    <span className="text-primary-700 dark:text-primary-400 font-bold">Total Lunas</span>
                    <span className="text-xl font-black text-primary-700 dark:text-primary-400">
                      Rp {new Intl.NumberFormat('id-ID').format((bookingModal.price * bookingQty) + (adminFees[paymentMethod] || 0))}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setBookingModal(null)}
                      className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-colors"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={printReceipt}
                      className="flex-1 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
                    >
                      Cetak PDF
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Gallery (Lightbox) */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={closeGallery}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-sm z-10"
              onClick={closeGallery}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="absolute top-6 left-6 text-white font-medium text-lg drop-shadow-md z-10">
              {currentImageIndex + 1} / {aboutImages.length}
            </div>

            <button
              className="absolute left-6 text-white/70 hover:text-white transition-all bg-black/40 hover:bg-black/60 p-4 rounded-full backdrop-blur-sm z-10 hover:scale-110 active:scale-95"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={aboutImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            <button
              className="absolute right-6 text-white/70 hover:text-white transition-all bg-black/40 hover:bg-black/60 p-4 rounded-full backdrop-blur-sm z-10 hover:scale-110 active:scale-95"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
