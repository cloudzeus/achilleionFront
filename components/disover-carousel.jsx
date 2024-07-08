"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DiscoverCarousel({ items, text }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {items.map((item, idx) => (
            <div
              className="bg-cover relative bg-center h-screen flex items-center justify-center keen-slider__slide"
              style={{
                backgroundImage: `url(${item.url})`,
              }}
              key={`keen-slider-${idx}`}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.3) 20%, rgba(1, 56, 61, 0) 100%)",
                }}
              ></div>
              <div className="text-center w-4/5 flex justify-center items-center flex-col">
                <p className="mb-8 text-white text-xl md:text-[24px] md:w-[984px] drop-shadow-2xl leading-10">
                  {text.slice(0, 300) + "..."}
                </p>
              </div>
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <motion.button
              initial={false}
              className="absolute flex items-center justify-center right-0 top-[40%] md:mr-3 z-30 hover:bg-white/80 w-[42px] h-[42px] md:w-[52px] md:h-[52px] text-4xl text-white bg-primary hover:text-primary backdrop-blur-sm transition-[padding] hover:pr-3"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            >
              <FiChevronRight />
            </motion.button>

            <motion.button
              initial={false}
              className="absolute  flex items-center justify-center left-0 top-[40%] md:ml-3 z-30 hover:bg-white/80  w-[42px] h-[42px] md:w-[52px] md:h-[52px]  text-4xl  text-white bg-primary hover:text-primary backdrop-blur-sm transition-[padding] hover:pl-3"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            >
              <FiChevronLeft />
            </motion.button>
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots mt-5">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow(props) {
  return (
    <div
      onClick={props.onClick}
      className={` bg-primary hover:bg-white/70 text-white hover:text-primary p-8 `}
    >
      {props.left && <FiChevronLeft size={50} />}
      {!props.left && <FiChevronRight size={50} />}
    </div>
  );
}
