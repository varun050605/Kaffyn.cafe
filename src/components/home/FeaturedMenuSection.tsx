import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import craftLatte from "@/assets/craft-latte.jpg";
import craftCoffee from "@/assets/craft-coffee.jpg";
import craftColdbrew from "@/assets/craft-coldbrew.jpg";
import craftSpecials from "@/assets/craft-specials.jpg";

const galleryImages = [
  {
    image: craftLatte,
    alt: "Signature latte with latte art",
  },
  {
    image: craftCoffee,
    alt: "Freshly brewed coffee",
  },
  {
    image: craftColdbrew,
    alt: "Refreshing cold brew",
  },
  {
    image: craftSpecials,
    alt: "Weekly specials",
  },
];

export const FeaturedMenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-gold font-medium">
            A Glimpse Inside
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-4 mb-6">
            Our Craft
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every cup tells a story — from carefully sourced beans to beautifully crafted drinks.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {galleryImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <motion.img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/menu">
            <Button variant="outline" size="lg" className="group">
              Explore Our Menu
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
