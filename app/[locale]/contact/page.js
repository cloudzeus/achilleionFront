import Footer from "@/components/footer";
import Map from "@/components/map";
import Navbar from "@/components/navbar";
import initTranslations from "@/lib/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import Image from "next/image";
import Link from "next/link";

const namespaces = ["contact", "common", "navbar", "footer"];

export default async function ContactPage({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, namespaces);

  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/establishment?locale=${locale}&populate[0]=directions&populate[1]=contactInfo`,
  );

  // TODO: update this correct query
  const policiesResponse = await fetch(
    `${process.env.STRAPI_BASE_URL}/termsandcondition?locale=${locale}&populate[0]=bocks`,
  );

  //TODO: error handling
  const {
    data: { attributes },
  } = await response.json();
  const { data: policies } = await policiesResponse.json();

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <Navbar />
      <main className="container mx-auto">
        <div className="flex items-center justify-center pb-4 pt-10  md:p-10 md:my-9">
          <h3 className="text-secondary font-noto text-[48px]">
            {t("contact:headerTitle").toUpperCase()}
          </h3>
        </div>
        <div className="flex flex-col-reverse md:flex-row mx-3 md:mx-20 mt-8">
          <div className="flex-1">
            <h3 className="uppercase my-12 md:my-0 text-[32px]">
              {t("contact:subTitle")}
            </h3>
            <div className="flex gap-4 mt-5 items-center">
              <Image
                src="/icons/location.svg"
                width={32}
                height={32}
                objectFit="cover"
                alt="location-icon"
              />
              <p className="text-[24px]">
                {`${attributes.Address}, ${attributes.city}, ${attributes.area}`}
              </p>
            </div>
            {attributes?.contactInfo?.map((contact) => (
              <div className="mt-8" key={`contact-dsdfjbkaq32-${contact.id}`}>
                <h5 className="text-[24px]">{contact.name}</h5>
                <div className="grid grid-cols-2 gap-2">
                  {contact.phone ? (
                    <div className="flex gap-2 mt-4 items-center">
                      <Image
                        src="/icons/phone.svg"
                        width={24}
                        height={24}
                        objectFit="cover"
                        alt="phone-icon"
                      />
                      <Link
                        href={`tel:${contact.phone}`}
                        className="text-[14px] text-gray-700"
                      >
                        {contact.phone}
                      </Link>
                    </div>
                  ) : null}

                  {contact.mobile ? (
                    <div className="flex gap-2 mt-4 items-center">
                      <Image
                        src="/icons/mobile.svg"
                        width={25}
                        height={25}
                        objectFit="cover"
                        alt="mobile-icon"
                      />
                      <Link
                        href={`tel:${contact.mobile}`}
                        className="text-sm text-gray-700"
                      >
                        {contact.mobile}
                      </Link>
                    </div>
                  ) : null}

                  {contact.email ? (
                    <div className="flex gap-2 mt-4 items-center">
                      <Image
                        src="/icons/email.svg"
                        width={25}
                        height={25}
                        objectFit="cover"
                        alt="email-icon"
                      />
                      <Link
                        href={`tel:${contact.email}`}
                        className="text-sm text-gray-700"
                      >
                        {contact.mobile}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 md:mb-0 mb-5">
            <Map
              location={{
                lat: attributes.latitude,
                lng: attributes.longitude,
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center p-10 md:my-24">
          <h5 className=" text-[24px] my-12 md:my-0">
            {t("contact:direction-title").toUpperCase()}
          </h5>
        </div>
        <div className="justify-center mx-4 md:mx-0">
          <div className="flex flex-col md:flex-row justify-center">
            <div className="md:w-1/2">
              {attributes.directions?.map((direction) => (
                <div
                  className="flex border-b border-light-secondary mb-12 pb-12"
                  key={`directions-s43wt-${direction.id}`}
                >
                  <div className="w-1/4 md:w-1/3">
                    <p className="text-right text-[14px] pb-2">
                      {t("contact:direction-from-label")}
                    </p>
                    <p className="text-right text-[14px] pb-2">
                      {t("contact:direction-distance-label")}
                    </p>

                    <p className="text-right text-[14px] pb-2">
                      {t("contact:direction-time-label")}
                    </p>

                    <p className="text-right text-[14px] mt-4">
                      {t("contact:direction-directions-label")}
                    </p>
                  </div>
                  <div className="border-l border-light-secondary ml-3 md:mx-8 mb-4"></div>
                  <div className="flex-1">
                    <p className="pl-8 text-[14px] pb-2">
                      {direction.fromWhere}
                    </p>
                    <p className="pl-8 text-[14px] pb-2">
                      {direction.distance}
                    </p>
                    <p className="pl-8 text-[14px] pb-2">
                      {direction.estimatedTime}
                    </p>
                    <p
                      className="pl-8 text-[14px] mt-4"
                      dangerouslySetInnerHTML={{
                        __html: direction.directionsInfo.replace(
                          /\n/g,
                          "<br/>",
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center my-28">
          <Image
            src="/images/logo.svg"
            width={150}
            height={150}
            objectFit="cover"
            alt="logo"
          />
        </div>
      </main>
      <Footer policies={policies} />
    </TranslationsProvider>
  );
}
