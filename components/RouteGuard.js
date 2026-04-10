import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/register", "/about"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function authCheck(url) {
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      await updateAtom();
      setAuthorized(true);
    }
  }

  useEffect(() => {
    authCheck(router.asPath);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router.asPath]);

  return <>{authorized && children}</>;
}