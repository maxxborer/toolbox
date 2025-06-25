import { createCookie } from "@remix-run/node";
import { THEME_COOKIE_NAME, THEME_COOKIE_PARAMS, THEME_VARIANT_VALUES } from "./theme";

export const themeCookie = createCookie(THEME_COOKIE_NAME, THEME_COOKIE_PARAMS);

export async function getTheme(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const theme = await themeCookie.parse(cookieHeader);

  if (theme && THEME_VARIANT_VALUES.includes(theme)) {
    return theme;
  }

  return null;
}

export function setTheme(theme: (typeof THEME_VARIANT_VALUES)[number] | null) {
  if (theme) {
    return themeCookie.serialize(theme);
  }

  return themeCookie.serialize("", { maxAge: 0 });
}
