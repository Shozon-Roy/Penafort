
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ArrowUpRight, DollarSign, Users, ShoppingCart, Package } from 'lucide-react';

// Mock data
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
];

const visitorData = [
  { name: 'Mon', visitors: 1000 },
  { name: 'Tue', visitors: 1200 },
  { name: 'Wed', visitors: 1400 },
  { name: 'Thu', visitors: 1300 },
  { name: 'Fri', visitors: 1500 },
  { name: 'Sat', visitors: 1800 },
  { name: 'Sun', visitors: 1600 },
];

const categoryData = [
  { name: 'Fruits', value: 400 },
  { name: 'Vegetables', value: 300 },
  { name: 'Dairy', value: 200 },
  { name: 'Meat', value: 150 },
  { name: 'Bakery', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h2 className="text-3xl font-bold">$12,426</h2>
              <p className="text-sm text-green-500 mt-1">+16% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
              <h2 className="text-3xl font-bold">2,741</h2>
              <p className="text-sm text-green-500 mt-1">+5.2% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <h2 className="text-3xl font-bold">342</h2>
              <p className="text-sm text-green-500 mt-1">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Total Products</p>
              <h2 className="text-3xl font-bold">128</h2>
              <p className="text-sm text-green-500 mt-1">+3 new this week</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visitor Statistics</CardTitle>
            <CardDescription>Last 7 days traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={visitorData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Order ID</th>
                    <th scope="col" className="px-6 py-3">Customer</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">#ORD-38421</th>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">Jun 12, 2023</td>
                    <td className="px-6 py-4">$125.00</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span></td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">#ORD-38420</th>
                    <td className="px-6 py-4">Maria Garcia</td>
                    <td className="px-6 py-4">Jun 11, 2023</td>
                    <td className="px-6 py-4">$86.25</td>
                    <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Pending</span></td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">#ORD-38419</th>
                    <td className="px-6 py-4">Robert Johnson</td>
                    <td className="px-6 py-4">Jun 10, 2023</td>
                    <td className="px-6 py-4">$237.50</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span></td>
                  </tr>
                  <tr className="bg-white">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">#ORD-38418</th>
                    <td className="px-6 py-4">Lisa Wang</td>
                    <td className="px-6 py-4">Jun 10, 2023</td>
                    <td className="px-6 py-4">$49.99</td>
                    <td className="px-6 py-4"><span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
