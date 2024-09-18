import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import constants from "@/settings/constants";
acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|models|fonts|sw.js).*)",
  ],
};
const filterLoginedDoNotAccess = [
  new RegExp(`^\\/(?:${languages.join('|')})?\\/sign-up(?:\\?.*)?$`),
  new RegExp(`^\\/(?:${languages.join('|')})?\\/sign-in(?:\\?.*)?$`),
  new RegExp(`^\\/(?:${languages.join('|')})?\\/forget-password(?:\\?.*)?$`),
  new RegExp(`^\\/(?:${languages.join('|')})?\\/recover-password(?:\\?.*)?$`),
  new RegExp(`^\\/(?:${languages.join('|')})?\\/vertify-email(?:\\?.*)?$`),
];

// const filterNotLoginDoNotAccess = [];
function isUserLogined(req: NextRequest) {
  if (req.cookies.has(constants.ACCESS_TOKEN)) return true;
}
function isPassed(req: NextRequest) {
  return filterLoginedDoNotAccess.every((regex) => !regex.test(req.nextUrl.pathname))
}
export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const url = new URL(req.url);
    const searchParams = url.searchParams.toString();
    lng = fallbackLng;
    return NextResponse.redirect(
      new URL(
        `/${lng}${req.nextUrl.pathname}${searchParams ? `?${searchParams}` : ""
        }`,
        req.url
      )
    );
  }
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // check if user was logined and access to login, signup, forget password, recover password, vertify email
  if (isUserLogined(req) && !isPassed(req)) {
    return NextResponse.redirect(new URL(`/${fallbackLng}/home`, req.url));
  }

  return NextResponse.next();
}
