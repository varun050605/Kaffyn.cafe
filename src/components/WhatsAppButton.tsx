import { motion } from "framer-motion";
import whatsappLogo from "@/assets/whatsapp-logo.webp";

export const WhatsAppButton = () => {
  const phoneNumber = "919558474855";
  const message = "Hello! I'd like to know more about Kaffyn.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <img 
        src={whatsappLogo} 
        alt="WhatsApp" 
        className="w-14 h-14 drop-shadow-lg"
      />
    </motion.a>
  );
};
