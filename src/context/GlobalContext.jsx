import React, { createContext, useContext, useState } from 'react';
import * as mockData from '../data/mockData';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [facilitiesData, setFacilitiesData] = useState(mockData.facilitiesData);
  const [dashboardStats, setDashboardStats] = useState(mockData.dashboardStats);
  const [visitorTrend, setVisitorTrend] = useState(mockData.visitorTrend);
  const [areaDistribution, setAreaDistribution] = useState(mockData.areaDistribution);
  const [recentTransactions, setRecentTransactions] = useState(mockData.recentTransactions);
  const [checkpointStatus, setCheckpointStatus] = useState(mockData.checkpointStatus);
  const [ticketCategories, setTicketCategories] = useState(mockData.ticketCategories);
  const [inventoryItems, setInventoryItems] = useState(mockData.inventoryItems);
  const [branches, setBranches] = useState(mockData.branches);
  const [staffRoles, setStaffRoles] = useState(mockData.staffRoles);
  const [topAttractions, setTopAttractions] = useState(mockData.topAttractions);
  const [peakHours, setPeakHours] = useState(mockData.peakHours);
  const [paymentMethods, setPaymentMethods] = useState(mockData.paymentMethods);
  const [notifications, setNotifications] = useState(mockData.notifications);
  const [activityTimeline, setActivityTimeline] = useState(mockData.activityTimeline);

  // Helper actions
  const addTransaction = (tx) => {
    setRecentTransactions(prev => [tx, ...prev]);
    // update stats
    setDashboardStats(prev => ({
      ...prev,
      revenueToday: prev.revenueToday + tx.amount,
      ticketsSold: prev.ticketsSold + 1
    }));
  };

  const restockInventory = (id, amount) => {
    setInventoryItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = item.stock + amount;
        let status = 'good';
        if (newStock < item.minStock) status = 'critical';
        else if (newStock < item.minStock * 1.5) status = 'low';
        return { ...item, stock: newStock, status };
      }
      return item;
    }));
  };

  const value = {
    facilitiesData, setFacilitiesData,
    dashboardStats, setDashboardStats,
    visitorTrend, setVisitorTrend,
    areaDistribution, setAreaDistribution,
    recentTransactions, setRecentTransactions,
    checkpointStatus, setCheckpointStatus,
    ticketCategories, setTicketCategories,
    inventoryItems, setInventoryItems,
    branches, setBranches,
    staffRoles, setStaffRoles,
    topAttractions, setTopAttractions,
    peakHours, setPeakHours,
    paymentMethods, setPaymentMethods,
    notifications, setNotifications,
    activityTimeline, setActivityTimeline,
    addTransaction,
    restockInventory
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
