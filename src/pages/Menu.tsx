import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMenuPdf } from "@/utils/generateMenuPdf";
import signatureDrink from "@/assets/signature-drink.jpg";

const Menu = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero */}
        <section className="pt-32 pb-24 bg-cream min-h-[70vh] flex items-center">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <span className="text-sm tracking-[0.2em] uppercase text-gold font-medium">
                  Curated with Care
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mt-4 mb-6">
                  Our Menu
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
                  Handcrafted beverages and artisan treats made with love. Download our complete menu to explore all our offerings.
                </p>
                <Button
                  onClick={generateMenuPdf}
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-primary font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Menu PDF
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-medium">
                  <img
                    src={signatureDrink}
                    alt="Signature coffee drink"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Menu;
