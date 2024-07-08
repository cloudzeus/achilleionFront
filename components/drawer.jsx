"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageChanger from "./language-changer";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.button
        whileHover={{ rotate: "180deg" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="text-xl text-secondary flex md:hidden items-center hover:text-primary transition-colors p-0 rounded-full"
      >
        <FiMenu size={50} />
      </motion.button>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const Nav = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <motion.nav
      className="fixed top-0 bottom-0 w-screen bg-cream text-secondary"
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
        <NavLink text={t("navbar:home")} />
        <NavLink text={t("navbar:villas")} />
        <NavLink text={t("navbar:discover")} />
        <NavLink text={t("navbar:priceList")} />
        <NavLink text={t("navbar:contact")} />
        <NavButton>
          <LanguageChanger />
        </NavButton>
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({ text }) => {
  return (
    <motion.a
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
      href="#"
    >
      {text}
    </motion.a>
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

export default Drawer;

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
