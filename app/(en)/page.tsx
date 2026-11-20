import Page from "../../components/Page";
import { en } from "../../content/en";
import { buildMetadata } from "../../lib/metadata";

export const metadata = buildMetadata(en);

export default function Home() {
  return <Page c={en} />;
}
