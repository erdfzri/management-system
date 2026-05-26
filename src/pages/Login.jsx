import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Lock, ShieldCheck, Ticket, Eye, EyeOff, Mail } from 'lucide-react';

export default function Login({ onLogin, onBack }) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Register States
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mascot Typewriter States
  const mascotMessages = [
    "Halo! Selamat datang di Grand Oasis ✨",
    "Liburan impianmu menanti! Yuk masuk.",
    "Siapkan kopermu, petualangan dimulai!",
    "Pesan tiket tanpa ribet. Buktikan!",
    "Admin atau Customer? Aku siap bantu."
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const currentMessage = mascotMessages[msgIndex];

    if (isTyping) {
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 3000); // Hold message
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length - 1));
        }, 20);
      } else {
        setMsgIndex((prev) => (prev + 1) % mascotMessages.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, msgIndex]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (username === 'admin' && password === 'password') {
      onLogin('admin');
    } else if (username === 'customer' && password === 'password') {
      onLogin('customer');
    } else {
      setError('Username atau password salah! Gunakan admin/password atau customer/password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    // Mock registration logic
    if (regName && regUsername && regPassword) {
      // Simulate successful registration, then auto-login as customer
      alert(`Pendaftaran berhasil untuk ${regName}! Anda akan masuk sebagai customer.`);
      onLogin('customer');
    } else {
      setError('Mohon lengkapi semua field pendaftaran.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans"
      style={{ background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 60%, #e0e7ff 100%)' }}
    >
      <button
        onClick={onBack}
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 text-sm font-medium hover:bg-white shadow-sm transition-all z-20"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full mx-4 flex overflow-hidden shadow-2xl"
        style={{
          maxWidth: 960,
          minHeight: 560,
          borderRadius: 24,
          background: 'white',
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div
          className="hidden md:flex flex-col justify-between relative overflow-hidden"
          style={{
            width: '45%',
            background: '#60a5fa',
            padding: '36px 36px 32px',
          }}
        >
          {/* Scattered decorative blobs */}
          <div className="absolute top-10 right-12 w-12 h-12 bg-pink-300 rounded-full opacity-80"></div>
          <div className="absolute top-24 right-4 w-7 h-7 bg-purple-400 rounded-full opacity-70"></div>
          <div className="absolute top-[42%] left-6 w-9 h-9 bg-yellow-300 rounded-full opacity-80"></div>
          <div className="absolute bottom-28 right-6 w-11 h-11 bg-purple-400 rounded-full opacity-70"></div>
          <div className="absolute bottom-16 left-12 w-8 h-8 bg-pink-200 rounded-full opacity-80"></div>
          <div
            className="absolute top-16 left-[38%] opacity-80"
            style={{ width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '32px solid #c084fc' }}
          ></div>
          <div className="absolute bottom-[38%] right-14 w-5 h-5 bg-blue-200 rounded-full"></div>
          <div className="absolute top-[30%] right-20 w-4 h-4 bg-white/40 rounded-full"></div>

          {/* Logo / Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm p-1.5">
                <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold text-base tracking-wide">Grand Oasis</span>
            </div>
            <p className="text-blue-50 text-[13px] leading-relaxed max-w-[180px]">
              Platform tiket wisata terbaik untuk pengalaman liburan tak terlupakan.
            </p>
          </div>

          {/* Mascot Illustration */}
          <div className="relative z-10 flex-grow flex items-center justify-center my-4">
            
            {/* Speech Bubble Tooltip */}
            <div className="absolute top-6 left-[50%] md:left-[55%] bg-white text-blue-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-xl w-[170px] z-30 border border-blue-100 transform -rotate-2 text-left">
              <p className="text-xs font-bold leading-relaxed">
                {displayedText}<span className="animate-pulse">|</span>
              </p>
            </div>

            <div className="absolute w-48 h-48 rounded-full border-4 border-white/20 animate-spin" style={{ animationDuration: '12s' }}></div>
            <div className="absolute w-36 h-36 rounded-full border-2 border-white/10 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
            <motion.img
              src="/mascot.png"
              alt="Grand Oasis Mascot"
              className="relative z-10 w-full max-w-[310px] drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Bottom text */}
          <div className="relative z-10 text-[13px] text-blue-50">
            Butuh bantuan?{' '}
            <span className="text-white font-bold cursor-pointer hover:underline">
              Hubungi CS
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div
          className="flex flex-col bg-white relative items-center justify-center overflow-y-auto"
          style={{ width: '55%', padding: '32px 24px' }}
        >
          {/* Language picker */}
          <div className="absolute top-6 right-8 text-[11px] font-medium text-gray-400 cursor-pointer hover:text-gray-600 transition-colors select-none flex items-center gap-1">
            Bahasa (ID) <span className="text-[9px]">▼</span>
          </div>

          {/* Form Container (Centered and Proportional) */}
          <div className="w-full max-w-[380px] flex flex-col my-auto mx-auto">
            
            {/* Title & Subtitle */}
            <div className="mb-8 text-center">
              <h2 className="font-extrabold text-gray-900 tracking-tight text-3xl md:text-4xl mb-2">
                {isRegistering ? 'Daftar Baru' : 'Login'}
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                {isRegistering 
                  ? 'Isi data Anda untuk membuat akun Grand Oasis.' 
                  : 'Selamat datang kembali! Silakan masuk ke akun Anda.'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* === LOGIN FORM === */}
              {!isRegistering && (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin} 
                  className="flex flex-col"
                >
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Username</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-300 text-gray-900 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          placeholder="admin / customer"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-gray-300 text-gray-900 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="terms" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer" />
                        <label htmlFor="terms" className="text-xs font-medium text-gray-600 cursor-pointer select-none">Ingat saya</label>
                      </div>
                      <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">Lupa password?</a>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]">
                      Masuk
                    </button>
                    <button type="button" onClick={() => { setIsRegistering(true); setError(''); }} className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 font-bold rounded-xl text-sm transition-all active:scale-[0.98]">
                      Buat Akun Baru
                    </button>
                  </div>

                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Atau gunakan demo</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => { setUsername('admin'); setPassword('password'); }} className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all group">
                      <ShieldCheck className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> Admin
                    </button>
                    <button type="button" onClick={() => { setUsername('customer'); setPassword('password'); }} className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all group">
                      <Ticket className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> Customer
                    </button>
                  </div>
                </motion.form>
              )}

              {/* === REGISTER FORM === */}
              {isRegistering && (
                <motion.form 
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister} 
                  className="flex flex-col"
                >
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Nama Lengkap</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-300 text-gray-900 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          placeholder="Nama Anda"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Email / Username</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-300 text-gray-900 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-gray-300 text-gray-900 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          placeholder="Buat password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-2">
                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]">
                      Daftar Sekarang
                    </button>
                    <button type="button" onClick={() => { setIsRegistering(false); setError(''); }} className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 font-bold rounded-xl text-sm transition-all active:scale-[0.98]">
                      Batal (Kembali ke Login)
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
}
