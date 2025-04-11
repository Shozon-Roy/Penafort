
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, ShoppingCart, FileText, BarChart2, Settings } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminContent from '@/components/admin/AdminContent';

const Admin = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is authenticated and has admin role
  // In a real application, you would check if the user has admin privileges
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Mock admin check - in a real app, this would verify admin status 
    // from user.user_metadata.role or from a Supabase RLS policy
    const isAdmin = user?.email === 'admin@example.com'; // This is just for demonstration
    
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          <PageTransition>
            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'content' && <AdminContent />}
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Admin;
