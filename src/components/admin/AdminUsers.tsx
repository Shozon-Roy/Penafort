
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Search, Edit, Trash2, MoreHorizontal, User, UserPlus, ShieldCheck, ShieldX } from 'lucide-react';
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

// Mock users data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2023-06-15T10:30:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Active', lastActive: '2023-06-14T15:45:00Z' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Customer', status: 'Active', lastActive: '2023-06-13T09:20:00Z' },
  { id: 4, name: 'Maria Garcia', email: 'maria@example.com', role: 'Manager', status: 'Active', lastActive: '2023-06-12T14:10:00Z' },
  { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Customer', status: 'Inactive', lastActive: '2023-05-30T08:55:00Z' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Customer', status: 'Active', lastActive: '2023-06-11T11:25:00Z' },
  { id: 7, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', status: 'Suspended', lastActive: '2023-05-20T16:40:00Z' },
  { id: 8, name: 'Lisa Wang', email: 'lisa@example.com', role: 'Manager', status: 'Active', lastActive: '2023-06-10T13:15:00Z' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="bg-penafort-green hover:bg-penafort-green/90">
          <UserPlus className="mr-2 h-4 w-4" /> 
          Add User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search users..." 
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'Admin' ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          <ShieldCheck className="mr-1 h-3 w-3" /> 
                          Admin
                        </Badge>
                      ) : user.role === 'Manager' ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          Manager
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                          Customer
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.status === 'Active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      ) : user.status === 'Inactive' ? (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                          Inactive
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          <ShieldX className="mr-1 h-3 w-3" /> 
                          Suspended
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.lastActive)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          {user.status === 'Active' ? (
                            <DropdownMenuItem className="text-amber-600">
                              <ShieldX className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
    </div>
  );
};

export default AdminUsers;
