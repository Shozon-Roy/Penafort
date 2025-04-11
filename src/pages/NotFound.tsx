
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="inline-block p-4 bg-penafort-green/10 text-penafort-green rounded-full mb-6">
            <span className="text-4xl font-bold">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-penafort-text-primary">
            Page Not Found
          </h1>
          <p className="text-penafort-text-secondary mb-8">
            We're sorry, the page you requested could not be found. Please check the URL or return to our homepage.
          </p>
          <a href="/" className="btn-primary inline-flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
