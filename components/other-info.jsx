import React from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "./text";

function OtherInfo({ data }) {
  return (
    <motion.div initial="hidden" animate={"visible"} className=" flex flex-col">
      <AnimatedText
        className=" spacing overflow-hidden text-[#D5D5D6]"
        data={data?.location}
      />
      <AnimatedText
        className=" my-1 text-4xl font-semibold md:my-3 md:text-8xl md:leading-[100px]"
        data={data?.title}
      />
      <AnimatedText
        className=" text-sm text-[#D5D5D6]"
        data={data?.description}
      />
    </motion.div>
  );
}

export default OtherInfo;
