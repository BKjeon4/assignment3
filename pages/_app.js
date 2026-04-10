import RouteGuard from "@/components/RouteGuard";
import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}