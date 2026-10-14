import { subpageRoute } from "@/lib/subpage-route";

const route = subpageRoute("ca");

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
