import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import initTranslations from "@/lib/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import Link from "next/link";

const namespaces = ["villas", "common", "navbar", "footer"];

export default async function PricelistPage({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, namespaces);

  // TODO: update this correct query
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/villas?locale=${locale}&populate[0]=heroImage`,
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`,
  );

  //TODO: error handling
  const { data } = await response.json();
  const { data: policies } = await policiesResponse.json();

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container flex-grow flex flex-col mx-auto min-h-screen items-center">
          <div className="flex flex-col items-center justify-center mt-[140px] mx-4 mb-0">
            <p className="text-[24px]">{t("villas:subtitle")}</p>
            <h3 className="text-secondary font-noto md:tracking-wider font-bold text-[48px] md:text-3xl mt-[48px]">
              {t("villas:headerTitle").toUpperCase()}
            </h3>
          </div>
          <div className="flex flex-col mx-0 items-center">
            <p className="px-4 md:mt-[75px] md:w-[1220px] md:text-center">
              {t("villas:headerDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4   md:min-h-[70vh] my-20 md:my-[115px] mx-4  md:w-[1220px]">
            <div>
              <VillaCard villa={data[0].attributes} />
            </div>
            <div>
              <VillaCard villa={data[1].attributes} />
            </div>
            <div className="md:col-span-2">
              <VillaCard villa={data[2].attributes} isOdd />
            </div>
          </div>
        </main>
        <Footer policies={policies} />
      </div>
    </TranslationsProvider>
  );
}

const VillaCard = ({ villa, isOdd }) => {
  return (
    <div
      key={`villas-list-dsn30wre-${villa.id}`}
      className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow"
    >
      <div className={`h-[700px] w-[${isOdd ? 1220 : 900}px]`}>
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          src={villa.heroImage?.data.attributes.formats?.large?.url}
          alt={villa.name}
        />
      </div>
      <div className="absolute inset-0"></div>
      <div
        className="absolute inset-0 flex translate-y-[300%] flex-col items-center justify-around px-9 text-center transition-all duration-500 group-hover:translate-y-[250%] h-[203px]"
        style={{
          background:
            "linear-gradient(to top, rgba(1, 56, 61, 0.8) 20%, rgba(1, 56, 61, 0.2) 100%)",
        }}
      >
        <h1 className="text-3xl font-bold text-white my-8 ">{villa.name}</h1>
        <Link
          href={`/villas/${villa.slug}`}
          className="rounded-full hover:bg-primary hover:text-white bg-[#D9D9D9] mb-4 h-[92px] w-[92px] flex items-center justify-center font-com text-sm capitalize text-black"
        >
          More
        </Link>
      </div>
    </div>
  );
};
