import { motion } from 'framer-motion';
import { Users, MapPin, Activity, Clock, ZoomIn, ZoomOut, Maximize2, Navigation } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGlobal } from '../context/GlobalContext';
import StatCard from '../components/StatCard';

export default function Visitors() {
  const { visitorTrend, areaDistribution, activityTimeline } = useGlobal();

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Pelacakan Pengunjung</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Pemantauan lokasi dan metrik pengunjung secara real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live System Active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pengunjung Aktif"
          value="1,842"
          icon={Users}
          subtitle="+124 dalam 1 jam terakhir"
          color="blue"
          delay={0}
        />

        <StatCard
          title="Total Hari Ini"
          value="2,847"
          icon={Activity}
          subtitle="+15% dari hari kemarin"
          color="purple"
          delay={0.1}
        />

        <StatCard
          title="Area Teramai"
          value="Water Park"
          icon={MapPin}
          subtitle="Kapasitas 85%"
          color="orange"
          delay={0.2}
        />

        <StatCard
          title="Rata-rata Durasi"
          value="3.5h"
          icon={Clock}
          subtitle="Sangat Baik"
          color="indigo"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Live Visitor Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Peta Pelacakan Langsung</h3>
                <p className="text-sm text-gray-500">Visualisasi penyebaran pengunjung di area taman wisata</p>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button className="p-2 bg-white dark:bg-gray-700 rounded shadow text-gray-700 dark:text-gray-200" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Full Screen"><Maximize2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="relative w-full h-[450px] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 ring-4 ring-gray-50 dark:ring-gray-800/50">
              {/* Real Interactive Map via OpenStreetMap IFRAME (Ancol Area example) */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.8252,-6.1325,106.8550,-6.1158&layer=mapnik" 
                className="absolute inset-0 z-0 grayscale-[20%] contrast-[110%] hue-rotate-[15deg]"
                title="Taman Wisata Map"
              />
              
              {/* Overlay Gradient for UI Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent pointer-events-none z-10" />

              {/* Simulated Map Markers / Heat spots */}
              <div className="absolute z-20 top-[30%] left-[40%] flex flex-col items-center group cursor-pointer">
                <span className="w-16 h-16 bg-red-500/20 rounded-full absolute animate-ping" />
                <span className="w-8 h-8 bg-red-500/40 rounded-full absolute" />
                <div className="bg-red-500 text-white p-2 rounded-full shadow-lg relative group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-sm text-xs font-bold text-gray-800 dark:text-gray-200">
                  Water Park (High)
                </div>
              </div>

              <div className="absolute z-20 top-[60%] left-[65%] flex flex-col items-center group cursor-pointer">
                <span className="w-12 h-12 bg-amber-500/20 rounded-full absolute animate-ping" />
                <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg relative group-hover:scale-110 transition-transform">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-sm text-xs font-bold text-gray-800 dark:text-gray-200">
                  Theme Park (Medium)
                </div>
              </div>

              <div className="absolute z-20 top-[20%] left-[70%] flex flex-col items-center group cursor-pointer">
                <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg relative group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-sm text-xs font-bold text-gray-800 dark:text-gray-200">
                  Zoo (Low)
                </div>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Kepadatan Area</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sangat Padat (&gt;80%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Normal (40-80%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sepi (&lt;40%)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visitor Flow Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Alur Pengunjung Hari Ini</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorTrend}>
                  <defs>
                    <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorFlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Area Heatmap List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Distribusi Area</h3>
            <div className="space-y-6">
              {areaDistribution.map((area, index) => {
                const maxValue = Math.max(...areaDistribution.map(a => a.value));
                const percentage = (area.value / maxValue) * 100;
                
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{area.name}</span>
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400">
                        {area.value} orang
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.8, type: 'spring' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: area.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Aktivitas Terkini</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
              {activityTimeline.slice(0, 5).map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-primary-100 dark:bg-primary-900/30 text-primary-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  </div>
                  
                  {/* Timeline content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{activity.time}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{activity.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600 transition-colors">
              Muat Lebih Banyak
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
