"use client";

import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import LanguageChanger from "./language-changer";
import Image from "next/image";
import Drawer from "./drawer";

function Header() {
  const [active, setActive] = React.useState(0);
  const { t } = useTranslation();
  return (
    <div className=" absolute mt-5 flex w-full flex-wrap items-center justify-between gap-2 px-5 text-xs font-medium uppercase opacity-90 md:px-10">
      <Head>
        <title>Acheilion Villas</title>
      </Head>
      <div className="flex w-screen md:w-1/12 justify-between items-center gap-2 font-medium tracking-[4px]">
        <Image
          src="/images/logo-white.svg"
          objectFit="contain"
          width={70}
          alt="logo"
          height={70}
        />
        <Drawer />
      </div>
      <ul className="hidden md:flex md:flex-wrap items-center gap-3 text-[11px] md:gap-10">
        {menus.map((menu, index) => {
          return (
            <motion.li
              layout
              key={`menu-4390wsjojse-${index}`}
              className={` ${active == index && " border-b-2 border-b-primary"
                } inline-block cursor-pointer  border-b-primary transition duration-300 ease-in-out hover:border-b-2 hover:text-white`}
            >
              <Link href={menu.href}>{t(menu.t)}</Link>
            </motion.li>
          );
        })}
        <motion.li
          layout
          className={`inline-block cursor-pointer  border-b-primary transition duration-300 ease-in-out hover:border-b-2 hover:text-white`}
        >
          <LanguageChanger />
        </motion.li>
      </ul>
    </div>
  );
}

export default Header;

const menus = [
  { href: "/", t: "navbar:home" },
  { href: "/villas", t: "navbar:villas" },
  { href: "/pricelist", t: "navbar:pricelist" },
  { href: "/discover", t: "navbar:discover" },
  { href: "/contact", t: "navbar:contact" },
];
