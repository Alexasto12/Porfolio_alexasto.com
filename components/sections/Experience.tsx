import Image from "next/image";
import { DATA } from "@/lib/content";
import { CARD_IMAGE_SIZES, SHOTS } from "@/lib/shots";
import { LOCALE_TAG, translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import { Tags } from "../ui/Tags";
import { SectionHead } from "../ui/SectionHead";
import { ApiTerminal } from "../ApiTerminal";
import { LinkRow } from "../LinkRow";
import { ProjectCard } from "../ProjectCard";

/** Experience: VMV (2025-2026), Neibr (closed) and the GOK Thermal freelance job. */
export function Experience({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience;
  return (
    <section id="experiencia" className="shell section" style={{ paddingBottom: "clamp(56px,9vw,110px)" }}>
      <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
      <Vmv locale={locale} />
      <Neibr locale={locale} />
      <div className="cards cards--single" style={{ marginTop: "clamp(48px,7vw,96px)" }}>
        <ProjectCard card={d.gok} index={0} locale={locale} level={3} />
      </div>
    </section>
  );
}

function XpHeader({ title, chip }: { title: string; chip: string }) {
  return (
    <Reveal
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "12px 16px",
        flexWrap: "wrap",
        borderTop: "1px solid var(--line-strong)",
        paddingTop: "18px",
      }}
    >
      <h3
        className="font-display"
        style={{ fontWeight: 800, fontSize: "clamp(1.6rem,3.4vw,2.6rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        {title}
      </h3>
      <span className="chip">{chip}</span>
    </Reveal>
  );
}

function Vmv({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.vmv;
  return (
    <article style={{ marginTop: "clamp(40px,6vw,72px)" }}>
      <XpHeader title={d.client} chip={`${t(d.role)} · ${d.range}`} />

      <Reveal delay="1" className="g4" style={{ marginTop: "clamp(20px,3vw,32px)", alignItems: "end" }}>
        <p
          className="col-2 font-display"
          style={{ fontWeight: 700, fontSize: "clamp(1.3rem,2.4vw,1.9rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          {t(d.heading)}
        </p>
        <p className="col-2" style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.62, textWrap: "pretty" }}>
          {t(d.intro)}
        </p>
      </Reveal>

      <Reveal delay="1" className="g4" style={{ marginTop: "clamp(30px,4vw,52px)" }}>
        {d.stats.map((s, i) => (
          <div
            key={i}
            className={i === 2 ? "col-2" : "col-1"}
            style={{ borderTop: "2px solid var(--tw-accent)", paddingTop: "16px" }}
          >
            <div className="stat-value font-display" style={{ fontSize: "clamp(3rem,7vw,5.2rem)" }}>
              <Counter to={s.value} locale={LOCALE_TAG[locale]} />
            </div>
            <div
              className="font-mono"
              style={{ marginTop: "10px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em" }}
            >
              {t(s.label)}
            </div>
            <div className="font-mono" style={{ marginTop: "4px", fontSize: "11px", color: "var(--muted-soft)" }}>
              {t(s.caption)}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal as="h4" className="mono-label" style={{ marginTop: "clamp(36px,5vw,60px)", marginBottom: "18px" }}>
        {t(d.capabilitiesLabel)}
      </Reveal>
      <ul className="g4">
        {d.capabilities.map((c, i) => (
          <Reveal
            as="li"
            key={i}
            delay={String((i % 2) + 1)}
            className="col-2 panel"
            style={{ padding: "clamp(18px,2.2vw,26px)", display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <span
              className="font-display"
              style={{ fontWeight: 600, fontSize: "clamp(1rem,1.5vw,1.2rem)", letterSpacing: "-0.015em" }}
            >
              {t(c.title)}
            </span>
            {c.description && (
              <span style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, textWrap: "pretty" }}>
                {t(c.description)}
              </span>
            )}
            {c.link && (
              <a
                href={t(c.link.href)}
                target="_blank"
                rel="noreferrer"
                className="link-row"
                style={{ marginTop: "4px" }}
              >
                <span className="link-row__bar" aria-hidden />
                <span>
                  {t(c.link.label)}
                  <span aria-hidden> ↗</span>
                </span>
              </a>
            )}
          </Reveal>
        ))}
      </ul>

      {/* Static on purpose: a band that never stops moving fails WCAG 2.2.2. */}
      <ul className="tech-list" aria-label={t(d.techLabel)} style={{ marginTop: "clamp(36px,5vw,60px)" }}>
        {d.ticker.map((w, i) => (
          <li key={i}>{t(w)}</li>
        ))}
      </ul>
    </article>
  );
}

function Neibr({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  const para = { fontSize: "14.5px", lineHeight: 1.64, color: "var(--muted)", maxWidth: "52ch", textWrap: "pretty" } as const;
  return (
    <article id="neibr" style={{ marginTop: "clamp(48px,7vw,96px)" }}>
      <XpHeader title={d.title} chip={t(d.sub)} />

      <div className="g4" style={{ marginTop: "clamp(24px,3vw,40px)", alignItems: "start" }}>
        <Reveal className="col-2">
          <p
            className="font-display"
            style={{ fontWeight: 600, fontSize: "clamp(1.2rem,2vw,1.5rem)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
          >
            {t(d.tagline)}
          </p>
          <p style={{ ...para, marginTop: "14px", color: "var(--ink)", fontWeight: 500, fontSize: "clamp(15px,1.4vw,17px)" }}>
            {t(d.what)}
          </p>
          <p style={{ ...para, marginTop: "16px" }}>{t(d.role)}</p>
          <p style={{ ...para, marginTop: "16px" }}>{t(d.tech)}</p>
          <div style={{ marginTop: "18px" }}>
            <Tags items={d.tags} />
          </div>
          <dl style={{ marginTop: "26px", display: "grid", gap: "18px" }}>
            <div>
              <dt className="mono-label">{t(d.awardLabel)}</dt>
              <dd style={{ ...para, margin: "6px 0 0", color: "var(--ink)" }}>{t(d.award)}</dd>
            </div>
            <div>
              <dt className="mono-label">{t(d.closureLabel)}</dt>
              <dd style={{ ...para, margin: "6px 0 0" }}>{t(d.closure)}</dd>
            </div>
          </dl>
          <LinkRow links={d.links} locale={locale} />
          {SHOTS.neibr && (
            <Image
              className="shot-img"
              style={{ marginTop: "22px" }}
              src={SHOTS.neibr.src}
              width={SHOTS.neibr.width}
              height={SHOTS.neibr.height}
              alt={t(d.shotAlt)}
              sizes={CARD_IMAGE_SIZES}
            />
          )}
        </Reveal>

        <Reveal delay="1" className="col-2" style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.4vw,28px)" }}>
          <div className="panel" style={{ padding: "clamp(22px,2.6vw,32px)" }}>
            <div className="mono-label">{t(d.stressLabel)}</div>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
              <span className="stat-value" style={{ fontSize: "clamp(3rem,8vw,6rem)" }}>
                <Counter to={d.stress.requests} decimals={1} locale={LOCALE_TAG[locale]} />
              </span>
              <span className="font-mono" style={{ fontSize: "12px", color: "var(--muted)", maxWidth: "20ch" }}>
                {t(d.stress.requestsLabel)}
              </span>
            </div>
            <dl
              style={{
                marginTop: "22px",
                paddingTop: "18px",
                borderTop: "1px solid var(--line)",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              {d.stress.facts.map((f, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column-reverse", gap: "4px" }}>
                  <dt className="font-mono" style={{ fontSize: "11px", color: "var(--muted-soft)" }}>
                    {t(f.label)}
                  </dt>
                  <dd className="font-display" style={{ margin: 0, fontWeight: 700, fontSize: "clamp(1.1rem,2vw,1.5rem)" }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="mono-label" style={{ marginBottom: "10px" }}>
              {t(d.endpointTitle)}
            </div>
            <ApiTerminal label={t(d.terminalLabel)} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
