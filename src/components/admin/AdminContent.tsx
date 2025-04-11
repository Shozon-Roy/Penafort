
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  FileImage,
  Home,
  ShoppingCart,
  Info,
  FileQuestion,
  CalendarClock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock content pages data
const mockPages = [
  { id: 1, title: 'Home Page', slug: '/', updated: '2023-06-10T10:30:00Z', status: 'Published', type: 'Page', icon: Home },
  { id: 2, title: 'About Us', slug: '/about', updated: '2023-06-08T15:45:00Z', status: 'Published', type: 'Page', icon: Info },
  { id: 3, title: 'Products', slug: '/products', updated: '2023-06-09T09:20:00Z', status: 'Published', type: 'Page', icon: ShoppingCart },
  { id: 4, title: 'Contact Us', slug: '/contact', updated: '2023-06-07T14:10:00Z', status: 'Published', type: 'Page', icon: FileQuestion },
  { id: 5, title: 'Privacy Policy', slug: '/privacy', updated: '2023-06-05T08:55:00Z', status: 'Published', type: 'Legal', icon: FileText },
  { id: 6, title: 'Terms of Service', slug: '/terms', updated: '2023-06-04T11:25:00Z', status: 'Published', type: 'Legal', icon: FileText },
];

// Mock blog posts data
const mockPosts = [
  { id: 1, title: 'Summer Fruits Guide', published: '2023-06-10T10:30:00Z', author: 'John Doe', category: 'Seasonal', status: 'Published' },
  { id: 2, title: 'Healthy Breakfast Ideas', published: '2023-06-08T15:45:00Z', author: 'Maria Garcia', category: 'Health', status: 'Published' },
  { id: 3, title: 'Sustainable Grocery Shopping', published: '2023-06-05T09:20:00Z', author: 'Robert Johnson', category: 'Sustainability', status: 'Draft' },
  { id: 4, title: 'Best Dairy Alternatives', published: '2023-06-01T14:10:00Z', author: 'Sarah Wilson', category: 'Health', status: 'Published' },
  { id: 5, title: 'Upcoming Store Events', published: '2023-05-28T08:55:00Z', author: 'David Lee', category: 'Events', status: 'Published' },
  { id: 6, title: 'New Product Launch: Organic Teas', published: null, author: 'Lisa Wang', category: 'Products', status: 'Draft' },
];

// Mock banners data
const mockBanners = [
  { id: 1, title: 'Summer Sale Banner', location: 'Home Page', startDate: '2023-06-01T00:00:00Z', endDate: '2023-06-30T23:59:59Z', status: 'Active' },
  { id: 2, title: 'New Products', location: 'Products Page', startDate: '2023-06-10T00:00:00Z', endDate: '2023-07-10T23:59:59Z', status: 'Active' },
  { id: 3, title: 'Holiday Special', location: 'Home Page', startDate: '2023-12-01T00:00:00Z', endDate: '2023-12-31T23:59:59Z', status: 'Scheduled' },
  { id: 4, title: 'Back to School Promotion', location: 'Home Page', startDate: '2023-08-15T00:00:00Z', endDate: '2023-09-15T23:59:59Z', status: 'Scheduled' },
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [searchTerm, setSearchTerm] = useState('');
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Filter function based on active tab
  const getFilteredContent = () => {
    if (activeTab === 'pages') {
      return mockPages.filter(page => 
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'blog') {
      return mockPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'banners') {
      return mockBanners.filter(banner => 
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Button className="bg-penafort-green hover:bg-penafort-green/90">
          <Plus className="mr-2 h-4 w-4" /> 
          {activeTab === 'pages' ? 'Add Page' : activeTab === 'blog' ? 'Add Post' : 'Add Banner'}
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Website Content</CardTitle>
          <CardDescription>
            Manage your website pages, blog posts, and promotional banners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="pages" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Pages
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Blog
                </TabsTrigger>
                <TabsTrigger value="banners" className="flex items-center gap-1">
                  <FileImage className="h-4 w-4" />
                  Banners
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder={`Search ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <TabsContent value="pages" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredContent().map((page: any) => (
                      <TableRow key={page.id}>
                        <TableCell>
                          <div className="flex items-center gap-2 font-medium">
                            <page.icon className="h-4 w-4 text-gray-500" />
                            {page.title}
                          </div>
                        </TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell>{formatDate(page.updated)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{page.type}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Page
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
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
            </TabsContent>
            
            <TabsContent value="blog" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Published Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredContent().map((post: any) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{formatDate(post.published)}</TableCell>
                        <TableCell>
                          <Badge className={post.status === 'Published' 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
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
            </TabsContent>
            
            <TabsContent value="banners" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredContent().map((banner: any) => (
                      <TableRow key={banner.id}>
                        <TableCell className="font-medium">{banner.title}</TableCell>
                        <TableCell>{banner.location}</TableCell>
                        <TableCell>{formatDate(banner.startDate)}</TableCell>
                        <TableCell>{formatDate(banner.endDate)}</TableCell>
                        <TableCell>
                          <Badge className={banner.status === 'Active' 
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"}>
                            {banner.status === 'Active' ? (
                              <> <CalendarClock className="h-3 w-3 mr-1" /> {banner.status} </>
                            ) : (
                              banner.status
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;
