"use client";

import { motion } from "framer-motion";

export function Badge({ text }) {
  const bounceAnimation = {
    animate: {
      y: ["-100%", "0%", "-50%", "0%", "-25%", "0%", "-12.5%", "0%"],
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        loop: Infinity,
        repeatDelay: 1,
      },
    },
  };

  return (
    <motion.p
      variants={bounceAnimation}
      initial="initial"
      animate="animate"
      className="cursor-pointer bg-primary rounded-full px-4 py-2 text-white text-[11px]"
      whileHover="hover"
    >
      {text}
    </motion.p>
  );
}
