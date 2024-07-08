import React from "react";
import { motion } from "framer-motion";

function BackgroundImage({ transitionData, currentSlideData }) {
  return (
    <>
      {transitionData && (
        <motion.img
          key={`transition-img-3243wrw8ysfsd-${transitionData.slug}`}
          layoutId={`transition-img-3243wrw8ysfsd-${transitionData.slug}`}
          alt="Transition Image"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className=" absolute left-0 top-0 z-10 h-full w-full object-cover brightness-50"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="Current Image"
        key={`current-image-sajkarfwra-${currentSlideData.data.slug}`}
        src={currentSlideData.data.img}
        className=" absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
    </>
  );
}

export default BackgroundImage;
