import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  subtitle,
  color = 'purple',
  delay = 0 
}) {
  const colorClasses = {
    purple: 'bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95]', // violet-500 to violet-900
    green: 'bg-gradient-to-br from-[#10b981] to-[#047857]', // emerald-500 to emerald-700
    blue: 'bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]', // blue-500 to blue-700
    orange: 'bg-gradient-to-br from-[#f97316] to-[#c2410c]', // orange-500 to orange-700
    pink: 'bg-gradient-to-br from-[#ec4899] to-[#be185d]', // pink-500 to pink-700
    indigo: 'bg-gradient-to-br from-[#6366f1] to-[#4338ca]', // indigo-500 to indigo-700
  };

  const iconColorClasses = {
    purple: 'text-white',
    green: 'text-white',
    blue: 'text-white',
    orange: 'text-white',
    pink: 'text-white',
    indigo: 'text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative overflow-hidden ${colorClasses[color]} rounded-[1.5rem] p-5 text-white group transition-all min-h-[10.625rem] lg:min-h-[9.375rem] xl:min-h-[10.625rem] flex flex-col justify-between`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-4 xl:mb-6">
          <div className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-[0.75rem] lg:rounded-[0.625rem] xl:rounded-[0.75rem] bg-white/10 border border-white/20 border-t-white/40 border-l-white/30 flex items-center justify-center backdrop-blur-lg">
            <Icon className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white/90" strokeWidth={1.5} />
          </div>
          <MoreHorizontal className="w-6 h-6 text-white/50 cursor-pointer hover:text-white transition-colors" />
        </div>
        
        {/* Middle Content */}
        <div className="relative z-10 w-full pr-2">
          <p className="text-[0.875rem] lg:text-[0.75rem] xl:text-[0.875rem] font-medium text-white/80 mb-1">{title}</p>
          <h3 className="text-2xl lg:text-lg xl:text-2xl font-bold tracking-tight mb-4 lg:mb-2 xl:mb-4 leading-tight drop-shadow-md">
            {value}
          </h3>
          
          {/* Bottom Trend */}
          {trend ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                {trend === 'up' ? (
                  <ArrowUp className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-emerald-400" strokeWidth={2.5} />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-rose-400" strokeWidth={2.5} />
                )}
                <span className={`text-[0.75rem] lg:text-[0.625rem] xl:text-[0.75rem] font-semibold ${
                  trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {trendValue}
                </span>
              </div>
              <span className="text-[0.75rem] lg:text-[0.625rem] xl:text-[0.75rem] font-medium text-white/50 hidden xl:inline-block">vs last month</span>
            </div>
          ) : subtitle ? (
            <p className="text-[0.75rem] lg:text-[0.625rem] xl:text-[0.75rem] font-medium text-white/60 line-clamp-1">{subtitle}</p>
          ) : null}
        </div>
      </div>

      {/* Right Glassmorphism Icon */}
      <div className="absolute right-3 bottom-3 xl:right-5 xl:bottom-5 z-0 transition-transform duration-500 group-hover:scale-105">
        <div className="w-[4rem] h-[4rem] xl:w-[5.5rem] xl:h-[5.5rem] rounded-[1rem] xl:rounded-[1.25rem] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-3xl flex items-center justify-center border border-white/20 border-t-white/40 border-l-white/30 relative overflow-hidden">
           {/* Inner glow effect */}
           <div className={`absolute inset-0 opacity-40 bg-gradient-to-br from-white/30 to-transparent mix-blend-overlay pointer-events-none`} />
           <Icon className={`w-8 h-8 xl:w-11 xl:h-11 ${iconColorClasses[color]} relative z-10`} strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}
