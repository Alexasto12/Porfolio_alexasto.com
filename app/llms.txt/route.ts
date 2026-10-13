import { localeUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Plain-text summary for LLM crawlers; the site URLs follow SITE_URL. */
export function GET() {
  const body = `# Alejandro Cabrera

> Personal site of **Alejandro Cabrera**, backend and full-stack developer and
> co-founder of Digital DesAny, a web studio in Granollers (Barcelona, Spain).
> "Alexasto" and "alexasto12" are his username and domain.

Alejandro builds websites, backends and automations from Granollers. Most of
his work goes through Digital DesAny, the studio he runs with Oriol Tamborero
for small and medium businesses across Catalonia.

## Identity

- Name: Alejandro Cabrera
- Username: alexasto12 (domain alexasto.com)
- Role: Backend and full-stack developer. Co-founder of Digital DesAny.
- Location: Granollers, Barcelona, Spain
- Site: ${localeUrl("es")} (Spanish), ${localeUrl("ca")} (Catalan), ${localeUrl("en")} (English)
- Personal contact: contact@alexasto.com
- Client projects: info@digitaldesany.com

## Profiles

- LinkedIn: https://www.linkedin.com/in/ccalejandro/
- GitHub: https://github.com/Alexasto12
- WordPress.org: https://profiles.wordpress.org/alexasto12/
- Digital DesAny: https://www.digitaldesany.com and https://www.linkedin.com/company/digital-desany/

## Digital DesAny (2026, co-founder)

Custom websites (design, development, digitalisation and deployment), social
media management, automations with or without AI, and custom software.
Case studies: Lara's Oak (https://larasoak.art), Paula Krebel, Roses de Sant
Jordi (https://rosesstjordi.cat) and Hidrotech Bordalló.

## Experience

- VMV Cosmetic Group (2025-2026): lead web developer. 32 domains (21 with a
  live site), 12 internal plugins and an in-house plugin store, 20
  microservices in Go, Java and Node.
- Neibr (closed in 2026): co-founder and only backend developer of a B2B API
  for parcel carriers that assigned failed deliveries to a neighbour within
  200 m. Go (Fiber), PostgreSQL and Redis. One of the winning projects of the
  Santander X Spain Awards 2026 (UVic). https://neibr.es
- GOK Thermal: website for an HVAC installer in Granollers, freelance job
  outside Digital DesAny. https://gokthermal.com

## Education and open source

- Peer2Stream: DAW final project (10/10), built with Ismael Delgado.
  Demo https://peer2stream.alexasto.com/discover, code
  https://github.com/Alexasto12/peer2stream
- Pokédex DS: DAW exercise; the DS shell is adapted from a CodePen by Anton
  Essential (MIT). Demo https://alexasto12.github.io/ProjectePokeAPI/, code
  https://github.com/Alexasto12/ProjectePokeAPI
- WordPress.org plugin: Simply Bootstrap Carousel, over 10 active installs.
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
