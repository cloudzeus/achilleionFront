import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import BookModal from "./book-modal";

const VillaList = ({ villas }) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-8">
      {villas.map(({ attributes: villa, id }) => (
        <Card key={`villas-cards-ewqwqrdsa-${id}`} villa={villa} t={t} />
      ))}
    </div>
  );
};

const Card = ({ villa, t }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg overflow-hidden">
      <div className="flex">
        <div className="bg-[#01383D] text-white w-16 flex items-center justify-center">
          <div className="transform -rotate-90 uppercase whitespace-nowrap text-[32px]">
            {villa.name}
          </div>
        </div>
        <div>
          <img
            src={villa.heroImage.data.attributes.formats.medium.url} // Replace with your image URL
            alt="Villa"
            className="w-full h-[313px] object-cover"
          />
          <div className="p-4">
            <div className="text-sm text-black mb-2">
              <span className="text-[11px]">
                {villa.squareMeters} {t("villas:floor-area-label")}{" "}
              </span>{" "}
              ·{" "}
              <span className="text-[11px]">
                {t("villas:sleeps-label")}{" "}
                {villa.villa_rooms.data.reduce(
                  (a, c) => a + c.attributes.sleeps,
                  0,
                )}
              </span>{" "}
              ·{" "}
              <span className="text-[11px] uppercase">
                ${t("villas:rooms-label")} {villa.villa_rooms.data.length}
              </span>
            </div>
          </div>
          <div className="p-4 relative mt-24 text-center flex justify-between items-baseline">
            <BookModal />
            <Link
              href={`/villas/${villa.slug}`}
              className="rounded-full absolute right-4 bottom-4 hover:bg-primary hover:text-white bg-[#D9D9D9] h-[92px] w-[92px] flex items-center justify-center font-com text-sm capitalize text-black"
            >
              {t("villas:more-label")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaList;
