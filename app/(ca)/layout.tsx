import { RootDocument } from "@/components/RootDocument";
import { VIEWPORT } from "@/lib/site";

export const viewport = VIEWPORT;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ca">{children}</RootDocument>;
}
