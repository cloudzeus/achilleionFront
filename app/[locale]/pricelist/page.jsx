import BookModal from "@/components/book-modal";
import Footer from "@/components/footer";
import Map from "@/components/map";
import Navbar from "@/components/navbar";
import initTranslations, { DATE_LOCALES } from "@/lib/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import Image from "next/image";
import Link from "next/link";

const namespaces = ["pricelist", "common", "navbar", "footer"];

export default async function PricelistPage({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, namespaces);

  // TODO: update this correct query
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/pricings?locale=${locale}&populate[pricePerVilla][populate][villa]=villa`,
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`,
  );

  //TODO: error handling
  const { data } = await response.json();
  const { data: policies } = await policiesResponse.json();

  const formatPricingYear = () => {
    const date = new Date(data[0].attributes.startDate);
    return date.toLocaleDateString(DATE_LOCALES[locale], { year: "numeric" });
  };

  const formatPricingDate = (_date) => {
    const date = new Date(_date);
    return date.toLocaleDateString(DATE_LOCALES[locale], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPricingAmount = (amount) => {
    return amount.toLocaleString(DATE_LOCALES[locale], {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className=" mx-3 flex-grow md:mx-[140px]">
          <div className="flex items-center justify-center mt-[120px] my-0 md:my-10">
            <h3 className="text-secondary font-noto text-[48px] leading-tight">
              {`${t("pricelist:headerTitle").toUpperCase()} ${formatPricingYear()} `}
            </h3>
          </div>
          <div className="flex flex-col mx-0 mt-5 md:mt-[140px] md:mb-24">
            {data.map(({ attributes }) => (
              <div
                className="md:px-10 pb-12 "
                key={`pricing-sada3-${attributes.id}`}
              >
                <p className="text-[32px] md:text-md leading-tight ">
                  {attributes.name}
                </p>
                <div className="flex flex-col md:flex-row md:gap-4 gap-0 mt-5 md:mt-0">
                  <p className="text-[14px] font-comfortaa ">
                    {t("pricelist:startdate-label")}:
                    <span className="ml-2">
                      {formatPricingDate(attributes.startDate)}
                    </span>
                  </p>

                  <p className="text-[14px] font-comfortaa">
                    {t("pricelist:enddate-label")}:
                    <span className="ml-2">
                      {formatPricingDate(attributes.endDate)}
                    </span>
                  </p>
                </div>

                <p className="mt-[15px] text-[14px] mb-[47px]">
                  {attributes.description}
                </p>
                <div className=" flex flex-col md:flex-row mt-[100px]">
                  <div className=" flex gap-5 justify-center flex-wrap text-white text-center ">
                    {attributes.pricePerVilla.map((price) => (
                      <div
                        key={`price-fsdfsdf43235tert-${price.id}`}
                        className=" w-[190px] h-[190px] bg-primary flex items-center flex-col justify-center rounded-full"
                      >
                        <p className="text-[14px]">
                          {price.villa.data?.attributes.name}
                        </p>
                        <h5 className="text-[36px]">
                          {formatPricingAmount(price.price)}
                        </h5>
                        <p className="text-[14px]">
                          {t("pricelist:per-week-label")}
                        </p>
                      </div>
                    ))}
                    <div className=" hidden md:flex  items-center justify-center">
                      <BookModal isSecondary />
                    </div>
                  </div>
                  <div className="flex md:hidden items-center justify-center mt-8">
                    <div className="w-[92px] h-[92px] bg-[#D9D9D9] cursor-pointer rounded-full items-center justify-center flex">
                      <h5 className=" text-black text-[14px]">Book</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer policies={policies} />
      </div>
    </TranslationsProvider>
  );
}
