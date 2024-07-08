import TranslationsProvider from "@/providers/translation-provider";
import initTranslations from "@/lib/i18n";
import HomeClient from "./_client";

const namespaces = ["home", "common", "navbar", "footer", "villas"];

export default async function Home({ params: { locale } }) {
  // first namspace in the array is the default namespace
  const { resources } = await initTranslations(locale, namespaces);

  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/establishment?locale=${locale}`,
  );

  const villasResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/villas?locale=${locale}&populate[0]=interiorGallery&populate[1]=heroImage&populate[2]=villa_rooms`,
  );

  const reviewsResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/reviews?locale=${locale}&populate[0]=avatar`,
  );

  // TODO: update this correct query
  const poisResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/pois?locale=${locale}&populate[0]=categories&populate[1]=gallery`,
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`,
  );

  const { data: pois } = await poisResponse.json();
  const { data: villas } = await villasResponse.json();
  const { data: reviews } = await reviewsResponse.json();
  const { data: policies } = await policiesResponse.json();

  //TODO: error handling
  const {
    data: { attributes },
  } = await response.json();

  const heroImages = villas.map(({ attributes: villa }) => ({
    src: villa.heroImage.data.attributes.formats.small.url,
  }));

  const squareData = villas
    .map(({ attributes: villa }) => {
      return villa.interiorGallery.data.map(({ attributes: image }) => ({
        src: image.formats.small.url,
      }));
    })
    .flat()
    .concat(heroImages)
    .map((image, index) => ({ ...image, id: index + 1 }));

  const formatedReviews = reviews.map(({ attributes: review }, index) => ({
    tempId: index,
    imgSrc: review.avatar.data.attributes.formats.thumbnail?.url,
    testimonial: review.review,
    by: review.name,
    rate: review.rate,
  }));

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <HomeClient
        squareData={squareData}
        settings={attributes}
        villas={villas}
        reviews={formatedReviews}
        pois={pois}
        policies={policies}
      />
    </TranslationsProvider>
  );
}
