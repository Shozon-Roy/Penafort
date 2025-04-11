
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import LoadingIndicator from '@/components/common/LoadingIndicator';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Parse the callback URL
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          // The "hash" property contains the OAuth 2.0 tokens
          const { data, error } = await supabase.auth.getUser();
          
          if (error) {
            console.error('Error getting user after OAuth:', error);
            toast({
              title: 'Authentication failed',
              description: error.message,
              variant: 'destructive'
            });
            navigate('/login');
            return;
          }
          
          if (data.user) {
            toast({
              title: 'Successfully logged in',
              description: `Welcome${data.user.user_metadata?.full_name ? ' ' + data.user.user_metadata.full_name : ''}!`,
            });
            // Redirect to home page or dashboard
            navigate('/');
            return;
          }
        }
        
        // If we're still here, something went wrong
        toast({
          title: 'Authentication failed',
          description: 'Failed to complete the authentication process.',
          variant: 'destructive'
        });
        navigate('/login');
      } catch (error) {
        console.error('OAuth callback error:', error);
        toast({
          title: 'Authentication error',
          description: 'An unexpected error occurred during authentication.',
          variant: 'destructive'
        });
        navigate('/login');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Completing authentication...</h1>
      <LoadingIndicator />
    </div>
  );
};

export default OAuthCallback;
