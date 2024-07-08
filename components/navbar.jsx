"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import LanguageChanger from "./language-changer";
import Image from "next/image";
import BookModal from "./book-modal";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav
        className="flex h-[82px] items-center justify-between px-0 py-2 lg:px-0   border-b border-[#C3BAB3]"
        aria-label="Global"
      >
        <div className="flex relative z-20 w-0 lg:w-1/3">
          <div className="pr-4 mr-4 md:mr-0  border-r-secondary border-2 md:border-0">
            <motion.button
              whileHover={{ rotate: "180deg" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="text-xl text-secondary flex md:hidden items-center hover:text-primary transition-colors p-0 rounded-full"
            >
              <FiMenu size={50} />
            </motion.button>
          </div>
          <div className="hidden lg:flex">
            <ul className="flex  text-[12px]">
              <li className=" text-sm hover:bg-light-gray py-1 px-2 hover:text-white">
                <Link href="/">{t("navbar:home")}</Link>
              </li>
              <li className=" hover:bg-light-gray py-1 px-2 hover:text-white">
                <Link href="/villas">{t("navbar:villas")}</Link>
              </li>
              <li className=" hover:bg-light-gray py-1 px-2 hover:text-white">
                <Link href="/pricelist">{t("navbar:priceList")}</Link>
              </li>
              <li className="hover:bg-light-gray py-1 px-2 hover:text-white">
                <Link href="/discover">{t("navbar:discover")}</Link>
              </li>
              <li className="hover:bg-light-gray py-1 px-2 hover:text-white">
                <Link href="/contact">{t("navbar:contact")}</Link>
              </li>
              <li className="hover:bg-light-gray py-1 px-2 hover:text-white">
                <LanguageChanger />
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 lg:w-1/3  flex justify-end lg:justify-center ">
          <Image
            src="/images/logo.svg"
            objectFit="contain"
            width={70}
            alt="logo"
            height={70}
          />
        </div>
        <div className=" hidden md:flex w-1/2 lg:w-1/3 justify-end ">
          <BookModal />
        </div>
      </nav>
    </>
  );
}

const Nav = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <motion.nav
      className="fixed z-50 top-0 bottom-0 w-screen bg-cream text-secondary"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-3xl bg-white text-secondary hover:text-primary border-[1px] border-transparent hover:border-primary transition-colors p-4 rounded-full absolute top-5 left-5 lg:left-5"
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-1/3 lg:bottom-8 left-8 "
      >
        <NavLink href="/" text={t("navbar:home")} />
        <NavLink href="/villas" text={t("navbar:villas")} />
        <NavLink href="/discover" text={t("navbar:discover")} />
        <NavLink href="/pricelist" text={t("navbar:priceList")} />
        <NavLink href="/contact" text={t("navbar:contact")} />
        <NavButton>
          <LanguageChanger />
        </NavButton>
      </motion.div>
    </motion.nav>
  );
};

const NavButton = ({ children }) => {
  return (
    <motion.div
      className="inline-block z-10 text-primary-800 w-fit font-black text-4xl lg:text-7xl   hover:text-primary transition-colors"
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 3,
      }}
      whileHover={{
        y: -15,
        rotate: "-7.5deg",
      }}
    >
      {children}
    </motion.div>
  );
};

const NavLink = ({ text, href }) => {
  return (
    <motion.div
      className="inline-block z-10 text-primary-800 w-fit font-black text-4xl lg:text-7xl hover:text-primary transition-colors"
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 3,
      }}
      whileHover={{
        y: -15,
        rotate: "-7.5deg",
      }}
      rel="nofollow"
    >
      <Link href={href}>{text}</Link>
    </motion.div>
  );
};

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};
