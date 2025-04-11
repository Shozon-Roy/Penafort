
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/auth/AuthRoute";
import OAuthCallback from "./components/auth/OAuthCallback";
import { UserProvider } from "./contexts/UserContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SetupTwoFactor from "./pages/SetupTwoFactor";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:category" element={<Products />} />
        <Route path="/products/detail/:productId" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        } />
        <Route path="/setup-2fa" element={
          <AuthRoute>
            <SetupTwoFactor />
          </AuthRoute>
        } />
        <Route path="/admin" element={
          <AuthRoute>
            <Admin />
          </AuthRoute>
        } />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
