
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { 
  BarChart2, 
  Package, 
  Users, 
  ShoppingCart, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          <Store size={24} className="text-penafort-green" />
          {!collapsed && <span className="ml-2 font-bold text-lg">Penafort Admin</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? "absolute -right-8 top-4 bg-white border rounded-full shadow-sm" : ""}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center w-full p-3 rounded-md transition-colors",
                  activeTab === item.id 
                    ? "bg-penafort-green/10 text-penafort-green font-medium" 
                    : "text-gray-600 hover:bg-gray-100",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon size={20} className={collapsed ? "" : "mr-3"} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t border-gray-200">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className={cn(
            "text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full justify-start",
            collapsed ? "justify-center px-2" : ""
          )}
        >
          <LogOut size={20} className={collapsed ? "" : "mr-3"} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
