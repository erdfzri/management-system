import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Ticketing from './pages/Ticketing';
import Visitors from './pages/Visitors';
import Checkpoints from './pages/Checkpoints';
import POS from './pages/POS';
import POSTransaction from './pages/POSTransaction';
import TicketPurchase from './pages/TicketPurchase';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Branches from './pages/Branches';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('/');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (path) => {
    window.location.hash = path;
    setMobileSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <Dashboard />;
      case '/ticketing':
        return <Ticketing />;
      case '/visitors':
        return <Visitors />;
      case '/checkpoints':
        return <Checkpoints />;
      case '/pos':
        return <POS />;
      case '/pos/transaction':
        return <POSTransaction />;
      case '/pos/ticket':
        return <TicketPurchase />;
      case '/inventory':
        return <Inventory />;
      case '/analytics':
        return <Analytics />;
      case '/branches':
        return <Branches />;
      case '/staff':
        return <Staff />;
      case '/reports':
        return <Reports />;
      case '/settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 print:bg-white overflow-x-hidden">
      <div className="print:hidden">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
      </div>
      
      <div className="md:ml-[280px] min-h-screen print:ml-0 print:m-0 w-full md:w-auto">
        <div className="print:hidden">
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            toggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
          />
        </div>
        
        <main className="pt-16 print:pt-0">
          <div className="p-6 print:p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

// Coming Soon Component for unimplemented pages
function ComingSoon({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-32 h-32 bg-gradient-purple rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-6xl">🚧</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">This page is under construction</p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-xl font-medium">
          Coming Soon
        </div>
      </motion.div>
    </div>
  );
}

export default App;
