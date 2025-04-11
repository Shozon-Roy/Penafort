
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Phone, Mail, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import PhoneVerification from '@/components/auth/PhoneVerification';
import { UserAddress } from '@/lib/supabase';

import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const { signup, loginWithGoogle, loading } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [formState, setFormState] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Save form state
    setFormState(data);
    
    // If phone is provided but not verified, open verification dialog
    if (data.phone && !phoneVerified) {
      setVerificationOpen(true);
      return;
    }
    
    // Otherwise proceed with signup
    await completeSignup(data);
  };

  const completeSignup = async (data: FormValues) => {
    // Prepare address data if provided
    let address: UserAddress | undefined;
    
    if (data.street && data.city && data.state && data.postalCode) {
      address = {
        street: data.street,
        city: data.city,
        state: data.state,
        postal_code: data.postalCode,
        country: 'US', // Default
        is_default: true,
        type: 'home',
      };
    }
    
    const success = await signup(
      data.name, 
      data.email, 
      data.password, 
      phoneVerified ? data.phone : undefined,
      address
    );
    
    if (success) {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    // Note: Redirect will be handled by Supabase OAuth flow
  };

  const handlePhoneVerificationSuccess = () => {
    setPhoneVerified(true);
    setVerificationOpen(false);
    
    // Complete signup with the saved form data
    if (formState) {
      completeSignup(formState);
    }
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Create Account
              </motion.h1>
              <motion.p 
                className="text-penafort-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Join Penafort Supermarket
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              {/* Social login options */}
              <div className="mb-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <Mail size={20} />
                  <span>Continue with Google</span>
                </Button>
              </div>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-penafort-text-secondary">Or</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-penafort-text-primary font-medium">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="h-12 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-penafort-text-primary font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            {...field} 
                            className="h-12 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-penafort-text-primary font-medium">
                          Phone Number
                        </FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="+1 (234) 567-8901" 
                              {...field} 
                              className="h-12 text-base"
                            />
                          </FormControl>
                          <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
                            <DialogTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className={`h-12 w-12 ${phoneVerified ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                                disabled={!field.value}
                              >
                                {phoneVerified ? <Check /> : <Phone />}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <PhoneVerification
                                onSuccess={handlePhoneVerificationSuccess}
                                onCancel={() => setVerificationOpen(false)}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-penafort-text-primary font-medium">
                          Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showPassword ? 'text' : 'password'} 
                              placeholder="••••••••" 
                              {...field} 
                              className="h-12 text-base pr-10"
                            />
                          </FormControl>
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-penafort-text-primary font-medium">
                          Confirm Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showConfirmPassword ? 'text' : 'password'} 
                              placeholder="••••••••" 
                              {...field} 
                              className="h-12 text-base pr-10"
                            />
                          </FormControl>
                          <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <h3 className="text-penafort-text-primary font-medium mb-2">Delivery Address (Optional)</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-penafort-text-primary font-medium">
                              Street Address
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123 Main St" 
                                {...field} 
                                className="h-12 text-base"
                              />
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
                              <FormLabel className="text-penafort-text-primary font-medium">
                                City
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Cityville" 
                                  {...field} 
                                  className="h-12 text-base"
                                />
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
                              <FormLabel className="text-penafort-text-primary font-medium">
                                State
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="CA" 
                                  {...field} 
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-penafort-text-primary font-medium">
                              Postal Code
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="12345" 
                                {...field} 
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 bg-penafort-green text-white hover:bg-penafort-green/90 transition-all duration-300 mt-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-penafort-text-secondary">
                  Already have an account?{' '}
                  <Link to="/login" className="text-penafort-green hover:underline transition-all duration-200">
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center text-sm text-penafort-text-secondary"
            >
              By creating an account, you agree to our{' '}
              <a href="#" className="text-penafort-green hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-penafort-green hover:underline">
                Privacy Policy
              </a>
            </motion.div>
          </motion.div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default Signup;
