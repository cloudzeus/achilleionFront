import Footer from "@/components/footer";
import Map from "@/components/map";
import Navbar from "@/components/navbar";
import initTranslations, { DATE_LOCALES } from "@/lib/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import Image from "next/image";
import Link from "next/link";
import InsideViews from "@/components/inside-views";
import Blueprints from "@/components/blueprints";
import Carousel from "@/components/carousel";
import BookModal from "@/components/book-modal";

const namespaces = ["villas", "common", "navbar", "footer"];

export default async function PricelistPage({ params: { locale, slug } }) {
  const { t, resources } = await initTranslations(locale, namespaces);

  // TODO: update this correct query
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/villas?locale=${locale}&filters[slug][$eq]=${slug}&populate[0]=heroImage&populate[1]=villa_rooms&populate[2]=interiorGallery&populate[3]=villa_facilities.name&populate[4]=villa_facilities.icon`,
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`,
  );

  //TODO: error handling
  const { data } = await response.json();
  const { data: policies } = await policiesResponse.json();

  const { attributes: villa } = data[0];

  const blueprints = [];

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <Navbar />

      <div
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${villa.heroImage?.data?.attributes?.formats?.large?.url})`,
        }}
      >
        <div className="text-center w-4/5 flex justify-center items-center flex-col">
          <h1 className="mb-4 text-white text-4xl md:text-[48px] font-noto">
            {villa.name}
          </h1>
          <p className="mb-8 text-white text-xl md:text-[24px]">
            {villa.shortDescription.slice(0, 150)}
          </p>

          <BookModal />
        </div>
      </div>
      <main className="flex flex-col items-center justify-between px-5 md:px-24 min-h-screen">
        <section className="flex justify-center">
          <div className="flex gap-4 flex-wrap my-12  md:my-[90px] ">
            <div className="bg-primary text-white flex w-24 h-24 md:w-[114px] md:h-[114px] flex-col items-center justify-center rounded-full">
              <div className="text-[14px] flex flex-col items-center">
                <p>{t("villas:floor-area-label")}</p>
                <p>{villa.squareMeters}</p>
              </div>
            </div>
            <div className="bg-primary text-white flex w-24 h-24   md:w-[114px] md:h-[114px] flex-col items-center justify-center rounded-full">
              <div className="text-[14px] flex flex-col items-center">
                <p>{t("villas:max-adults-label")}</p>
                <p>{villa.villa_rooms.data.length}</p>
              </div>
            </div>
            <div className="bg-primary text-white flex w-24 h-24   md:w-[114px] md:h-[114px]  flex-col items-center justify-center rounded-full">
              <div className="text-[14px] flex flex-col items-center">
                <p>{t("villas:rooms-label")}</p>
                <p>{villa.villa_rooms.data.length}</p>
              </div>
            </div>
          </div>
        </section>
        <section className=" flex justify-center">
          <p className=" md:w-[1111px] md:text-center leading-8 text-[14px]">
            {villa.longDescription}
          </p>
        </section>

        <Blueprints items={blueprints} />

        <h1 className="text-[28px] mt-12 md:mt-[127px]">
          {t("villas:facilities-title")}
        </h1>

        <section className="grid ml-2 md:ml-0 grid-cols-2 md:grid-cols-3 gap-4 mt-12 md:mt-[80px] mb-24">
          {villa.villa_facilities.data.map(({ id, attributes: facility }) => (
            <div
              className="flex gap-2 items-center mb-4"
              key={`villa-facilities-${id}`}
            >
              <Image
                src={facility.icon?.data?.attributes.url}
                width={36}
                height={36}
                alt={`${facility.name}-icon`}
              />
              <p className="tex-[14px] text-gray-600">{facility.name}</p>
            </div>
          ))}
        </section>
      </main>

      <Carousel
        items={villa.interiorGallery.data.map(({ attributes: image }, idx) => ({
          id: idx,
          url: image.formats.large.url,
        }))}
      />

      <section className="md:my-[230px] my-16 flex flex-col items-center gap-28">
        <Image
          src="/images/logo-gray.svg"
          width={76}
          height={55}
          className="ml-5"
          alt="logo"
        />

        <BookModal />
      </section>

      <Footer policies={policies} />
    </TranslationsProvider>
  );
}
