"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import VillaList from "@/components/villa-list";
import Image from "next/image";
import { Testimonials } from "@/components/testimonials";
import Footer from "@/components/footer";

function HomeClient({ settings, villas, reviews, pois, policies }) {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />

      <div
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/images/heroImage.webp')" }}
      >
        <div
          className="absolute inset-0 w-full"
          // style={{
          //   background: "rgba(97, 94, 94, 0.6)",
          // }}
        ></div>
        <Link
          className="absolute z-20 top-0 md:top-[100px] left-0"
          href="https://achilion.b-cdn.net/TOURISMOS_WEBPEPION_93dfb8675e.pdf"
          target="_blank"
        >
          <Image
            alt="tourism-law"
            src="/images/gov_banner.jpg"
            width={181}
            height={91}
          />
        </Link>

        <div className="text-center relative flex items-center flex-col text-white w-full">
          <div className="flex flex-col items-center mb-12">
            <Image
              alt="logo"
              src="/images/logo-white.svg"
              width={91}
              height={91}
            />
            <p className="text-[12px] ">ACHEILLION VILLAS</p>
            <p className="text-[12px] ">Corfu Island</p>
          </div>

          <div
            style={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
            className="mb-16 text-white text-3xl md:text-[40px] font-normal mx-2  drop-shadow-2xl leading-10"
            dangerouslySetInnerHTML={{
              __html: t("home:hero-text"),
            }}
          />

          <Link
            href="#"
            className="px-6 py-2 rounded-full bg-primary text-white text-[11px] items-center justify-center flex hover:bg-secondary"
          >
            {t("home:cta")}
          </Link>
        </div>
      </div>
      <div className="flex flex-col max-w-[75%] mx-auto ">
        <div className="mx-6  mt-12 md:text-center md:mt-[100px] text-secondary font-semibold text-3xl md:text-[48px]  uppercase">
          {settings.name}
        </div>
        <p className=" mx-6 md:mx-[100px] md:mt-[100px] md:text-justify mb-20 mt-6 leading-8 text-[16px]">
          {settings.longDescription}
        </p>
      </div>

      <VillaList villas={villas} />

      <div className="flex flex-col items-center justify-center p-0 pt-10 md:p-10 my-16 md:my-[110px]">
        <Image
          src="/images/logo-gray.svg"
          width={89}
          height={89}
          className="mb-4 ml-4"
          alt="logo"
        />
        <div className="text-secondary text-sm md:text-[24px] font-">
          {t("home:testimonialsTitle")}
        </div>
      </div>
      <Testimonials reviews={reviews} />
      <div className="flex items-center justify-center mt-16 md:mt-[180px]">
        <h5 className="text-secondary text-sm md:text-[24px] font-normal">
          {t("common:discover")}
        </h5>
      </div>
      <div className="flex justify-center mx-6 md:mx-0">
        <div className="grid max-w-[942px] grid-cols-1 gap-5 md:grid-cols-2 mt-[38px] mb-20 md:mb-[322px]">
          {pois.slice(0, 2).map(({ attributes: poi, id }) => (
            <PoiCard key={`poi-card-3hwre${id}`} poi={poi} isOdd={false} />
          ))}
        </div>
      </div>
      <Footer policies={policies} />
    </>
  );
}

const PoiCard = ({ poi, isOdd }) => {
  return (
    <Link href={`/discover/${poi.slug}`}>
      <div
        key={`villas-list-dsn30wre-${poi.id}`}
        className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow"
      >
        <div className={`h-[700px] w-[${isOdd ? 1220 : 900}px]`}>
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={poi.gallery.data[0].attributes.formats?.large?.url}
            alt={poi.title}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, rgba(1, 56, 61, 0) 100%)",
          }}
        ></div>
        <div className="absolute inset-0 flex translate-y-[260%] flex-col items-center gap-2 justify-center px-9 text-center transition-all duration-500 h-[203px]">
          <h1 className="text-[12px] font-bold text-white ">
            {poi.title.substring(0, 60) + "..."}
          </h1>
          <h1 className="text-[12px] font-bold text-white ">
            {poi.categories.data
              .map(({ attributes: category }) => category.name)
              .join(", ")}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default HomeClient;
