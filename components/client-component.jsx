"use client";

import { useTranslation } from "react-i18next";

export const ClientComponent = () => {
  const { t } = useTranslation();

  const name = "Dellan";

  return <p>{t("subheader", { name })}</p>;
};
