import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import initTranslations from "@/lib/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import Map from "@/components/map";
import DiscoverCarousel from "@/components/disover-carousel";

const namespaces = ["villas", "common", "navbar", "footer"];

export default async function DiscoverPage({ params: { locale, slug } }) {
  const { t, resources } = await initTranslations(locale, namespaces);

  // TODO: update this correct query
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/pois?locale=${locale}&filters[slug][$eq]=${slug}&populate[0]=categories&populate[1]=gallery`
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`
  );

  //TODO: error handling
  const { data } = await response.json();
  const { data: policies } = await policiesResponse.json();

  const { attributes: poi } = data[0];

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <Navbar />

      <DiscoverCarousel
        items={poi.gallery.data.map(({ attributes: image }, idx) => ({
          id: idx,
          url: image.formats.large.url,
        }))}
        text={poi.shortDescription}
      />

      <main className="flex flex-col px-5 md:px-24 mt-16 min-h-screen">
        <div className="flex gap-2 flex-wrap">
          {poi.categories.data.map(({ attributes: category }, idx) => (
            <div
              key={`cate-keys-${idx}`}
              className="px-6 py-2 text-[11px] rounded-full bg-primary text-cream"
            >
              {category.name}
            </div>
          ))}
        </div>
        <section className="my-8  md:mb-16 flex justify-center">
          <p className="text-pretty leading-8">{poi.longDescription}</p>
        </section>
        <section className="my-8  md:my-16 flex justify-center">
          <Map
            location={{
              lat: poi.longitude,
              lng: poi.latitude,
            }}
          />
        </section>
      </main>

      <Footer policies={policies} />
    </TranslationsProvider>
  );
}
