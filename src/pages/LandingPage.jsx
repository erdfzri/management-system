import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Ticket, Info, Check, MapPin, Phone, Mail,
  Star, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Play, Image as ImageIcon,
  Coffee, Shield, Map, Clock, X
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function LandingPage({ onLogin }) {
  const { ticketCategories, topAttractions, facilitiesData } = useGlobal();
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutImages = facilitiesData ? facilitiesData.map(f => f.img) : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const sliderInterval = setInterval(() => {
      setCurrentAboutImage(prev => (prev + 1) % aboutImages.length);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(sliderInterval);
    };
  }, [aboutImages.length]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentAttraction = topAttractions && topAttractions.length > currentAboutImage
    ? topAttractions[currentAboutImage]
    : { rating: 4.9, visitors: 2500, name: 'Fasilitas' };

  const currentRating = currentAttraction.rating.toFixed(1);
  const currentVisitors = currentAttraction.visitors;

  const navLinks = [
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Fasilitas', id: 'facilities' },
    { name: 'Tiket', id: 'tickets' },
    { name: 'Testimoni', id: 'testimonials' },
    { name: 'FAQ', id: 'faq' }
  ];

  const faqs = [
    { q: "Berapa jam operasional Grand Oasis?", a: "Grand Oasis buka setiap hari mulai pukul 08:00 hingga 22:00 WIB. Untuk fasilitas khusus seperti Lapangan Golf, buka lebih awal pukul 06:00 WIB." },
    { q: "Apakah tiket bisa di-refund?", a: "Tiket yang sudah dibeli tidak dapat di-refund, namun Anda dapat mengubah jadwal kunjungan maksimal 24 jam sebelum kedatangan." },
    { q: "Apakah ada fasilitas parkir?", a: "Ya, kami menyediakan area parkir luas yang aman, gratis bagi pengunjung VIP dan berbayar bagi pengunjung reguler." },
    { q: "Apakah boleh membawa makanan dari luar?", a: "Untuk menjaga kebersihan area, pengunjung tidak diperkenankan membawa makanan dan minuman dari luar. Kami memiliki banyak restoran dan kafe di dalam area." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-primary-500/30">

      {/* Modern Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800 py-3' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-2 group">
            <div className="w-[56px] h-[32px] sm:w-[70px] sm:h-[40px] flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden rounded-xl">
              <img src="/logo.svg" alt="Grand Oasis Logo" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
            </div>
            <div>
              <h1 className={`text-lg sm:text-2xl font-extrabold tracking-tight transition-colors leading-none ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>Grand Oasis</h1>
              <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5 transition-colors ${scrolled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300'}`}>Resort &amp; Park</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)}
                className={`text-sm font-bold transition-colors hover:text-primary-500 ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200 hover:text-white'}`}>
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onLogin}
              className={`hidden sm:flex px-5 py-2.5 font-bold rounded-full transition-all active:scale-95 items-center gap-2 text-sm ${scrolled ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-md' : 'bg-white text-gray-900 hover:bg-gray-100 shadow-xl'}`}>
              Login Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileMenuOpen(o => !o)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu">
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-current' : 'bg-current'}`}></span>
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'bg-current'}`}></span>
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-current' : 'bg-current'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <a key={link.id} href={`#${link.id}`}
                    onClick={(e) => { scrollToSection(e, link.id); setMobileMenuOpen(false); }}
                    className="px-4 py-3 text-base font-bold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    {link.name}
                  </a>
                ))}
                <button onClick={() => { onLogin(); setMobileMenuOpen(false); }}
                  className="mt-2 w-full px-6 py-3 bg-gray-900 dark:bg-primary-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  Login Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
            alt="Resort View"
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                Lebih Dari Sekadar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                  Tempat Liburan
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium max-w-xl">
                Nikmati perpaduan sempurna antara restoran mewah, lapangan golf kelas dunia, dan keseruan water park dalam satu area terintegrasi yang spektakuler.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#tickets"
                  onClick={(e) => scrollToSection(e, 'tickets')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <Ticket className="w-5 h-5" /> Pesan Tiket
                </a>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg group"
                >
                  <Play className="w-5 h-5 group-hover:text-primary-400 transition-colors" /> Lihat Video
                </a>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative group">
              <div className="aspect-square rounded-3xl overflow-hidden relative">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentAboutImage}
                    src={aboutImages[currentAboutImage]}
                    alt={`Resort About ${currentAboutImage + 1}`}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Arrow Navigation */}
                <button
                  onClick={() => setCurrentAboutImage(prev => (prev - 1 + aboutImages.length) % aboutImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentAboutImage(prev => (prev + 1) % aboutImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slider Indicators */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                  {aboutImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentAboutImage(i)}
                      className={`h-2 rounded-full transition-all ${currentAboutImage === i ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAboutImage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-4 right-4 sm:-bottom-8 sm:-right-8 bg-white dark:bg-gray-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 max-w-[220px] sm:max-w-xs z-20"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-2 truncate max-w-[200px]">{facilitiesData[currentAboutImage].title}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i <= Math.round(Number(currentRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-700 fill-gray-300 dark:fill-gray-700'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-900 dark:text-white font-bold text-xl mb-1">{currentRating}/5 Rating</p>
                  <p className="text-gray-500 text-sm font-medium">Dari {currentVisitors.toLocaleString()} ulasan pengunjung</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div>
              <h4 className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase mb-3">Tentang Grand Oasis</h4>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">Menciptakan Momen Emas Anda</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                Grand Oasis bukan sekadar tempat wisata biasa. Kami adalah kawasan terpadu yang memadukan hiburan, olahraga, relaksasi, dan kuliner dalam satu ekosistem eksklusif. Didesain untuk memberikan pelarian sempurna dari hiruk pikuk kota.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Fasilitas berstandar internasional',
                  'Keamanan dan privasi prioritas',
                  'Akses mudah dan area parkir luas',
                  'Layanan pelanggan 24/7'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium text-lg">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 font-bold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={(e) => scrollToSection(e, 'facilities')} className="text-primary-600 dark:text-primary-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Jelajahi Fasilitas <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h4 className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase mb-3">Fasilitas Kami</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">Satu Area, Sejuta Cerita</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {facilitiesData.map((facility, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl z-10 border border-white/30">
                    {facility.icon}
                  </div>
                  <img src={facility.img} alt={facility.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{facility.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{facility.desc}</p>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between mt-auto">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {facility.hours}
                    </div>
                    <button
                      onClick={() => setSelectedFacility(facility)}
                      className="text-primary-600 dark:text-primary-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Lihat Detail <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-sm tracking-widest uppercase">
              Tiket & Wahana
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">Petualangan Menanti Anda</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Jelajahi berbagai wahana seru kami dan persiapkan petualangan terbaik Anda. Klik wahana untuk melihat detail harganya!
            </p>
          </div>

          <div className="mb-16 md:mb-24 overflow-x-auto pb-8 hide-scrollbar px-4 sm:px-6 -mx-4 sm:-mx-6">
            <div className="flex gap-3 sm:gap-4 w-max px-4 sm:px-6">
              {facilitiesData.map((facility, idx) => {
                const attraction = topAttractions[idx % topAttractions.length] || topAttractions[0];
                const tags = ["Beli 3 Gratis 1", "Bundle", "Disc 35%", "Promo Spesial", "Flash Sale"];
                const dummyPrice = Math.round((attraction.revenue / attraction.visitors) / 1000) * 1000;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      window.location.hash = `#/detail?wahana=${encodeURIComponent(facility.title)}`;
                    }}
                    className="w-[240px] sm:w-[280px] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer flex flex-col shrink-0 group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={facility.img} alt={facility.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute bottom-0 right-0 bg-[#ef4444] text-white text-xs font-bold px-3 py-1.5 rounded-tl-lg shadow-sm">
                        {tags[idx % tags.length]}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-gray-900 dark:text-white font-bold text-[15px] mb-1 leading-snug line-clamp-2">
                        {facility.title} | Grand Oasis Resort & Park
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-[13px] mb-2 truncate">Grand Oasis Area, Bogor</p>

                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-[13px] mb-4">
                        <span className="font-bold text-gray-900 dark:text-gray-200">{attraction.rating}</span><span>/5</span>
                        <span>({attraction.visitors * 12} Review)</span>
                      </div>

                      <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700/50">
                        {idx === 2 && <p className="text-gray-400 text-xs line-through mb-0.5">IDR {(dummyPrice * 1.5).toLocaleString('id-ID')}</p>}
                        <p className="text-[#ef4444] font-bold text-lg">IDR {dummyPrice.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>


        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h4 className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase mb-3">Testimoni</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">Apa Kata Mereka?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              { name: "Budi Santoso", role: "Keluarga", txt: "Liburan terbaik keluarga kami! Anak-anak sangat menikmati water park, dan saya bisa bermain golf dengan tenang." },
              { name: "Siti Aminah", role: "Solo Traveler", txt: "Fasilitas spa-nya luar biasa. Sangat rileks dan pelayanannya sekelas hotel bintang 5. Pasti akan kembali lagi." },
              { name: "Reza Rahadian", role: "Corporate Event", txt: "Kami mengadakan gathering kantor di sini. Semuanya terkoordinasi dengan sangat baik. Makanan di restoran juga juara!" }
            ].map((testi, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
                <div className="text-6xl text-gray-200 dark:text-gray-700 absolute top-4 right-8 font-serif">"</div>
                <div className="flex items-center gap-1 mb-4 relative z-10">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 relative z-10">"{testi.txt}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testi.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h4 className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase mb-3">FAQ</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">Pertanyaan Umum</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-gray-900 dark:text-white focus:outline-none"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 leading-[1.1]">
                  Punya Pertanyaan? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    Hubungi Kami
                  </span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Tim layanan pelanggan kami selalu siap membantu Anda merencanakan liburan terbaik atau menjawab pertanyaan terkait tiket dan fasilitas di Grand Oasis.
                </p>
              </div>
              <div className="shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto mt-6 md:mt-0">
                <a
                  href="https://wa.me/6280012345678" target="_blank" rel="noreferrer"
                  className="group relative px-6 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all overflow-hidden flex items-center gap-3 w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-2 text-sm">
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </span>
                </a>
                <a
                  href="mailto:hello@Grand Oasis.com"
                  className="group relative px-6 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center gap-3 w-full"
                >
                  <span className="relative flex items-center gap-2 text-sm">
                    <Mail className="w-5 h-5" />
                    Email
                  </span>
                </a>
                <a
                  href="https://instagram.com" target="_blank" rel="noreferrer"
                  className="group relative px-6 py-4 bg-gradient-to-tr from-pink-600 via-purple-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:-translate-y-1 transition-all flex items-center gap-3 w-full"
                >
                  <span className="relative flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Instagram
                  </span>
                </a>
                <a
                  href="#" onClick={(e) => { e.preventDefault(); window.open('https://maps.google.com', '_blank'); }}
                  className="group relative px-6 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center gap-3 w-full"
                >
                  <span className="relative flex items-center gap-2 text-sm">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    Lokasi
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 pt-20 pb-10 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden p-0.5">
                <img src="/logo.svg" alt="Grand Oasis Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Grand Oasis</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Destinasi liburan keluarga terlengkap dengan berbagai fasilitas premium dalam satu area terintegrasi. Menciptakan memori tak terlupakan setiap harinya.
            </p>
            <div className="flex items-center gap-4">
              {/* Social icons placeholders */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors cursor-pointer">
                  <Star className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Tautan Cepat</h3>
            <ul className="space-y-4 text-sm font-medium">
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)} className="hover:text-primary-400 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>Jl. Raya Wisata No. 123, Kawasan Pariwisata Terpadu, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+62 800 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>hello@Grand Oasis.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>\u0026copy; 2026 Grand Oasis Resort \u0026 Park. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Syarat \u0026 Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

      {/* Facility Detail Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFacility(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative h-64 sm:h-80 shrink-0">
                <img src={selectedFacility.img} alt={selectedFacility.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div className="text-4xl mb-2">{selectedFacility.icon}</div>
                    <h3 className="text-3xl font-black text-white">{selectedFacility.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    Jam Operasional: {selectedFacility.hours}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tentang Fasilitas</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {selectedFacility.desc} Grand Oasis senantiasa menjaga standar tertinggi untuk memastikan kenyamanan dan keamanan Anda saat menikmati fasilitas ini. Nikmati pelayanan eksklusif dengan standar internasional yang kami hadirkan khusus untuk pengunjung kami.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-gray-900 dark:text-white">Standar Keamanan</span>
                    </div>
                    <p className="text-xs text-gray-500">Pengecekan rutin setiap hari</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900 dark:text-white">Fasilitas Premium</span>
                    </div>
                    <p className="text-xs text-gray-500">Layanan prioritas tersedia</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFacility(null)}
                  className="w-full py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-2xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
