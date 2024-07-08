import React from "react";
import { motion } from "framer-motion";
import OtherInfo from "./other-info";
import { useTranslation } from "react-i18next";
import Link from "next/link";

function SlideInfo({ transitionData, currentSlideData }) {
  const { t } = useTranslation();

  return (
    <>
      <motion.span layout className=" mb-2 h-1 w-5 rounded-full bg-white" />
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div layout className=" mt-5 flex items-center gap-3">
        <Link
          className=" w-fit rounded-full border-[1px] border-[#ffffff8f] px-6 py-3 text-[10px] font-thin transition duration-300 
            ease-in-out hover:bg-white hover:text-black "
          href={`/villas/${currentSlideData.data.slug}`}
        >
          {t("home:discover")}
        </Link>
      </motion.div>
    </>
  );
}

export default SlideInfo;
