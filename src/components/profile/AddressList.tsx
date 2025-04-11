
import React, { useState } from 'react';
import { UserAddress } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';
import { MapPin, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddressForm from './AddressForm';

const AddressList = () => {
  const { addresses, removeAddress } = useUser();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

  const handleAddSuccess = () => {
    setIsAddingAddress(false);
  };

  const handleEditSuccess = () => {
    setEditingAddress(null);
  };

  const handleDelete = async (id: number) => {
    await removeAddress(id);
  };

  const getAddressLabel = (type: string) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Work';
      default:
        return 'Other';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <Plus size={16} />
              <span>Add Address</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <AddressForm
              onSuccess={handleAddSuccess}
              onCancel={() => setIsAddingAddress(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8 border rounded-md">
          <MapPin className="mx-auto h-10 w-10 text-penafort-gray-300 mb-2" />
          <p className="text-penafort-text-secondary mb-4">No addresses saved yet</p>
          <Button 
            variant="outline" 
            onClick={() => setIsAddingAddress(true)}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Add Your First Address</span>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-lg ${address.is_default ? 'border-penafort-green bg-penafort-green/5' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={address.is_default ? "default" : "outline"}>
                      {getAddressLabel(address.type)}
                    </Badge>
                    {address.is_default && (
                      <Badge variant="outline" className="bg-penafort-green/10 text-penafort-green border-penafort-green/20">
                        Default
                      </Badge>
                    )}
                  </div>
                  
                  <p className="font-medium">{address.street}</p>
                  <p className="text-penafort-text-secondary">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p className="text-penafort-text-secondary">{address.country}</p>
                </div>
                
                <div className="flex gap-2">
                  <Dialog open={editingAddress === address} onOpenChange={(open) => {
                    if (!open) setEditingAddress(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditingAddress(address)}
                      >
                        <Edit size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <AddressForm
                        existingAddress={address}
                        onSuccess={handleEditSuccess}
                        onCancel={() => setEditingAddress(null)}
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={address.is_default} // Prevent deleting default address
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Address</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this address? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete((address as any).id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;
