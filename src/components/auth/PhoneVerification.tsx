
import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PhoneVerificationProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ 
  onSuccess,
  onCancel 
}) => {
  const { startPhoneVerification, verifyPhone, loading } = useUser();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [isVerified, setIsVerified] = useState(false);

  const handleSendCode = async () => {
    if (!phone || phone.length < 10) return;
    
    const success = await startPhoneVerification(phone);
    if (success) {
      setStep('verify');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) return;
    
    const success = await verifyPhone(phone, otp);
    if (success) {
      setIsVerified(true);
      if (onSuccess) {
        setTimeout(onSuccess, 1500); // Give time to show success state
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Phone Verification</CardTitle>
        <CardDescription>
          {step === 'input' 
            ? 'Enter your phone number to receive a verification code'
            : 'Enter the 6-digit code sent to your phone'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 'input' ? (
          <div className="space-y-4">
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {isVerified ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-center text-lg font-medium">Phone verified successfully!</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-penafort-text-secondary mb-2">
                  We've sent a verification code to {phone}
                </p>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="gap-2"
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
              </>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {step === 'input' ? (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendCode} 
              disabled={loading || phone.length < 10}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Code"
              )}
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={() => setStep('input')}
              disabled={loading || isVerified}
            >
              Back
            </Button>
            <Button 
              onClick={handleVerifyOTP} 
              disabled={loading || otp.length < 6 || isVerified}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhoneVerification;
