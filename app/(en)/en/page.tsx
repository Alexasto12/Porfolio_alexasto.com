import { LocalePage } from "@/components/LocalePage";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = pageMetadata("en");

export default function Page() {
  return <LocalePage locale="en" />;
}
