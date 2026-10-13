import { LocalePage } from "@/components/LocalePage";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = pageMetadata("ca");

export default function Page() {
  return <LocalePage locale="ca" />;
}
