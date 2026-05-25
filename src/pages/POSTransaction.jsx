import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  CreditCard,
  Smartphone,
  Banknote,
  X,
  Check,
  Printer,
  ChevronLeft,
  Filter,
  Tag
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const products = [
  { id: 1, name: 'Combo Meal A', price: 150000, category: 'Food', image: '🍔', color: 'from-amber-400 to-orange-500' },
  { id: 2, name: 'Combo Meal B', price: 175000, category: 'Food', image: '🍕', color: 'from-red-400 to-rose-600' },
  { id: 3, name: 'Air Mineral', price: 20000, category: 'Beverage', image: '💧', color: 'from-cyan-400 to-blue-500' },
  { id: 4, name: 'Soft Drink', price: 25000, category: 'Beverage', image: '🥤', color: 'from-fuchsia-400 to-purple-600' },
  { id: 5, name: 'Ice Cream', price: 50000, category: 'Dessert', image: '🍦', color: 'from-pink-400 to-rose-500' },
  { id: 6, name: 'Snack Pack', price: 50000, category: 'Snack', image: '🍿', color: 'from-yellow-400 to-amber-500' },
  { id: 7, name: 'Kopi Susu', price: 50000, category: 'Beverage', image: '☕', color: 'from-stone-500 to-orange-900' },
  { id: 8, name: 'Sandwich', price: 75000, category: 'Food', image: '🥪', color: 'from-lime-400 to-green-600' },
  { id: 9, name: 'Kentang Goreng', price: 45000, category: 'Snack', image: '🍟', color: 'from-yellow-300 to-amber-500' },
  { id: 10, name: 'Jus Jeruk', price: 35000, category: 'Beverage', image: '🧃', color: 'from-orange-400 to-red-500' },
  { id: 11, name: 'Kue Coklat', price: 60000, category: 'Dessert', image: '🍰', color: 'from-amber-700 to-stone-800' },
  { id: 12, name: 'Hot Dog', price: 55000, category: 'Food', image: '🌭', color: 'from-red-500 to-orange-600' },
];

const categories = ['Semua', 'Food', 'Beverage', 'Snack', 'Dessert'];

export default function POSTransaction() {
  const { setRecentTransactions, setPaymentMethods, setDashboardStats } = useGlobal();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [lastTransaction, setLastTransaction] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setShowPayment(true);
  };

  const processPayment = () => {
    const txId = `TRX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    // Save transaction for printing
    setLastTransaction({
      id: txId,
      time: new Date().toLocaleString('id-ID'),
      items: [...cart],
      subtotal,
      tax,
      total,
      paymentMethod
    });

    // Update global state so it shows up in Transaksi Terbaru
    const newTransaction = {
      id: txId,
      customer: 'Walk-in Customer',
      type: 'POS F&B',
      amount: total,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'selesai'
    };
    setRecentTransactions(prev => [newTransaction, ...prev]);

    // Update payment method stats
    const methodMap = {
      'qris': 'QRIS',
      'cash': 'Cash',
      'card': 'Debit Card'
    };
    
    setPaymentMethods(prev => prev.map(m => {
      if (m.method === methodMap[paymentMethod]) {
        return {
          ...m,
          amount: m.amount + total,
          transactions: m.transactions + 1
        };
      }
      return m;
    }));

    setDashboardStats(prev => ({
      ...prev,
      revenueToday: prev.revenueToday + total
    }));

    // Simulate payment processing
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleFinish = () => {
    setShowSuccess(false);
    clearCart();
    setPaymentMethod(null);
    setPaymentAmount('');
    setLastTransaction(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    <div className="space-y-6 pb-10 print:hidden">
      {/* Page Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.hash = '#/pos'}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Terminal POS</h1>
            <p className="text-xs font-bold text-primary-500 uppercase tracking-widest">Kasir Utama</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl font-bold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Sistem Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Search & Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari menu atau kode SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-inner"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-600">
                <Filter className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredProducts.map((product, index) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => addToCart(product)}
                className="relative p-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-transparent hover:shadow-2xl transition-all duration-300 group overflow-hidden text-left"
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${product.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 shadow-lg shadow-gray-200 dark:shadow-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                  <span className="text-3xl drop-shadow-md">{product.image}</span>
                </div>
                
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {product.category}
                </p>
                <p className="font-black text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 w-fit px-2 py-1 rounded-lg">
                  {formatCurrency(product.price)}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Cart Section */}
        <div className="xl:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col h-[calc(100vh-140px)] sticky top-24 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  Pesanan Aktif
                </h3>
                {cart.length > 0 && (
                  <span className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} Item
                  </span>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  >
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-bold text-lg">Keranjang Kosong</p>
                      <p className="text-gray-500 text-sm font-medium">Pilih menu untuk menambahkan pesanan</p>
                    </div>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      className="p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex gap-3 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                        <span className="text-2xl drop-shadow-md">{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate pr-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-primary-600 dark:text-primary-400 font-black text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center hover:text-red-500 shadow-sm transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold text-sm text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center hover:text-primary-500 shadow-sm transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Summary */}
            {cart.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800/80 p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-500">Pajak (10%)</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700 mt-2">
                    <span className="text-gray-900 dark:text-white font-bold">Total Tagihan</span>
                    <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                   <button
                    onClick={() => handlePayment('qris')}
                    className="p-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white rounded-xl hover:border-primary-500 hover:text-primary-600 transition-all flex flex-col items-center justify-center gap-1 font-bold shadow-sm"
                  >
                    <Smartphone className="w-6 h-6" />
                    <span>QRIS</span>
                  </button>
                  <button
                    onClick={() => handlePayment('cash')}
                    className="p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex flex-col items-center justify-center gap-1 font-bold shadow-lg"
                  >
                    <Banknote className="w-6 h-6" />
                    <span>Tunai</span>
                  </button>
                </div>
                
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold text-sm transition-colors"
                >
                  Batalkan Pesanan
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setShowPayment(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-purple-600" />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    Pembayaran
                  </h3>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Metode: {paymentMethod}</p>
                </div>
                <button
                  onClick={() => setShowPayment(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="mb-8">
                <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-6 rounded-2xl mb-6 text-center shadow-lg">
                  <p className="text-sm font-bold opacity-80 mb-1">Total Tagihan</p>
                  <p className="text-4xl font-black">{formatCurrency(total)}</p>
                </div>

                {paymentMethod === 'cash' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Uang Diterima
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder="0"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xl font-black focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-inner transition-all"
                        />
                      </div>
                    </div>
                    {paymentAmount && calculateChange() >= 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl text-center"
                      >
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">Kembalian</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(calculateChange())}
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {paymentMethod === 'qris' && (
                  <div className="text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="bg-white p-4 mx-auto mb-4 rounded-2xl inline-block shadow-sm border border-gray-200">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Dummy_QRIS_Payment" 
                        alt="QRIS Dummy" 
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Arahkan pelanggan untuk memindai kode QR menggunakan aplikasi e-Wallet atau M-Banking.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={processPayment}
                disabled={paymentMethod === 'cash' && calculateChange() < 0}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 transition-all active:scale-95"
              >
                Proses Pembayaran
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center z-10"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
              >
                <Check className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                Pembayaran Sukses!
              </h3>
              <p className="text-gray-500 font-medium mb-8">
                Transaksi berhasil diselesaikan dan dicatat ke sistem.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handlePrint}
                  className="py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  Cetak Struk (PDF)
                </button>
                <button 
                  onClick={handleFinish}
                  className="py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-colors"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>

    {/* Printable Receipt (Only visible during print) */}
    {lastTransaction && (
      <div className="hidden print:block w-full max-w-[80mm] mx-auto text-black bg-white p-4 font-mono text-sm">
        <div className="text-center mb-4">
          <h2 className="font-bold text-xl mb-1">Grand Oasis</h2>
          <p className="text-xs">Taman Wisata Alam & Resort</p>
          <p className="text-xs">Jl. Pariwisata No. 1, Kota</p>
        </div>
        
        <div className="border-t border-b border-dashed border-gray-400 py-2 mb-2 text-xs space-y-1">
          <div className="flex justify-between"><span>No:</span> <span>{lastTransaction.id}</span></div>
          <div className="flex justify-between"><span>Tgl:</span> <span>{lastTransaction.time}</span></div>
          <div className="flex justify-between"><span>Kasir:</span> <span>Admin</span></div>
        </div>

        <div className="mb-2">
          <table className="w-full text-xs">
            <tbody>
              {lastTransaction.items.map(item => (
                <tr key={item.id}>
                  <td className="py-1">
                    <div>{item.name}</div>
                    <div className="text-gray-500">{item.quantity} x {formatCurrency(item.price)}</div>
                  </td>
                  <td className="py-1 text-right align-bottom">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-dashed border-gray-400 pt-2 mb-4 text-xs space-y-1">
          <div className="flex justify-between"><span>Subtotal:</span> <span>{formatCurrency(lastTransaction.subtotal)}</span></div>
          <div className="flex justify-between"><span>Pajak (10%):</span> <span>{formatCurrency(lastTransaction.tax)}</span></div>
          <div className="flex justify-between font-bold text-sm mt-1 border-t border-gray-300 pt-1">
            <span>TOTAL:</span> <span>{formatCurrency(lastTransaction.total)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Metode:</span> <span className="uppercase">{lastTransaction.paymentMethod}</span>
          </div>
        </div>

        <div className="text-center text-xs mt-8">
          <p>Terima kasih atas kunjungan Anda</p>
          <p>Barang yang sudah dibeli tidak dapat ditukar/dikembalikan</p>
        </div>
      </div>
    )}
    </>
  );
}
