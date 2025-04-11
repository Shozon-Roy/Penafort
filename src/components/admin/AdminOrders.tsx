
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ShoppingCart, 
  Search, 
  Eye, 
  Printer, 
  MoreHorizontal, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package, 
  XCircle,
  RefreshCw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';

// Mock orders data
const mockOrders = [
  { id: 'ORD-38421', customer: 'John Doe', date: '2023-06-12T10:30:00Z', amount: 125.00, status: 'Completed', items: 4 },
  { id: 'ORD-38420', customer: 'Maria Garcia', date: '2023-06-11T15:45:00Z', amount: 86.25, status: 'Pending', items: 2 },
  { id: 'ORD-38419', customer: 'Robert Johnson', date: '2023-06-10T09:20:00Z', amount: 237.50, status: 'Completed', items: 6 },
  { id: 'ORD-38418', customer: 'Lisa Wang', date: '2023-06-10T14:10:00Z', amount: 49.99, status: 'Cancelled', items: 1 },
  { id: 'ORD-38417', customer: 'David Lee', date: '2023-06-09T08:55:00Z', amount: 175.30, status: 'Shipped', items: 3 },
  { id: 'ORD-38416', customer: 'Sarah Wilson', date: '2023-06-08T11:25:00Z', amount: 92.75, status: 'Processing', items: 2 },
  { id: 'ORD-38415', customer: 'Michael Brown', date: '2023-06-07T16:40:00Z', amount: 315.20, status: 'Shipped', items: 7 },
  { id: 'ORD-38414', customer: 'Jennifer Smith', date: '2023-06-06T13:15:00Z', amount: 64.50, status: 'Delivered', items: 2 },
];

// Order item details for the dialog
const mockOrderItems = [
  { id: 1, name: 'Organic Bananas', price: 2.99, quantity: 2, total: 5.98, image: 'https://placehold.co/60x60' },
  { id: 2, name: 'Fresh Milk', price: 3.49, quantity: 1, total: 3.49, image: 'https://placehold.co/60x60' },
  { id: 3, name: 'Whole Wheat Bread', price: 4.29, quantity: 1, total: 4.29, image: 'https://placehold.co/60x60' },
  { id: 4, name: 'Ground Beef', price: 6.99, quantity: 1, total: 6.99, image: 'https://placehold.co/60x60' },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
      case 'Processing':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> {status}
        </Badge>;
      case 'Pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
          <Clock className="h-3 w-3" /> {status}
        </Badge>;
      case 'Processing':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 flex items-center gap-1">
          <RefreshCw className="h-3 w-3" /> {status}
        </Badge>;
      case 'Shipped':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
          <Truck className="h-3 w-3" /> {status}
        </Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
          <XCircle className="h-3 w-3" /> {status}
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> 
          Print Orders
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            View and manage customer orders and shipments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Export
              </Button>
              <Button variant="outline">
                Filter
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openOrderDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  {formatDate(selectedOrder.date)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Customer</h3>
                    <p>{selectedOrder.customer}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium">Status</h3>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="space-y-4">
                  {mockOrderItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-12 w-12 rounded object-cover mr-4" 
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${item.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${(selectedOrder.amount - 5).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>$5.00</p>
                  </div>
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>${selectedOrder.amount.toFixed(2)}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Shipping Address</h3>
                    <p className="text-sm text-gray-500">123 Main St</p>
                    <p className="text-sm text-gray-500">Anytown, CA 12345</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium">Payment Method</h3>
                    <p className="text-sm text-gray-500">Credit Card ending in 4242</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
                  Close
                </Button>
                <Button className="bg-penafort-green hover:bg-penafort-green/90">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Invoice
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
