
import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { UserAddress } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

interface AddressFormProps {
  existingAddress?: UserAddress;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const formSchema = z.object({
  street: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  postalCode: z.string().min(1, { message: 'Postal code is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  isDefault: z.boolean().default(false),
  type: z.string().min(1, { message: 'Address type is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const AddressForm: React.FC<AddressFormProps> = ({ 
  existingAddress, 
  onSuccess, 
  onCancel 
}) => {
  const { addAddress, updateAddress, loading } = useUser();
  const [addressId] = useState<number | undefined>(
    existingAddress ? (existingAddress as any).id : undefined
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: existingAddress?.street || '',
      city: existingAddress?.city || '',
      state: existingAddress?.state || '',
      postalCode: existingAddress?.postal_code || '',
      country: existingAddress?.country || 'US',
      isDefault: existingAddress?.is_default || false,
      type: existingAddress?.type || 'home',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const addressData: UserAddress = {
      street: data.street,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      country: data.country,
      is_default: data.isDefault,
      type: data.type,
    };

    let success = false;
    
    if (addressId) {
      // Update existing address
      success = await updateAddress(addressId, addressData);
    } else {
      // Add new address
      success = await addAddress(addressData);
    }

    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <MapPin className="text-penafort-green mr-2" />
        <h2 className="text-xl font-semibold">
          {existingAddress ? 'Edit Address' : 'Add New Address'}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Cityville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="US" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Address Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home">Home</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="work" />
                      <Label htmlFor="work">Work</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Set as default address</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : existingAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
