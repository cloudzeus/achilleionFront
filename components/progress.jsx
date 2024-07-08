import React from "react";
import { motion } from "framer-motion";

function Progress({ curIndex, length }) {
  return (
    <>
      <div className=" flex h-[1px] flex-1 items-center rounded-full  bg-black md:bg-white bg-opacity-50">
        <div
          style={{
            width: (((curIndex + 1) / length) * 100).toString() + "%",
          }}
          className={` h-[1px] rounded-full bg-primary  bg-opacity-50`}
        ></div>
      </div>
      <span
        key={`progress-4390wsjw34ojse-${curIndex}`}
        style={{
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          key={`progress-439sdf0wsjojse-${curIndex}`}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className=" flex items-center text-4xl font-medium text-black md:text-white"
        >
          0{curIndex + 1}
        </motion.div>
      </span>
    </>
  );
}

export default Progress;
