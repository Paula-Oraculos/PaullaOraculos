import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open("https://chat.whatsapp.com/HRKM7t5DY54Da7HUoFiIXi?mode=ems_copy_t", "_blank");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-cosmic-dark border-gold-mystic/30">
          <p>Fale com a equipe</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
