import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Target, Clock, Repeat } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import StatCard from '../components/StatCard';
import { useGlobal } from '../context/GlobalContext';

export default function Analytics() {
  const { peakHours, topAttractions } = useGlobal();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const revenueData = [
    { month: 'Jan', revenue: 450000000, visitors: 12500 },
    { month: 'Feb', revenue: 520000000, visitors: 14200 },
    { month: 'Mar', revenue: 680000000, visitors: 18900 },
    { month: 'Apr', revenue: 590000000, visitors: 16400 },
    { month: 'May', revenue: 750000000, visitors: 21200 },
    { month: 'Jun', revenue: 820000000, visitors: 24800 },
  ];

  const conversionData = [
    { week: 'Week 1', rate: 68 },
    { week: 'Week 2', rate: 72 },
    { week: 'Week 3', rate: 65 },
    { week: 'Week 4', rate: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive business insights and metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(820000000)}
          icon={DollarSign}
          trend="up"
          trendValue="+22.5%"
          color="green"
          delay={0}
        />
        <StatCard
          title="Total Visitors"
          value="24,800"
          icon={Users}
          trend="up"
          trendValue="+18.3%"
          color="purple"
          delay={0.1}
        />
        <StatCard
          title="Conversion Rate"
          value="78%"
          icon={Target}
          trend="up"
          trendValue="+5.2%"
          color="blue"
          delay={0.2}
        />
        <StatCard
          title="Avg. Visit Duration"
          value="3.5 hours"
          icon={Clock}
          trend="up"
          trendValue="+12 min"
          color="orange"
          delay={0.3}
        />
        <StatCard
          title="Repeat Customers"
          value="42%"
          icon={Repeat}
          trend="up"
          trendValue="+8.1%"
          color="pink"
          delay={0.4}
        />
        <StatCard
          title="Revenue per Visitor"
          value={formatCurrency(33065)}
          icon={TrendingUp}
          trend="up"
          trendValue="+3.8%"
          color="indigo"
          delay={0.5}
        />
      </div>

      {/* Revenue & Visitor Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue & Visitor Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area yAxisId="right" type="monotone" dataKey="visitors" stroke="#a855f7" fillOpacity={1} fill="url(#colorVisitors)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Peak Hours & Conversion Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Peak Hours Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="visitors" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Conversion Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="rate" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Attractions Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Attractions Performance</h3>
        <div className="space-y-4">
          {topAttractions.map((attraction, index) => {
            const maxRevenue = Math.max(...topAttractions.map(a => a.revenue));
            const percentage = (attraction.revenue / maxRevenue) * 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{attraction.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {attraction.visitors} visitors • ⭐ {attraction.rating}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">{formatCurrency(attraction.revenue)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-purple rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Insight</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Peak hours are between 2-5 PM. Consider dynamic pricing during these hours to maximize revenue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📈 Opportunity</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            42% repeat customer rate is excellent. Launch a loyalty program to increase this further.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-800"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Recommendation</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Water Slide Extreme is your top performer. Consider expanding similar attractions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
