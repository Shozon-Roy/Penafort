
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { 
  supabase, 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser, 
  signInWithGoogle,
  startPhoneVerification,
  verifyOTP,
  saveUserAddress,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress,
  updateUserProfile,
  UserAddress
} from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// Define types
type UserContextType = {
  user: User | null;
  loading: boolean;
  addresses: UserAddress[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string, address?: UserAddress) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  startPhoneVerification: (phone: string) => Promise<boolean>;
  verifyPhone: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: UserAddress) => Promise<boolean>;
  getAddresses: () => Promise<UserAddress[]>;
  updateAddress: (id: number, updates: Partial<UserAddress>) => Promise<boolean>;
  removeAddress: (id: number) => Promise<boolean>;
  updateProfile: (updates: { full_name?: string; phone?: string; avatar_url?: string }) => Promise<boolean>;
  isAuthenticated: boolean;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  // Check for existing user session on initial load
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error getting current user:', error);
        } else if (user) {
          setUser(user);
          // Load user addresses if authenticated
          const { data } = await getUserAddresses(user.id);
          if (data) {
            setAddresses(data);
          }
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          // Load addresses when user signs in
          const { data } = await getUserAddresses(session.user.id);
          if (data) {
            setAddresses(data);
          }
        } else {
          // Clear addresses when user signs out
          setAddresses([]);
        }
        
        setLoading(false);
      }
    );

    getInitialSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return false;
      }
      
      if (data.user) {
        setUser(data.user);
        
        // Load user addresses
        const { data: addressData } = await getUserAddresses(data.user.id);
        if (addressData) {
          setAddresses(addressData);
        }
        
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (
    name: string, 
    email: string, 
    password: string, 
    phone?: string,
    address?: UserAddress
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const userData = { 
        full_name: name,
        phone,
        address
      };
      
      const { data, error } = await signUp(email, password, userData);
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return false;
      }
      
      if (data.user) {
        setUser(data.user);
        
        // If address was provided, update addresses state
        if (address) {
          const { data: addressData } = await getUserAddresses(data.user.id);
          if (addressData) {
            setAddresses(addressData);
          }
        }
        
        toast({
          title: "Account created!",
          description: "Your account has been successfully created",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: "Google login failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      toast({
        title: "Google login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  // Phone verification
  const startVerification = async (phone: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await startPhoneVerification(phone);
      
      if (error) {
        toast({
          title: "Phone verification failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${phone}`,
      });
      return true;
    } catch (error) {
      console.error('Error during phone verification:', error);
      toast({
        title: "Phone verification failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyPhone = async (phone: string, otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await verifyOTP(phone, otp);
      
      if (error) {
        toast({
          title: "OTP verification failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      if (data.user) {
        setUser(data.user);
        toast({
          title: "Phone verified",
          description: "Your phone number has been successfully verified",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during OTP verification:', error);
      toast({
        title: "OTP verification failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        console.error('Error during sign out:', error);
        toast({
          title: "Logout failed",
          description: "An error occurred while logging out",
          variant: "destructive"
        });
        return;
      }
      
      setUser(null);
      setAddresses([]);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  // Address management
  const addAddress = async (address: UserAddress): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await saveUserAddress(user.id, address);
      
      if (error) {
        toast({
          title: "Failed to save address",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      // Update addresses state
      const { data: addressData } = await getUserAddresses(user.id);
      if (addressData) {
        setAddresses(addressData);
      }
      
      toast({
        title: "Address saved",
        description: "Your address has been saved successfully",
      });
      return true;
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Failed to save address",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const getAddresses = async (): Promise<UserAddress[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await getUserAddresses(user.id);
      
      if (error) {
        toast({
          title: "Failed to load addresses",
          description: error.message,
          variant: "destructive"
        });
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error loading addresses:', error);
      toast({
        title: "Failed to load addresses",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return [];
    }
  };

  const updateAddress = async (id: number, updates: Partial<UserAddress>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await updateUserAddress(id, updates);
      
      if (error) {
        toast({
          title: "Failed to update address",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      // Update addresses state
      const { data } = await getUserAddresses(user.id);
      if (data) {
        setAddresses(data);
      }
      
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Failed to update address",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const removeAddress = async (id: number): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await deleteUserAddress(id);
      
      if (error) {
        toast({
          title: "Failed to delete address",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      // Update addresses state
      const { data } = await getUserAddresses(user.id);
      if (data) {
        setAddresses(data);
      }
      
      toast({
        title: "Address deleted",
        description: "Your address has been deleted",
      });
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Failed to delete address",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  // Profile management
  const updateProfile = async (updates: { 
    full_name?: string; 
    phone?: string; 
    avatar_url?: string;
  }): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await updateUserProfile(user.id, updates);
      
      if (error) {
        toast({
          title: "Failed to update profile",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      if (data.user) {
        setUser(data.user);
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Failed to update profile",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const value = {
    user,
    loading,
    addresses,
    login,
    signup,
    loginWithGoogle,
    startPhoneVerification: startVerification,
    verifyPhone,
    logout,
    addAddress,
    getAddresses,
    updateAddress,
    removeAddress,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the auth context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
