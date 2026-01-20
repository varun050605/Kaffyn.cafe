import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import kaffynLogo from "@/assets/kaffyn-logo.png";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Simple Admin Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/98 backdrop-blur-md shadow-sm py-3"
      >
        <nav className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={kaffynLogo}
                alt="Kaffyn"
                className="h-16 w-auto drop-shadow-md contrast-125"
              />
            </Link>
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Simple Footer */}
      <footer className="py-4 bg-cream border-t">
        <div className="container-wide px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kaffyn Admin Panel
          </p>
        </div>
      </footer>
    </div>
  );
};
