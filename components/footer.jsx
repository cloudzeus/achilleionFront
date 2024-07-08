"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PolicyModal from "./policy-modal";

export default function Footer({ policies }) {
  const { t } = useTranslation();
  return (
    <div className="px-10 border-t border-light-secondary flex flex-col md:flex-row  gap-5 justify-between text-center pt-10 md:pt-0 mt-10 md:mt-0 h-[82px] items-center">
      <div>MHTE: 2938889898892999</div>
      <div>
        <ul className="flex flex-col md:flex-row gap-4">
          {policies.attributes.bocks.map((p, idx) => (
            <li
              key={`policies-esfnd-${idx}`}
              className=" text-sm hover:bg-light-gray py-1 px-2 hover:text-white"
            >
              <PolicyModal policy={p} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-baseline gap-5 mb-10 md:my-10">
          <li className=" text-sm hover:bg-light-gray py-1 px-2 hover:text-white">
            <Link href="#">
              <Image
                src="/icons/twitter.svg"
                width={25}
                height={25}
                objectFit="cover"
                alt="phone-icon"
              />
            </Link>
          </li>
          <li className=" text-sm hover:bg-light-gray py-1 px-2 hover:text-white">
            <Link href="#">
              <Image
                src="/icons/linkedin.svg"
                width={25}
                height={25}
                objectFit="cover"
                alt="phone-icon"
              />
            </Link>
          </li>
          <li className="text-sm hover:bg-light-gray py-1 px-2 hover:text-white">
            <Link href="#">
              <Image
                src="/icons/facebook.svg"
                width={15}
                height={15}
                objectFit="cover"
                alt="phone-icon"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
