
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Check, Loader2, ClipboardCopy, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';

// Mock function for setting up 2FA - this would need to be implemented with Supabase Functions
const setup2FA = async () => {
  // Mock API call
  // In a real implementation, this would call a Supabase Edge Function that generates a TOTP secret
  return {
    secret: 'JBSWY3DPEHPK3PXP', // Example secret - this would be generated server-side
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Penafort:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Penafort',
  };
};

// Mock function for verifying the OTP
const verify2FAOTP = async (token: string) => {
  // Mock verification - in a real implementation, this would verify against the user's secret
  return token === '123456'; // This is just for demonstration
};

const SetupTwoFactor = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [otp, setOtp] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const initSetup = async () => {
      try {
        const { secret, qrCodeUrl } = await setup2FA();
        setSecret(secret);
        setQrCodeUrl(qrCodeUrl);
      } catch (error) {
        console.error('Error setting up 2FA:', error);
        toast({
          title: "Error",
          description: "Could not set up two-factor authentication",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    initSetup();
  }, [isAuthenticated, navigate]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    
    setVerifying(true);
    try {
      const isValid = await verify2FAOTP(otp);
      
      if (isValid) {
        // In a real implementation, we would update the user's profile to mark 2FA as enabled
        setSetupComplete(true);
        toast({
          title: "Success",
          description: "Two-factor authentication has been enabled",
        });
      } else {
        toast({
          title: "Invalid code",
          description: "The verification code you entered is incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Error",
        description: "Could not verify the authentication code",
        variant: "destructive"
      });
    } finally {
      setVerifying(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret);
    toast({
      title: "Copied",
      description: "Secret key copied to clipboard",
    });
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <motion.h1 
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Two-Factor Authentication
                </motion.h1>
                <motion.p 
                  className="text-penafort-text-secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Set up additional security for your account
                </motion.p>
              </div>

              <Card className="bg-white shadow-lg">
                {loading ? (
                  <CardContent className="py-12 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-penafort-green" />
                  </CardContent>
                ) : setupComplete ? (
                  <CardContent className="py-12">
                    <div className="text-center">
                      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheck className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">Setup Complete!</h2>
                      <p className="text-penafort-text-secondary mb-8">
                        Two-factor authentication has been successfully enabled for your account.
                      </p>
                      <Button 
                        onClick={() => navigate('/profile')}
                        className="bg-penafort-green hover:bg-penafort-green/90"
                      >
                        Return to Profile
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle>Set Up Two-Factor Authentication</CardTitle>
                      <CardDescription>
                        Protect your account with an authentication app like Google Authenticator or Authy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">1. Scan this QR code</h3>
                            <p className="text-sm text-penafort-text-secondary mb-4">
                              Open your authentication app and scan this QR code
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                              <img 
                                src={qrCodeUrl} 
                                alt="QR Code for Two-Factor Authentication" 
                                className="w-48 h-48"
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">2. Or enter this code manually</h3>
                            <p className="text-sm text-penafort-text-secondary mb-4">
                              If you can't scan the QR code, enter this code in your app
                            </p>
                            <div className="flex items-center space-x-2 mb-6">
                              <code className="bg-gray-50 p-3 rounded-md text-gray-800 font-mono flex-1">
                                {secret}
                              </code>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={copyToClipboard}
                              >
                                <ClipboardCopy size={16} />
                              </Button>
                            </div>
                            <h3 className="font-medium mb-2">3. Enter the verification code</h3>
                            <p className="text-sm text-penafort-text-secondary mb-4">
                              Enter the 6-digit code from your authentication app
                            </p>
                            <InputOTP 
                              maxLength={6}
                              value={otp} 
                              onChange={setOtp}
                              className="mb-2"
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <Button
                        variant="outline"
                        onClick={() => navigate('/profile')}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleVerify}
                        disabled={otp.length < 6 || verifying}
                        className="bg-penafort-green hover:bg-penafort-green/90"
                      >
                        {verifying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify and Activate"
                        )}
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </motion.div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default SetupTwoFactor;
