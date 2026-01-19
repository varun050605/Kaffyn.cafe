import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Play } from "lucide-react";
import orangeBrew from "@/assets/instagram/orange-brew.jpg";
import halloweenDrink from "@/assets/instagram/halloween-drink.jpg";
import reel1 from "@/assets/instagram/reel-1.mp4";
import reel2 from "@/assets/instagram/reel-2.mp4";

const instagramLink = "https://www.instagram.com/kaffyn.cafe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const instagramContent = [
  {
    type: "video" as const,
    src: reel1,
    alt: "Kaffyn Reel",
    link: "https://www.instagram.com/reel/DSjsDvwgtP5/",
  },
  {
    type: "image" as const,
    src: orangeBrew,
    alt: "Orange Brew Driver",
    link: "https://www.instagram.com/p/DQ3cxG4DB4Y/",
  },
  {
    type: "video" as const,
    src: reel2,
    alt: "Kaffyn Reel",
    link: "https://www.instagram.com/reel/DSCqwe2CsnM/",
  },
  {
    type: "image" as const,
    src: halloweenDrink,
    alt: "Halloween Special Drink",
    link: "https://www.instagram.com/p/DQeQ-DqkQJY/",
  },
];

const VideoCard = ({ src, alt, link }: { src: string; alt: string; link: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-xl cursor-pointer" onClick={handleClick}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        poster=""
      />
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div
            className="p-4 rounded-full bg-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </motion.div>
        </div>
      )}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Instagram className="w-5 h-5 text-white" />
      </a>
    </div>
  );
};

export const InstagramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-cream">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <a 
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-[0.2em] uppercase text-gold font-medium hover:text-gold/80 transition-colors"
          >
            @kaffyn.cafe
          </a>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-4 mb-6">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community and share your KAFFYN moments with us.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {instagramContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.type === "video" ? (
                <VideoCard src={item.src} alt={item.alt} link={item.link} />
              ) : (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl block"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="p-4 rounded-full bg-background/20 backdrop-blur-sm"
                    >
                      <Instagram className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Follow Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-gold transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Add us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};
