import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Coffee, IceCream, Leaf, Flame, GlassWater, Cake } from "lucide-react";

const menuData = {
  hotCoffee: {
    title: "Hot Coffee",
    icon: Coffee,
    items: [
      { name: "Espresso", price: 160 },
      { name: "Macchiato", price: 170 },
      { name: "Caramel Macchiato", price: 200 },
      { name: "Latte", price: 200 },
      { name: "Vanilla Latte", price: 220 },
      { name: "Hazelnut Latte", price: 220 },
      { name: "Biscoff Latte", price: 240 },
      { name: "24k Gold Latte", price: 280 },
      { name: "Cortado", price: 200 },
      { name: "Flat White", price: 200 },
      { name: "Cappuccino", price: 200 },
      { name: "Mocha Cappuccino", price: 210 },
      { name: "White Mocha", price: 210 },
      { name: "Crème Brûlée Cappuccino", price: 220 },
      { name: "Irish Coffee", price: 200 },
      { name: "Americano", price: 190 },
    ],
  },
  icedCoffee: {
    title: "Iced Coffee",
    icon: IceCream,
    items: [
      { name: "Iced Latte Original", price: 190 },
      { name: "Iced Vanilla Latte", price: 210 },
      { name: "Iced Irish Cream Latte", price: 220 },
      { name: "Iced Caramel Latte", price: 220 },
      { name: "Iced Hazelnut Latte", price: 220 },
      { name: "Iced Mocha Latte", price: 230 },
      { name: "Iced Biscoff Latte", price: 270 },
      { name: "Iced Nutella Latte", price: 270 },
      { name: "Oat Milkshaken Espresso", price: 260 },
      { name: "Frappé Original", price: 210 },
      { name: "Mocha Frappé", price: 250 },
      { name: "Irish Frappé", price: 280 },
      { name: "KitKat Frappé", price: 270 },
      { name: "Hazelnut Frappé", price: 290 },
      { name: "Caramel Frappé", price: 290 },
      { name: "Oreo Chip Frappé", price: 290 },
      { name: "Choco Frappé", price: 310 },
      { name: "Biscoff Frappé", price: 320 },
      { name: "Nutella Frappé", price: 320 },
      { name: "Ferrero Rocher Frappé", price: 380 },
      { name: "Brownie Mocha Frappé", price: 380 },
    ],
  },
  manualBrew: {
    title: "Manual Brew",
    icon: Flame,
    items: [
      { name: "Hot Pour Over", price: 200 },
      { name: "Cold Brew", price: 210 },
      { name: "Iced Pour Over Vanilla", price: 220 },
      { name: "Cold Brew Sweet Cream", price: 230 },
      { name: "Sparkling Cold Brew", price: 230 },
      { name: "Black Mamba", price: 240 },
      { name: "Iced Americano", price: 210 },
      { name: "Espresso Tonic", price: 270 },
      { name: "Cold Brew Tonic", price: 270 },
      { name: "Cranberry Espresso Tonic", price: 280 },
      { name: "Orange Brew Driver", price: 280 },
    ],
  },
  dessertCoffee: {
    title: "Dessert Coffee",
    icon: Cake,
    items: [
      { name: "Affogato", price: 240 },
      { name: "Trifle Affogato", price: 330 },
      { name: "Vietnamese Coffee", price: 210 },
      { name: "Bombon", price: 210 },
    ],
  },
  notCoffee: {
    title: "Not Coffee",
    icon: Leaf,
    items: [
      { name: "Hot Chocolate Original", price: 200 },
      { name: "Cinnamon Hot Chocolate", price: 220 },
      { name: "Hazelnut Hot Chocolate", price: 240 },
      { name: "Belgian Hot Chocolate", price: 270 },
      { name: "Tea (Various Options)", price: 130 },
      { name: "Blooming Tea", price: 240 },
    ],
  },
  coolers: {
    title: "Coolers & Refreshers",
    icon: GlassWater,
    items: [
      { name: "Pink Lemonade", price: 180 },
      { name: "Mojito", price: 190 },
      { name: "Blueberry Cooler", price: 230 },
      { name: "Iced Tea", price: 230 },
      { name: "Guava Colada", price: 230 },
      { name: "Sangria", price: 250 },
      { name: "Passion Breeze", price: 280 },
      { name: "Bliss On Peach", price: 280 },
      { name: "Lychee Lemon Candy", price: 300 },
    ],
  },
  desserts: {
    title: "Desserts",
    icon: Cake,
    items: [
      { name: "Chocolate Cream", price: 260 },
      { name: "Biscoff Ice-cream Sandwich", price: 200 },
    ],
  },
};

const MenuCategory = ({
  category,
  index,
}: {
  category: { title: string; icon: React.ComponentType<{ className?: string }>; items: { name: string; price: number }[] };
  index: number;
}) => {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-soft p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gold" />
        </div>
        <h2 className="font-serif text-2xl text-primary">{category.title}</h2>
      </div>
      <div className="space-y-3">
        {category.items.map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center py-2 border-b border-cream last:border-b-0"
          >
            <span className="text-foreground">{item.name}</span>
            <span className="text-gold font-medium">₹{item.price}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Menu = () => {
  const categories = Object.values(menuData);

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
                Handcrafted beverages and artisan treats made with love
              </p>
            </motion.div>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="section-padding bg-cream/50">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category, index) => (
                <MenuCategory key={category.title} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Menu;
