
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const SocialLogin = () => {
  const { loginWithGoogle } = useUser();

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    // Note: Redirect will be handled by Supabase OAuth flow
  };

  return (
    <div className="mb-6">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full h-12 flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <LogIn size={20} />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};

export default SocialLogin;
