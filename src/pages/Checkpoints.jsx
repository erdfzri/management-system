import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, CheckCircle, XCircle, Activity, AlertCircle, Camera, X, Play, Navigation, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function Checkpoints() {
  const { checkpointStatus: checkpoints, setCheckpointStatus: setCheckpoints } = useGlobal();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [activeCheckpointId, setActiveCheckpointId] = useState(checkpoints[0].id);

  const totalScans = checkpoints.reduce((sum, cp) => sum + cp.scans, 0);
  const totalValid = checkpoints.reduce((sum, cp) => sum + cp.valid, 0);
  const totalRejected = checkpoints.reduce((sum, cp) => sum + cp.rejected, 0);
  const onlineCount = checkpoints.filter(cp => cp.status === 'online').length;

  const validationData = [
    { name: 'Valid', value: totalValid, color: '#10b981' },
    { name: 'Ditolak', value: totalRejected, color: '#ef4444' },
  ];

  const hourlyTrendData = [
    { time: '08:00', scans: 120 },
    { time: '10:00', scans: 450 },
    { time: '12:00', scans: 890 },
    { time: '14:00', scans: 1200 },
    { time: '16:00', scans: 980 },
    { time: '18:00', scans: 600 },
    { time: '20:00', scans: 350 },
  ];

  const recentAlerts = [
    { id: 1, type: 'rejected', message: 'TIX-992384 terdeteksi palsu', location: 'Gerbang Utama', time: 'Baru saja' },
    { id: 2, type: 'offline', message: 'Koneksi terputus ke server pusat', location: 'Gedung Acara', time: '10 mnt lalu' },
    { id: 3, type: 'rejected', message: 'Percobaan akses di luar jam operasional', location: 'Taman Bermain', time: '1 jam lalu' },
  ];

  // Simulated Camera Effect
  useEffect(() => {
    let interval;
    if (isScanning) {
      // Simulate random valid/invalid scans while camera is "open"
      // interval = setInterval(() => {
      //   if (Math.random() > 0.7) simulateScan();
      // }, 4000);
    }
    return () => clearInterval(interval);
  }, [isScanning, activeCheckpointId]);

  const handleScanData = (decodedText) => {
    const isValid = Math.random() > 0.2; // 80% success rate for demo
    const currentCheckpoint = checkpoints.find(cp => cp.id === activeCheckpointId);
    
    const result = {
      id: Date.now(),
      ticketId: decodedText,
      timestamp: new Date().toLocaleTimeString('id-ID'),
      status: isValid ? 'valid' : 'rejected',
      checkpoint: currentCheckpoint ? currentCheckpoint.name : 'Unknown',
      visitor: isValid ? 'Pengunjung #' + Math.floor(Math.random() * 1000) : 'Tidak Dikenal'
    };

    setScanResult(result);
    setScanHistory(prev => [result, ...prev.slice(0, 9)]);

    setCheckpoints(prev => prev.map(cp => {
      if (cp.id === activeCheckpointId) {
        return {
          ...cp,
          scans: cp.scans + 1,
          valid: isValid ? cp.valid + 1 : cp.valid,
          rejected: isValid ? cp.rejected : cp.rejected + 1
        };
      }
      return cp;
    }));

    setTimeout(() => {
      setScanResult(null);
    }, 3500);
  };

  const simulateScan = () => {
    const randomTicket = "TIX-" + Math.floor(100000 + Math.random() * 900000);
    handleScanData(randomTicket);
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Manajemen Checkpoint</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Pantau akses masuk dan validasi tiket secara real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Stasiun Aktif:</label>
          <div className="relative">
            <select
              value={activeCheckpointId}
              onChange={(e) => setActiveCheckpointId(e.target.value)}
              className="pl-4 pr-10 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none shadow-sm cursor-pointer"
            >
              {checkpoints.filter(cp => cp.status === 'online').map(cp => (
                <option key={cp.id} value={cp.id}>{cp.name}</option>
              ))}
            </select>
            <Navigation className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-180" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Scan Hari Ini"
          value={totalScans.toLocaleString()}
          icon={ScanLine}
          color="purple"
          delay={0}
        />
        
        <StatCard
          title="Tiket Valid"
          value={totalValid.toLocaleString()}
          icon={CheckCircle2}
          subtitle={`${totalScans > 0 ? ((totalValid / totalScans) * 100).toFixed(1) : 0}% success rate`}
          color="green"
          delay={0.1}
        />

        <StatCard
          title="Akses Ditolak"
          value={totalRejected.toLocaleString()}
          icon={XCircle}
          subtitle="Perlu perhatian petugas"
          color="pink"
          delay={0.2}
        />

        <StatCard
          title="Status Sistem"
          value={`${onlineCount}/${checkpoints.length}`}
          icon={Zap}
          subtitle="Gerbang aktif"
          color="blue"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Scanner Simulator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-primary-500" />
                Terminal Validasi Tiket
              </h3>
              {isScanning && (
                <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Kamera Aktif
                </span>
              )}
            </div>
            
            {!isScanning ? (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                
                <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl flex items-center justify-center mb-8 border border-white/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <ScanLine className="w-16 h-16 text-white" />
                  {/* Scanner laser animation */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary-500 shadow-[0_0_8px_2px_rgba(168,85,247,0.8)] animate-pulse -translate-y-1/2" />
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-2 relative z-10">Sistem Siaga</h4>
                <p className="text-gray-400 text-center max-w-sm mb-8 relative z-10">
                  Silakan arahkan kamera ke barcode/QR Code pada tiket, atau simulasikan pemindaian tiket secara manual.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                  <button onClick={startScanning} className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Buka Kamera
                  </button>
                  <button onClick={simulateScan} className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Simulasikan Validasi
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-3xl overflow-hidden relative shadow-2xl border-4 border-gray-800 group h-[400px] flex items-center justify-center">
                  <button
                    onClick={stopScanning}
                    className="absolute top-4 right-4 z-50 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition-colors"
                    title="Tutup Kamera"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  {/* Custom Scanner Frame */}
                  <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-64 border-4 border-primary-500/30 rounded-3xl relative">
                       <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-3xl -translate-x-1 -translate-y-1" />
                       <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-3xl translate-x-1 -translate-y-1" />
                       <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-3xl -translate-x-1 translate-y-1" />
                       <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-3xl translate-x-1 translate-y-1" />
                       
                       {/* Scanning Laser */}
                       <motion.div 
                         animate={{ y: [0, 248, 0] }}
                         transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                         className="w-full h-1 bg-primary-500 shadow-[0_0_15px_#a855f7]"
                       />
                    </div>
                  </div>
                  
                  {/* Simulated Camera Feed (Animated Gradients) */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 via-gray-900 to-black animate-pulse" />
                  <ScanLine className="w-24 h-24 text-gray-700 absolute opacity-50" />
                  
                  <div className="absolute bottom-6 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-primary-400 text-sm font-bold border border-primary-500/20 z-20">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
                    Memindai Kode QR...
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                   <button onClick={simulateScan} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-sm">
                    <Play className="w-5 h-5 text-primary-500" />
                    Simulasikan Validasi Tiket
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Activity Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Aktivitas Gerbang</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={checkpoints.filter(cp => cp.status === 'online')}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dx={-10} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="scans" fill="#a855f7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Rasio Validasi</h3>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={validationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {validationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text for donut chart */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    {totalScans > 0 ? ((totalValid / totalScans) * 100).toFixed(0) : 0}%
                  </span>
                  <span className="text-xs font-bold text-gray-500">Valid Rate</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hourly Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tren Kepadatan (Hari Ini)</h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-xs font-bold">Real-time</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dx={-10} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Security Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Peringatan Keamanan Terkini
            </h3>
            <div className="space-y-4">
              {recentAlerts.map(alert => (
                <div key={alert.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    alert.type === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{alert.message}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{alert.location}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 shrink-0">{alert.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar - Status & History */}
        <div className="space-y-8">
          {/* Checkpoint Status List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Status Gerbang</h3>
            <div className="space-y-4">
              {checkpoints.map((checkpoint) => (
                <div 
                  key={checkpoint.id} 
                  className={`p-4 rounded-2xl border ${
                    activeCheckpointId === checkpoint.id 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50'
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        checkpoint.status === 'online' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {checkpoint.status === 'online' ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{checkpoint.name}</h4>
                        <p className="text-xs font-medium text-gray-500">{checkpoint.id}</p>
                      </div>
                    </div>
                    {checkpoint.status === 'offline' && (
                       <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-[10px] font-bold uppercase tracking-wider">Offline</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-gray-500 mb-0.5">Scans</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{checkpoint.scans}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-gray-500 mb-0.5">Valid</p>
                      <p className="text-xs font-bold text-emerald-600">{checkpoint.valid}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-gray-500 mb-0.5">Gagal</p>
                      <p className="text-xs font-bold text-red-600">{checkpoint.rejected}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Log Pemindaian</h3>
            
            {scanHistory.length === 0 ? (
              <div className="text-center py-10">
                <ScanLine className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Belum ada data pindaian.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {scanHistory.map((scan) => (
                    <motion.div
                      key={scan.id}
                      initial={{ opacity: 0, height: 0, x: 20 }}
                      animate={{ opacity: 1, height: 'auto', x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 items-start"
                    >
                      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        scan.status === 'valid' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {scan.status === 'valid' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{scan.ticketId}</span>
                          <span className="text-[10px] font-semibold text-gray-500">{scan.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate pr-2">{scan.visitor}</p>
                        <p className="text-[10px] text-gray-500 mt-1 font-medium">{scan.checkpoint}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Result Modal - Centered with Flex */}
      <AnimatePresence>
        {scanResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setScanResult(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              {/* Header Colored Banner */}
              <div className={`h-24 w-full flex justify-center items-center ${
                scanResult.status === 'valid' ? 'bg-emerald-500' : 'bg-red-500'
              }`}>
                {scanResult.status === 'valid' ? (
                  <CheckCircle2 className="w-12 h-12 text-white animate-[bounce_1s_ease-in-out]" />
                ) : (
                  <XCircle className="w-12 h-12 text-white animate-[bounce_1s_ease-in-out]" />
                )}
              </div>

              <div className="p-6 text-center">
                <h3 className={`text-2xl font-black mb-1 ${
                  scanResult.status === 'valid' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {scanResult.status === 'valid' ? 'Akses Diterima!' : 'Akses Ditolak!'}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-6">Pindaian berhasil diproses</p>

                <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-left mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500">ID Tiket</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{scanResult.ticketId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500">Pengunjung</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{scanResult.visitor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500">Waktu Scan</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{scanResult.timestamp}</span>
                  </div>
                </div>

                <button
                  onClick={() => setScanResult(null)}
                  className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
