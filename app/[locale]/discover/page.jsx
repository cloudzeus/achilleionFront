import { Badge } from "@/components/badge";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import initTranslations from "@/lib/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import Image from "next/image";
import Link from "next/link";

const namespaces = ["discover", "common", "navbar", "footer"];

export default async function PricelistPage({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, namespaces);

  // TODO: update this correct query
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/pois?locale=${locale}&populate[0]=categories&populate[1]=gallery`,
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`,
  );

  //TODO: error handling
  const { data } = await response.json();
  const { data: policies } = await policiesResponse.json();

  const categories = data
    .map(({ attributes }) =>
      attributes.categories.data.map(({ attributes }) => attributes.name),
    )
    .flat();

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <Navbar />
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center mt-12 md:mt-[118px] w-4/5 flex justify-center flex-col">
          <h1 className="mb-4 text-secondary text-2xl md:text-[48px] font-noto">
            {t("discover:headerTitle")}
          </h1>
          <p className="md:mt-[36px] text-[16px]">
            {t("discover:headerDescription")}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-6 md:mt-[118px]">
            {[...new Set(categories)].map((cate) => (
              <Badge key={`cate-badge-${cate}`} text={cate} />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-6 md:mt-[55px] gap-5 md:grid-cols-3 mx-5">
        {data.map(({ attributes: poi }, idx) => (
          <PoiCard key={`poi-card-sanfal-${idx}`} poi={poi} />
        ))}
      </div>
      <div className="flex min-h-[200px] items-center justify-center mt-12 md:my-[120px] mx-6 md:mx-0">
        <div className="text-center md:w-[789px] flex justify-between gap-12 items-center flex-col">
          <Image
            alt="logo"
            src="/images/logo-gray.svg"
            width={80}
            height={80}
          />
          <p className="text-sm  md:mt-[85px]">
            {t("discover:headerDescription")}
          </p>
        </div>
      </div>

      <Footer policies={policies} />
    </TranslationsProvider>
  );
}

const PoiCard = ({ poi, isOdd = false }) => {
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
            alt="Point of interest"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, rgba(1, 56, 61, 0) 100%)",
          }}
        ></div>
        <div className="absolute inset-0 flex translate-y-[80%] pt-12 flex-col items-center gap-2 justify-between px-9 text-center transition-all duration-500 h-full group-hover:translate-y-0">
          <Image
            src="/images/logo-white.svg"
            className="hidden group-hover:flex"
            width={68}
            height={63}
          />
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-[12px] font-bold text-white uppercase">
                {poi.title.substring(0, 60) + "..."}
              </h1>
              <h1 className="text-[10px] font-bold text-white ">
                {poi.categories.data
                  .map(({ attributes: category }) => category.name)
                  .join(", ")}
              </h1>
            </div>
            <Link
              href={`/discover/${poi.slug}`}
              className="rounded-full hover:bg-primary hover:text-white bg-[#D9D9D9] mb-4 h-[92px] w-[92px] flex items-center justify-center font-com text-sm capitalize text-black"
            >
              More
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
