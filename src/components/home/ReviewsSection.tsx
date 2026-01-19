import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const platforms = [
  {
    name: "Swiggy",
    rating: 3.0,
    bgColor: "bg-[#FC8019]",
  },
  {
    name: "Zomato",
    rating: 3.0,
    bgColor: "bg-[#E23744]",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-4 h-4"
          fill={star <= rating ? "#C4A052" : "transparent"}
          stroke={star <= rating ? "#C4A052" : "#d1d5db"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-primary tracking-wide">
            Ratings
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-center gap-4 px-6 py-4 rounded-lg bg-background shadow-soft"
            >
              <div 
                className={`${platform.bgColor} text-white text-xs font-medium px-2.5 py-1 rounded`}
              >
                {platform.name}
              </div>
              <div className="flex items-center gap-3">
                <StarRating rating={platform.rating} />
                <span className="text-sm text-muted-foreground">
                  {platform.rating.toFixed(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
