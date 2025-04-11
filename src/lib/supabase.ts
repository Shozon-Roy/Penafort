
import { createClient } from '@supabase/supabase-js';

// Providing fallback values to prevent runtime errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Log warning if environment variables are missing
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Authentication and data features will not work correctly.');
  console.warn('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Basic Auth Helper Functions
export const signUp = async (email: string, password: string, userData: { 
  full_name: string,
  phone?: string,
  address?: UserAddress
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  
  if (data?.user && userData.address) {
    // Save address to profiles table
    await saveUserAddress(data.user.id, userData.address);
  }
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Google OAuth
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes: 'email profile'
    }
  });
  
  return { data, error };
};

// Phone verification
export const startPhoneVerification = async (phone: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone
  });
  
  return { data, error };
};

export const verifyOTP = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  });
  
  return { data, error };
};

// Address management
export type UserAddress = {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  type: string; // 'home', 'work', etc.
  latitude?: number;
  longitude?: number;
};

export const saveUserAddress = async (userId: string, address: UserAddress) => {
  // If this is the default address, update any existing default to non-default
  if (address.is_default) {
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', userId);
  }
  
  const { data, error } = await supabase
    .from('user_addresses')
    .insert({
      user_id: userId,
      ...address
    })
    .select();
    
  return { data, error };
};

export const getUserAddresses = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });
    
  return { data, error };
};

export const updateUserAddress = async (addressId: number, updates: Partial<UserAddress>) => {
  // If setting this as default, update other addresses first
  if (updates.is_default) {
    const { data: addressData } = await supabase
      .from('user_addresses')
      .select('user_id')
      .eq('id', addressId)
      .single();
      
    if (addressData?.user_id) {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', addressData.user_id);
    }
  }
  
  const { data, error } = await supabase
    .from('user_addresses')
    .update(updates)
    .eq('id', addressId)
    .select();
    
  return { data, error };
};

export const deleteUserAddress = async (addressId: number) => {
  const { error } = await supabase
    .from('user_addresses')
    .delete()
    .eq('id', addressId);
    
  return { error };
};

// Profile management
export const updateUserProfile = async (userId: string, updates: { 
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates
  });
  
  return { data, error };
};
