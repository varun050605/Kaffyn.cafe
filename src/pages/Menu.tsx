import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ExternalLink } from "lucide-react";
import signatureDrink from "@/assets/signature-drink.jpg";
import pastry from "@/assets/pastry.jpg";
import coffeeMenu1 from "@/assets/menu/coffee-menu-1.jpg";
import coffeeMenu2 from "@/assets/menu/coffee-menu-2.jpg";

const menuCategories = [
  {
    title: "Coffee & Beverages",
    description: "Handcrafted coffees, signature lattes, and refreshing drinks",
    image: signatureDrink,
    pdfLink: "/menus/Kaffyn_Menu.pdf",
    available: true,
    menuImages: [coffeeMenu1, coffeeMenu2],
  },
  {
    title: "Food Menu",
    description: "Fresh breakfast, pastries, and artisan bites",
    image: pastry,
    pdfLink: null,
    available: false,
    menuImages: null,
  },
];

const Menu = () => {
  const handleMenuClick = (pdfLink: string | null, available: boolean) => {
    if (available && pdfLink) {
      window.open(pdfLink, "_blank");
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero */}
        <section className="pt-32 pb-16 bg-cream">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-sm tracking-[0.2em] uppercase text-gold font-medium">
                Curated with Care
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mt-4 mb-6">
                Our Menu
              </h1>
              <p className="text-lg text-muted-foreground">
                Click on a menu category to view the full menu in PDF format.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Menu Categories Grid */}
        <section className="section-padding pb-12">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {menuCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Category Card */}
                  <div
                    onClick={() => handleMenuClick(category.pdfLink, category.available)}
                    className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-500 ${
                      category.available 
                        ? "cursor-pointer" 
                        : "cursor-not-allowed opacity-75"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-72 md:h-80 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                        whileHover={category.available ? { scale: 1.08 } : {}}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                        category.available ? "group-hover:from-black/90" : ""
                      }`} />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
                          {category.title}
                        </h2>
                        <p className="text-white/80 text-sm md:text-base max-w-xs">
                          {category.description}
                        </p>
                        
                        {category.available ? (
                          <motion.div
                            className="mt-6 flex items-center gap-2 px-6 py-3 bg-gold text-primary rounded-full font-medium text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>View PDF</span>
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <div className="mt-6 px-6 py-3 bg-white/20 text-white/80 rounded-full font-medium text-sm">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coffee & Beverages Menu Section */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm tracking-[0.2em] uppercase text-gold font-medium">
                Explore Our Offerings
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mt-4">
                Coffee & Beverages
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[coffeeMenu1, coffeeMenu2].map((menuImg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-medium border border-gold/20 bg-white"
                >
                  <img
                    src={menuImg}
                    alt={`Coffee & Beverages menu page ${index + 1}`}
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Menu;
