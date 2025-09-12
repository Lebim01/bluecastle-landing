import { useTranslation } from "react-i18next";
const Disclaimer = () => {
  const { t } = useTranslation();
  return (
    <span className="text-neutral-300 italic text-xs">
      {t("dashboard_view.finance.projections_warning")}
    </span>
  );
};

export default Disclaimer;
