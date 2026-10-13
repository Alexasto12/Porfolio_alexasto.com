import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.contact;
  return (
    <footer className="shell" style={{ position: "relative", zIndex: 2 }}>
      <div className="site-footer">
        <p>{t(d.footerNote)}</p>
        <p>{d.copyright}</p>
      </div>
    </footer>
  );
}
